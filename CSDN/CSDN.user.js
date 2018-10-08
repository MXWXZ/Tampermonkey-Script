// ==UserScript==
// @name         CSDN优化
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  CSDN自动展开+页面优化
// @author       MXWXZ
// @match        *://blog.csdn.net/*
// @homepageURL  https://github.com/MXWXZ/Tampermonkey-Script/CSDN/
// @supportURL   https://github.com/MXWXZ/Tampermonkey-Script/issues/
// @downloadURL  https://raw.githubusercontent.com/MXWXZ/Tampermonkey-Script/master/CSDN/CSDN.user.js
// @updateURL    https://raw.githubusercontent.com/MXWXZ/Tampermonkey-Script/master/CSDN/CSDN.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $("#btn-readmore").click();    // 自动展开
    $(".leftPop").remove();        // 缩放提示
    $("#csdn-toolbar").remove();   // 头部导航
    $(".tool-box").remove();       // 悬浮工具栏
    $("#reportContent").remove();  // 举报
    $("#report-box").remove();     // 举报窗口
    $("#asideHotArticle").remove(); // 热门文章
    $(".opt-box").remove();        // 多余按钮
    $("#asideNewComments").remove();  // 最新评论
    $("#asideFooter").remove();    // 底部信息
    $(".unlogin-box").remove();    // 未登录评论框
    $("#btnMoreComment").click();  // 评论展开
    $(".recommend-box").before('<div style="margin-top: 8px;overflow: hidden;"/>');  // 视觉优化
})();