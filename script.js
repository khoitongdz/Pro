// Màn hình khóa
const lockscreen = document.getElementById('lockscreen');
const screen = document.getElementById('screen');
const appView = document.getElementById('app-view');
const appFrame = document.getElementById('app-frame');

lockscreen.addEventListener('click', () => {
  lockscreen.style.display = 'none';
  screen.style.display = 'flex';
});

// Cập nhật giờ
function updateTime() {
  const now = new Date();
  const timeText = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
  document.getElementById('lockTime').innerText = timeText;
  document.getElementById('status-time').innerText = timeText;
}
setInterval(updateTime, 1000);
updateTime();

// Play Store
function openPlayStore() {
  document.getElementById('store').style.display = 'block';
}

function closePlayStore() {
  document.getElementById('store').style.display = 'none';
}

// Cài ứng dụng
function installApp(name, url, icon) {
  const appsDiv = document.getElementById('apps');

  const appDiv = document.createElement('div');
  appDiv.className = 'app';
  appDiv.onclick = function() {
    openApp(url);
  };

  const img = document.createElement('img');
  img.src = icon;

  const span = document.createElement('span');
  span.innerText = name;

  appDiv.appendChild(img);
  appDiv.appendChild(span);

  appsDiv.appendChild(appDiv);

  alert(`Đã cài đặt ${name} thành công!`);
}

// Mở ứng dụng
function openApp(url) {
  appView.style.display = 'flex';
  appFrame.src = url;
}

// Thanh điều hướng
function goHome() {
  appView.style.display = 'none';
  appFrame.src = '';
}

function goBack() {
  appFrame.contentWindow.history.back();
}
