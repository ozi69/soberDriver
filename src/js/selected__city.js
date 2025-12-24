document.addEventListener('DOMContentLoaded', function() {
  // Элементы DOM
  const openModal = document.querySelector("#openModal");
  const closeModal = document.querySelector("#closeModal");
  const modal = document.querySelector("#modal");
  const findCityInput = document.querySelector(".find-city");
  const citiesList = document.querySelector("#citiesList");
  const currentCityElement = document.querySelector("#currentCity");
  const headerCityElement = document.querySelector(".header-btn__location");
  const selectedCitySpan = document.querySelector(".selected-city #currentCity");
  
  // Добавляем поиск элементов с городом
  const citySelectedUser = document.querySelector(".city-selected__user");
  const sectionTarifsCity = document.querySelector(".section-tarifs__city");

  // Список городов России
  const cities = [
    "Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань",
    "Нижний Новгород", "Челябинск", "Самара", "Омск", "Ростов-на-Дону",
    "Уфа", "Красноярск", "Воронеж", "Пермь", "Волгоград",
    "Краснодар", "Саратов", "Тюмень", "Тольятти", "Ижевск",
    "Барнаул", "Ульяновск", "Иркутск", "Хабаровск", "Ярославль",
    "Владивосток", "Махачкала", "Томск", "Оренбург", "Кемерово",
    "Новокузнецк", "Рязань", "Астрахань", "Набережные Челны", "Пенза",
    "Липецк", "Киров", "Чебоксары", "Тула", "Калининград",
    "Балашиха", "Курск", "Севастополь", "Сочи", "Ставрополь",
    "Магнитогорск", "Брянск", "Сургут", "Владимир", "Нижний Тагил",
    "Архангельск", "Чита", "Симферополь", "Калуга", "Смоленск",
    "Волжский", "Саранск", "Череповец", "Курган", "Орёл",
    "Владикавказ", "Грозный", "Мурманск", "Тамбов", "Петрозаводск",
    "Кострома", "Нижневартовск", "Новороссийск", "Йошкар-Ола", "Химки"
  ].sort();

  // Текущий выбранный город
  let selectedCity = "Москва";

  // Флаг для отслеживания анимации закрытия
  let isClosing = false;

  // State для управления скроллом
  const scrollState = {
    modalCount: 0,
    originalPadding: '',
    originalOverflow: '',
    scrollbarWidth: 0,

    lock() {
      if (this.modalCount === 0) {
        this.originalPadding = document.body.style.paddingRight;
        this.originalOverflow = document.body.style.overflowY;
        this.scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        document.body.style.paddingRight = `${this.scrollbarWidth}px`;
        document.body.style.overflowY = 'hidden';
      }
      this.modalCount++;
    },

    unlock() {
      this.modalCount--;
      if (this.modalCount <= 0) {
        document.body.style.overflowY = this.originalOverflow;
        document.body.style.paddingRight = this.originalPadding;
        this.modalCount = 0;
      }
    }
  };

  // Функция для определения количества колонок на основе ширины экрана
  function getColumnsCount() {
    return window.innerWidth <= 767 ? 1 : 3;
  }

  // Функция для отображения городов
  function renderCities(searchTerm = '') {
    citiesList.innerHTML = '';
    
    const filteredCities = cities.filter(city => 
      city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filteredCities.length === 0) {
      citiesList.innerHTML = '<div class="no-results">Городов не найдено</div>';
      return;
    }
    
    // Группируем города по буквам
    const citiesByLetter = {};
    
    filteredCities.forEach(city => {
      const firstLetter = city[0].toUpperCase();
      if (!citiesByLetter[firstLetter]) {
        citiesByLetter[firstLetter] = [];
      }
      citiesByLetter[firstLetter].push(city);
    });
    
    // Сортируем буквы по алфавиту
    const sortedLetters = Object.keys(citiesByLetter).sort();
    
    // Определяем количество колонок
    const columnsCount = getColumnsCount();
    const lettersPerColumn = Math.ceil(sortedLetters.length / columnsCount);
    
    // Создаем контейнер для колонок
    const columnsContainer = document.createElement('div');
    columnsContainer.className = 'city-columns-container';
    
    // Создаем колонки
    for (let col = 0; col < columnsCount; col++) {
      const column = document.createElement('div');
      column.className = 'city-column';
      
      // Берем буквы для этой колонки
      const startIndex = col * lettersPerColumn;
      const endIndex = startIndex + lettersPerColumn;
      const columnLetters = sortedLetters.slice(startIndex, endIndex);
      
      // Добавляем буквы с городами в колонку
      columnLetters.forEach(letter => {
        const letterContainer = document.createElement('div');
        letterContainer.className = 'city-letter';
        
        const letterTitle = document.createElement('h4');
        letterTitle.className = 'city-letter-title';
        letterTitle.textContent = letter;
        letterContainer.appendChild(letterTitle);
        
        const citiesGrid = document.createElement('div');
        citiesGrid.className = 'city-list';
        
        citiesByLetter[letter].forEach(city => {
          const cityItem = document.createElement('button');
          cityItem.className = `city-item ${city === selectedCity ? 'active' : ''}`;
          cityItem.textContent = city;
          cityItem.dataset.city = city;
          
          cityItem.addEventListener('click', () => {
            selectCity(city);
          });
          
          citiesGrid.appendChild(cityItem);
        });
        
        letterContainer.appendChild(citiesGrid);
        column.appendChild(letterContainer);
      });
      
      columnsContainer.appendChild(column);
    }
    
    citiesList.appendChild(columnsContainer);
  }

  // Функция обновления всех элементов с выбранным городом
  function updateCityElements(city) {
    // 1. Модальное окно
    if (currentCityElement) {
      currentCityElement.textContent = city;
    }
    
    if (selectedCitySpan) {
      selectedCitySpan.textContent = city;
    }
    
    // 2. Кнопка в хедере
    if (headerCityElement) {
      updateHeaderCityButton(city);
    }
    
    // 3. Элемент city-selected__user (если он есть на странице)
    if (citySelectedUser) {
      citySelectedUser.textContent = city;
    }
    
    // 4. Элемент section-tarifs__city (если он есть на странице)
    if (sectionTarifsCity) {
      sectionTarifsCity.textContent = city;
    }
    
    // 5. Сохраняем в localStorage
    localStorage.setItem('selectedCity', city);
    
    console.log('Город обновлен:', city);
    console.log('Элементы обновлены:');
    console.log('- citySelectedUser:', citySelectedUser ? 'найден' : 'не найден');
    console.log('- sectionTarifsCity:', sectionTarifsCity ? 'найден' : 'не найден');
  }

  // Функция обновления кнопки в хедере
  function updateHeaderCityButton(city) {
    // Ищем элемент с текстом города в кнопке
    const textElements = headerCityElement.childNodes;
    let textElement = null;
    
    // Ищем текстовый узел или span с текстом города
    for (let node of textElements) {
      if (node.nodeType === 3 && node.textContent.trim()) { // Текстовый узел
        textElement = node;
        break;
      } else if (node.nodeType === 1 && node.tagName !== 'IMG' && 
                 node.className !== 'header-btn__location-img') { // Элемент не картинка
        textElement = node;
        break;
      }
    }
    
    if (textElement) {
      textElement.textContent = city;
    } else {
      // Если не нашли текстовый элемент, добавляем после картинки
      const imgElement = headerCityElement.querySelector('.header-btn__location-img');
      if (imgElement) {
        // Удаляем весь текст кроме картинки
        const newContent = document.createTextNode(city);
        
        // Удаляем все текстовые узлы
        const childNodes = Array.from(headerCityElement.childNodes);
        childNodes.forEach(child => {
          if (child.nodeType === 3) {
            headerCityElement.removeChild(child);
          }
        });
        
        // Добавляем текст после картинки
        headerCityElement.appendChild(newContent);
      } else {
        // Если нет картинки, просто заменяем весь текст
        headerCityElement.textContent = city;
      }
    }
  }

  // Функция выбора города
  function selectCity(city) {
    selectedCity = city;
    updateCityElements(city);
    closeModalFunc();
    renderCities(findCityInput.value);
  }

  // Функция открытия модального окна
  function openModalFunc() {
    if (isClosing) return;
    
    // Блокируем скролл
    scrollState.lock();
    
    modal.classList.remove('hiding');
    modal.classList.add('show');
    
    setTimeout(() => {
      findCityInput.focus();
    }, 300);
  }

  // Функция закрытия модального окна с анимацией
  function closeModalFunc() {
    if (isClosing) return;
    
    isClosing = true;
    modal.classList.remove('show');
    modal.classList.add('hiding');
    
    // Сбрасываем поиск
    findCityInput.value = '';
    renderCities();
    
    // Ждем завершения анимации перед скрытием
    setTimeout(() => {
      modal.classList.remove('hiding');
      
      // Разблокируем скролл
      scrollState.unlock();
      
      isClosing = false;
    }, 300);
  }

  // Обработчики событий
  if (openModal) {
    openModal.addEventListener('click', openModalFunc);
  }

  if (closeModal) {
    closeModal.addEventListener('click', closeModalFunc);
  }

  // Закрытие по клику вне модального окна
  modal.addEventListener('click', (e) => {
    if (e.target === modal && !isClosing) {
      closeModalFunc();
    }
  });

  // Закрытие по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show') && !isClosing) {
      closeModalFunc();
    }
  });

  // Поиск городов
  findCityInput.addEventListener('input', (e) => {
    renderCities(e.target.value);
  });

  // Обработчик изменения размера окна для перерисовки городов
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Перерисовываем города только если открыто модальное окно
      if (modal.classList.contains('show')) {
        renderCities(findCityInput.value);
      }
    }, 250);
  });

  // Загрузка сохраненного города
  const savedCity = localStorage.getItem('selectedCity');
  if (savedCity && cities.includes(savedCity)) {
    selectedCity = savedCity;
    updateCityElements(savedCity);
  }

  // Также обновляем город при загрузке страницы (на случай если элементы появились позже)
  function initializePageCity() {
    const city = localStorage.getItem('selectedCity') || "Москва";
    
    // Обновляем все найденные элементы
    updateCityElements(city);
    
    // Дополнительная проверка для section-tarifs__city
    if (sectionTarifsCity && sectionTarifsCity.textContent !== city) {
      sectionTarifsCity.textContent = city;
    }
  }

  // Инициализация
  renderCities();
  initializePageCity();
  
  // Отладочная информация
  console.log('Найденные элементы с городом:');
  console.log('- city-selected__user:', citySelectedUser);
  console.log('- section-tarifs__city:', sectionTarifsCity);
  console.log('- header-btn__location:', headerCityElement);
  console.log('- currentCity элемент:', currentCityElement);
  console.log('Текущий город:', selectedCity);
});