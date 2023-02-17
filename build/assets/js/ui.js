
// 로그인 열기
function openModal(name) {
  const modalName = name;
  $('.l-modal[data-modal="' + name + '"]').stop().fadeIn(200);
  $('html').addClass('ovh');
}

// 로그인 닫기
function closeModal(name) {
  $('.l-modal[data-modal="'+ name +'"]').stop().fadeOut(200);
  $('html').removeClass('ovh');
}

// 문서 로드 후 실행
$(document).ready(function () {
  // 하단메뉴 상단 뎁스 활성화
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
