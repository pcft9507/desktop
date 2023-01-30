// 헤더 이벤트 활성
$.fn.headerSubEvt = function () {
  var $headerSub = this;
  var $containerSub = $('.l-container-sub');

  $containerSub.on('scroll', function () {
    var containerSubScrollTop = $(this).scrollTop();
    if (containerSubScrollTop > 50) 
    {
      $headerSub.addClass('bg-white');
    } 
    else 
    {
      $headerSub.removeClass('bg-white');
    }
  })
}

// 상단으로 이동
function goTop() {
  $('html').animate({
    scrollTop: 0
  })
}

// 모달 열기
function openModal(modalName) {
  console.log('openModal')
  $('html').addClass('ovh')
  $('.modal[data-modal="' + modalName + '"]').addClass('show')
  if (modalName == 'reception02') {
    $('.reception-form .form').css('overflow' , 'initial').css('overflow' , 'hidden')
  }
  // 병원찾기 모달일 경우는 지도보기 동적 생성
  if (modalName == 'hospital') {
    createMap ('hospital-map', '.modal-hospital .hospital-addr', '.modal-hospital .hospital-name')
  }
}

// 모달 닫기
function closeModal(modal) {
  $('.modal[data-modal=' + modal + ']').removeClass('show');
  if ($('.modal.show').length < 1) {
    $('html').removeClass('ovh');
  }
}

// full popup 열기
function openFullPopup(popName) {
  $('.fullPopup[data-full-pop=' + popName +']').addClass('show');
  $('html').addClass('ovh');
}

// full popup 닫기
function closeFullPopup(popName) {
  $('.fullPopup').removeClass('show');
  $('html').removeClass('ovh');
}

// full popup 뒤로가기
function backFullPopup(popName) {
    $('.fullPopup[data-full-pop=' + popName +']').removeClass('show');
    $('html').removeClass('ovh');
}

// ft popup 열기
function openFtPopup(popName) {
  $('.ftPop[data-ft-pop=' + popName +']').addClass('show');
  $('html').addClass('ovh');
}

// ft popup 닫기
function closeFtPopup(popName) {
  $('.ftPop').removeClass('show');
  $('html').removeClass('ovh');
}

// textarea
$.fn.textArea = function () {
  var tAreaBody = []
  return this.each(function (i) {
    tAreaBody[i] = $(this)
    var textArea = tAreaBody[i].find('.textArea__text')
    var countChar = tAreaBody[i].find('.textArea__cntChar')
    var currentEl = countChar.find('.textArea__cntCurrent')
    var limitEl = countChar.find('.textArea__cntLimit')
    var limitNum = tAreaBody[i].data('limit')
    textArea.attr('maxlength', limitNum)
    limitEl.text(limitNum)
    textArea.on('keyup', function () {
      var textLeng = $(this).val().length
      currentEl.text(textLeng)
    })
  })
}

// input 텍스트 삭제
function showBtnDel (obj) {
  var inpTxt = $(obj)
  if(inpTxt.val().length > 0) {
    inpTxt.next().show()
  }
}
function delInpTxt (obj) {
  var delBtn = $(obj)
  delBtn.prev().val('')
  delBtn.hide();
}

// 텍스트 클립보드 복사
function copyText(element){
  var content = $(element).text()
  navigator.clipboard.writeText(content)
    .then(() => {
    console.log("복사성공")
  })
    .catch(err => {
    console.log('복사실패', err);
  })
  alert('복사되었습니다.')
}

// 카카오지도 1.요소, 2.도로명주소, 3.마커위에 인포윈도우
function createMap (mapEl, addr, infoWindow, type) {

  // 지도 실행 스크립트
  var mapContainer = document.getElementById(mapEl), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표 아무곳이든 필수입력
        level: 4 // 지도의 확대 레벨
      };

  // 마커셋팅
  var imageSrc = '../assets/images/common/ico-location.png',
      imageSize = new kakao.maps.Size(14, 20);
  var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

  // 도로명주소 - 데이터를 변수에 대입해도 됩니다.
  // const address = some data
  const address = $(addr).text();

  // 손해사정사 이름 - 데이터를 변수에 대입해도 됩니다.
  // const agentName = some data
  const infoName = $(infoWindow).text();

  // 지도를 생성합니다
  var map = new kakao.maps.Map(mapContainer, mapOption);

  // 주소-좌표 변환 객체를 생성합니다
  var geocoder = new kakao.maps.services.Geocoder();

  // 주소로 좌표를 검색합니다
  geocoder.addressSearch(address, function(result, status) {
    // 정상적으로 검색이 완료됐으면
    if (status === kakao.maps.services.Status.OK) {
      var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
      // 결과값으로 받은 위치를 마커로 표시합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: coords,
        image: markerImage
      });
      var infowindow = new kakao.maps.InfoWindow({
        content: '<div class="info-window d-flex-c-c">' + infoName + '</div>'
      });
    }
    infowindow.open(map, marker);
    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
    map.setCenter(coords);
  });
}

