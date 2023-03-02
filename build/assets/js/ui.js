
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

// 카카오지도 1.요소, 2.도로명주소, 3.마커위에 인포윈도우
function createMap (mapEl, addr, infoWindow, type) {

  // 지도 실행 스크립트
  var mapContainer = document.getElementById(mapEl), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표 아무곳이든 필수입력
        level: 4 // 지도의 확대 레벨
      };

  // 마커셋팅
  var imageSrc = '../assets/images/common/ico-spot.png',
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

// 토글 컨텐츠
$.fn.toggleEl = function () {
  return this.each(function () {
    const toggleBody = $(this); 
    const btnToggle = toggleBody.find('.toggleEl__btn'); 
    btnToggle.on('click', function () {
      const currentActive = $(this).parent().hasClass('active');
      if (!currentActive) {
        $(this).parent().addClass('active');
        toggleBody.find('.toggleEl__cont').stop().slideDown(200);
      }
      else {
        $(this).parent().removeClass('active');
        toggleBody.find('.toggleEl__cont').stop().slideUp(200);
      }
    });    
  });
}

// 텍스트 에어리어 컴포넌트 textLength 현재 글자수, areaHeight 텍스트 영역만의 높이
$.fn.textArea = function (textLength, areaHeight) {
  const taBody = this;
  const textArea = taBody.find('.textarea__text');
  const taTextCurrent = taBody.find('.textarea__current');
  const taTextTotal = taBody.find('.textarea__total');
  const taOverlay = taBody.find('.textarea__overlay');
  textArea.css('height', areaHeight);
  taTextTotal.text(textLength);
  textArea.on('focusin', function () {
    taOverlay.hide();
  });
  textArea.on('blur', function () {
    if (textArea.val().length == 0) {
      taOverlay.show();
    }
  });
  textArea.on('keyup', function () {
    let valLeng = $(this).val().length;
    taTextCurrent.text(valLeng);
  });
}

// 문서 로드 후 실행
$(document).ready(function () {
  // 하단메뉴 상단 뎁스 활성화
  if (typeof page != 'undefined') {
    if (page == 'lawyer') {
      $('.mm-item').eq(0).find('.mm-btn').addClass('active');
    } else if (page == 'da') {
      $('.mm-item').eq(1).find('.mm-btn').addClass('active');
    } else if (page == 'detective') {
      $('.mm-item').eq(2).find('.mm-btn').addClass('active');
    } else if (page == 'event') {
      $('.mm-item').eq(3).find('.mm-btn').addClass('active');
    } else if (page == 'service') {
      $('.mm-item').eq(4).find('.mm-btn').addClass('active');
    }
  }
});
