const fs = require('fs');
const text = fs.readFileSync('app/pages/index.vue', 'utf8');
const start = text.indexOf('<template>');
const end = text.indexOf('<script setup>');
if (start === -1 || end === -1) {
  console.error('Template or script setup tag not found');
  process.exit(1);
}
const tpl = text.slice(start + '<template>'.length, end);
const voidTags = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
const tagRe = /<\/?([A-Za-z0-9-]+)([^>]*)>/g;
const lines = tpl.split(/\r?\n/);
let stack = [];
for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  let m;
  while ((m = tagRe.exec(line))) {
    const raw = m[0];
    const tag = m[1].toLowerCase();
    const isClose = raw.startsWith('</');
    const attrs = m[2];
    const selfClose = raw.endsWith('/>') || voidTags.has(tag) || /\/[\s]*>$/.test(raw);
    if (selfClose) continue;
    if (isClose) {
      const idx = stack.lastIndexOf(tag);
      if (idx === -1) {
        console.log('UNMATCHED_CLOSE', tag, 'line', i+1, line.trim());
      } else {
        stack.splice(idx, 1);
      }
    } else {
      stack.push(tag);
    }
  }
}
console.log('STACK_LEN', stack.length);
if (stack.length > 0) {
  console.log('TAIL', stack.slice(-30).join(','));
}
const counts = {};
for (let line of lines) {
  let m;
  tagRe.lastIndex = 0;
  while ((m = tagRe.exec(line))) {
    const raw = m[0];
    const tag = m[1].toLowerCase();
    if (!counts[tag]) counts[tag] = 0;
    if (raw.startsWith('</')) counts[tag] -= 1;
    else if (!raw.endsWith('/>') && !voidTags.has(tag)) counts[tag] += 1;
  }
}
console.log('COUNTS', Object.entries(counts).filter(([k,v]) => v !== 0).map(([k,v]) => `${k}:${v}`).join(', '));
