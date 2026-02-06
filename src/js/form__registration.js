document.addEventListener('DOMContentLoaded', () => {

  // 1. Чекбокс → отключение поля "Место фактического проживания"
  const checkbox = document.querySelector('.use_label_element');
  const addressInput = document.querySelector('#address-city');

  if (checkbox && addressInput) {
    checkbox.addEventListener('change', () => {
      addressInput.disabled = checkbox.checked;
      addressInput.classList.toggle('disabled-input', checkbox.checked);
      checkFormValidity();
    });
    addressInput.disabled = checkbox.checked;
  }

  // 2. Город работы
  const cityWrapper = document.querySelector('.form-box__block .wrapper-text');
  const cityDropdown = document.querySelector('.dropdown__address-city');
  const cityText     = document.querySelector('.address-city__work');
  const cityArrow    = document.querySelector('.form-box__block .form__block-select__img');

  if (cityWrapper && cityDropdown) {
    cityWrapper.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = cityDropdown.classList.contains('active');
      
      cityDropdown.classList.remove('active');
      taxDropdown.classList.remove('active');
      cityArrow?.classList.remove('rotate');
      taxArrow?.classList.remove('rotate');

      if (!isOpen) {
        cityDropdown.classList.add('active');
        cityArrow?.classList.add('rotate');
      }
    });

    cityDropdown.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        cityText.textContent = item.textContent.trim();
        cityText.classList.add('selected');
        cityDropdown.classList.remove('active');
        cityArrow?.classList.remove('rotate');
        checkFormValidity();
      });
    });
  }

  // 3. Налоговый статус
  const taxWrapper = document.querySelector('.form-registration__box .wrapper-text');
  const taxDropdown = document.querySelector('.dropdown__tax-status');
  const taxText     = document.querySelector('.tax-status');
  const taxArrow    = document.querySelector('.form-registration__box .form__block-select__img');

  if (taxWrapper && taxDropdown) {
    taxWrapper.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = taxDropdown.classList.contains('active');
      
      cityDropdown.classList.remove('active');
      taxDropdown.classList.remove('active');
      cityArrow?.classList.remove('rotate');
      taxArrow?.classList.remove('rotate');

      if (!isOpen) {
        taxDropdown.classList.add('active');
        taxArrow?.classList.add('rotate');
      }
    });

    taxDropdown.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        taxText.textContent = item.textContent.trim();
        taxText.classList.add('selected');
        taxDropdown.classList.remove('active');
        taxArrow?.classList.remove('rotate');
        checkFormValidity();
      });
    });
  }

  // 4. Закрытие при клике вне
  document.addEventListener('click', (e) => {
    if (
      !cityWrapper?.contains(e.target) &&
      !cityDropdown?.contains(e.target) &&
      !taxWrapper?.contains(e.target) &&
      !taxDropdown?.contains(e.target)
    ) {
      cityDropdown?.classList.remove('active');
      taxDropdown?.classList.remove('active');
      cityArrow?.classList.remove('rotate');
      taxArrow?.classList.remove('rotate');
    }
  });

  // ────────────────────────────────────────────────
  // 5. Валидация ссылки «Продолжить»
  // ────────────────────────────────────────────────

  const nextLink = document.querySelector('.btn-form__registration');

  // Все обязательные поля
  const requiredFields = document.querySelectorAll(`
    #full-name,
    #birth-date,
    #email,
    #passport-mask,
    #passport-date,
    #passport-city,
    #address-city,
    #license-number,
    #license-date,
    #license-exp,
    #accidents,
    #tax-inn
  `);

  const categoryCheckboxes = document.querySelectorAll('.select-categories input[type="checkbox"]');

  function checkFormValidity() {
    let allFilled = true;

    requiredFields.forEach(field => {
      if (field.id === 'address-city' && field.disabled) {
        return;
      }
      if (field.value.trim() === '') {
        allFilled = false;
      }
    });

    const hasCategory = Array.from(categoryCheckboxes).some(cb => cb.checked);

    const isValid = allFilled && hasCategory;

    // Визуальное отключение
    if (isValid) {
      nextLink.classList.remove('inactive');
    } else {
      nextLink.classList.add('inactive');
    }
  }

  // Перехват клика (самая надёжная защита)
  nextLink.addEventListener('click', function(e) {
    let allFilled = true;

    requiredFields.forEach(field => {
      if (field.id === 'address-city' && field.disabled) return;
      if (field.value.trim() === '') allFilled = false;
    });

    const hasCategory = Array.from(categoryCheckboxes).some(cb => cb.checked);

    if (!(allFilled && hasCategory)) {
      e.preventDefault();
    }
  });

  // Слушатели на изменения
  requiredFields.forEach(field => {
    field.addEventListener('input', checkFormValidity);
    field.addEventListener('change', checkFormValidity);
  });

  categoryCheckboxes.forEach(cb => {
    cb.addEventListener('change', checkFormValidity);
  });

  // Первичная проверка
  checkFormValidity();
});







// ---------------------
// страница регистрации по закгрузке фото

document.addEventListener('DOMContentLoaded', () => {

  const fileInput = document.getElementById('img');
  const statusText = document.querySelector('.block-capture__hgroup h3');
  const uploadButton = document.querySelector('.btn-dowload p');
  const statusIcon = document.querySelector('.block-capture__content-img img');
  const nextLink = document.querySelector('.link-dowload');

  let photoUploaded = false; // флаг, загружено ли фото

  // Функция обновления состояния кнопки
  function updateButtonState() {
    if (photoUploaded) {
      nextLink.classList.remove('inactive');
    } else {
      nextLink.classList.add('inactive');
    }
  }

  // Обработчик загрузки файла
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];

    if (!file) {
      // пользователь отменил выбор
      photoUploaded = false;
      updateButtonState();
      return;
    }

    // Проверка размера (4 МБ = 4 * 1024 * 1024 байт)
    const maxSize = 4 * 1024 * 1024; // 4 МБ
    if (file.size > maxSize) {
      alert('Файл слишком большой! Максимальный размер — 4 МБ.');
      fileInput.value = ''; // очищаем input
      photoUploaded = false;
      updateButtonState();
      return;
    }

    // Если всё ок — показываем успех
    photoUploaded = true;
    statusText.textContent = 'Фотография успешно загружена';
    statusIcon.src = 'src/img/check_small.svg';
    statusIcon.alt = 'Успешно загружено';
    uploadButton.innerHTML = 'Заменить изображение';

    // Активируем кнопку
    updateButtonState();
  });

  // Перехват клика по ссылке «Продолжить»
  nextLink.addEventListener('click', (e) => {
    if (!photoUploaded) {
      e.preventDefault();
      // Можно добавить более заметную подсказку, если хочешь
      // alert('Загрузите фотографию, чтобы продолжить');
    }
    // если фото загружено — переход произойдёт автоматически по href
  });

  // Начальное состояние
  updateButtonState();
});