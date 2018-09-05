// ==UserScript==
// @name         CSDN优化
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  CSDN自动展开+页面优化
// @author       MXWXZ
// @match        *://blog.csdn.net/*
// @homepageURL  https://github.com/MXWXZ/Tampermonkey-Script/tree/master/CSDN
// @supportURL   https://github.com/MXWXZ/Tampermonkey-Script/issues/
// @downloadURL  https://github.com/MXWXZ/Tampermonkey-Script/raw/master/CSDN/CSDN.user.js
// @updateURL    https://github.com/MXWXZ/Tampermonkey-Script/raw/master/CSDN/CSDN.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $("#btn-readmore").click();    // 自动展开

    $("#csdn-toolbar").remove();   // 头部导航
    $(".tool-box").remove();       // 悬浮工具栏
    $("#reportContent").remove();  // 举报
    $("#asideHotArticle").remove();   // 热门文章
    $("#asideNewComments").remove();  // 最新评论
    $("#asideFooter").remove();    // 底部信息
    $(".p4course_target").remove();   // 广告
    $(".t0").remove();             // 广告
    $("#adt0").remove();           // 广告
    $(".unlogin-box").remove();    // 未登录评论框
    $("#btnMoreComment").click();  // 评论展开

    $(".recommend-box").before('<div style="margin-top: 8px;overflow: hidden;"/>');  // 视觉优化
    $(".recommend-ad-box").remove();  // 广告
    $(".type_hot_word").remove();  // 广告
})();