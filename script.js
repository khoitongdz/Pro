// Màn hình khóa
const lockscreen = document.getElementById('lockscreen');
const screen = document.getElementById('screen');

lockscreen.addEventListener('click', () => {
  lockscreen.style.display = 'none';
  screen.style.display = 'flex';
});

// Cập nhật thời gian
function updateTime() {
  const now = new Date();
  document.getElementById('lockTime').innerText = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
  document.getElementById('status-time').innerText = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
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
    window.open(url, '_blank');
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
