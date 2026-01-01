// 1. 引入 Firebase 功能
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// 2. 你的 Firebase 設定 (請把你的設定貼在下面覆蓋掉這裡)
// 去 Firebase 控制台 -> 專案設定 -> 一般 -> 下方的 SDK 設定複製
const firebaseConfig = {
    apiKey: "AIzaSyBJELIYoh_nLF8evCrgFGKNa-sjMMZQRL0",

  authDomain: "lai-family-calender.firebaseapp.com",

  databaseURL: "https://lai-family-calender-default-rtdb.firebaseio.com",

  projectId: "lai-family-calender",

  storageBucket: "lai-family-calender.firebasestorage.app",

  messagingSenderId: "1039195042184",

  appId: "1:1039195042184:web:def8de663845bd518f8a3d"

};

// 3. 初始化 Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 4. 寫入資料的功能
window.addData = function() {
    const inputField = document.getElementById("todo-input");
    const val = inputField.value;
    
    if(val) {
        push(ref(db, 'calendar_items'), {
            text: val,
            timestamp: Date.now()
        });
        inputField.value = ""; // 清空輸入框
    } else {
        alert("請輸入內容！");
    }
}

// 5. 讀取資料的功能 (自動更新)
const dataList = document.getElementById("calendar-data");
const dbRef = ref(db, 'calendar_items');

onValue(dbRef, (snapshot) => {
    dataList.innerHTML = ""; // 先清空畫面
    const data = snapshot.val();
    
    if (data) {
        // 把資料一筆一筆轉成 HTML
        Object.values(data).forEach(item => {
            const div = document.createElement("div");
            div.className = "data-item";
            div.textContent = item.text; // 顯示文字
            dataList.appendChild(div);
        });
    } else {
        dataList.innerHTML = "<p>目前沒有資料</p>";
    }
});