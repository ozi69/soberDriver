// // Класс для управления анимациями при скролле
// class ScrollAnimator {
//   constructor() {
//     this.animationElements = document.querySelectorAll('.animate-on-scroll');
//     this.init();
//   }

//   init() {
//     if (!this.animationElements.length) return;
    
//     // Создаем IntersectionObserver для отслеживания видимости
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const threshold = entry.target.dataset.animateThreshold || 0.1;
//             const intersectionRatio = entry.intersectionRatio;
            
//             // Проверяем, виден ли элемент на указанный процент
//             if (intersectionRatio >= parseFloat(threshold)) {
//               this.animateElement(entry.target);
//               observer.unobserve(entry.target); // Прекращаем наблюдение после анимации
//             }
//           }
//         });
//       },
//       {
//         threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
//       }
//     );

//     // Начинаем наблюдение за всеми элементами
//     this.animationElements.forEach((element) => {
//       observer.observe(element);
//     });
//   }

//   animateElement(element) {
//     // Добавляем класс для запуска анимации
//     element.classList.add('animated');
    
//     // Обработка дочерних элементов с задержкой
//     this.animateChildElements(element);
//   }

//   animateChildElements(parent) {
//     const children = parent.querySelectorAll('[data-animate-child]');
//     if (!children.length) return;

//     children.forEach((child, index) => {
//       const delay = child.dataset.animateChildDelay || (index * 100);
      
//       setTimeout(() => {
//         child.classList.add('animated');
//       }, delay);
//     });
//   }
// }

// // Инициализация при загрузке страницы
// document.addEventListener('DOMContentLoaded', () => {
//   new ScrollAnimator();
// });

// // Также инициализируем при динамической загрузке контента
// if (typeof MutationObserver !== 'undefined') {
//   const observer = new MutationObserver((mutations) => {
//     mutations.forEach((mutation) => {
//       if (mutation.addedNodes.length) {
//         // Проверяем, добавлены ли новые элементы с анимацией
//         const newElements = document.querySelectorAll('.animate-on-scroll:not(.animated)');
//         if (newElements.length) {
//           new ScrollAnimator();
//         }
//       }
//     });
//   });

//   observer.observe(document.body, { childList: true, subtree: true });
// }














// // Класс для управления анимациями при скролле
// class ScrollAnimator {
//   constructor() {
//     this.animationElements = document.querySelectorAll('.animate-on-scroll');
//     this.init();
//   }

//   init() {
//     if (!this.animationElements.length) return;
    
//     // Создаем IntersectionObserver для отслеживания видимости
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const threshold = entry.target.dataset.animateThreshold || 0.1;
//             const intersectionRatio = entry.intersectionRatio;
            
//             // Проверяем, виден ли элемент на указанный процент
//             if (intersectionRatio >= parseFloat(threshold)) {
//               this.animateElement(entry.target);
//               observer.unobserve(entry.target); // Прекращаем наблюдение после анимации
//             }
//           }
//         });
//       },
//       {
//         threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
//       }
//     );

//     // Начинаем наблюдение за всеми элементами
//     this.animationElements.forEach((element) => {
//       observer.observe(element);
//     });
//   }

//   animateElement(element) {
//     // Получаем задержку из data-атрибута (в миллисекундах)
//     const delay = element.dataset.animateDelay 
//       ? parseInt(element.dataset.animateDelay) 
//       : 0;
    
//     // Анимируем с задержкой
//     setTimeout(() => {
//       element.classList.add('animated');
//     }, delay);
    
//     // Обработка дочерних элементов с задержкой (старая функциональность сохраняется)
//     this.animateChildElements(element);
//   }

//   animateChildElements(parent) {
//     const children = parent.querySelectorAll('[data-animate-child]');
//     if (!children.length) return;

//     children.forEach((child, index) => {
//       const delay = child.dataset.animateChildDelay || (index * 100);
      
//       setTimeout(() => {
//         child.classList.add('animated');
//       }, delay);
//     });
//   }
// }

// // Инициализация при загрузке страницы
// document.addEventListener('DOMContentLoaded', () => {
//   new ScrollAnimator();
// });

