// ==UserScript==
// @name         CSDN优化
// @namespace    https://tampermonkey.net/
// @version      1.6
// @description  CSDN自动展开+页面优化
// @author       MXWXZ
// @match        *://blog.csdn.net/*
// @homepageURL  https://github.com/MXWXZ/Tampermonkey-Script/tree/master/CSDN/
// @supportURL   https://github.com/MXWXZ/Tampermonkey-Script/issues/
// @downloadURL  https://raw.githubusercontent.com/MXWXZ/Tampermonkey-Script/master/CSDN/CSDN.user.js
// @updateURL    https://raw.githubusercontent.com/MXWXZ/Tampermonkey-Script/master/CSDN/CSDN.user.js
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  $("code").each((idx) => ($("code")[idx].style.userSelect = "text")); // 允许复制
  $("#content_views").unbind("copy"); // 允许复制
  $('#article_content').css('height',''); // 自动展开
  if (typeof csdn != "undefined") {
    // 剪切板净化
    csdn.copyright.init("", "", "");
  }
})();
