import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function removeUnusedImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const unusedImports = new Set();
  
  // Find all unused imports
  lines.forEach((line, index) => {
    if (line.includes('TS6133')) {
      const match = line.match(/'([^']+)'/);
      if (match) {
        unusedImports.add(match[1]);
      }
    }
  });

  if (unusedImports.size === 0) {
    return;
  }

  // Filter out unused imports
  const filteredLines = lines.filter(line => {
    if (line.trim().startsWith('import')) {
      if (line.includes('{')) {
        // Handle named imports
        const importMatch = line.match(/import\s*{([^}]+)}/);
        if (importMatch) {
          const imports = importMatch[1].split(',').map(i => i.trim());
          const usedImports = imports.filter(imp => !unusedImports.has(imp));
          if (usedImports.length === 0) {
            return false;
          }
          const newLine = line.replace(/{\s*[^}]+\s*}/, `{ ${usedImports.join(', ')} }`);
          lines[lines.indexOf(line)] = newLine;
          return false;
        }
      } else {
        // Handle default imports
        const importMatch = line.match(/import\s+(\w+)/);
        if (importMatch && unusedImports.has(importMatch[1])) {
          return false;
        }
      }
    }
    return true;
  });

  fs.writeFileSync(filePath, filteredLines.join('\n'));
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      removeUnusedImports(filePath);
    }
  });
}

processDirectory(path.join(__dirname, 'src')); 