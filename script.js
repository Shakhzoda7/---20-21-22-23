function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}
  
function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }
}
  
const changeModeButton = document.querySelector('.changeMode');
  if (changeModeButton) {
    changeModeButton.addEventListener('click', toggleTheme);
}
  
applySavedTheme();