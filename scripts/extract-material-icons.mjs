/**
 * Material Symbols SVG → 24x24 viewBox path 변환 스크립트
 * 원본: viewBox="0 -960 960 960" → 변환: viewBox="0 0 24 24"
 * 변환식: x' = x / 40, y' = (y + 960) / 40
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const MATERIAL_DIR = resolve('node_modules/@material-symbols/svg-400/rounded');

const ICON_MAP = {
  ArrowLeft: 'arrow_back',
  ArrowRight: 'arrow_forward',
  ChevronLeft: 'chevron_left',
  ChevronRight: 'chevron_right',
  ChevronUp: 'keyboard_arrow_up',
  ChevronDown: 'keyboard_arrow_down',
  Menu: 'menu',
  Close: 'close',
  Search: 'search',
  Plus: 'add',
  Minus: 'remove',
  Check: 'check',
  Edit: 'edit',
  Delete: 'delete',
  Share: 'share',
  Download: 'download',
  Upload: 'upload',
  Filter: 'filter_list',
  Refresh: 'refresh',
  Bookmark: 'bookmark',
  Notification: 'notifications',
  Mail: 'mail',
  Chat: 'chat',
  Phone: 'call',
  User: 'person',
  Settings: 'settings',
  Logout: 'logout',
  Info: 'info',
  Warning: 'warning',
  Error: 'error',
  Success: 'check_circle',
  Help: 'help',
  Image: 'image',
  Camera: 'photo_camera',
  Play: 'play_arrow',
  Pause: 'pause',
  Home: 'home',
  Heart: 'favorite',
  Star: 'star',
  Eye: 'visibility',
};

// Parse SVG path commands and transform coordinates
function transformPath(d) {
  // Tokenize the path
  const tokens = d.match(/[a-zA-Z]|[-+]?\d*\.?\d+/g);
  if (!tokens) return d;

  let result = '';
  let i = 0;
  let currentCmd = '';
  let isRelative = false;
  // Track how many coordinate pairs each command expects
  const paramCounts = {
    M: 2, m: 2, L: 2, l: 2, H: 1, h: 1, V: 1, v: 1,
    C: 6, c: 6, S: 4, s: 4, Q: 4, q: 4, T: 2, t: 2,
    A: 7, a: 7, Z: 0, z: 0,
  };

  while (i < tokens.length) {
    const token = tokens[i];

    if (/^[a-zA-Z]$/.test(token)) {
      currentCmd = token;
      isRelative = token === token.toLowerCase();
      result += token;
      i++;

      if (token === 'Z' || token === 'z') continue;

      const count = paramCounts[token] || 0;
      if (count === 0) continue;

      // Process parameters
      while (i < tokens.length && /^[-+]?\d/.test(tokens[i])) {
        const params = [];
        for (let j = 0; j < count && i < tokens.length && /^[-+]?\d/.test(tokens[i]); j++) {
          params.push(parseFloat(tokens[i]));
          i++;
        }

        if (isRelative) {
          // Relative: just scale by /40
          const scaled = params.map((v, idx) => {
            if (currentCmd === 'a' || currentCmd === 'A') {
              // Arc: rx, ry, rotation, large-arc, sweep, x, y
              if (idx < 2) return round(v / 40); // rx, ry
              if (idx >= 2 && idx <= 4) return v; // flags
              return round(v / 40); // x, y
            }
            return round(v / 40);
          });
          result += scaled.join(' ');
        } else {
          // Absolute: transform
          const upper = currentCmd.toUpperCase();
          if (upper === 'H') {
            result += round(params[0] / 40);
          } else if (upper === 'V') {
            result += round((params[0] + 960) / 40);
          } else if (upper === 'A') {
            // Arc: rx ry rotation large-arc sweep x y
            result += round(params[0] / 40) + ' ' + round(params[1] / 40) + ' ' +
              params[2] + ' ' + params[3] + ' ' + params[4] + ' ' +
              round(params[5] / 40) + ' ' + round((params[6] + 960) / 40);
          } else {
            // Pairs of x,y
            const scaled = [];
            for (let j = 0; j < params.length; j += 2) {
              scaled.push(round(params[j] / 40));
              if (j + 1 < params.length) {
                scaled.push(round((params[j + 1] + 960) / 40));
              }
            }
            result += scaled.join(' ');
          }
        }

        // Add space before next set
        if (i < tokens.length && /^[-+]?\d/.test(tokens[i])) {
          result += ' ';
        }
      }
    } else {
      // Implicit repeat of last command
      i++;
    }
  }

  return result;
}

function round(n) {
  const r = Math.round(n * 10) / 10;
  return r === Math.floor(r) ? Math.floor(r) : r;
}

function extractPath(svgContent) {
  const match = svgContent.match(/d="([^"]*)"/);
  return match ? match[1] : '';
}

// Main
const output = {};

for (const [name, materialName] of Object.entries(ICON_MAP)) {
  try {
    const lineSvg = readFileSync(resolve(MATERIAL_DIR, `${materialName}.svg`), 'utf-8');
    const fillSvg = readFileSync(resolve(MATERIAL_DIR, `${materialName}-fill.svg`), 'utf-8');

    const linePath = transformPath(extractPath(lineSvg));
    const fillPath = transformPath(extractPath(fillSvg));

    output[name] = { line: linePath, fill: fillPath };
  } catch (e) {
    console.error(`Error processing ${name} (${materialName}):`, e.message);
  }
}

// Write output
writeFileSync(
  resolve('scripts/material-paths.json'),
  JSON.stringify(output, null, 2)
);

console.log(`Extracted ${Object.keys(output).length} icons`);
console.log('Sample (Heart):', JSON.stringify(output.Heart, null, 2));
