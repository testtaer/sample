let firstClickTime = 0;
let resetTimer;
let blueFrame; // 青い枠の要素をグローバル変数として定義
let squareMark; // 四角いマークの要素をグローバル変数として定義

// レイヤーを非表示にする関数
function hideOverlay() {
  overlay.style.display = "none"; // レイヤーを非表示
}

// レイヤーを表示する関数
function showOverlay() {
  overlay.style.display = "block"; // レイヤーを表示
}

// 四角いマークを表示する関数
function showSquareMark(x, y) {
  squareMark = document.createElement("div");
  squareMark.style.position = "fixed";
  squareMark.style.width = "20px";
  squareMark.style.height = "20px";
  squareMark.style.border = "2px solid black";
  squareMark.style.backgroundColor = "transparent";
  squareMark.style.top = `${y - 10}px`; // ダブルクリックした位置の上端に四角いマークを配置する
  squareMark.style.left = `${x - 10}px`; // ダブルクリックした位置の左端に四角いマークを配置する
  squareMark.style.zIndex = "1000"; // 青い枠よりも上に表示

  // 四角形がクリックされたときの処理
  squareMark.addEventListener("click", showSavedBlueFrameContent);

  document.body.appendChild(squareMark);
}

// 青い枠を表示する関数
function showBlueFrame() {
  // 枠の要素を作成
  blueFrame = document.createElement("div");
  blueFrame.style.width = "100%";
  blueFrame.style.height = "100%";
  blueFrame.style.backgroundColor = "blue";
  blueFrame.style.border = "2px solid black";
  blueFrame.style.position = "fixed";
  blueFrame.style.top = "0";
  blueFrame.style.left = "0";
  blueFrame.style.display = "flex";
  blueFrame.style.flexDirection = "row"; // 横に並べる
  blueFrame.style.justifyContent = "center";
  blueFrame.style.alignItems = "center";
  blueFrame.style.zIndex = "1001"; // 四角いマークよりも上に表示

  // チェックボックスのラベルとリスト
  const damageLabels = [
    "腐食", "亀裂", "ゆるみ・脱落", "破断", "防食機能の劣化", "ひびわれ",
    "うき・剝離・鉄筋露出", "漏水・遊離石灰", "床版ひびわれ", "遊間の異常",
    "路面の凹凸", "舗装の異常", "支承部の機能障害", "補修・補強材の損傷",
    "定着部の異常", "変色・劣化", "漏水・滞水", "変形・欠損", "土砂詰まり",
    "沈下・移動・傾斜", "洗掘"
  ];

  const componentLabels = [
    "主桁", "主構トラス", "縦桁", "対傾構", "横桁", "横構", "横支材", "アーチリブ・補剛材",
    "垂直材", "床版", "下部工", "支承部", "伸縮装置", "舗装", "地覆", "高欄・防護柵",
    "排水装置", "添架物", "落橋防止装置", "投物防止柵", "護岸", "縁石", "照明施設",
    "袖擁壁", "防鳥柵", "点検施設", "防音柵", "その他"
  ];

  const createCheckboxGroup = (titleText, labels) => {
    const container = document.createElement("div");
    container.style.color = "white"; // チェックボックスラベルの色を白色に設定
    container.style.padding = "20px";
    container.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    container.style.borderRadius = "10px";
    container.style.margin = "10px";

    const title = document.createElement("h2");
    title.textContent = titleText;
    title.style.textAlign = "center";
    title.style.marginBottom = "10px";

    container.appendChild(title);

    labels.forEach((label, index) => {
      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.setAttribute("id", `${titleText}_checkbox${index}`);
      checkbox.setAttribute("value", label);
      checkbox.addEventListener("change", saveCheckboxValues);

      const checkboxLabel = document.createElement("label");
      checkboxLabel.setAttribute("for", `${titleText}_checkbox${index}`);
      checkboxLabel.textContent = label;
      checkboxLabel.style.marginRight = "10px";

      container.appendChild(checkbox);
      container.appendChild(checkboxLabel);
      container.appendChild(document.createElement("br"));
    });

    // ローカルストレージから選択された値を読み込む
    const savedCheckboxValues = JSON.parse(localStorage.getItem(`selected${titleText}CheckboxValues`)) || [];
    savedCheckboxValues.forEach(value => {
      const checkbox = container.querySelector(`input[value="${value}"]`);
      if (checkbox) {
        checkbox.checked = true;
      }
    });

    return container;
  };

  const createDropdown = (titleText, labels) => {
    const container = document.createElement("div");
    container.style.color = "white"; // ラベルの色を白色に設定
    container.style.padding = "20px";
    container.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    container.style.borderRadius = "10px";
    container.style.margin = "10px";

    const title = document.createElement("h2");
    title.textContent = titleText;
    title.style.textAlign = "center";
    title.style.marginBottom = "10px";

    const select = document.createElement("select");
    select.multiple = true;
    select.style.width = "200px";
    select.style.height = "150px";

    labels.forEach(label => {
      const option = document.createElement("option");
      option.value = label;
      option.textContent = label;
      select.appendChild(option);
    });

    select.addEventListener("change", saveDropdownValues);

    // ローカルストレージから選択された値を読み込む
    const savedDropdownValues = JSON.parse(localStorage.getItem(`selected${titleText}DropdownValues`)) || [];
    savedDropdownValues.forEach(value => {
      const option = select.querySelector(`option[value="${value}"]`);
      if (option) {
        option.selected = true;
      }
    });

    container.appendChild(title);
    container.appendChild(select);

    return container;
  };

  const damageContainer = createCheckboxGroup("損傷名", damageLabels);
  const componentContainer = createDropdown("部材", componentLabels);

  // 枠の中に要素を追加
  blueFrame.appendChild(componentContainer);
  blueFrame.appendChild(damageContainer);

  // 閉じるボタンの要素を作成
  const closeButton = document.createElement("button");
  closeButton.textContent = "×";
  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "10px";
  closeButton.style.backgroundColor = "transparent";
  closeButton.style.color = "white";
  closeButton.style.border = "none";
  closeButton.style.fontSize = "16px";
  closeButton.style.cursor = "pointer";
  closeButton.addEventListener("click", hideBlueFrame); // 閉じるボタンがクリックされたら青い枠を非表示にする

  // 枠に閉じるボタンを追加
  blueFrame.appendChild(closeButton);

  // 枠をページに追加
  document.body.appendChild(blueFrame);
}

