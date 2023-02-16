// 로그인 열기
function openLogin(type) {
  const loginType = type;
  if (loginType === 'expert') {
    $('.l-login-wrap.expert').stop().fadeIn(200);
  } else {
    $('.l-login-wrap.user').stop().fadeIn(200);
  }
}

// 로그인 닫기
function closeLogin() {
  $('.l-login-wrap').stop().fadeOut(200);
}


// 문서 로드 후 실행
$(document).ready(function () {
  // 헤더 초기화
  var $headerSub = $('.l-header-sub');

  // 하단메뉴 현재 뎁스 활성화
  if (typeof page != 'undefined') {
    if (page == 'home') {
      $('.bQuickMenu__item').eq(0).find('.bQuickMenu__txt').addClass('on');
    } else if (page == 'lawyer') {
      $('.bQuickMenu__item').eq(1).find('.bQuickMenu__txt').addClass('on');
    } else if (page == 'da') {
      $('.bQuickMenu__item').eq(2).find('.bQuickMenu__txt').addClass('on');
    } else if (page == 'detective') {
      $('.bQuickMenu__item').eq(3).find('.bQuickMenu__txt').addClass('on');
    } else if (page == 'more') {
      $('.bQuickMenu__item').eq(4).find('.bQuickMenu__txt').addClass('on');
    }
  }
});
