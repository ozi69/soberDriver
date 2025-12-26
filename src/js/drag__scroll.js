document.addEventListener('DOMContentLoaded', function() {
  class DragScroll {
    constructor(container) {
      this.container = container;
      this.isDown = false;
      this.startX = 0;
      this.scrollLeft = 0;
      
      this.init();
    }

    // если в консоли возникает ошибка, то она связана с ненахожденим контейнар в котором проихсодит свайп
    
    init() {
      this.container.addEventListener('mousedown', this.onMouseDown.bind(this));
      this.container.addEventListener('mouseleave', this.onMouseLeave.bind(this));
      this.container.addEventListener('mouseup', this.onMouseUp.bind(this));
      this.container.addEventListener('mousemove', this.onMouseMove.bind(this));
    }
    
    onMouseDown(e) {
      this.isDown = true;
      this.container.classList.add('dragging');
      this.startX = e.pageX - this.container.offsetLeft;
      this.scrollLeft = this.container.scrollLeft;
    }
    
    onMouseLeave() {
      this.isDown = false;
      this.container.classList.remove('dragging');
    }
    
    onMouseUp() {
      this.isDown = false;
      this.container.classList.remove('dragging');
    }
    
    onMouseMove(e) {
      if (!this.isDown) return;
      e.preventDefault();
      const x = e.pageX - this.container.offsetLeft;
      const walk = (x - this.startX) * 2;
      this.container.scrollLeft = this.scrollLeft - walk;
    }
  }

  // Использование
  const commentContainer = new DragScroll(document.querySelector('.container-comments'));
  const geoContainer = new DragScroll(document.querySelector('.container-geo'));

  // Или для всех элементов с классом .drag-scroll
  document.querySelectorAll('.drag-scroll').forEach(container => {
    new DragScroll(container);
  });
});