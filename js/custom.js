/* ========================================
   My-Blog 自定义 JS
   - 点击爱心特效
   - 看板娘网站信息话术（从 sidebar card-webinfo / card-info.site-data
     读取统计，调 oml2d.tipsMessage 主动展示在看板娘气泡里）
   注：
   - hexo-oh-my-live2d 把 oml2d 实例放在 window.oml2d；
     inject.bottom 里此脚本在其后加载，所以启动时通常已就绪
   - 若看板娘未加载（disabled）则全部静默降级
   ======================================== */
(function () {
  'use strict';

  // ----------------------------------
  // 1) 点击爱心 / 粒子特效
  // ----------------------------------
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
    if (now - lastClick < 60) return;
    lastClick = now;
    createHeart(e.clientX, e.clientY);
  }, false);

  // ----------------------------------
  // 2) 看板娘话术（闲时话 + 网站信息 统一轮播）
  //    频率与 _config.yml 的 idleTips.interval 一致（15000ms）
  //    轮播顺序：闲时话 → 闲时话 → … → 网站信息 → 循环
  //    注：_config.yml 里 idleTips.message 已留空，避免两套定时器重复播放
  // ----------------------------------

  // 闲时话（原 _config.yml idleTips.message，为统一轮播迁入此处）
  var IDLE_MESSAGES = [
    '你好呀~ 欢迎来到我的小站',
    '认真看代码的人最可爱了 ✨'
  ];

  function readBlogStats() {
    var stats = {};
    // 优先：sidebar 底部的「网站信息」卡片（含文章数 + 字数 + 运行天数 + 最后推送等）
    var webinfoItems = document.querySelectorAll('.card-webinfo .webinfo-item');
    if (webinfoItems.length) {
      webinfoItems.forEach(function (item) {
        var name = item.querySelector('.item-name');
        var count = item.querySelector('.item-count');
        if (!name || !count) return;
        var key = (name.textContent || '').replace(/[:：\s]/g, '');
        var val = (count.textContent || '').trim() || (count.getAttribute('data-lastPushDate') || '').trim();
        if (key) stats[key] = val;
      });
    }
    // 回退：sidebar 顶部 card-info.site-data（仅 文章 / 标签 / 分类）
    if (Object.keys(stats).length === 0) {
      var nums = document.querySelectorAll('#aside-content .card-info .site-data .length-num');
      if (nums.length >= 3) {
        stats['文章数目'] = (nums[0].textContent || '').trim();
        stats['标签数目'] = (nums[1].textContent || '').trim();
        stats['分类数目'] = (nums[2].textContent || '').trim();
      }
    }
    return stats;
  }

  function formatStatsTip(stats) {
    var post = stats['文章数目'] || stats['文章'] || '若干';
    var tag = stats['标签数目'] || stats['标签'] || '若干';
    var cate = stats['分类数目'] || stats['分类'] || '若干';
    var run = stats['运行时间'] || stats['运行天数'];
    var word = stats['本站字数'] || stats['总字数'];

    var lines = [];
    lines.push('本站目前有 ' + post + ' 篇文章、' + tag + ' 个标签、' + cate + ' 个分类啦 ✨');
    lines.push('翻翻看？我这里攒了 ' + post + ' 篇文章～ 来都来了，再多待一会儿吧');
    if (run) {
      lines.push('陪伴主人第 ' + run + ' 天啦，每天都要元气满满哦～');
    }
    if (word && /\d/.test(word)) {
      lines.push('目前累计写了 ' + word + ' 个字，主人的码字能力 MAX！');
    }
    return lines[Math.floor(Math.random() * lines.length)];
  }

  // 单条展示：闲时话（优先级 2，与库默认一致）/ 网站信息（优先级 3）
  function showIdleTip(text) {
    var oml2d = window.oml2d;
    if (!oml2d || typeof oml2d.tipsMessage !== 'function') return;
    try { oml2d.tipsMessage(text, 5000, 2); } catch (e) {}
  }

  function showWebsiteTip() {
    var oml2d = window.oml2d;
    if (!oml2d || typeof oml2d.tipsMessage !== 'function') return false;
    var stats = readBlogStats();
    if (!Object.keys(stats).length) return false;
    try {
      oml2d.tipsMessage(formatStatsTip(stats), 6000, 3);
      return true;
    } catch (e) {
      return false;
    }
  }

  // 统一轮播：闲时话在前，网站信息作为最后一个槽位，循环往复
  var ROTATION = IDLE_MESSAGES.concat(['__WEBSITE__']);
  var rotIdx = 0;
  var IDLE_INTERVAL = 15000; // 与 _config.yml idleTips.interval 保持一致

  function tickRotation() {
    var item = ROTATION[rotIdx % ROTATION.length];
    rotIdx++;
    if (item === '__WEBSITE__') {
      showWebsiteTip();
    } else {
      showIdleTip(item);
    }
  }

  function hookOml2d() {
    var oml2d = window.oml2d;
    if (!oml2d) return false;

    // 模型加载完成（含切换模型）时也来一条，保持话术活跃
    if (typeof oml2d.on === 'function') {
      try { oml2d.on('load', function () { setTimeout(tickRotation, 2000); }); } catch (e) {}
    }

    // 单一轮播定时器：与 idleTips.interval 同频，闲时话与网站信息轮流
    setInterval(tickRotation, IDLE_INTERVAL);

    // 入场约 8s 后启动第一条，避免干等满一个周期
    setTimeout(tickRotation, 8000);
    return true;
  }

  // oml2d 可能在 CDN 异步加载完成后才出现，轮询兜底
  var tried = 0;
  var oml2dWait = setInterval(function () {
    tried++;
    if (hookOml2d()) {
      clearInterval(oml2dWait);
    } else if (tried > 60) { // 60 * 500ms = 30s
      clearInterval(oml2dWait);
    }
  }, 500);

  // ----------------------------------
  // 3) 把设置区功能按钮迁到顶部工具栏
  //    原因：看板娘画布停靠右侧(dockedPosition:right)，覆盖了右下角 #rightside，
  //          导致齿轮(#rightside-config)及其展开的功能按钮点不到
  //    做法：在顶部 #menus 内克隆一组镜像按钮，点击时调用原按钮 .click()
  //          （#rightside 上的事件委托监听器仍会处理，因为原按钮仍在 #rightside 内）
  //    迁移的按钮 id 对应 main.js 中 rightSideFn 的键：
  //      darkmode / translateLink / readmode / hide-aside-btn / go-up
  // ----------------------------------
  function relocateSettingsToTop() {
    var menus = document.getElementById('menus');
    var rightside = document.getElementById('rightside');
    if (!menus || !rightside) return;

    // 要迁移的按钮 id（对应 rightSideFn 的键）；已迁移过则跳过
    var ids = ['darkmode', 'translateLink', 'readmode', 'hide-aside-btn', 'go-up'];
    var originals = ids
      .map(function (id) { return document.getElementById(id); })
      .filter(function (el) { return el && !document.getElementById('top-' + el.id); });

    if (!originals.length) return;

    // 顶部容器：插到 #search-button 之前（靠右的功能区）
    var topWrap = document.getElementById('top-func-btns');
    if (!topWrap) {
      topWrap = document.createElement('div');
      topWrap.id = 'top-func-btns';
      topWrap.className = 'top-func-btns';
      var searchBtn = document.getElementById('search-button');
      if (searchBtn && searchBtn.parentNode === menus) {
        menus.insertBefore(topWrap, searchBtn);
      } else {
        menus.appendChild(topWrap);
      }
    }

    originals.forEach(function (orig) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.id = 'top-' + orig.id;
      btn.className = 'top-func-btn';
      btn.title = orig.getAttribute('title') || '';
      btn.innerHTML = orig.innerHTML; // 复制内部图标
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        orig.click(); // 触发原按钮 → 冒泡回 #rightside 委托监听器
      });
      topWrap.appendChild(btn);
    });

    // 隐藏原右下角的齿轮及其展开的隐藏按钮区（避免遮挡 / 重复）
    var gear = document.getElementById('rightside-config');
    if (gear) gear.style.display = 'none';
    var hideCluster = document.getElementById('rightside-config-hide');
    if (hideCluster) hideCluster.style.display = 'none';
    // 原 #go-up 也一并隐藏（已迁移到顶部常驻）
    var goUp = document.getElementById('go-up');
    if (goUp) goUp.style.display = 'none';
  }

  // inject.bottom 脚本位于 body 末尾，DOM 通常已就绪；若未就绪则短暂重试
  function tryRelocate() {
    if (document.getElementById('menus') && document.getElementById('rightside')) {
      relocateSettingsToTop();
    } else {
      setTimeout(tryRelocate, 200);
    }
  }
  tryRelocate();

  window.MY_BLOG_READY = true;
})();
