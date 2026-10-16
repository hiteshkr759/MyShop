import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');

const blockedPaths = ['.cursor', '.claude', '.windsurf', '.copilot', '.cursorrules'];
const blockedFiles = ['.cursorrules', 'CLAUDE.md', '.claude.json'];
let violated = false;

blockedPaths.forEach(p => {
  if (fs.existsSync(p)) {
    // Whitelist authorized Antigravity poison lock files
    if (p === '.cursorrules') {
      try {
        const content = fs.readFileSync(p, 'utf8');
        if (content.includes('PROJECT LOCKED') && content.includes('Antigravity-only')) {
          return;
        }
      } catch (e) {}
    }
    console.error(`❌ LOCK VIOLATION: Found forbidden AI folder/file ${p}. This project is Antigravity-only. Delete it.`);
    violated = true;
  }
});

if (!fs.existsSync('ANTIGRAVITY.LOCK')) {
  console.error('❌ LOCK VIOLATION: ANTIGRAVITY.LOCK missing');
  violated = true;
}

if (violated) process.exit(1);
console.log('✅ Antigravity lock verified - Authorized AI');
