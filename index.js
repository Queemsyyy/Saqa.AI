const slider = document.querySelector('.slider');
const beforeImage = document.querySelector('.image-before');
let isDragging = false;

slider.addEventListener('mousedown', startDrag);
document.addEventListener('mouseup', stopDrag);
document.addEventListener('mousemove', drag);

slider.addEventListener('touchstart', startDrag);
document.addEventListener('touchend', stopDrag);
document.addEventListener('touchmove', drag);

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
    const percent = x / rect.width;

    beforeImage.style.clipPath = `inset(0 0 0 ${percent * 100}%)`;
    
    slider.style.left = `${percent * 100}%`;
}