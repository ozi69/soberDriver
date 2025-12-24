  document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, существует ли элемент свайпера
    const swiperElement = document.querySelector('.swiper');
    
    if (!swiperElement) {
      console.warn('Swiper element not found');
      return;
    }
    
    // Инициализируем Swiper
    const swiper = new Swiper('.swiper', {
      // Параметры
      slidesPerView: 'auto', // Автоматическая ширина слайдов
      spaceBetween: 24, // Отступ между слайдами
      centeredSlides: true, // Центрирование активного слайда
      loop: true, // Бесконечная прокрутка
      speed: 500, // Скорость анимации
      
      // Пагинация
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
        renderBullet: function (index, className) {
          return '<span class="' + className + '"></span>';
        },
      },
      
      // Навигация
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      
      // Адаптивность
      breakpoints: {
        // На мобильных
        320: {
          spaceBetween: 16,
          centeredSlides: true,
        },
        // На планшетах
        768: {
          spaceBetween: 20,
          centeredSlides: true,
        },
        // На десктопах
        1024: {
          spaceBetween: 24,
          centeredSlides: true,
        }
      },
      
      // Эффекты
      effect: 'slide', // или 'fade', 'cube', 'coverflow'
      
      // Автопрокрутка (опционально)
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
    });
    
    // Добавляем функционал перетаскивания для мобильных
    swiperElement.addEventListener('touchstart', function(e) {
      this.classList.add('dragging');
    });
    
    swiperElement.addEventListener('touchend', function(e) {
      this.classList.remove('dragging');
    });
  });