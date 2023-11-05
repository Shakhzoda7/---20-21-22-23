//Смена и сохранение темы

const bodyClass = document.body.classList;
const savedTheme = localStorage.getItem('theme') || 'light';
bodyClass.add(savedTheme);

document.querySelector('.changeMode').addEventListener('click', () => {
  const isDark = bodyClass.contains('dark-theme');
  bodyClass.toggle('light-theme', isDark);
  bodyClass.toggle('dark-theme', !isDark);
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});