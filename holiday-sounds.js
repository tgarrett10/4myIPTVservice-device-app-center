(() => {
  const button = document.querySelector('#holiday-sound');
  if (!button) return;
  let context, timer;
  function stop() {
    clearTimeout(timer);
    if (context) { context.close().catch(() => {}); context = null; }
    button.textContent = '♫ Play holiday sounds';
    button.setAttribute('aria-pressed', 'false');
  }
  button.addEventListener('click', async () => {
    if (context) { stop(); return; }
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) { button.textContent = 'Holiday audio unavailable'; return; }
    try {
      context = new Audio();
      await context.resume();
      if (!context) return;
      button.textContent = '■ Stop holiday sounds';
      button.setAttribute('aria-pressed', 'true');
      // Original, gently decaying bell introduction; no recording or looping.
      const start = context.currentTime + 0.05;
      [784, 988, 1175, 988, 1319, 1175, 1568, 1319, 1568].forEach((hz, index) => {
        [1, 2.76, 5.4].forEach((partial, harmonic) => {
          const oscillator = context.createOscillator();
          const gain = context.createGain();
          const at = start + index * 0.58;
          oscillator.type = 'sine';
          oscillator.frequency.value = hz * partial;
          gain.gain.setValueAtTime(0, at);
          gain.gain.linearRampToValueAtTime(0.035 / (harmonic + 1), at + 0.008);
          gain.gain.exponentialRampToValueAtTime(0.0001, at + 1.65);
          oscillator.connect(gain); gain.connect(context.destination);
          oscillator.start(at); oscillator.stop(at + 1.7);
        });
      });
      timer = setTimeout(stop, 7000);
    } catch (_) { stop(); button.textContent = 'Try holiday sounds again'; }
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  window.addEventListener('pagehide', stop);
})();
