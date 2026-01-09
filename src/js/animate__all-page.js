// Класс для управления анимациями при скролле
class ScrollAnimator {
  constructor() {
    this.animationElements = document.querySelectorAll('.animate-on-scroll');
    this.childrenObservers = new Map(); // Отдельные Observer'ы для детей
    this.init();
  }

  // animate-on-scroll - добавление в класс активирует анимацию 
  // data-animate - сама анимция
  // data-animate-delay - задержка анимации
  // data-animate-parent-delay - задержка анимции дочерняя
  // data-animate-parent-delay - задержка анимции дочерняя

  init() {
    if (!this.animationElements.length) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // знанчие при котором будет показывается анимации при видимости элемента
            const threshold = entry.target.dataset.animateThreshold || 0;
            const intersectionRatio = entry.intersectionRatio;
            
            if (intersectionRatio >= parseFloat(threshold)) {
              this.animateElement(entry.target);
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
      }
    );

    this.animationElements.forEach((element) => {
      observer.observe(element);
    });
  }

  animateElement(element) {
    // 1. Задержка для самого родителя
    const parentDelay = this.parseDelay(element.dataset.animateDelay || "0");
    
    // 2. Анимируем родителя с его задержкой
    setTimeout(() => {
      element.classList.add('animated');
    }, parentDelay);
    
    // 3. Если у родителя есть data-animate-parent-delay + data-animate
    //    создаем отдельные Observer'ы для каждого ребенка
    if (element.dataset.animateParentDelay && element.hasAttribute('data-animate')) {
      this.setupChildrenObservers(element);
    }
  }

  // Создаем отдельные Observer'ы для детей
  setupChildrenObservers(parentElement) {
    // Получаем ТОЛЬКО прямых детей первого уровня
    const directChildren = Array.from(parentElement.children);
    
    if (!directChildren.length) return;
    
    // Получаем тип анимации от родителя
    const parentAnimation = parentElement.dataset.animate;
    const delaySettings = this.parseParentDelay(parentElement.dataset.animateParentDelay);
    
    // Создаем Observer для детей
    const childrenObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const child = entry.target;
            const childIndex = Array.from(parentElement.children).indexOf(child);
            
            // Вычисляем задержку для этого конкретного ребенка
            const delay = delaySettings.baseDelay + (childIndex * delaySettings.increment);
            
            // Наследуем анимацию от родителя
            if (!child.hasAttribute('data-animate')) {
              child.setAttribute('data-animate', parentAnimation);
            }
            
            // Добавляем класс для анимации если нужно
            if (!child.classList.contains('animate-on-scroll')) {
              child.classList.add('animate-on-scroll');
            }
            
            // Устанавливаем CSS переменную для задержки
            child.style.setProperty('--child-delay', `${delay}ms`);
            
            // Анимируем с задержкой
            setTimeout(() => {
              child.classList.add('animated');
            }, delay);
            
            // Прекращаем наблюдение за этим ребенком
            childrenObserver.unobserve(child);
          }
        });
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
      }
    );
    
    // Начинаем наблюдать за каждым ребенком
    directChildren.forEach(child => {
      childrenObserver.observe(child);
    });
    
    // Сохраняем Observer для очистки
    this.childrenObservers.set(parentElement, childrenObserver);
  }

  // Парсим родительскую задержку
  parseParentDelay(delayString) {
    let baseDelay = 0;
    let increment = 100;
    
    if (delayString.includes('+')) {
      const parts = delayString.split(',');
      baseDelay = parseInt(parts[0]) || 0;
      
      if (parts[1] && parts[1].includes('+')) {
        increment = parseInt(parts[1].replace('+', '')) || 100;
      }
    } else if (delayString.includes(',')) {
      const parts = delayString.split(',').map(Number);
      baseDelay = parts[0] || 0;
      increment = parts[1] || 100;
    } else {
      baseDelay = parseInt(delayString) || 0;
    }
    
    return { baseDelay, increment };
  }

  // Парсим простую задержку
  parseDelay(delayString) {
    if (delayString.includes('+')) {
      const parts = delayString.split(',');
      return parseInt(parts[0]) || 0;
    }
    return parseInt(delayString) || 0;
  }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  new ScrollAnimator();
});

// Динамический контент
if (typeof MutationObserver !== 'undefined') {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        const newElements = document.querySelectorAll('.animate-on-scroll:not(.animated)');
        if (newElements.length) {
          new ScrollAnimator();
        }
      }
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
}