// // Также инициализируем при динамической загрузке контента
// if (typeof MutationObserver !== 'undefined') {
//   const observer = new MutationObserver((mutations) => {
//     mutations.forEach((mutation) => {
//       if (mutation.addedNodes.length) {
//         // Проверяем, добавлены ли новые элементы с анимацией
//         const newElements = document.querySelectorAll('.animate-on-scroll:not(.animated)');
//         if (newElements.length) {
//           new ScrollAnimator();
//         }
//       }
//     });
//   });

//   observer.observe(document.body, { childList: true, subtree: true });
// }














// // Класс для управления анимациями при скролле
// class ScrollAnimator {
//   constructor() {
//     this.animationElements = document.querySelectorAll('.animate-on-scroll');
//     this.init();
//   }

//   init() {
//     if (!this.animationElements.length) return;
    
//     // Создаем IntersectionObserver для отслеживания видимости
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const threshold = entry.target.dataset.animateThreshold || 0.1;
//             const intersectionRatio = entry.intersectionRatio;
            
//             // Проверяем, виден ли элемент на указанный процент
//             if (intersectionRatio >= parseFloat(threshold)) {
//               this.animateElement(entry.target);
//               observer.unobserve(entry.target); // Прекращаем наблюдение после анимации
//             }
//           }
//         });
//       },
//       {
//         threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
//       }
//     );

//     // Начинаем наблюдение за всеми элементами
//     this.animationElements.forEach((element) => {
//       observer.observe(element);
//     });
//   }

//   animateElement(element) {
//     // Задержка для родителя
//     const parentDelay = this.parseDelay(element.dataset.animateDelay || "0");
    
//     // Анимируем родителя с задержкой
//     setTimeout(() => {
//       element.classList.add('animated');
//     }, parentDelay);
    
//     // Обработка дочерних элементов с родительской задержкой
//     if (element.dataset.animateParentDelay) {
//       this.animateChildrenWithParentDelay(element);
//     }
//   }

//   // Анимация детей с родительской задержкой (автоматически ищет data-animate)
//   animateChildrenWithParentDelay(parentElement) {
//     // Автоматически находим ВСЕХ детей с data-animate внутри родителя
//     const children = Array.from(parentElement.querySelectorAll('[data-animate]'));
    
//     if (!children.length) return;
    
//     // Парсим настройки задержки из родителя
//     const delaySettings = this.parseParentDelay(parentElement.dataset.animateParentDelay);
    
//     children.forEach((child, index) => {
//       // Вычисляем задержку: база + (индекс * шаг)
//       const delay = delaySettings.baseDelay + (index * delaySettings.increment);
      
//       // Устанавливаем CSS переменную для transition-delay
//       child.style.setProperty('--child-delay', `${delay}ms`);
      
//       // Анимируем с задержкой
//       setTimeout(() => {
//         child.classList.add('animated');
//       }, delay);
//     });
//   }

//   // Парсим родительскую задержку в формате "база,+шаг"
//   parseParentDelay(delayString) {
//     let baseDelay = 0;
//     let increment = 100;
    
//     if (delayString.includes('+')) {
//       // Формат "100,+300"
//       const parts = delayString.split(',');
//       baseDelay = parseInt(parts[0]) || 0;
      
//       if (parts[1] && parts[1].includes('+')) {
//         increment = parseInt(parts[1].replace('+', '')) || 100;
//       }
//     } else if (delayString.includes(',')) {
//       // Формат "100,300" (старый)
//       const parts = delayString.split(',').map(Number);
//       baseDelay = parts[0] || 0;
//       increment = parts[1] || 100;
//     } else {
//       // Просто число "100"
//       baseDelay = parseInt(delayString) || 0;
//     }
    
//     return { baseDelay, increment };
//   }

//   // Парсим простую задержку (для родителя)
//   parseDelay(delayString) {
//     if (delayString.includes('+')) {
//       const parts = delayString.split(',');
//       return parseInt(parts[0]) || 0;
//     }
//     return parseInt(delayString) || 0;
//   }
// }

// // Инициализация при загрузке страницы
// document.addEventListener('DOMContentLoaded', () => {
//   new ScrollAnimator();
// });

// // Также инициализируем при динамической загрузке контента
// if (typeof MutationObserver !== 'undefined') {
//   const observer = new MutationObserver((mutations) => {
//     mutations.forEach((mutation) => {
//       if (mutation.addedNodes.length) {
//         // Проверяем, добавлены ли новые элементы с анимацией
//         const newElements = document.querySelectorAll('.animate-on-scroll:not(.animated)');
//         if (newElements.length) {
//           new ScrollAnimator();
//         }
//       }
//     });
//   });

