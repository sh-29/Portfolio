// pc용 intro
$(document).ready(function () {
  // .move 좌에서 우로 애니메이트 => .animate()
  $('#pcIntro .move').animate(
    { right: 0 },
    4000,
    'easeInOutSine',
    function () {
      $('#pcIntro .pc_gradient_bg').animate(
        { opacity: 1 },
        2000,
        'easeInOutSine'
      );
      $('#loadNum').parent().text('ON');
    }
  );
  // pc,m 공통
  // light 크기 커지기
  $('h1, .h1_shadow, .name').hide();
  $('.intro .light').animate(
    { width: 400, height: 400 },
    4000,
    'easeInOutSine',
    function(){
      $('h1, .h1_shadow, .name').fadeIn(1000);
    }
  );
  // 전구 빛 차오르기
  // var tgHei = $('#loadingBox .icon').height();
  // console.log(tgHei);
  $('#loadingBox .icon .num').animate({height:'66%'},4000,'easeInOutSine');

  // mobile용 intro
  // .move 상에서 하로 애니메이트 => .animate()
  $('#mIntro .move').animate(
    { bottom: '25%' },
    4000,
    'easeInOutSine',
    function () {
      $('#loadNum_m').parent().text('ON');
    }
  );

  // pc,m 공통
  // 애니메이트 !!시간 동안!! 0~100 1++ #loadNum 텍스트교체 => .setInterval() & .text()
  var loadNum = 0;
  var loading = setInterval(function () {
    loadNum++;
    $(' #loadNum, #loadNum_m').text(loadNum);
    if (loadNum === 100) clearInterval(loading);
  }, 35);

// 인트로 끝나고 메인 넘어가는 제어
  $('#pcIntro .icon_box, #skip a').on('click',function(){
    $('#pcIntro').animate({height:'0vh'},500);
    $('.pc_view').animate({height:'100vh'},500);
    return false;   
  });
 
  $('#home_btn').on('click',function(){
    $('.pc_view').animate({height:'0vh'},500,function(){
      location.reload();
    });
    $('#pcIntro').animate({height:'100vh'},500);
    return false;
  });

});