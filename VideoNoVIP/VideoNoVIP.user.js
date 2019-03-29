// ==UserScript==
// @name         视频去广告和VIP解析
// @namespace    https://tampermonkey.net/
// @version      1.3
// @description  精简后的VIP解析脚本，目前支持爱奇艺和腾讯视频，如果我要看其他的会考虑添加……
// @author       mofiter, MXWXZ
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @match        *://www.iqiyi.com/v*
// @match        *://v.qq.com/x/cover/*
// @match        *://v.qq.com/x/page/*
// @homepageURL  https://github.com/MXWXZ/Tampermonkey-Script/VideoNoVIP/
// @supportURL   https://github.com/MXWXZ/Tampermonkey-Script/issues/
// @downloadURL  https://raw.githubusercontent.com/MXWXZ/Tampermonkey-Script/master/VideoNoVIP/VideoNoVIP.user.js
// @updateURL    https://raw.githubusercontent.com/MXWXZ/Tampermonkey-Script/master/VideoNoVIP/VideoNoVIP.user.js
// @grant        unsafeWindow
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    var $ = $ || window.$;
    var interface_list = [{ "name": "接口1", "url": "http://api.hlglwl.com/jx.php?url=" },
                          { "name": "接口2", "url": "https://api.52xmw.com/?url=" },
                          { "name": "接口3", "url": "http://vip.jlsprh.com/index.php?url=" }]; // 解析接口

    function InnerParse(url) {
        $("#iframe-player").attr("src", url);
    }

    function GMAddStyle(css) {
        var myStyle = document.createElement('style');
        myStyle.textContent = css;
        var doc = document.head || document.documentElement;
        doc.appendChild(myStyle);
    }

    function WaitForKeyElements(selectorTxt, actionFunction, bWaitOnce, iframeSelector) {
        var targetNodes, btargetsFound;

        if (typeof iframeSelector == "undefined") {
            targetNodes = $(selectorTxt);
        } else {
            targetNodes = $(iframeSelector).contents()
                .find(selectorTxt);
        }

        if (targetNodes && targetNodes.length > 0) {
            btargetsFound = true;
            targetNodes.each(function() {
                var jThis = $(this);
                var alreadyFound = jThis.data('alreadyFound') || false;

                if (!alreadyFound) {
                    var cancelFound = actionFunction(jThis);
                    if (cancelFound) {
                        btargetsFound = false;
                    } else {
                        jThis.data('alreadyFound', true);
                    }
                }
            });
        } else {
            btargetsFound = false;
        }
        var controlObj = WaitForKeyElements.controlObj || {};
        var controlKey = selectorTxt.replace(/[^\w]/g, "_");
        var timeControl = controlObj[controlKey];
        if (btargetsFound && bWaitOnce && timeControl) {
            clearInterval(timeControl);
            delete controlObj[controlKey]
        } else {
            if (!timeControl) {
                timeControl = setInterval(function() {
                        WaitForKeyElements(selectorTxt,
                            actionFunction,
                            bWaitOnce,
                            iframeSelector
                        );
                    },
                    300
                );
                controlObj[controlKey] = timeControl;
            }
        }
        WaitForKeyElements.controlObj = controlObj;
    }

    function Remove_Node(node) { node.remove(); }

    function ReplaceVideo(pos, index, video_player) {
        if (!document.getElementById("iframe-player")) {
            var flashbox = $(pos);
            flashbox.children().hide();
            flashbox.append(video_player);
        }
        InnerParse(interface_list[index].url + location.href);
    }

    // 面板UI
    var parse_li = "";
    var last_url = "";
    interface_list.forEach((item, index) => {
        parse_li += "<li>" + item.name + "</li>";
    });
    var parse_div = "<div style='display:flex;'><div style='width:180px;padding:10px 0;'><div style='text-align:center;color:#cccccc;line-height:20px;'>解析接口</div>" +
        "<ul style='margin:0 10px;'>" + parse_li + "<div style='clear:both;'></div></ul></div></div>";
    var video_player = $("<div id='iframe-div' style='width:100%;height:100%;z-index:2147483647;'><iframe id='iframe-player' frameborder='0' allowfullscreen='true' width='100%' height='100%'></iframe></div>");

    if (location.href.indexOf("www.iqiyi.com") > -1) { // 爱奇艺
        // 页面元素屏蔽
        // VIP相关
        WaitForKeyElements('#nav_renewBtn', Remove_Node, true);
        WaitForKeyElements('.qy-head-side-icon.side-icon-pcatip', Remove_Node, true);
        WaitForKeyElements('.detail-sd', Remove_Node, true);
        WaitForKeyElements('.anchor-list.anchor-integral', Remove_Node, true);
        WaitForKeyElements('.qy-player-side-vip', Remove_Node, true);
        // 无关推荐和广告
        WaitForKeyElements('.qy-play-bottom', Remove_Node, true);
        WaitForKeyElements('#block-J', Remove_Node, true);
        WaitForKeyElements('.vpro-banner', Remove_Node, true);

        setInterval(() => {
            if (location.href != last_url && $('#flashbox')) {
                ReplaceVideo("#flashbox", 0, video_player);
                last_url = location.href;
            }
            $('video')[0].pause();
        }, 200);

        // 添加按钮
        GMAddStyle(`.fn-iqiyi-jiexi li{color:#cccccc;text-align:center;width:60px;line-height:20px;float:left;border:1px solid gray;border-radius:8px;padding:0 4px;margin:4px 2px;}`);
        var iqiyi_parse = $("<div class='func-item' style='z-index:2147483647;'><span class='func-inner fn-iqiyi-jiexi-text' style='line-height:40px;'><span class='func-name'>解析</span></span>" +
            "<div class='qy-func-jiexi-pop fn-iqiyi-jiexi' style='display:none;position:absolute;left:-50px;text-align:center;'><div class='qy-popup-box' style='background-color:#2e2e2e;border:1px solid gray;'>" +
            parse_div + "</div></div></div>");
        iqiyi_parse.on("mouseover", () => {
            $(".qy-func-jiexi-pop").show();
        });
        iqiyi_parse.on("mouseout", () => {
            $(".qy-func-jiexi-pop").hide();
        });
        var add_button_loop = setInterval(() => {
            if ($(".func-like-v1").is(":visible") && !document.getElementsByClassName("fn-iqiyi-jiexi")[0]) {
                var qy_flash_func = $(".qy-flash-func");
                qy_flash_func.prepend(iqiyi_parse);
                $(".fn-iqiyi-jiexi-text").click(() => {
                    ReplaceVideo("#flashbox", 0, video_player);
                });
                $(".fn-iqiyi-jiexi li").each((index, item) => {
                    $(item).on('mouseover', () => {
                        $(item).css('cursor', 'pointer');
                        $(item).css('color', '#01be07');
                    });
                    $(item).on('mouseout', () => {
                        $(item).css('color', '#cccccc');
                    });
                    $(item).on('click', () => {
                        ReplaceVideo("#flashbox", index, video_player);
                    });
                });
                clearInterval(add_button_loop);
            }
        }, 500);
    } else if (location.href.indexOf("v.qq.com") > -1) { // TX视频
        WaitForKeyElements('#top_followSeries', Remove_Node, true);
        WaitForKeyElements('.quick_item.quick_vip', Remove_Node, true);
        WaitForKeyElements('.mod_scene_change', Remove_Node, true);
        WaitForKeyElements('#_vip_player_sec', Remove_Node, true);
        WaitForKeyElements('.ft_cell.ft_cell_vcoin', Remove_Node, true);
        WaitForKeyElements('.mod_ad', Remove_Node, true);
        WaitForKeyElements('div[_r-component="c-vip-benefit"]', Remove_Node, true);

        var action_wrap = $(".action_wrap");
        GMAddStyle(`.fn-qq-jiexi li{text-align:center;width:60px;line-height:20px;float:left;border:1px solid gray;border-radius:8px;padding:0 4px;margin:4px 2px;}`);
        var qq_parse = $("<div id='qq-jiexi-btn' class='action_item action_jiexi' style='position:relative;z-index:2147483647;'><a class='action_title fn-qq-jiexi-text'><span>解析</span></a>" +
            "<div class='mod_pop_action fn-qq-jiexi' style='background-color:#2e2e2e;width:auto;left:-50px;border:1px solid gray;'>" + parse_div + "</div></div>");
        action_wrap.append(qq_parse);
        document.getElementById("qq-jiexi-btn").addEventListener("mouseover", () => {
            $(".action_jiexi").toggleClass("open");
        });
        document.getElementById("qq-jiexi-btn").addEventListener("mouseout", () => {
            $(".action_jiexi").toggleClass("open");
        });
        document.getElementsByClassName("fn-qq-jiexi-text")[0].addEventListener("click", () => {
            ReplaceVideo("#mod_player", 0, video_player);
        });
        $(".fn-qq-jiexi li").each((index, item) => {
            item.addEventListener('mouseover', () => {
                $(item).css('cursor', 'pointer');
                $(item).css('color', '#fe6527');
            });
            item.addEventListener('mouseout', () => {
                $(item).css('color', '#999999');
            });
            item.addEventListener('click', () => {
                ReplaceVideo("#mod_player", index, video_player);
            });
        });

        setInterval(() => {
            if (location.href != last_url && $('#mod_player')) {
                ReplaceVideo("#mod_player", 0, video_player);
                last_url = location.href;
            }
            $(".txp_ad_inner .txp_ad_skip_text").click();
            $('#mask_layer').remove();
            $('.tvip_layer').remove();
            var txp_btn_play = $(".txp_left_controls .txp_btn_play");
            if (txp_btn_play.attr("data-status") === "pause") {
                txp_btn_play.click();
            }
        }, 200);

        var remove_ad_loop = setInterval(() => {
            if ($(".txp_ad_inner .txp_ad_skip_text")) {
                $(".txp_ad_inner .txp_ad_skip_text").click();
                $('#mask_layer').remove();
                $('.tvip_layer').remove();
                clearInterval(remove_ad_loop);
            }
        }, 500);
    }
})();