// 드래그탭  
$.fn.swiperTab = function () {
  var swiperBody = []
  var swiperTabArr = []
  return this.each(function (i) {
    swiperBody[i] = $(this);
    var thisClass = swiperBody[i].attr('class');
    var tabItem = swiperBody[i].find('.swiper-slide');
    var tabBtn = swiperBody[i].find('.js-click-tab');
    swiperTabArr[i] = new Swiper ('.swiperTab', {
      slidesPerView: "auto",
      observer: true,
      slideToClickedSlide: true,
    });
    tabItem.eq(0).addClass('active')

    tabBtn.on('click', function () {
      var curIdx = swiperTabArr[i].activeIndex
      tabItem.removeClass('active')
      $(this).parent().addClass('active')
      setTimeout(function () {
        swiperTabArr[i].update();
      }, 300)
    })  
  })
}

// 게시판 리스트
$.fn.boardList = function () {
  var listBody = this
  var btnItem = listBody.find('.boardList__item')
  var btnOpen = listBody.find('.boardList__subject')
  var btnClose = listBody.find('.boardList__btnClose')
  btnOpen.on('click', function () {
    btnItem.removeClass('opened')
    $(this).parents('.boardList__item').addClass('opened')
  })
  btnClose.on('click', function () {
    $(this).parents('.boardList__item').removeClass('opened')
  })
}

// 셀렉트콤보
$.fn.selectCombo = function () {
  return this.each(function () {
    const comboBody = $(this);
    const comboListBody = comboBody.find('.selectCheck');
    const btnDropDown = comboBody.find('.js-dropdown');
    const btnSelect = comboBody.find('.js-select');
    // 영역 제외 클릭, 터치시 슬라이드 업
    $(document).click(function (e){
      if(comboBody.has(e.target).length === 0){
        comboListBody.stop().slideUp(200);
      }
    });
    btnDropDown.on('click', function () {
      console.log('btnDropDown');
      comboListBody.stop().slideDown(200);
      comboBody.focus();
    });
    btnSelect.on('click', function () {
      console.log('btnSelect');
      comboListBody.stop().slideUp(200);
      // 선택된 체크박스 텍스트 선택
      let selectedTxt = [];
      comboListBody.find('input:checked + label').each(function (i) {
        selectedTxt[i] = $(this).text();
      });
      btnDropDown.children().text(selectedTxt);
    });
  });
}

// 컨텐츠 탭열기
function openTabCont (tabIndex) {
  $('*[data-tab-btn]').removeClass('active');
  $('*[data-tab-btn=' + tabIndex + ']').addClass('active');
  $('*[data-tab-cont]').hide();
  $('*[data-tab-cont=' + tabIndex + ']').show();
}

// 가로스크롤 자동크기 스와이퍼
$.fn.perViewAutoSwiper = function (spaceBetween) {
  return this.each(function (i) {
    var swiper = new Swiper('[data-swiper="perAuto"]', {
      slidesPerView: "auto",
      spaceBetween: spaceBetween,
      freeMode: true,
      a11y: false,
    });  
  })
}

// 툴팁 열기
function openTooltip(idx) {
  $('[data-tool-tip="' + idx + '"]').show().focus();
}

// 툴팁 닫기
function closeTooltip(idx) {
  $('[data-tool-tip="' + idx + '"]').hide();
}

// 텍스트 에어리어 글자수 체크 포함 컴포넌트
$.fn.textAreaCheckLength = function (maxValueLength) {
  return this.each(function () {
    const taWrap = $(this);
    const taBody = taWrap.find('.textAreaCheckLength__textarea');
    const currentLength = taWrap.find('.textAreaCheckLength__textCurrent');
    const maxLength = taWrap.find('.textAreaCheckLength__textMax');
    currentLength.text(0);
    maxLength.text(maxValueLength);
    taBody.attr('maxlength', maxValueLength);
    taBody.on('keyup', function () {
      currentLength.text($(this).val().length);
    });
  });
}

// 토글 컨텐츠
$.fn.toggleContent = function () {
  return this.each(function () {
    const toggleBody = $(this); 
    const btnToggle = toggleBody.find('.js-open-cont'); 
    btnToggle.on('click', function () {
      const currentActive = $(this).hasClass('opened');
      if (!currentActive) {
        $(this).addClass('opened');
        toggleBody.find('.toggleCont').stop().slideDown(200);
      }
      else {
        $(this).removeClass('opened');
        toggleBody.find('.toggleCont').stop().slideUp(200);
      }
    });    
  });
}

// 북마크
$.fn.bookMark = function () {
  return this.each(function () {
    const bm = $(this);
    bm.on('click', function () {
      $(this).toggleClass('marked');
    })
  })
}

// 찜하기
$.fn.wishToggle = function () {
  return this.each(function () {
    const btnWish = $(this);
    btnWish.on('click', function () {
      $(this).toggleClass('active');
    })
  })
}

// 토글 리스트 게시판
$.fn.toggleBo = function () {
  return this.each(function () {
    const listBody = $(this);
    const btnOpen = listBody.find('.js-open');
    const btnClose = listBody.find('.js-close');
    btnOpen.on('click', function () {
      $(this).parent().next('.toggleBo__cont').slideDown(200);
    });
    btnClose.on('click', function () {
      $(this).parents('.toggleBo__cont').stop().slideUp(200);
    });  
  });
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

  // 헤더 이벤트 활성
  $headerSub.headerSubEvt();
})
