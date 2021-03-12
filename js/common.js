$(document).ready(function(){
  /* 메인 레이아웃 수평아코디언 제어 */ 
  // 1)초기설정
  // -아코디언헤더 첫번째에 클래스 .on 부여하기(배경,글자 색 변경), aria-expended:true, aria-disabled:true 접근성주기, 포커스부여하기
  // -첫번째 아코디언 패널 보이기 display:block; width:값;
  var accordionH = $('#main h2.tit');
  var winWid;
  var titWid;
  var panelWid;

  $(window).on('resize', function () {
    winWid = $(this).width();
    titWid = accordionH.outerWidth(true)*5+5; //창크기 조절할때 마지막버튼 위치 안보일때가 있어서 보험으로 +5
    panelWid = winWid-titWid;
    // console.log(winWid,titWid, panelWid);

    // 열려진 상세 내용 업데이트
    $('.tit.on + .a_panel').css('width', panelWid);
  });
  $(window).trigger('resize');

  // 로딩시 한번 적용
  accordionH.first().addClass('on').attr({'aria-expanded':true, 'aria-disabled':true});
  $('#aP1').css({display: 'block', width: panelWid}).attr('tabIndex',0);

  // 2)키보드제어 -이전키, 다음키, home, end
  // -이전키 누를때 첫번째 아코디언헤더 이면 마지막 아코디언으로 포커스 보내기, 다음키 누를때 마지막 아코디언헤더이면 첫번째 아코디언헤더로 포커스 보내기
  // -home 누르면 첫번째 아코디언헤더로. end 누르면 마지막 아코디언헤더로. 기본기능제어
  accordionH.children().on('keydown',function(evt){
    var key = evt.keyCode;
    // console.log(key); //37,39,36,35
    switch (key) {
      case 37:
        // 처음 아코디언헤더이면 .last 클래스 버튼에 포커스
        if($(this).hasClass('first')) {
          $(this).closest('#main').find('.last').focus();
        } else {
          $(this).parent().prev().prev().children().focus();
        }
        break;
      case 39:
        // 마지막 아코디언헤더이면 .first 클래스 버튼에 포커스
        if($(this).hasClass('last')) {
          $(this).closest('#main').find('.first').focus();
        } else {
          $(this).parent().next().next().children().focus();
        }
        break;
      case 36:
        // 홈 키
        evt.preventDefault();
        $(this).closest('#main').find('.first').focus();
        break;
      case 35:
        // 엔드키
        evt.preventDefault();
        $(this).closest('#main').find('.last').focus(); 
        break;
    }
  });
  
  // 3)마우스제어 -아코디언헤더를 클릭하면 동작
  // -아코디언 헤더가 .on을 가지고 있지 않다면 .on 부여하기(배경 글자 색 변경), aria-expended:true, aria-disabled:true 접근성주기, 포커스부여하기, 나 외에 아코디언헤더들에게 .on지우고, 접근성 aria-expended:false; aria-disabled 삭제 
  // -헤더 짝꿍 아코디언 패널 보이기. display:block; width:값; 외에 아코디언패널 숨기기 
  accordionH.on('click',function() {
    // console.log(panelWid);
    if(!$(this).hasClass('on')) {
      $(this).addClass('on').attr({'aria-expanded':true, 'aria-disabled':true}).siblings('.tit').removeClass('on').attr({'aria-expanded':false}).removeAttr('aria-disabled');
      
      $(this).next().css('display','block').stop().animate({width : panelWid},1000).attr('tabIndex',0).siblings('.a_panel').stop().animate({width : 0},1000,function () {
        $(this).css('display','none').attr('tabIndex', -1);
      });
    } 
  });

  /* 마우스 버튼, a, .tg 에서 커서모양 바뀌기 */
  $(':button, a, .tg').on({  //.tg=>토글
    'mouseenter focusin': function () {
      $('#svg1')
        .stop()
        .animate({ width:120, height:120 }, 400)
        .children()
        .attr('fill','transparent')
        .stop()
        .animate({ cx:60, cy:60, r:54, }, 400);
    },
    'mouseleave focusout': function () {
      $('#svg1')
        .stop()
        .animate({ width:28, height:28 }, 400)
        .children()
        .attr('fill','#3664e8')
        .stop()
        .animate({cx:14, cy:14, r:12, }, 400);              
    },
  });

  /* !!마우스가 움직일때!! 마우스 따라다니는 효과 */
  $(this).on('mousemove', function (evt) {
    // cursor_follow의 top,left값이 마우스 좌표 값이 되게 하면 되
    var mouseX = evt.pageX;
    var mouseY = evt.pageY;
    // console.log(mouseX, mouseY);
    $('#cursor_follow')
      .stop(true, false)
      .animate(
        { top: mouseY - 10, left: mouseX - 10},
        'fast',
        'easeOutExpo'
      );

    /* 패널1 h3태그 애니메이션 */
    // 마우스좌표값이 h3태그 좌표값이 되면 css로 미리 만들어 놓은 애니메이션 클래스 추가
    var _aP1_h3 = $('#aP1').find('h3');
    var h3Pos = parseInt(_aP1_h3.offset().top);
    // console.log(mouseY,h3Pos);
    if(mouseY >= (h3Pos-100)) _aP1_h3.addClass('h3_ani');
    else { //마우스 올리면 다시 사라지기
      _aP1_h3.removeClass('h3_ani');
      _aP1_h3.find(':button').removeClass('on');
      _aP1_h3.find(':button').prev().removeClass('on');
      $('#aP1ImgBox, #aP1TxtBox').removeClass('h3_ani');
    }

    // click글자 클릭하면 도전, 성장 나오기
    _aP1_h3.find(':button').on('click',function(){
      $(this).addClass('on');
      $(this).prev().addClass('on');
      
      // 도전, 성장 나올때 짝꿍 컨텐츠 나오기
      var tgCnt = $($(this).data('href'));
      // console.log(tgCnt);
      tgCnt.addClass('h3_ani');
    });
  });

  
  // light 모드일때 색상 변경 제어
  var modeBtn = $('#mode');
  modeBtn.on('click', function () {
    $(this).find('i').toggleClass('fa-sun');

    // 모든 패널 배경색 제어
    var _allPanel = $('.a_panel');
    _allPanel.toggleClass('lightmode');
    $('#main .main_back').toggleClass('lightmode');
    // 패널1 제어
    $('h2').children().toggleClass('color_b');
    $('#aP1TxtBox p').toggleClass('color_222');
    var _panel1_h3 = $('#aP1 h3');
    _panel1_h3.toggleClass('color_222');
    _panel1_h3.find('button p, b').toggleClass('color_point');

    // 패널2 제어
    var _panel2 = $('#aP2');
    _panel2.find('.jq').toggleClass('filter_gray');
    _panel2.find('.guide').toggleClass('color_222');
    _panel2.find('.img_box b').toggleClass('color_ccc');

    // 패널3 제어
    var _panel3_txt = $('#aP3 .txt_box');
    _panel3_txt.toggleClass('color_222 default_c');
    
    //패널5 제어
    var _panel5 = $('#aP5');
    _panel5.find('.front').toggleClass('filter');
    _panel5.find('.txt_box').toggleClass('color_222 default_c');
    
  });
});