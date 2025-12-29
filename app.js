const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

setTimeout(() => {
  document.getElementById("splash").style.display = "none";
  document.getElementById("app").classList.remove("hidden");
}, 1500);

if (tg.initDataUnsafe?.user) {
  document.getElementById("user").innerText =
    "أهلا " + tg.initDataUnsafe.user.first_name;
}

function showTab(tab) {
  const content = document.getElementById("content");

  if (tab === "home") {
    content.innerHTML = "<h2>🏠 الصفحة الرئيسية</h2>";
  }

  if (tab === "play") {
    content.innerHTML =
      '<iframe src="game.html" style="width:100%;height:500px;border:none"></iframe>';
  }

  if (tab === "invite") {
    content.innerHTML = "<h2>👥 دعوة الأصدقاء</h2><p>قريبًا</p>";
  }

  if (tab === "profile") {
    content.innerHTML = "<h2>👤 الملف الشخصي</h2>";
  }
}