// チェックボックスの選択状態を保存する関数
function saveCheckboxValues(event) {
  const container = event.target.closest("div");
  const titleText = container.querySelector("h2").textContent;
  const checkboxes = container.querySelectorAll(`input[type="checkbox"]`);
  const selectedValues = [];
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      selectedValues.push(checkbox.value);
    }
  });
  localStorage.setItem(`selected${titleText}CheckboxValues`, JSON.stringify(selectedValues));
}

// ドロップダウンリストの選択状態を保存する関数
function saveDropdownValues(event) {
  const select = event.target;
  const titleText = select.previousElementSibling.textContent;
  const selectedValues = Array.from(select.selectedOptions).map(option => option.value);
  localStorage.setItem(`selected${titleText}DropdownValues`, JSON.stringify(selectedValues));
}

// 青い枠を非表示にする関数
function hideBlueFrame() {
  if (blueFrame) {
    blueFrame.remove(); // 青い枠を削除
    blueFrame = null; // グローバル変数もnullに設定しておく
  }
}

// 四角をクリックしたときに保存された青い枠の内容を表示する関数
function showSavedBlueFrameContent(event) {
  const x = event.clientX;
  const y = event.clientY;
  
  const savedDamageValues = JSON.parse(localStorage.getItem("selected損傷名CheckboxValues")) || [];
  const savedComponentValues = JSON.parse(localStorage.getItem("selected部材DropdownValues")) || [];

  alert(`損傷名: ${savedDamageValues.join(", ")}\n部材: ${savedComponentValues.join(", ")}`);
}

// クリック時の処理
function handleFirstClick(event) {
  // 青いレイヤが表示されている場合はダブルクリックに反応しない
  if (blueFrame) {
    return;
  }

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
      showBlueFrame();
      showSquareMark(event.clientX, event.clientY); // ダブルクリックした位置に四角いマークを表示
    }

    firstClickTime = 0; // 最初のクリック時刻をリセット
  }
}

// 透明のレイヤー要素を作成
const overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.backgroundColor = "rgba(255, 0, 0, 0.5)"; // 赤色に設定
overlay.style.zIndex = "998"; // 他の要素よりも下に表示
overlay.style.display = "block"; // 最初は表示

document.body.appendChild(overlay);

// ページ全体にクリックイベントを追加してレイヤーを非表示にする
document.addEventListener("click", function(event) {
  handleFirstClick(event);
});
