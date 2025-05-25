const slider = document.querySelector('.slider');
const beforeImage = document.querySelector('.image-before');
let isDragging = false;
let targetX = 50; // Целевая позиция (куда двигается курсор)
let currentPosition = 50; // Текущая позиция (для обоих элементов)

// Настройки анимации
const animationSettings = {
    dragSpeed: 0.3,    // Скорость при перетаскивании
    releaseSpeed: 0.1, // Скорость при отпускании
    minDistance: 0.5   // Минимальное расстояние для обновления
};

// Функция плавного перемещения
function animate() {
    const speed = isDragging ? animationSettings.dragSpeed : animationSettings.releaseSpeed;
    const newPosition = currentPosition + (targetX - currentPosition) * speed;
    
    // Обновляем только если изменение достаточно заметное
    if (Math.abs(newPosition - currentPosition) > animationSettings.minDistance) {
        currentPosition = newPosition;
        
        // Синхронное обновление обоих элементов
        beforeImage.style.clipPath = `inset(0 0 0 ${currentPosition}%)`;
        slider.style.left = `${currentPosition}%`;
    }
    
    requestAnimationFrame(animate);
}

// Обработчики событий
function startDrag(e) {
    e.preventDefault();
    isDragging = true;
    document.body.style.cursor = 'ew-resize';
}

function stopDrag() {
    isDragging = false;
    document.body.style.cursor = '';
}

function drag(e) {
    if (!isDragging) return;

    const container = slider.parentElement.parentElement;
    const rect = container.getBoundingClientRect();
    let x;

    if (e.type === 'mousemove') {
        x = e.clientX - rect.left;
    } else if (e.type === 'touchmove') {
        x = e.touches[0].clientX - rect.left;
    }

    x = Math.max(0, Math.min(x, rect.width));
    targetX = (x / rect.width) * 100;
}

// Инициализация
animate();

// Слушатели событий
slider.addEventListener('mousedown', startDrag);
document.addEventListener('mouseup', stopDrag);
document.addEventListener('mousemove', drag);

slider.addEventListener('touchstart', startDrag);
document.addEventListener('touchend', stopDrag);
document.addEventListener('touchmove', drag);