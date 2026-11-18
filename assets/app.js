const code = [
  '// a little about me',
  'const auto me = Developer{',
  '    .name = "AlsoNotMehh",',
  '    .focus = "AzerothCore / WotLK",',
  '    .languages = {"C++20", "Lua", "SQL"},',
  '    .work = {"spells", "encounters",',
  '             "gameplay modules"}',
  '};',
].join('\n');
const target = document.querySelector('#typed-code');
const button = document.querySelector('.motion-toggle');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let position = 0;
let timer;
let paused = false;
function highlight(text) {
  const escaped = text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  return escaped.replace(/(\/\/[^\n]*|"[^"\n]*"|\b(?:const|auto)\b|\bDeveloper\b)/g, token => {
    const type = token.startsWith('//') ? 'comment' : token.startsWith('"') ? 'string' : token === 'Developer' ? 'type' : 'keyword';
    return '<span class="' + type + '">' + token + '</span>';
  });
}
function render() { target.innerHTML = highlight(code.slice(0, position)); }
function tick() {
  if (paused || reducedMotion.matches) return;
  position = Math.min(position + 2, code.length);
  render();
  if (position < code.length) timer = setTimeout(tick, code[position - 1] === '\n' ? 160 : 23);

}
function motionPreference() {
  clearTimeout(timer);
  if (reducedMotion.matches) { position = code.length; render(); button.hidden = true; }
  else { button.hidden = false; if (!paused && position < code.length) tick(); }
}
button.addEventListener('click', () => {
  paused = !paused;
  clearTimeout(timer);
  document.documentElement.classList.toggle('paused', paused);
  button.setAttribute('aria-pressed', String(paused));
  button.innerHTML = paused ? 'Play <span aria-hidden="true">▷</span>' : 'Pause <span aria-hidden="true">Ⅱ</span>';
  if (!paused) tick();
});
reducedMotion.addEventListener('change', motionPreference);
motionPreference();
