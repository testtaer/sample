let firstClickTime = 0;
let resetTimer;

// 透明のレイヤー要素を作成
const overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.backgroundColor = "rgba(255, 0, 0, 0.5)"; // 赤色に設定
overlay.style.zIndex = "999"; // 他の要素よりも上に表示
overlay.style.display = "block"; // 最初は表示

document.body.appendChild(overlay);

// レイヤーを非表示にする関数
function hideOverlay() {
  overlay.style.display = "none"; // レイヤーを非表示
}

// レイヤーを表示する関数
function showOverlay() {
  overlay.style.display = "block"; // レイヤーを表示
}

// 青い枠を表示する関数
function showBlueFrame(x, y) {
  // 枠の要素を作成
  const frame = document.createElement("div");
  frame.style.width = "100px";
  frame.style.height = "100px";
  frame.style.backgroundColor = "blue";
  frame.style.border = "2px solid black";
  frame.style.position = "fixed";
  frame.style.top = `${y - 50}px`;
  frame.style.left = `${x - 50}px`;
  frame.style.display = "flex";
  frame.style.justifyContent = "center";
  frame.style.alignItems = "center";
  
  // テキスト要素を作成
  const text = document.createElement("div");
  text.textContent = "こんにちは";
  
  // 枠の中にテキストを追加
  frame.appendChild(text);
  
  // 枠をページに追加
  document.body.appendChild(frame);
}

// クリック時の処理
function handleFirstClick() {
  if (firstClickTime === 0) {
    firstClickTime = new Date().getTime(); // 最初のクリック時刻を取得
    
    // リセット用タイマーを設定
    resetTimer = setTimeout(function() {
      firstClickTime = 0;
      if (overlay.style.display === "none") {
        showOverlay();
      }
    }, 300); // 300ミリ秒後にリセット
  } else {
    clearTimeout(resetTimer); // タイマーをクリア
    let currentTime = new Date().getTime();
    let timeDiff = currentTime - firstClickTime;

    if (timeDiff < 300) { // クリック間の時間が300ミリ秒未満の場合はダブルクリックとみなす
      // ダブルクリック時の処理
      showBlueFrame(event.clientX, event.clientY);
    }

    firstClickTime = 0; // 最初のクリック時刻をリセット
  }
}

// ページ全体にクリックイベントを追加してレイヤーを非表示にする
document.addEventListener("click", function(event) {
  handleFirstClick();
});