//   observer.observe(document.body, { childList: true, subtree: true });
// }




















// // Класс для управления анимациями при скролле
// class ScrollAnimator {
//   constructor() {
//     this.animationElements = document.querySelectorAll('.animate-on-scroll');
//     this.init();
//   }

//   init() {
//     if (!this.animationElements.length) return;
    
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const threshold = entry.target.dataset.animateThreshold || 0.1;
//             const intersectionRatio = entry.intersectionRatio;
            
//             if (intersectionRatio >= parseFloat(threshold)) {
//               this.animateElement(entry.target);
//               observer.unobserve(entry.target);
//             }
//           }
//         });
//       },
//       {
//         threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
//       }
//     );

//     this.animationElements.forEach((element) => {
//       observer.observe(element);
//     });
//   }

//   animateElement(element) {
//     // 1. НАСЛЕДОВАНИЕ opacity от родителя .animate-on-scroll
//     this.inheritOpacityAnimation(element);
    
//     // 2. Задержка для самого элемента (если указана)
//     const elementDelay = this.parseDelay(element.dataset.animateDelay || "0");
    
//     // 3. Анимируем элемент с его собственной задержкой
//     setTimeout(() => {
//       element.classList.add('animated');
//     }, elementDelay);
    
//     // 4. Обработка детей с родительской задержкой
//     if (element.dataset.animateParentDelay) {
//       this.animateChildrenWithParentDelay(element);
//     }
//   }

//   // НАСЛЕДОВАНИЕ opacity от .animate-on-scroll родителя
//   inheritOpacityAnimation(element) {
//     // Проверяем, есть ли у элемента класс .animate-on-scroll
//     // Если нет, но у него есть data-animate - наследуем opacity
//     if (!element.classList.contains('animate-on-scroll') && 
//         element.hasAttribute('data-animate')) {
      
//       // Наследуем базовые стили
//       element.classList.add('animate-on-scroll');
//     }
//   }

//   // Анимация детей с родительской задержкой
//   animateChildrenWithParentDelay(parentElement) {
//     // Ищем детей с data-animate
//     const children = Array.from(parentElement.querySelectorAll('[data-animate]'))
//       .filter(child => child !== parentElement); // исключаем сам родитель
    
//     if (!children.length) return;
    
//     // Наследуем opacity для детей
//     children.forEach(child => this.inheritOpacityAnimation(child));
    
//     // Парсим задержку родителя
//     const delaySettings = this.parseParentDelay(parentElement.dataset.animateParentDelay);
    
//     children.forEach((child, index) => {
//       // Вычисляем задержку
//       const delay = delaySettings.baseDelay + (index * delaySettings.increment);
      
//       // Устанавливаем CSS переменную
//       child.style.setProperty('--child-delay', `${delay}ms`);
      
//       // Анимируем с задержкой
//       setTimeout(() => {
//         child.classList.add('animated');
//       }, delay);
//     });
//   }

//   // Парсим родительскую задержку
//   parseParentDelay(delayString) {
//     let baseDelay = 0;
//     let increment = 100;
    
//     if (delayString.includes('+')) {
//       const parts = delayString.split(',');
//       baseDelay = parseInt(parts[0]) || 0;
      
//       if (parts[1] && parts[1].includes('+')) {
//         increment = parseInt(parts[1].replace('+', '')) || 100;
//       }
//     } else if (delayString.includes(',')) {
//       const parts = delayString.split(',').map(Number);
//       baseDelay = parts[0] || 0;
//       increment = parts[1] || 100;
//     } else {
//       baseDelay = parseInt(delayString) || 0;
//     }
    
//     return { baseDelay, increment };
//   }

//   // Парсим простую задержку
//   parseDelay(delayString) {
//     if (delayString.includes('+')) {
//       const parts = delayString.split(',');
//       return parseInt(parts[0]) || 0;
//     }
//     return parseInt(delayString) || 0;
//   }
// }

// // Инициализация
// document.addEventListener('DOMContentLoaded', () => {
//   new ScrollAnimator();
// });

// // Динамический контент
// if (typeof MutationObserver !== 'undefined') {
//   const observer = new MutationObserver((mutations) => {
//     mutations.forEach((mutation) => {
//       if (mutation.addedNodes.length) {
//         const newElements = document.querySelectorAll('.animate-on-scroll:not(.animated)');
//         if (newElements.length) {
//           new ScrollAnimator();
//         }
//       }
//     });
//   });
//   observer.observe(document.body, { childList: true, subtree: true });
// }












