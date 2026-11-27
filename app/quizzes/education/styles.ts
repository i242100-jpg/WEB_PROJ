export const styles = `
#world[data-room="quizzes/education"] .destination { inset:82px max(4vw,calc((100vw - 960px)/2)) 68px; transform:none; }
.ed-panel { max-height:none; overflow:visible; padding:clamp(18px,3vw,36px); border:1px solid #a28061; border-radius:8px; background:radial-gradient(ellipse at 94% 0,#4e3541,transparent 52%),#211b2a; box-shadow:0 18px 70px #120e2199; scrollbar-color:#936e58 #211b2a; }
.ed-back,.ed-panel small,.ed-line,.ed-status { color:#e6ceb0; font-size:14px; }
.destination .ed-panel h1 { font:normal clamp(38px,6vw,68px)/1 Georgia,serif; margin:14px 0 8px; letter-spacing:-.045em; }
.destination .ed-panel p { margin:8px 0 17px; }
.ed-panel h2,.ed-report h2 { font:normal clamp(24px,3vw,34px)/1.16 Georgia,serif; margin:12px 0; }
.ed-cards { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:12px; }
.ed-cards:has(>button:only-child) {grid-template-columns:minmax(0,420px);}
.ed-cards button { display:flex; flex-direction:column; overflow:hidden; align-items:flex-start; border:1px solid #a58468; border-radius:5px; background:#2d2332; text-align:left; padding:0 0 16px; transition:transform .18s,border-color .18s; }
.ed-cards button:hover { transform:translateY(-3px); border-color:#ffe2ac; }
.ed-cards img { width:100%; display:block; }
.ed-cards strong,.ed-cards small,.ed-cards em { margin:10px 14px 0; }
.ed-cards strong { font:normal 22px/1.12 Georgia,serif; }
.ed-cards em { margin-top:auto; padding-top:14px; color:#ffcf86; font:600 13px system-ui; }
.ed-line,.ed-report li { display:flex; align-items:baseline; justify-content:space-between; gap:12px; }
.ed-line { margin:10px 0; }
.ed-line strong,.ed-results strong,.ed-report strong { color:#ffda93; font-variant-numeric:tabular-nums; }
.ed-gain { display:inline-block; animation:ed-award .65s both; color:#a5efc4; font-style:normal; }
.ed-track { height:7px; background:#574757; border-radius:8px; overflow:hidden; margin:10px 0 20px; }
.ed-track i { display:block; height:100%; background:linear-gradient(90deg,#d39c78,#ffdf93); transform-origin:left; animation:ed-drain 10s linear forwards; }
@keyframes ed-drain { to { transform:scaleX(0); } }
.ed-paper { padding:clamp(16px,3vw,28px); border:3px double #9f794b; color:#38281e; background:linear-gradient(135deg,#e7c69a,#ffedc9 54%,#e3c08d); }
.ed-paper h2 { margin:0 0 20px; }
.ed-paper button { display:flex; width:100%; align-items:center; gap:14px; padding:12px; margin-top:8px; background:#fff0d0; border:1px solid #b79463; border-radius:3px 10px 3px 3px; color:#392b23; text-align:left; }
.ed-paper button b { font-family:Georgia,serif; }
.ed-paper button span { margin-left:auto; font-weight:bold; }
.ed-paper button:enabled:hover { background:#fff9ea; }
.ed-paper button[data-state=right] { background:#c6e1b2; border-color:#54754b; }
.ed-paper button[data-state=wrong] { background:#f3b7ae; border-color:#994e4e; }
.ed-paper button:disabled { opacity:1; cursor:default; }
.ed-status { min-height:1.6em; margin-top:12px; }
.ed-report,.ed-results { border-top:1px solid #a5846866; margin:22px 0 12px; padding:12px 0; }
.ed-report ul { padding:0; list-style:none; }
.ed-report li { border-bottom:1px solid #a584684d; padding:6px 0; }
.ed-results strong,.ed-report strong { display:block; font:600 24px Georgia,serif; margin-bottom:5px; }
.ed-perfect { display:inline-block; color:#ffda93; animation:ed-glow 1.6s ease-in-out 2; }
@keyframes ed-glow { 50% { text-shadow:0 0 18px #ffb24a; transform:scale(1.04); } }
@keyframes ed-award { from { opacity:0; transform:translateY(9px) scale(.7); } }
.ed-buttons { display:flex; flex-wrap:wrap; gap:9px; }
.ed-buttons button { padding:9px 14px; border:1px solid #bb9771; border-radius:4px; color:#ffe3b2; }
.ed-panel :focus-visible { outline:2px solid #ca8641; outline-offset:2px; }
@media(max-width:660px) { .ed-cards { grid-template-columns:1fr; } .ed-cards button { display:grid; grid-template-columns:80px 1fr; align-items:center; padding:8px; } .ed-cards img { grid-row:1/4; height:100%; object-fit:cover; } .ed-cards em { padding:0; margin-top:6px; } #world[data-room="quizzes/education"] { min-height:0; } #world[data-room="quizzes/education"] .destination { inset:78px 12px 64px; } }
@media(prefers-reduced-motion:reduce) { .ed-perfect,.ed-gain { animation:none; } .ed-cards button { transition:none; } }
`;
