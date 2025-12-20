document.addEventListener('DOMContentLoaded', function() {
  const burger = document.querySelector('.burger');
  const burgerMenu = document.querySelector('.burger-menu');
  const burgerMenuClose = document.querySelector('.burger-menu__close');
  const burgerOverlay = document.querySelector('.burger-menu__overlay');
  const burgerLinks = document.querySelectorAll('.burger-item__link');
  
  // Открытие меню
  burger.addEventListener('click', function() {
    this.classList.toggle('active');
    burgerMenu.classList.toggle('active');
    // Блокируем скролл страницы
    document.body.style.overflow = 'hidden';
    // Скрываем бургер иконку при открытии меню
    this
  });
  
  // Закрытие меню
  function closeMenu() {
    // Убираем active у всех элементов
    burger.classList.remove('active');
    burgerMenu.classList.remove('active');
    // Возвращаем скролл страницы
    document.body.style.overflow = '';
    // Показываем бургер иконку обратно
  }
  
  // Закрытие по кнопке крестика
  burgerMenuClose.addEventListener('click', closeMenu);
  
  // Закрытие по клику на оверлей
  burgerOverlay.addEventListener('click', closeMenu);
  
  // Закрытие меню при клике на ссылку
  burgerLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
});