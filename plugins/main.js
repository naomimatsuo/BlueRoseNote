import bootstrap from 'bootstrap'
import jQuery from 'jquery'
import * as d3 from 'd3'

global.jquery = jQuery
global.$ = jQuery
global.d3 = d3
window.$ = window.jQuery = require('jquery')

function getNowString (now) {
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  return year + '/' + get0PaddingString(month) + '/' + get0PaddingString(date) + ' ' + get0PaddingString(hour) + ':' + get0PaddingString(minutes) + ':' + get0PaddingString(seconds);
}

function get0PaddingString (num) {
  return String(num).padStart(2, '0');
}

function getCommunityCategory (no) {
  if (no === 1) { return '頭・顔・口'; }
  if (no === 2) { return '目'; }
  if (no === 3) { return '鼻'; }
  if (no === 4) { return '耳'; }
  if (no === 5) { return '首・のど'; }
  if (no === 6) { return '胸 (肺・心臓)'; }
  if (no === 7) { return '腹 (胃腸・肝臓)'; }
  if (no === 8) { return '子宮'; }
  if (no === 9) { return '手'; }
  if (no === 10) { return '足'; }
  if (no === 11) { return '背中・腰'; }
  if (no === 12) { return '腎臓・膵臓'; }
  if (no === 13) { return '陰部・肛門'; }
  if (no === 14) { return '皮膚'; }
  if (no === 15) { return '骨・関節'; }
  if (no === 16) { return '脳・脊髄'; }
  if (no === 17) { return '筋肉'; }
  if (no === 18) { return '末梢神経'; }
  if (no === 19) { return '血液・血管'; }
  if (no === 20) { return 'リンパ球・節'; }
  if (no === 21) { return 'こころ'; }
  if (no === 22) { return '全身'; }
  if (no === 23) { return 'その他'; }
  return '';
}

function getAscii (userName) {
  return userName.split('')
    .map(function (char) {
      return char.charCodeAt(0);
    })
    .reduce(function (current, previous) {
      return String(previous) + String(current);
    });
}

export default (context, inject) => {
  inject('getNowString', getNowString);
  inject('getCommunityCategory', getCommunityCategory);
  inject('getAscii', getAscii);
}

window.addEventListener('popstate', function () {
  $('.modal').modal('hide');
});