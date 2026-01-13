document.addEventListener('DOMContentLoaded', function() {
  // Массив всех возможных ID счетчиков
  const counterIds = ['counter-main', 'counter-drive', 'counter-adv'];
  
  // Обрабатываем каждый счетчик
  counterIds.forEach(counterId => {
    const numberElement = document.getElementById(counterId);
    
    // Если элемента с таким ID нет на странице - пропускаем
    if (!numberElement) return;
    
    // 1. Берем статическое число из HTML - УЛУЧШЕННЫЙ ПАРСИНГ
    let staticNumber;
    const textContent = numberElement.textContent.trim();
    
    // Убираем все нецифровые символы (пробелы, переносы строк и т.д.)
    const cleanText = textContent.replace(/\s/g, ''); // Убираем все пробелы
    const numberMatch = cleanText.match(/\d+/);
    
    if (numberMatch) {
      staticNumber = parseInt(numberMatch[0], 10);
    } else {
      return; // Если не нашли число - выходим
    }
    
    // 2. Сразу генерируем случайное число в пределах ±30-40% от статического
    let currentNumber;
    
    if (!isNaN(staticNumber) && staticNumber > 0) {
      // Рассчитываем диапазон: ±30-40% от статического числа
      const minPercent = 30; // Минимум -30%
      const maxPercent = 40; // Максимум +40%
      
      const minReduction = Math.floor(staticNumber * (minPercent / 100));
      const maxIncrease = Math.floor(staticNumber * (maxPercent / 100));
      
      // Гарантируем, что минимальное значение не меньше 1
      const minValue = Math.max(1, staticNumber - minReduction);
      const maxValue = staticNumber + maxIncrease;
      
      currentNumber = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    } else {
      // Если нет валидного числа, не делаем ничего
      console.warn(`${counterId}: Невалидное статическое число: ${staticNumber}`);
      return;
    }
    
    // 3. Сразу обновляем элемент с анимацией появления
    numberElement.textContent = formatNumber(currentNumber);
    numberElement.style.opacity = '0';
    numberElement.style.transform = 'translateY(10px)';
    numberElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    // Анимация появления
    setTimeout(() => {
      numberElement.style.opacity = '1';
      numberElement.style.transform = 'translateY(0)';
    }, 100);
    
    // 4. Функция для расчета разброса (теперь процентный)
    function calculateSpread(baseNumber) {
      // Рассчитываем процент разброса в зависимости от величины числа
      let minPercent, maxPercent;
      
      if (baseNumber < 1000) {
        minPercent = 10;  // -10% для маленьких чисел
        maxPercent = 15;  // +15% для маленьких чисел
      } else if (baseNumber < 10000) {
        minPercent = 20;  // -20% для средних чисел
        maxPercent = 25;  // +25% для средних чисел
      } else {
        minPercent = 30;  // -30% для больших чисел
        maxPercent = 40;  // +40% для больших чисел
      }
      
      const minReduction = Math.floor(baseNumber * (minPercent / 100));
      const maxIncrease = Math.floor(baseNumber * (maxPercent / 100));
      
      return {
        min: Math.max(1, minReduction),
        max: maxIncrease,
        minPercent: minPercent,
        maxPercent: maxPercent
      };
    }
    
    // 5. Функция для форматирования числа (с разделителями)
    function formatNumber(num) {
      return num.toLocaleString('ru-RU');
    }
    
    // 6. Функция для обновления числа (каждые 20 секунд)
    function updateNumber() {
      const spread = calculateSpread(currentNumber);
      const min = Math.max(1, currentNumber - spread.min);
      const max = currentNumber + spread.max;
      
      // Гарантируем, что новое число не выйдет за пределы ±30-40% от ИСХОДНОГО статического
      const absoluteMin = Math.max(1, Math.floor(staticNumber * 0.7));  // Не менее 70% от исходного
      const absoluteMax = Math.floor(staticNumber * 1.4);               // Не более 140% от исходного
      
      const finalMin = Math.max(min, absoluteMin);
      const finalMax = Math.min(max, absoluteMax);
      
      // Если min > max после ограничений, корректируем
      const adjustedMin = Math.min(finalMin, finalMax);
      const adjustedMax = Math.max(finalMin, finalMax);
      
      const newNumber = Math.floor(Math.random() * (adjustedMax - adjustedMin + 1)) + adjustedMin;
      
      console.log(`${counterId}: ${formatNumber(currentNumber)} → ${formatNumber(newNumber)}`);
      console.log(`  Диапазон расчета: ${formatNumber(min)}-${formatNumber(max)}`);
      console.log(`  Ограничения: ${formatNumber(absoluteMin)}-${formatNumber(absoluteMax)}`);
      console.log(`  Финальный диапазон: ${formatNumber(adjustedMin)}-${formatNumber(adjustedMax)}`);
      
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
        numberElement.textContent = formatNumber(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Обновляем currentNumber после завершения анимации
          currentNumber = newNumber;
          
          // Сохраняем состояние с уникальным ключом
          localStorage.setItem(`counterNumber_${counterId}`, currentNumber);
          localStorage.setItem(`counterTime_${counterId}`, Date.now());
          
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
    
    // 7. Запускаем периодическое обновление каждые 20 секунд
    // Первое обновление через 15 секунд после загрузки
    setTimeout(() => {
      updateNumber();
      setInterval(updateNumber, 20000);
    }, 5000);
    
    // 8. Добавляем возможность ручного обновления по клику
    numberElement.style.cursor = 'pointer';
    numberElement.title = 'Нажмите для обновления числа';
    numberElement.addEventListener('click', updateNumber);
    
    // 9. Восстанавливаем состояние при загрузке (если прошло меньше часа)
    const savedNumber = localStorage.getItem(`counterNumber_${counterId}`);
    const savedTime = localStorage.getItem(`counterTime_${counterId}`);
    
    if (savedNumber && savedTime) {
      const timePassed = Date.now() - parseInt(savedTime);
      const hoursPassed = timePassed / (1000 * 60 * 60);
      
      if (hoursPassed < 1) { // Восстанавливаем если прошло меньше часа
        const restoredNumber = parseInt(savedNumber);
        if (!isNaN(restoredNumber) && restoredNumber > 0) {
          // Проверяем, что восстановленное число в допустимых пределах
          const absoluteMin = Math.floor(staticNumber * 0.7);
          const absoluteMax = Math.floor(staticNumber * 1.4);
          
          if (restoredNumber >= absoluteMin && restoredNumber <= absoluteMax) {
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
                numberElement.textContent = formatNumber(currentValue);
                
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
          } else {
            console.warn(`${counterId}: Восстановленное число ${restoredNumber} вне допустимого диапазона ${absoluteMin}-${absoluteMax}`);
          }
        }
      }
    }
    
    // 10. Сохраняем состояние при закрытии страницы
    window.addEventListener('beforeunload', function() {
      localStorage.setItem(`counterNumber_${counterId}`, currentNumber);
      localStorage.setItem(`counterTime_${counterId}`, Date.now());
    });
  });
});