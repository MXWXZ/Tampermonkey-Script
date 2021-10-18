// ==UserScript==
// @name         segmentfault简书优化
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  segmentfault简书去除复制限制
// @author       Peace&Love
// @include      *://segmentfault.com/*
// @include      *://www.jianshu.com/*
// @homepageURL  https://github.com/MXWXZ/Tampermonkey-Script/tree/master/segjianshu/
// @supportURL   https://github.com/MXWXZ/Tampermonkey-Script/issues/
// @downloadURL  https://raw.githubusercontent.com/MXWXZ/Tampermonkey-Script/master/segjianshu/segjianshu.user.js
// @updateURL    https://raw.githubusercontent.com/MXWXZ/Tampermonkey-Script/master/segjianshu/segjianshu.user.js
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  if (window.location.href.indexOf("segmentfault") != -1) {
    sf();
  }

  function sf() {
    var fakeLogin = document.createElement("span");
    fakeLogin.id = "SFUserId";
    document.body.appendChild(fakeLogin);

    document.querySelectorAll("article.article").forEach(function (t) {
      t.addEventListener(
        "copy",
        function (e) {
          e.stopPropagation();
        },
        true
      );
    });
  }

  document.addEventListener(
    "copy",
    function (e) {
      e.stopPropagation();
    },
    true
  );
})();
