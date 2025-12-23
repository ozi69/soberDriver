document.addEventListener('DOMContentLoaded', function() {
  const numberElement = document.querySelector('.counter-people');
  
  if (!numberElement) return;
  
  // Сначала берем число из статики на сайте
  let currentNumber = parseInt(numberElement.textContent.trim());
  
  // Если не удалось распарсить (например, пустая строка), используем fallback
  if (isNaN(currentNumber)) {
    // Проверяем, есть ли число в тексте (может быть с пробелами)
    const text = numberElement.textContent;
    const numberMatch = text.match(/\d+/);
    currentNumber = numberMatch ? parseInt(numberMatch[0]) : 1524;
    
    // Обновляем элемент правильным числом
    numberElement.textContent = currentNumber;
  }
  
  console.log('Начальное число из статики:', currentNumber);
  
  // Функция для расчета разброса в зависимости от числа
  function calculateSpread(baseNumber) {
    if (baseNumber < 100) {
      return { min: 5, max: 10 };    // Для 100: -5 +10
    } else if (baseNumber < 300) {
      return { min: 10, max: 20 };   // Для 300: -10 +20
    } else if (baseNumber < 1000) {
      return { min: 20, max: 40 };   // Для 1000: -20 +40
    } else if (baseNumber < 3000) {
      return { min: 30, max: 50 };   // Для 1524: -30 +50
    } else {
      return { min: 100, max: 200 }; // Для больших чисел
    }
  }
  
  // Функция для обновления числа с анимацией
  function updateNumber() {
    const spread = calculateSpread(currentNumber);
    const min = Math.max(1, currentNumber - spread.min); // Не меньше 1
    const max = currentNumber + spread.max;
    
    const newNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    
    console.log(`Обновление: ${currentNumber} → ${newNumber} (разброс: -${spread.min}/+${spread.max})`);
    
    // Анимация
    numberElement.style.transition = 'all 0.5s ease';
    numberElement.style.transform = 'scale(1.1)';
    numberElement.style.color = 'var(--color-puple--500)';
    numberElement.textContent = newNumber;
    
    // Обновляем текущее число для следующего расчета
    currentNumber = newNumber;
    
    setTimeout(() => {
      numberElement.style.transform = 'scale(1)';
      numberElement.style.color = '';
    }, 500);
  }
  
  // Запускаем обновление каждые 20 секунд
  setInterval(updateNumber, 10000);
  
  // Первое обновление через 3 секунды после загрузки
  setTimeout(updateNumber, 3000);
  
  // Сохраняем состояние в localStorage
  function saveState() {
    localStorage.setItem('activeOrdersNumber', currentNumber);
    localStorage.setItem('activeOrdersTimestamp', Date.now());
  }
  
  // Восстанавливаем состояние из localStorage (если прошло не слишком много времени)
  function restoreState() {
    const savedNumber = localStorage.getItem('activeOrdersNumber');
    const savedTime = localStorage.getItem('activeOrdersTimestamp');
    
    if (savedNumber && savedTime) {
      const timePassed = Date.now() - parseInt(savedTime);
      const hoursPassed = timePassed / (1000 * 60 * 60);
      
      // Восстанавливаем только если прошло меньше 2 часов
      if (hoursPassed < 2) {
        const restoredNumber = parseInt(savedNumber);
        if (!isNaN(restoredNumber) && restoredNumber > 0) {
          currentNumber = restoredNumber;
          numberElement.textContent = currentNumber;
          console.log('Восстановлено из localStorage:', currentNumber);
        }
      }
    }
  }
  
  // Восстанавливаем состояние при загрузке
  restoreState();
  
  // Сохраняем состояние при обновлении
  setInterval(saveState, 10000); // Сохраняем каждые 10 секунд
  
  // Сохраняем при закрытии страницы
  window.addEventListener('beforeunload', saveState);
});