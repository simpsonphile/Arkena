document.querySelector('.js-toggle-menu').addEventListener('click',function(e){
    document.querySelector('.js-toggle-menu').classList.toggle('is-active');
    document.querySelector('.js-menu').classList.toggle('is-visible');
});