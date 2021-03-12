/*
  1)clock에 시계 담기
  2)body 로드하기
  3)clock 호출하고 반복
  4)버튼 클릭하면 멈춤
  */
function clock() {
  var now = new Date();
  var yy = now.getFullYear();
  var mm = now.getMonth() + 1;
  var dd = now.getDate();
  var day = now.getDay();
  var h = now.getHours();
  var m = now.getMinutes();
  var s = now.getSeconds();

  // console.log(yy, mm, dd, day, h, m, s);

  var dayArr = ['일', '월', '화', '수', '목', '금', '토'];
  var ampm = h < 12 ? '오전' : '오후';
  h %= 12;
  if (h === 0) h = 12;
  if (mm < 10) mm = '0' + mm;
  if (dd < 10) dd = '0' + dd;
  if (h < 10) h = '0' + h;
  if (m < 10) m = '0' + m;
  if (s < 10) s = '0' + s;

  // console.log(dayArr[5], ampm, h, m, s);
  var result =
    ampm +
    h +
    ':' +
    m +
    ':' +
    s +
    '<br>' +
    mm +
    '-' +
    dd +
    dayArr[5] +
    '요일';

  // console.log(result);
  document.getElementById('digital').innerHTML = result;
}
window.addEventListener('load', function () {
  clock();
  var timer = setInterval(function () {
    clock();
  }, 1000);

  document
    .getElementById('btnStop')
    .addEventListener('click', function () {
      clearInterval(timer);
    });
  document
    .getElementById('btnStart')
    .addEventListener('click', function () {
      timer = setInterval(clock, 1000);
    });
});