
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
    if (page == 'lawyer') {
      $('.mm-item').eq(0).find('.mm-btn').addClass('on');
    } else if (page == 'da') {
      $('.mm-item').eq(1).find('.mm-btn').addClass('on');
    } else if (page == 'detective') {
      $('.mm-item').eq(2).find('.mm-btn').addClass('on');
    } else if (page == 'event') {
      $('.mm-item').eq(3).find('.mm-btn').addClass('on');
    } else if (page == 'service') {
      $('.mm-item').eq(4).find('.mm-btn').addClass('on');
    }
  }
});
