document.addEventListener('DOMContentLoaded', function() {
  const blogSection = document.querySelector('.section-blog');
  const container = document.querySelector('.container-blog');
  const cards = document.querySelectorAll('.card-blog');
  const loadMoreBtn = document.querySelector('.blog-btn');
  
  if (!blogSection || !container || !loadMoreBtn) return;
  
  // Начальное состояние: скрываем все карточки
  cards.forEach((card, index) => {
    if (index >= 6) {
      card.style.display = 'none';
    }
  });
  
  // Функция для определения количества карточек на экране
  function getVisibleCardsCount() {
    return window.innerWidth >= 767 ? 6 : 4;
  }
  
  // Функция для определения количества карточек для загрузки
  function getLoadMoreCount() {
    return window.innerWidth >= 767 ? 3 : 2;
  }
  
  // Функция для подсчета видимых карточек
  function countVisibleCards() {
    return Array.from(cards).filter(card => 
      card.style.display !== 'none' && 
      window.getComputedStyle(card).display !== 'none'
    ).length;
  }
  
  // Функция для проверки, остались ли скрытые карточки
  function hasHiddenCards() {
    return countVisibleCards() < cards.length;
  }
  
  // Функция для обновления текста кнопки
  function updateButtonText() {
    if (hasHiddenCards()) {
      loadMoreBtn.textContent = 'Показать больше';
    } else {
      loadMoreBtn.textContent = 'Скрыть';
    }
  }
  
  // Обработчик клика на кнопку
  loadMoreBtn.addEventListener('click', function() {
    const visibleCount = countVisibleCards();
    const totalCount = cards.length;
    
    if (hasHiddenCards()) {
      // Показываем дополнительные карточки
      const loadCount = getLoadMoreCount();
      let cardsToShow = 0;
      
      for (let i = visibleCount; i < totalCount && cardsToShow < loadCount; i++) {
        cards[i].style.display = 'flex';
        cardsToShow++;
      }
    } else {
      // Скрываем все карточки кроме начальных
      const initialCount = getVisibleCardsCount();
      
      cards.forEach((card, index) => {
        card.style.display = index < initialCount ? 'flex' : 'none';
      });
    }
    
    updateButtonText();
  });
  
  // Обработчик изменения размера окна
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      const initialCount = getVisibleCardsCount();
      const visibleCount = countVisibleCards();
      
      // Если видимых карточек меньше, чем должно быть на этом экране
      if (visibleCount < initialCount) {
        // Показываем карточки до нужного количества
        cards.forEach((card, index) => {
          card.style.display = index < initialCount ? 'flex' : 'none';
        });
      } 
      // Если видимых карточек больше, чем начальное количество, но меньше общего количества
      else if (visibleCount > initialCount && visibleCount < totalCount) {
        // Оставляем как есть
      }
      
      updateButtonText();
    }, 250);
  });
  
  // Инициализация текста кнопки
  updateButtonText();
});