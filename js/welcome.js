document.addEventListener('DOMContentLoaded', function() {
  const welcomeScreen = document.getElementById('welcome-screen');
  if (!welcomeScreen) return;
  
  // 检查是否已经访问过
  if (sessionStorage.getItem('welcomed')) {
    welcomeScreen.style.display = 'none';
    return;
  }
  
  // 设备检测
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const apiUrl = isMobile ? 'https://t.alcy.cc/mp' : 'https://t.alcy.cc/pc';
  
  // 创建图片预加载
  const img = new Image();
  img.src = apiUrl + '?t=' + new Date().getTime(); // 防止缓存
  
  img.onload = function() {
    welcomeScreen.style.backgroundImage = 'url(' + this.src + ')';
    
    // 显示欢迎界面
    setTimeout(function() {
      welcomeScreen.style.opacity = '1';
      const loading = document.querySelector('.welcome-loading');
      if (loading) loading.style.display = 'none';
    }, 500);
  };
  
  img.onerror = function() {
    // 加载失败时使用渐变背景
    welcomeScreen.style.background = 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)';
    
    // 显示欢迎界面
    setTimeout(function() {
      welcomeScreen.style.opacity = '1';
      const loading = document.querySelector('.welcome-loading');
      if (loading) loading.style.display = 'none';
    }, 500);
  };
  
  // 按钮点击事件
  const enterBtn = document.querySelector('.welcome-enter-btn');
  if (enterBtn) {
    enterBtn.addEventListener('click', function() {
      sessionStorage.setItem('welcomed', 'true');
      welcomeScreen.style.opacity = '0';
      setTimeout(function() {
        welcomeScreen.style.display = 'none';
        // 恢复滚动
        document.documentElement.style.overflow = 'auto';
        document.body.style.overflow = 'auto';
      }, 800);
    });
  }
  
  // 添加键盘快捷键支持
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      if (enterBtn) enterBtn.click();
    }
  });
  
  // 初始设置
  welcomeScreen.style.display = 'block';
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
});