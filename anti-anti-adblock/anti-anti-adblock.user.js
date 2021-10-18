// ==UserScript==
// @name         反反广告拦截
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  反反广告拦截
// @author       MXWXZ
// @match        *://www.ruanyifeng.com/blog/*
// @homepageURL  https://github.com/MXWXZ/Tampermonkey-Script/tree/master/anti-anti-adblock/
// @supportURL   https://github.com/MXWXZ/Tampermonkey-Script/issues/
// @downloadURL  https://raw.githubusercontent.com/MXWXZ/Tampermonkey-Script/master/anti-anti-adblock/anti-anti-adblock.user.js
// @updateURL    https://raw.githubusercontent.com/MXWXZ/Tampermonkey-Script/master/anti-anti-adblock/anti-anti-adblock.user.js
// @grant        unsafeWindow
// ==/UserScript==

(function () {
  "use strict";

  if (location.hostname === "www.ruanyifeng.com") {
    // 阮一峰博客
    for (var i = 0; i < 100; i++) clearTimeout(i);
  }
})();
