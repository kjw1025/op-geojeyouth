// 모든 리소스가 준비가 되었는가?
// jquery 를 이용(html, css, js)
$(document).ready(function(){
  // 전체메뉴 보기 기능
  // .more-wrap 저장해서 활용하자.
  let more_wrap = $('.more-wrap');

  // .member-more 저장해서 활용하자.
  let member_more = $('.member-more');
  member_more.click(function(){
    more_wrap.fadeIn(300);
  });
  // .more-div-close 를 활용하자.
  let more_div_close = $('.more-div-close');
  more_div_close.click(function(){
    more_wrap.fadeOut(300);
  });

  // 더보기 메뉴 배경을 클릭하면 사라지기
  more_wrap.click(function(){    
    more_wrap.fadeOut(300);
  });

  $('.more-div').click(function(event){
    // 클릭 신호(이벤트) 전달 방지
    event.stopPropagation();
  });

  

  // 모바일 메뉴 기능
  // .mb-bt 를 저장해서 활용하자.
  $('.mb-bt').click(function(e) {
    e.preventDefault();
    $(this).toggleClass('mb-bt-open');
    $('.mb-dim').toggleClass('mb-dim-open');
    $('.mb-wrap').toggleClass('mb-wrap-open');
  });

  // 화면 사이즈 체크
  $(window).resize(function(){
    // 화면 너비를 계산한다.
    let temp = $(window).width();
    // 1000 px 보다 크면
    if(temp > 1000) {
      // 모바일 버튼 기능 초기화
      $('.mb-bt').removeClass('mb-bt-open');
      $('.mb-dim').removeClass('mb-dim-open');
      $('.mb-wrap').removeClass('mb-wrap-open');
      $('.mb-menu>li').height(60);
      $('.mb-mainmenu').removeClass('mb-mainmenu-open');
    }
  });

  // 모바일 메뉴 펼치기 기능
  // 1. 모바일 메뉴 저장
  let mb_mainmenu = $('.mb-mainmenu');  
  // 2. 모바일 서브메뉴 저장
  let mb_submenu = $('.mb-submenu');  
  // 3. 펼쳐질 서브메뉴의 높이값
  let mb_submenu_high = [];

  // 높이값 계산을 실행
  $.each(mb_submenu, function(index){
    // 각각의 .mb-submenu 로 가서
    // li 의 개수를 파악한다.
    let count = $(this).find('li').length;
    // 최종 결과를 저장(56*count)
    mb_submenu_high[index] = (56 * count);
  });

  // 최종 결과
  let mb_li = $('.mb-menu > li');
  $.each(mb_mainmenu, function(index){
    $(this).click(function(e){
      //  웹브라우저 갱신 막기
      e.preventDefault();

      // mb-mainmenu-open 를 toggleClass 한다.
      $(this).toggleClass('mb-mainmenu-open');
      // 만약에 mb-mainmenu-open 이 있으면 펼치고
      // 없으면 닫고
      let active = $(this).hasClass('mb-mainmenu-open');
      if(active) {
        let temp = mb_submenu_high[index];
        mb_li.eq(index).height(temp + 60);
      }else {
        mb_li.eq(index).height(60);
      }

    });    
  });
  // 모바일 메뉴 배경 클릭시 사라짐.
  let mb_dim = $('.mb-dim');
  mb_dim.click(function(){
     // 모바일 버튼 기능 초기화
     $('.mb-bt').removeClass('mb-bt-open');
     $('.mb-dim').removeClass('mb-dim-open');
     $('.mb-wrap').removeClass('mb-wrap-open');
     $('.mb-menu>li').height(60);
     $('.mb-mainmenu').removeClass('mb-mainmenu-open');
  });
});

// js 를 이용(html, css, js,멀티미디어 요소)
window.onload = function(){

  // 비주얼 슬라이드
  let sw_visual = new Swiper('.sw-visual', {
    loop: true,
    speed: 1000,
    effect: "fade",
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".sw-visual-pg",
      clickable: true,
    },
  });
  // 일시멈춤 버튼
  // 현재 상태 저장
  let slide_now = 'ing';

  $('.sw-visual-bt').click(function(){
    
    if(slide_now == 'ing') {
      // 현재 슬라이드 진행 중이라면
      // 슬라이드를 멈춘다.
      slide_now = 'stop';
      sw_visual.autoplay.stop();
      $(this).find('span').text('play_arrow');

    }else {
      // 현재 슬라이드가 멈췄다.
      // 다시 슬라이드를 진행한다.
      slide_now = 'ing';
      sw_visual.autoplay.start();
      $(this).find('span').text('pause');
    }    

  });

  // 배너 슬라이드
  let sw_banner = new Swiper('.sw-banner', {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
      prevEl: '.sw-banner-prev',
      nextEl: '.sw-banner-next'
    },
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    breakpoints : {
      1400: {
        slidesPerView: 6
      },
      1260: {
        slidesPerView: 5
      },
      1000: {
        slidesPerView: 4
      },
      860: {
        slidesPerView: 3
      }
    }
  });

  // 배너 슬라이드 일시멈춤 버튼
  $('.sw-banner-pause').click(function(){
    // 현재 span 태그 안쪽의 글자를 읽는다.
    let temp = $(this).find('span').text();
    if(temp == 'play_arrow') {
      $(this).find('span').text('pause');      
      sw_banner.autoplay.stop();
    }else{
      $(this).find('span').text('play_arrow');     
      sw_banner.autoplay.start();
    }
  });

  // 화면 위로 이동
  $('.gotop').click(function(){

    $('html').animate({
      scrollTop: 0
    }, 1000);

  });

}