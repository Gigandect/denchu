import { lenis } from './lenis.js';
// --------------------
// Header処理
// --------------------
// ドロワーメニューの要素を取得
const globalNav = document.querySelector('.global-nav');
const menuButton = document.querySelector('.menu-button');
const openWrap = document.querySelector('.open-wrap');
const navLinks = globalNav.querySelectorAll('a');

// ヘッダー要素を取得
const header = document.querySelector('header');
// #statement要素を取得
const statement = document.querySelector('#statement');


// ドロワーメニューの開閉を制御する関数
function toggleDrawer() {
  // ドロワーが開いているかどうかの状態をチェック
  const isOpening = !globalNav.classList.contains('open');

  // クラスを切り替える
  menuButton.classList.toggle('open');
  globalNav.classList.toggle('open');
  openWrap.classList.toggle('open');

  // lenisのスクロールを制御
  if (isOpening) {
    // ドロワーが開いたときは、lenisのスクロールを停止
    lenis.stop();
  } else {
    // ドロワーが閉じたときは、lenisのスクロールを再開
    lenis.start();
  }
}

// スクロールイベントを監視
import { throttle } from 'lodash';
window.addEventListener('scroll', throttle(() => {
  // ドロワーが開いている場合は、ヘッダーの表示・非表示を切り替えない
  if (globalNav.classList.contains('open')) {
    return;
  }
  
  // #statement要素の位置を取得
  const statementRect = statement.getBoundingClientRect();
  
  // #statementが画面内に入ったら
  if (statementRect.top <= 0) {
    header.classList.add('is-show');
  } else {
    header.classList.remove('is-show');
  }
}, 100));

// ボタンの挙動
menuButton.addEventListener('click', () => {
  toggleDrawer();
});

// openWrapをクリックした時の挙動
openWrap.addEventListener('click', () => {
  toggleDrawer();
});

// ナビゲーション内のリンクをクリックした時の挙動を追加
navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    // デフォルトのアンカーリンクの挙動を無効にする
    event.preventDefault();

    // ドロワーを閉じる
    toggleDrawer();

    // リンクのhref属性からターゲットの要素を取得
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    // lenisを使って、ターゲットまでスムーズスクロール
    if (targetElement) {
      lenis.scrollTo(targetElement);
    }
  });
});