window.TIMEFRAME = 1000 / 60;
window.requestAnimationFrame = fn => setTimeout(fn, TIMEFRAME);
window.cancelAnimationFrame = rafId => clearTimeout(rafId);