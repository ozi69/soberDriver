document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.tarifs-tab');
  const blocks = document.querySelectorAll('.block-tarifs');
  
  if (!tabs.length || !blocks.length) return;
  
  // Инициализация - показываем первый блок
  const firstBlock = document.getElementById('block-tarifs__one');
  if (firstBlock) {
    firstBlock.classList.add('active');
  }
  
  // Добавляем активный класс к первой кнопке
  tabs[0].classList.add('active');
  
  // Функция для переключения табов
  function switchTab(tabId) {
    // Удаляем активный класс у всех кнопок
    tabs.forEach(tab => {
      tab.classList.remove('active');
    });
    
    // Добавляем активный класс к текущей кнопке
    const activeTab = document.getElementById(tabId);
    if (activeTab) {
      activeTab.classList.add('active');
    }
    
    // Определяем какой блок показывать
    let targetBlockId = 'block-tarifs__one';
    if (tabId === 'driverRental') {
      targetBlockId = 'block-tarifs__two';
    } else if (tabId === 'drivingCar') {
      targetBlockId = 'block-tarifs__three';
    }
    
    // Удаляем активный класс у всех блоков
    blocks.forEach(block => {
      block.classList.remove('active');
    });
    
    // Добавляем активный класс целевому блоку
    const targetBlock = document.getElementById(targetBlockId);
    if (targetBlock) {
      targetBlock.classList.add('active');
    }
  }
  
  // Добавляем обработчики событий для каждой кнопки
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const tabId = this.id;
      switchTab(tabId);
    });
  });
});