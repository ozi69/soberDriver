document.addEventListener('DOMContentLoaded', () => {

  // 1. Чекбокс → отключение поля "Место фактического проживания"
  const checkbox = document.querySelector('.use_label_element');
  const addressInput = document.querySelector('#address-city');

  if (checkbox && addressInput) {
    checkbox.addEventListener('change', () => {
      addressInput.disabled = checkbox.checked;
      addressInput.classList.toggle('disabled-input', checkbox.checked);
      checkFormValidity();           // ← добавлено
    });
    // если чекбокс уже стоит при загрузке
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
        checkFormValidity();           // ← добавлено
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
        checkFormValidity();           // ← добавлено
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
  // 5. Валидация кнопки «Продолжить»
  // ────────────────────────────────────────────────

  const submitBtn = document.querySelector('.btn-form__registration');

  // Все обязательные поля
  const requiredFields = document.querySelectorAll(`
    #full-name,
    #birth-date,
    #email,
    #passport-mask,
    #passport-date,
    #passport-city,
    #address-city:not(:disabled),
    #license-number,
    #license-date,
    #license-exp,
    #accidents,
    #tax-inn
  `);

  // Все чекбоксы категорий
  const categoryCheckboxes = document.querySelectorAll('.select-categories input[type="checkbox"]');

  function checkFormValidity() {
    // Проверяем, что все видимые обязательные поля заполнены
    const allFilled = Array.from(requiredFields).every(field => {
      return field.value.trim() !== '';
    });

    // Проверяем, выбрана ли хотя бы одна категория
    const hasCategory = Array.from(categoryCheckboxes).some(cb => cb.checked);

    // Кнопка активна только если ВСЁ заполнено
    const isValid = allFilled && hasCategory;

    submitBtn.disabled = !isValid;

    // Опционально: визуальная обратная связь
  }

  // Слушатели на все изменения
  requiredFields.forEach(field => {
    field.addEventListener('input', checkFormValidity);
    field.addEventListener('change', checkFormValidity);
  });

  categoryCheckboxes.forEach(cb => {
    cb.addEventListener('change', checkFormValidity);
  });

  // Первичная проверка при загрузке
  checkFormValidity();

});