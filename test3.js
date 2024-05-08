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

// ページにレイヤー要素を追加
document.body.appendChild(overlay);

// レイヤーを非表示にする関数
function hideOverlay() {
  overlay.style.display = "none"; // レイヤーを非表示
}

// レイヤーを表示する関数
function showOverlay() {
  overlay.style.display = "block"; // レイヤーを表示
}

// ページ全体にクリックイベントを追加してレイヤーを非表示にする
document.addEventListener("click", function(event) {
  hideOverlay();
});

function handleFirstClick() {
  if (firstClickTime === 0) {
    firstClickTime = new Date().getTime(); // 最初のクリック時刻を取得
    console.log("最初のクリック時刻:", new Date(firstClickTime));
    
    // リセット用タイマーを設定
    resetTimer = setTimeout(function() {
      firstClickTime = 0;
      console.log("リセットされました");
      if (overlay.style.display === "none") {
        showOverlay();
      }
    }, 300); // 300ミリ秒後にリセット
  } else {
    clearTimeout(resetTimer); // タイマーをクリア
    let currentTime = new Date().getTime();
    let timeDiff = currentTime - firstClickTime;

    if (timeDiff < 300) { // クリック間の時間が300ミリ秒未満の場合はダブルクリックとみなす
      alert("ダブルクリック成功");
    }

    firstClickTime = 0; // 最初のクリック時刻をリセット
  }
}

document.addEventListener("click", function(event) {
  handleFirstClick();
});
