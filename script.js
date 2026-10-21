const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            
            const videos = entry.target.querySelectorAll('video');
            videos.forEach(video => video.play());
        } else {
            entry.target.classList.remove('show');
            
            const videos = entry.target.querySelectorAll('video');
            videos.forEach(video => {
                video.pause();
                video.currentTime = 0;
            });
        }
    });
}, {
    threshold: 0.2
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
    carousel.addEventListener('scroll', () => {
        const indicator = carousel.nextElementSibling;
        
        if (indicator && indicator.classList.contains('scroll-indicator')) {
            const pill = indicator.querySelector('.scroll-pill');
            const scrollPercentage = carousel.scrollLeft / (carousel.scrollWidth - carousel.clientWidth);
            const maxTranslate = indicator.clientWidth - pill.clientWidth;
            
            pill.style.transform = `translateX(${scrollPercentage * maxTranslate}px)`;
        }
    });
});