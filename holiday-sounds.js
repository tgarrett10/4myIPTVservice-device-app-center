(() => {
  const button = document.querySelector('#holiday-sound');
  const music = document.querySelector('#holiday-music');
  if (!button || !music) return;
  music.volume = 0.3;
  function label() {
    button.textContent = music.paused ? '♫ Play holiday music' : music.muted ? '♫ Unmute holiday music' : '♫ Mute holiday music';
  }
  async function play() {
    try { await music.play(); } catch (_) { /* A visitor tap enables audio when autoplay is blocked. */ }
    label();
  }
  button.addEventListener('click', () => {
    if (music.paused) { music.muted = false; play(); }
    else { music.muted = !music.muted; label(); }
  });
  music.addEventListener('ended', label);
  music.addEventListener('play', label);
  music.addEventListener('pause', label);
  window.addEventListener('pagehide', () => music.pause());
  label();
  play();
})();
