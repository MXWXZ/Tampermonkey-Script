// ==UserScript==
// @name         知乎优化
// @namespace    https://tampermonkey.net/
// @version      1.1
// @description  去除广告拦截框，自动展开等
// @author       MXWXZ
// @match        https://*.zhihu.com/*
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @homepageURL  https://github.com/MXWXZ/Tampermonkey-Script/zhihu/
// @supportURL   https://github.com/MXWXZ/Tampermonkey-Script/issues/
// @downloadURL  https://raw.githubusercontent.com/MXWXZ/Tampermonkey-Script/master/zhihu/zhihu.user.js
// @updateURL    https://raw.githubusercontent.com/MXWXZ/Tampermonkey-Script/master/zhihu/zhihu.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var check = /^https:\/\/www.zhihu.com\/question\/[0-9]*$/;
    if(check.test(location.href)) {  // 问题页面
        $('.Button.QuestionRichText-more.Button--plain').click();   // 自动展开问题
        var moreAnswers = $('.QuestionMainAction');    // 自动展开回答
        if(moreAnswers.length > 0) {
            moreAnswers[0].click();
        }
    }
})();