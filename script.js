// Màn hình khóa
const lockscreen = document.getElementById('lockscreen');
const screen = document.getElementById('screen');
const appView = document.getElementById('app-view');
const appsDiv = document.getElementById('apps');
const navBar = document.getElementById('nav-bar');
const appWindows = [];

// Cập nhật giờ
function updateTime() {
  const now = new Date();
  const timeText = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
  document.getElementById('lockTime').innerText = timeText;
  document.getElementById('status-time').innerText = timeText;
}
setInterval(updateTime, 1000);
updateTime();

lockscreen.addEventListener('click', () => {
  lockscreen.style.display = 'none';
  screen.style.display = 'flex';
});

// Mở Play Store
function openPlayStore() {
  document.getElementById('store').style.display = 'block';
}

// Đóng Play Store
function closePlayStore() {
  document.getElementById('store').style.display = 'none';
}

// Cài đặt ứng dụng
function installApp(name, url, icon) {
  // Thêm ứng dụng vào
