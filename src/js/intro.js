import { lenis } from './lenis.js';
if (typeof lenis !== 'undefined') {
  // ページが読み込まれたらlenisのスクロールを止める
  // これでページのスクロールが禁止される
  lenis.stop();
}

const introSection = document.getElementById('intro');
const noButton = document.getElementById('no-button');
const yesButton = document.getElementById('yes-button');
// #global-nav の中にある SWITCH MODE ボタンを取得
const switchButton = document.getElementById('mode-switch');

// --------------------
// Introセクションの表示/非表示を管理
// --------------------
function handleIntro() {
  const savedMode = localStorage.getItem('mode');

  if (savedMode === 'boring') {
    document.body.classList.add('boring-mode');
    if (introSection) {
      introSection.classList.add('hide');
    }
    // ここでis-loadingを外すのを少し遅らせる
    setTimeout(() => {
        document.body.classList.remove('is-loading');
    }, 10);
    if (typeof lenis !== 'undefined') {
      lenis.start();
    }
  } else if (savedMode === 'normal') {
    if (introSection) {
      introSection.classList.add('hide');
    }
    // ここでis-loadingを外すのを少し遅らせる
    setTimeout(() => {
        document.body.classList.remove('is-loading');
    }, 10);
    if (typeof lenis !== 'undefined') {
      lenis.start();
    }
  } else {
    // 初回アクセスの場合
    document.body.classList.add('is-loading');
    if (typeof lenis !== 'undefined') {
      lenis.stop();
    }
  }
}

// --------------------
// ボタンのクリックイベント
// --------------------
function handleButtonClick() {
  if (noButton) {
    noButton.addEventListener('click', () => {
      localStorage.setItem('mode', 'normal');
      if (typeof lenis !== 'undefined') {
        lenis.start();
      }
      if (introSection) {
        introSection.classList.add('hide');
      }
      setTimeout(() => {
        document.body.classList.remove('is-loading');
      }, 500);
    });
  }

  if (yesButton) {
    yesButton.addEventListener('click', () => {
      localStorage.setItem('mode', 'boring');
      document.body.classList.add('boring-mode');
      if (typeof lenis !== 'undefined') {
        lenis.start();
      }
      if (introSection) {
        introSection.classList.add('hide');
      }
      setTimeout(() => {
        document.body.classList.remove('is-loading');
      }, 500);
    });
  }

  // SWITCH MODE ボタンの処理
  if (switchButton) {
    switchButton.addEventListener('click', (e) => {
      e.preventDefault();
      const isBoring = document.body.classList.toggle('boring-mode');
      if (isBoring) {
        localStorage.setItem('mode', 'boring');
      } else {
        localStorage.setItem('mode', 'normal');
      }
    });
  }
}

// ページが読み込まれたら実行
document.addEventListener('DOMContentLoaded', () => {
  handleIntro();
  handleButtonClick();
});