// --------------------
// 慣性スクロール
// --------------------
import Lenis from '@studio-freight/lenis';
export const lenis = new Lenis({
  lerp: 0.1, // 慣性の強さ
  duration: 1, // スクロールアニメーションの時間
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);