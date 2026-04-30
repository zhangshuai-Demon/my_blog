/**
 * 构建后修补：将 @astrojs/vercel@7.x 生成的 nodejs18.x 替换为 nodejs22.x
 * 运行时机：npm run build → astro build → node scripts/patch-runtime.cjs
 */
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.resolve(__dirname, '..', '.vercel', 'output');

function findFiles(dir, pattern, results = []) {
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findFiles(full, pattern, results);
    } else if (entry.name === pattern) {
      results.push(full);
    }
  }
  return results;
}

const vcConfigFiles = findFiles(OUTPUT_DIR, '.vc-config.json');

if (vcConfigFiles.length === 0) {
  console.log('[patch-runtime] 未找到 .vc-config.json，跳过');
  process.exit(0);
}

let patched = 0;
for (const file of vcConfigFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  if (content.includes('nodejs18.x')) {
    const updated = content.replace(/"nodejs18\.x"/g, '"nodejs22.x"');
    fs.writeFileSync(file, updated, 'utf-8');
    console.log('[patch-runtime] 已修补:', path.relative(OUTPUT_DIR, file));
    patched++;
  }
}

console.log(`[patch-runtime] 完成，${patched} 个文件已修补`);