// // Класс для управления анимациями при скролле
// class ScrollAnimator {
//   constructor() {
//     this.animationElements = document.querySelectorAll('.animate-on-scroll');
//     this.init();
//   }

//   init() {
//     if (!this.animationElements.length) return;
    
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const threshold = entry.target.dataset.animateThreshold || 0;
//             const intersectionRatio = entry.intersectionRatio;
            
//             if (intersectionRatio >= parseFloat(threshold)) {
//               this.animateElement(entry.target);
//               observer.unobserve(entry.target);
//             }
//           }
//         });
//       },
//       {
//         threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
//       }
//     );

//     this.animationElements.forEach((element) => {
//       observer.observe(element);
//     });
//   }

//   animateElement(element) {
//     // 1. Задержка для самого родителя
//     const parentDelay = this.parseDelay(element.dataset.animateDelay || "0");
    
//     // 2. Анимируем родителя с его задержкой
//     setTimeout(() => {
//       element.classList.add('animated');
//     }, parentDelay);
    
//     // 3. Если у родителя есть data-animate-parent-delay + data-animate
//     //    применяем анимацию ко всем прямым детям
//     if (element.dataset.animateParentDelay && element.hasAttribute('data-animate')) {
//       this.animateDirectChildren(element);
//     }
//   }

//   // Анимация прямых детей с наследованием анимации от родителя
//   animateDirectChildren(parentElement) {
//     // Получаем ТОЛЬКО прямых детей первого уровня
//     const directChildren = Array.from(parentElement.children);
    
//     if (!directChildren.length) return;
    
//     // Получаем тип анимации от родителя
//     const parentAnimation = parentElement.dataset.animate;
//     const delaySettings = this.parseParentDelay(parentElement.dataset.animateParentDelay);
    
//     directChildren.forEach((child, index) => {
//       // Вычисляем задержку
//       const delay = delaySettings.baseDelay + (index * delaySettings.increment);
      
//       // Наследуем анимацию от родителя
//       if (!child.hasAttribute('data-animate')) {
//         child.setAttribute('data-animate', parentAnimation);
//       }
      
//       // Добавляем класс для анимации если нужно
//       if (!child.classList.contains('animate-on-scroll')) {
//         child.classList.add('animate-on-scroll');
//       }
      
//       // Устанавливаем CSS переменную для задержки
//       child.style.setProperty('--child-delay', `${delay}ms`);
      
//       // Анимируем с задержкой
//       setTimeout(() => {
//         child.classList.add('animated');
//       }, delay);
//     });
//   }

//   // Парсим родительскую задержку в формате "база,+шаг"
//   parseParentDelay(delayString) {
//     let baseDelay = 0;
//     let increment = 100;
    
//     if (delayString.includes('+')) {
//       const parts = delayString.split(',');
//       baseDelay = parseInt(parts[0]) || 0;
      
//       if (parts[1] && parts[1].includes('+')) {
//         increment = parseInt(parts[1].replace('+', '')) || 100;
//       }
//     } else if (delayString.includes(',')) {
//       const parts = delayString.split(',').map(Number);
//       baseDelay = parts[0] || 0;
//       increment = parts[1] || 100;
//     } else {
//       baseDelay = parseInt(delayString) || 0;
//     }
    
//     return { baseDelay, increment };
//   }

//   // Парсим простую задержку
//   parseDelay(delayString) {
//     if (delayString.includes('+')) {
//       const parts = delayString.split(',');
//       return parseInt(parts[0]) || 0;
//     }
//     return parseInt(delayString) || 0;
//   }
// }

// // Инициализация
// document.addEventListener('DOMContentLoaded', () => {
//   new ScrollAnimator();
// });

// // Динамический контент
// if (typeof MutationObserver !== 'undefined') {
//   const observer = new MutationObserver((mutations) => {
//     mutations.forEach((mutation) => {
//       if (mutation.addedNodes.length) {
//         const newElements = document.querySelectorAll('.animate-on-scroll:not(.animated)');
//         if (newElements.length) {
//           new ScrollAnimator();
//         }
//       }
//     });
//   });
//   observer.observe(document.body, { childList: true, subtree: true });
// }











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