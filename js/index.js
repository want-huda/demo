"use strict";
var banner_width = 1000;
const normal_speed = 500;
const slow_speed = 800;
const banner_button_dif = 45;
// const banner_button_dif = -100;
const banner_button_edif = 35;
const banner_cycle = 5000;
var slide_event;
var now_slide_id = 1;
var slide_moving = false; //移动中禁点
$(() => {
  
    //播放动画
    $('img').prop('draggable', false); 
   
    $('#what_is_it').fadeIn(normal_speed);

    $('.content1').fadeIn(normal_speed);
    $('.title2').fadeIn(normal_speed);
    $('.title0').fadeIn(normal_speed);
    $(window).scroll(set_banner_width).resize(set_banner_width);

    $('#b_img1').slideDown(slow_speed);
    slide_event = setInterval(next_banner, banner_cycle);

    set_banner_width();
});

function set_banner_width() {
    banner_width = $('#banner').width();

    reposition_banner_button();
}

function i_to_banner_obj(i) {
    return $('#b_img' + i);
}

function i_to_banbut_obj(i) {
    return $('#b_but' + i);
}

function switch_banner(from, to) {
    slide_moving = true;
    let obj_from = i_to_banner_obj(from);
    let obj_to = i_to_banner_obj(to);
    obj_from.slideUp(slow_speed);
    obj_to.slideDown(slow_speed);
    let obj_but_from = i_to_banbut_obj(from);
    let obj_but_to = i_to_banbut_obj(to);
    obj_but_from.removeClass('slide_button_now');
    obj_but_to.addClass('slide_button_now');

    setTimeout(() => {
        slide_moving = false;
    }, slow_speed);
}

function reposition_banner_button() {
    for (let i = 1; i <= 3; ++i) {
        let obj = i_to_banbut_obj(i);
        obj.css({ left: banner_button_dif + i * banner_button_edif + 'px' })
        
    }
}

function next_banner() {
    let next_slide_id = (now_slide_id) % 3 + 1;
    switch_banner(now_slide_id, next_slide_id);
    now_slide_id = next_slide_id;
}

function to_banner(to) {
    if (slide_moving || to == now_slide_id) {
        return;
    }
    switch_banner(now_slide_id, to);
    now_slide_id = to;
    clearInterval(slide_event); /*重新计时 */
    slide_event = setInterval(next_banner, banner_cycle);
}