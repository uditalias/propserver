window.requestAnimationFrame = fn => setTimeout(fn, 0);
window.cancelAnimationFrame = rafId => clearTimeout(rafId);
