// --------------------
// INVIEWエフェクト
// --------------------
// 監視したい要素全部につけるクラス名
const targetClassName = 'js-inview';
// 画面内に入ったらつけるクラス名
const inviewClassName = 'inview';

// Intersection Observerのオプション
const options = {
  // 監視する親要素。nullだとビューポート（画面）になる
  root: null,
  // ビューポートを基準にしたマージン。CSSのmarginみたいなもの
  rootMargin: '0px',
  // ターゲット要素がどれくらい画面内に入ったらコールバックを呼び出すか。0.1は10%
  threshold: 0.1,
};

// Intersection Observerのインスタンスを作成
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    // isIntersectingがtrueなら画面内に入った
    if (entry.isIntersecting) {
      entry.target.classList.add(inviewClassName);
    } else {
      entry.target.classList.remove(inviewClassName);
    }
  });
}, options);

// 監視したい要素をすべて取得して、observerに登録する
const targets = document.querySelectorAll(`.${targetClassName}`);
targets.forEach(target => {
  observer.observe(target);
});