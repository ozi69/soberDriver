document.addEventListener('DOMContentLoaded', function() {
  const numberElement = document.querySelector('.counter-people');
  
  if (!numberElement) return;
  
  // 1. Берем статическое число из HTML
  const staticNumber = parseInt(numberElement.textContent.trim());
  
  // 2. Сразу генерируем случайное число в пределах ±50 от статического
  let currentNumber;
  
  if (!isNaN(staticNumber) && staticNumber > 0) {
    // Генерируем начальное число: от (staticNumber - 50) до (staticNumber + 50)
    const minStart = Math.max(1, staticNumber - 50);
    const maxStart = staticNumber + 50;
    currentNumber = Math.floor(Math.random() * (maxStart - minStart + 1)) + minStart;
  } else {
    // Если нет статического числа, ищем в тексте
    const text = numberElement.textContent;
    const numberMatch = text.match(/\d+/);
    
    if (numberMatch) {
      const staticNum = parseInt(numberMatch[0]);
      const minStart = Math.max(1, staticNum - 50);
      const maxStart = staticNum + 50;
      currentNumber = Math.floor(Math.random() * (maxStart - minStart + 1)) + minStart;
      console.log(`Нашел в тексте: ${staticNum}, Начальное случайное: ${currentNumber}`);
    } else {
      // Если совсем не нашли, используем рандомное число 1000-2000
      currentNumber = Math.floor(Math.random() * 1001) + 1000;
      console.log(`Не нашел число, генерирую: ${currentNumber}`);
    }
  }
  
  // 3. Сразу обновляем элемент с анимацией появления
  numberElement.textContent = currentNumber;
  numberElement.style.opacity = '0';
  numberElement.style.transform = 'translateY(10px)';
  numberElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  
  // Анимация появления
  setTimeout(() => {
    numberElement.style.opacity = '1';
    numberElement.style.transform = 'translateY(0)';
  }, 100);
  
  // 4. Функция для расчета разброса (уже адаптивная)
  function calculateSpread(baseNumber) {
    if (baseNumber < 100) {
      return { min: 5, max: 10 };
    } else if (baseNumber < 300) {
      return { min: 10, max: 20 };
    } else if (baseNumber < 1000) {
      return { min: 20, max: 40 };
    } else if (baseNumber < 3000) {
      return { min: 30, max: 50 };
    } else {
      return { min: 100, max: 200 };
    }
  }
  
  // 5. Функция для обновления числа (каждые 20 секунд)
  function updateNumber() {
    const spread = calculateSpread(currentNumber);
    const min = Math.max(1, currentNumber - spread.min);
    const max = currentNumber + spread.max;
    
    const newNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    
    // Сохраняем начальное значение для анимации
    const startNumber = currentNumber;
    
    // Плавная анимация изменения
    numberElement.style.transition = 'all 0.8s ease';
    numberElement.style.transform = 'translateY(-5px)';
    numberElement.style.color = 'var(--color-puple--500)';
    numberElement.style.textShadow = '0 0 10px rgba(124, 96, 245, 0.3)';
    
    // Плавное изменение числа
    const duration = 800;
    const startTime = Date.now();
    
    function animate() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing функция для плавности
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = Math.floor(startNumber + (newNumber - startNumber) * easeProgress);
      numberElement.textContent = currentValue;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Обновляем currentNumber после завершения анимации
        currentNumber = newNumber;
        
        // Завершение анимации
        setTimeout(() => {
          numberElement.style.transform = '';
          numberElement.style.color = '';
          numberElement.style.textShadow = '';
        }, 300);
      }
    }
    
    animate();
  }
  
  // 6. Запускаем периодическое обновление каждые 20 секунд
  // Первое обновление через 15 секунд после загрузки
  setTimeout(() => {
    updateNumber();
    setInterval(updateNumber, 20000);
  }, 15000);
  
  // 7. Добавляем возможность ручного обновления по клику
  numberElement.style.cursor = 'pointer';
  numberElement.title = 'Нажмите для обновления числа';
  numberElement.addEventListener('click', updateNumber);
  
  // 8. Сохраняем состояние при закрытии страницы
  window.addEventListener('beforeunload', function() {
    localStorage.setItem('counterPeopleNumber', currentNumber);
    localStorage.setItem('counterPeopleTime', Date.now());
  });
  
  // 9. Восстанавливаем состояние при загрузке (если прошло меньше часа)
  const savedNumber = localStorage.getItem('counterPeopleNumber');
  const savedTime = localStorage.getItem('counterPeopleTime');
  
  if (savedNumber && savedTime) {
    const timePassed = Date.now() - parseInt(savedTime);
    const hoursPassed = timePassed / (1000 * 60 * 60);
    
    if (hoursPassed < 1) { // Восстанавливаем если прошло меньше часа
      const restoredNumber = parseInt(savedNumber);
      if (!isNaN(restoredNumber) && restoredNumber > 0) {
        // Плавно меняем на сохраненное число
        setTimeout(() => {
          const start = currentNumber;
          const end = restoredNumber;
          currentNumber = end;
          
          numberElement.style.transition = 'all 1s ease';
          numberElement.style.color = 'var(--color-puple--500)';
          
          const duration = 1000;
          const startTime = Date.now();
          
          function restoreAnimate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(start + (end - start) * easeProgress);
            numberElement.textContent = currentValue;
            
            if (progress < 1) {
              requestAnimationFrame(restoreAnimate);
            } else {
              setTimeout(() => {
                numberElement.style.color = '';
              }, 300);
            }
          }
          
          restoreAnimate();
        }, 2000);
      }
    }
  }
});