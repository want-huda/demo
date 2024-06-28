"use strict";
//nav.js 承载导航栏和(标题更新)的功能
var xmlhttp;
const ajax_on = false; //
$(() => {

    if (ajax_on) {
        try {
            if (window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest();
            } else {
                xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
            }
            xmlhttp.onreadystatechange = load_nav_html;
            xmlhttp.open('GET', 'nav.html', true);
            xmlhttp.send(); //.catch(error => console.log(error));
        } catch (err) {
            console.log('err from ajax make', err);
            get_nav_html(htmlcode_without_ajax);
        }
    } else {
        get_nav_html(htmlcode_without_ajax);

    }

   
    if (1 || location.href.indexOf('posts') == -1 && location.href.indexOf('post') != -1) {
   
        $(window).scroll(set_goto_top).resize(set_goto_top);
        set_goto_top();
    }

});

var goto_top_displaying = false;
var goto_top_transisitioning = false;

function set_goto_top() {
    if (goto_top_transisitioning) {
        return;
    }
    let scroll_top = document.documentElement.scrollTop || document.body.scrollTop;
    let window_height = document.documentElement.clientHeight;
;
    if (scroll_top > window_height && !goto_top_displaying) {
        goto_top_displaying = true;
        goto_top_transisitioning = true;
        $('.nav_to_top').fadeIn(300);
        setTimeout(() => {
            goto_top_transisitioning = false;
        }, 300);
    }
    if (scroll_top <= window_height && goto_top_displaying) {

        goto_top_displaying = false;
        $('.nav_to_top').fadeOut(300);
        goto_top_transisitioning = true;
        setTimeout(() => {
            goto_top_transisitioning = false;
        }, 300);
    }
}

function load_nav_html() {
    try {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                let htmlcode = xmlhttp.responseText;
    
                get_nav_html(htmlcode);
            }
     
        }
    } catch (err) {
        console.log('err from onreadystatechange', err)
    }
}

function get_nav_html(htmlcode) {
    let regexp = /<body[^>]*>([\s\S]+?)<\/body>/i;
    let body_innerHTML = htmlcode.match(regexp)[1];
    $('#ifr')[0].innerHTML = body_innerHTML;
    build_href('index');
    build_href('posts');
    build_href('tools');
    build_href('about');
}


function build_href(htm) {
    let obj = $('#' + htm);
    let new_href = location.href;
    let fix_pos = Math.max(0, new_href.lastIndexOf('/'));
    let now_htm_name = new_href.substr(fix_pos + 1).split('.')[0];
    if (now_htm_name == htm || htm == 'posts' && -1 != now_htm_name.indexOf('post') || htm == 'tools' && -1 != now_htm_name.indexOf('tool')) {
        obj.attr('now', htm);
    }
    obj[0].onclick = () => {
        $('.nav_bar').removeAttr('now');
        obj.attr('now', htm);

        new_href = new_href.substr(0, fix_pos) + '/' + htm + '.html';
        if (new_href == location) {
            return;
        }
        location.href = new_href;
       
    };
}

const htmlcode_without_ajax = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <title>导航栏页面(用于框架)</title>\r\n    <link rel=\"stylesheet\" href=\"css/nav.css\">\r\n    <script src=\"js/jquery.js\"></script>\r\n    <!-- <script src=\"js/nav.js\"></script> -->\r\n</head>\r\n\r\n<body>\r\n    <div class=\"nav_main_bg\">\r\n        <div class=\"nav_main_cf\" id=\"nav_cf\">\r\n            <!--尝试实现滑窗悬停效果，实际体验不好，会遮住字体一半，没有简易解决办法-->\r\n            <!-- <div class=\"nav_selei\" id=\"selei\"></div> -->\r\n\r\n            <div class=\"nav_barrier\"></div>\r\n            <div class=\"nav_bar\" id=\"index\">首页</div>\r\n            <div class=\"nav_barrier\"></div>\r\n            <div class=\"nav_bar\" id=\"posts\">帖子</div>\r\n            <div class=\"nav_barrier\"></div>\r\n            <div class=\"nav_bar\" id=\"tools\">个人中心</div>\r\n            <div class=\"nav_barrier\"></div>\r\n            <div class=\"nav_bar\" id=\"about\">关于</div>\r\n            <div class=\"nav_barrier\"></div>\r\n            <div class=\"nav_main_cf_rf\">\r\n                欢迎您，访客！\r\n            </div>\r\n            <div class=\"nav_to_top\"><a href=\"#ifr\">回到顶部</a></div>\r\n        </div>\r\n    </div>\r\n<!-- Code injected by live-server -->\n<script type=\"text/javascript\">\n\t// <![CDATA[  <-- For SVG support\n\tif ('WebSocket' in window) {\n\t\t(function () {\n\t\t\tfunction refreshCSS() {\n\t\t\t\tvar sheets = [].slice.call(document.getElementsByTagName(\"link\"));\n\t\t\t\tvar head = document.getElementsByTagName(\"head\")[0];\n\t\t\t\tfor (var i = 0; i < sheets.length; ++i) {\n\t\t\t\t\tvar elem = sheets[i];\n\t\t\t\t\tvar parent = elem.parentElement || head;\n\t\t\t\t\tparent.removeChild(elem);\n\t\t\t\t\tvar rel = elem.rel;\n\t\t\t\t\tif (elem.href && typeof rel != \"string\" || rel.length == 0 || rel.toLowerCase() == \"stylesheet\") {\n\t\t\t\t\t\tvar url = elem.href.replace(/(&|\\?)_cacheOverride=\\d+/, '');\n\t\t\t\t\t\telem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());\n\t\t\t\t\t}\n\t\t\t\t\tparent.appendChild(elem);\n\t\t\t\t}\n\t\t\t}\n\t\t\tvar protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';\n\t\t\tvar address = protocol + window.location.host + window.location.pathname + '/ws';\n\t\t\tvar socket = new WebSocket(address);\n\t\t\tsocket.onmessage = function (msg) {\n\t\t\t\tif (msg.data == 'reload') window.location.reload();\n\t\t\t\telse if (msg.data == 'refreshcss') refreshCSS();\n\t\t\t};\n\t\t\tif (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {\n\t\t\t\tconsole.log('Live reload enabled.');\n\t\t\t\tsessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);\n\t\t\t}\n\t\t})();\n\t}\n\telse {\n\t\tconsole.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');\n\t}\n\t// ]]>\n</script></body>\r\n\r\n</html>";