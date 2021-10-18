// ==UserScript==
// @name         CNMOOC优化
// @namespace    https://tampermonkey.net/
// @version      1.0
// @description  CNMOOC自动完成
// @author       MXWXZ
// @match        *://www.cnmooc.org/study/initplay/*
// @homepageURL  https://github.com/MXWXZ/Tampermonkey-Script/tree/master/CNMOOC/
// @supportURL   https://github.com/MXWXZ/Tampermonkey-Script/issues/
// @downloadURL  https://raw.githubusercontent.com/MXWXZ/Tampermonkey-Script/master/CNMOOC/CNMOOC.user.js
// @updateURL    https://raw.githubusercontent.com/MXWXZ/Tampermonkey-Script/master/CNMOOC/CNMOOC.user.js
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  var itemId = $("#itemId").val();
  var meta = { definitions: "", duration: 836000 };
  var duration = meta.duration;
  $.ajax({
    type: "POST",
    url: "https://www.cnmooc.org/study/updateDurationVideo.mooc",
    data: {
      itemId: itemId,
      isOver: 1,
      currentPosition: 3600000,
      duration: duration,
    },
    success: function (response) {
      //lastTime = response.lastTime;
    },
    error: function () {},
  });
})();
