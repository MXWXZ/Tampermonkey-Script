// ==UserScript==
// @name         知乎优化
// @namespace    http://tampermonkey.net/
// @version      1.0
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

    $(".AdblockBanner").remove();  // 广告拦截框

    var check = /^https:\/\/www.zhihu.com\/question\/[0-9]*\/answer\/[0-9]*$/;
    if(check.test(location.href)) {   // 问题回答页面
        window.location.href=window.location.href.replace(/\/answer\/[0-9]*$/,"");
    }

    check = /^https:\/\/www.zhihu.com\/question\/[0-9]*$/;
    if(check.test(location.href)) {  // 问题页面
        $('.Button.QuestionRichText-more.Button--plain').click();   // 自动展开问题
        var moreAnswers = $('.QuestionMainAction');    // 自动展开回答
        if(moreAnswers.length > 0) {
            moreAnswers[0].click();
        }

        $(".Question-sideColumn").remove(); // 右边栏
        $(".Question-mainColumn").css("width","100%");  // 扩展回答宽度


        var css=".ztext .content_image, .ztext .origin_image {max-width: 50% !important;}";  // 回答图片优化
        var style=document.createElement('style');
        style.type="text/css";
        style.innerHTML=css;
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    if(location.href=="https://www.zhihu.com/"){       // 首页
        $(".GlobalSideBar").children().children().children(":first-child").remove();  // 无用边栏
        $(".Footer").remove();   // 底部信息
    }

    if(location.href=="https://www.zhihu.com/explore"){       // 发现
        $(".zu-main-sidebar").remove();  // 无用边栏
        $(".zu-main-content-inner").css("margin","0 0 0 0");   // 底部信息
        $(".zh-backtotop").css("left","80%");   // 回到顶部
    }

    if(location.href.indexOf("https://www.zhihu.com/search") != -1){       // 搜索
        $("footer").empty();   // 底部信息
    }
})();