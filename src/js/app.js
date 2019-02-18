import './modules/example'
import ClassExample from './modules/class-example'

/* ==========================================================================
   Exemplary class
   ========================================================================== */
const myClassExample = new ClassExample()
myClassExample.init()

document.addEventListener('DOMContentLoaded', function(){
    $('.js-testimonials-slick').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true
    });
});

document.querySelector('.js-toggle-menu').addEventListener('click',function(e){
    document.querySelector('.js-toggle-menu').classList.toggle('is-active');
    document.querySelector('.js-menu').classList.toggle('is-visible');
});
