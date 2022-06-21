const imgs = document.querySelectorAll('.content img');
const fullPage = document.querySelector('#fullpage');
const body = document.querySelector('body');

imgs.forEach(img => {
    img.addEventListener('click', function() {
        fullPage.style.backgroundImage = 'url(' + img.src + ')';
        fullPage.style.display = 'block';
        window.scrollTo(0, 0);
        body.style.overflow = 'hidden';
    });
});

fullPage.addEventListener('click', function() {
    fullPage.style.display = 'none';
    body.style.overflow = 'auto';
})
