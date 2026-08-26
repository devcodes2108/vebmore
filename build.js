const fs = require('fs');
const path = require('path');

// Files and directories to include in production build
const includeFiles = [
  'index.html',
  '_headers',
  '123.png',
  'image123.png',
  'ChatGPT Image Aug 18, 2026, 12_45_09 PM.png',
  'ChatGPT Image Aug 20, 2026, 07_51_40 PM.png',
  'ChatGPT Image Aug 25, 2026, 12_09_08 AM.png',
  'ChatGPT Image Aug 25, 2026, 12_09_30 AM.png',
  'Loading 40 _ Paperplane.webm'
];

const includeDirs = [
  'frames',
  'models'
];

const distDir = path.join(__dirname, 'dist');

// Clean and create dist directory
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir);

// Copy individual files
includeFiles.forEach(file => {
  const src = path.join(__dirname, file);
  const dest = path.join(distDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied: ${file}`);
  } else {
    console.warn(`Warning: ${file} not found`);
  }
});

// Copy directories
includeDirs.forEach(dir => {
  const src = path.join(__dirname, dir);
  const dest = path.join(distDir, dir);
  if (fs.existsSync(src)) {
    copyDir(src, dest);
    console.log(`Copied directory: ${dir}`);
  } else {
    console.warn(`Warning: ${dir} not found`);
  }
});

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('\nBuild complete! Production files in ./dist/');
