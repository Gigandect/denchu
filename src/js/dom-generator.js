import { gamesData, actData, subActData } from './data.js';

// 要素を取得
const game_list_s = document.querySelector('#game_list_s');
const game_list = document.querySelector('#game_list');

const act_list_s = document.querySelector('#act_list_s');
const act_list = document.querySelector('#act_list');
const sub_act_list = document.querySelector('#sub_act_list');


// --- テンプレート関数を定義 ---
// game_list_s用のテンプレート
const game_list_s_template = (game) => `
    <li>
        <div class="img">
            <img src="${game.image}" alt="${game.title}のスクリーンショット" width="600" height="400">
        </div>
        <div class="txt">
            <h4 class="list-name">${game.title}</h4>
        </div>
    </li>
`;

// game_list用のテンプレート
const game_list_template = (game) => `
    <li>
        <div class="img">
            <img src="${game.image}" alt="${game.title}のスクリーンショット" width="600" height="400">
        </div>
        <div class="txt">
            <h3 class="list-name">${game.title}</h3>
            <p class="desc">${game.desc}</p>
            <a href="${game.link}" class="link btn"><span class="material-symbols-outlined">double_arrow</span></a>
        </div>
    </li>
`;

// act_list_s用のテンプレート
const act_list_s_template = (act) => `
    <li>
        <div class="img">
            <img src="${act.image}" alt="${act.name}の写真" width="600" height="400">
        </div>
        <div class="txt">
            <h4 class="list-name">${act.name}</h4>
        </div>
    </li>
`;

// sub_act_list用のテンプレート
const sub_act_list_template = (sub) => `
    <li>
        <div class="img">
            <img src="${sub.image}" alt="${sub.name}の写真" width="600" height="400">
        </div>
        <div class="txt">
            <h4 class="list-name">${sub.name}</h4>
        </div>
    </li>
`;


// act_list用のテンプレート
const act_list_template = (act) => `
    <li>
        <div class="img">
            <p class="${act.performance.toLowerCase()}">${act.performance}</p>
            <img src="${act.image}" alt="${act.name}の写真" width="600" height="400">
        </div>
        <div class="txt">
            <p class="floor">${act.floor}F</p>
            <h3 class="list-name">${act.name}</h3>
            <p class="desc">${act.desc}</p>
            <a href="${act.link}" class="link btn"><span class="material-symbols-outlined">double_arrow</span></a>
        </div>
    </li>
`;



// --- リストを生成して挿入する ---
function renderList(targetElement, templateFunction, data) {
  if (targetElement) {
    let html = '';
    data.forEach(item => {
        html += templateFunction(item);
    });
    targetElement.innerHTML = html;
  }
}

// ページが読み込まれたら、関数を呼び出す
document.addEventListener('DOMContentLoaded', () => {
    // ゲームリストの生成
    renderList(game_list_s, game_list_s_template, gamesData);
    renderList(game_list, game_list_template, gamesData);

    // ActDataとSubActDataを結合
    const combinedActData = [...actData, ...subActData];

    // 出演者リストの生成
    renderList(act_list_s, act_list_s_template, actData);
    renderList(act_list, act_list_template, combinedActData);
    renderList(sub_act_list, sub_act_list_template, subActData);
});
