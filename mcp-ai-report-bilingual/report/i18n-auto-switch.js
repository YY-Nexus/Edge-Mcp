<script>
// 国际化优化：自动检测浏览器语言并切换
window.onload = function() {
  var lang = navigator.language || navigator.userLanguage;
  if (lang.startsWith('en')) switchLang('en');
  else switchLang('zh');
}
</script>
