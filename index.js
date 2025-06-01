document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const beforeImage = document.querySelector('.image-before');
    let isDragging = false;
    let targetX = 50;
    let currentPosition = 50;

    const animationSettings = {
        dragSpeed: 0.3,
        releaseSpeed: 0.1,
        minDistance: 0.5
    };

    function animate() {
        const speed = isDragging ? animationSettings.dragSpeed : animationSettings.releaseSpeed;
        const newPosition = currentPosition + (targetX - currentPosition) * speed;
        
        if (Math.abs(newPosition - currentPosition) > animationSettings.minDistance) {
            currentPosition = newPosition;
            beforeImage.style.clipPath = `inset(0 0 0 ${currentPosition}%)`;
            slider.style.left = `${currentPosition}%`;
        }
        
        requestAnimationFrame(animate);
    }

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

    animate();

    slider.addEventListener('mousedown', startDrag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('mousemove', drag);

    slider.addEventListener('touchstart', startDrag, {passive: false});
    document.addEventListener('touchend', stopDrag);
    document.addEventListener('touchmove', drag, {passive: false});

    if ('ontouchstart' in window) {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.classList.add('hover');
            });
            
            card.addEventListener('touchend', function() {
                this.classList.remove('hover');
            });
        });
    }
});