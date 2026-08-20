/* ========================================
   My-Blog 自定义 JS
   点击爱心特效 + 其他小交互
   ======================================== */
(function () {
  'use strict';

  // 点击爱心/粒子特效（兼容触摸与鼠标）
  var hearts = [];
  var lastClick = 0;

  function createHeart(x, y) {
    var heart = document.createElement('span');
    heart.textContent = ['❤', '✦', '🌸', '⭐', '💖'][Math.floor(Math.random() * 5)];
    heart.style.cssText =
      'position:fixed;pointer-events:none;z-index:99999;font-size:18px;' +
      'left:' + x + 'px;top:' + y + 'px;' +
      'transform:translate(-50%,-50%);transition:all .9s ease-out;' +
      'color:#ff7eb3;opacity:1;';
    document.body.appendChild(heart);
    hearts.push(heart);
    requestAnimationFrame(function () {
      heart.style.transform = 'translate(-50%,-160%) scale(0.4) rotate(20deg)';
      heart.style.opacity = '0';
    });
    setTimeout(function () {
      if (heart.parentNode) heart.parentNode.removeChild(heart);
    }, 1000);
  }

  document.addEventListener('click', function (e) {
    var now = Date.now();
    if (now - lastClick < 60) return; // 节流，避免过于频繁
    lastClick = now;
    createHeart(e.clientX, e.clientY);
  }, false);

  // 看板娘提示语（若存在 waifu-tips 则复用其实现）
  window.MY_BLOG_READY = true;
})();