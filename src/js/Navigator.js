import PubSub from 'pubsub-js';

PubSub.subscribe('goToSlide', function (msg,data) {
    //console.log(msg,data);
    const dots = document.querySelectorAll('.pagination a');
    dots[data.from].classList.remove('is_active');
    dots[data.to].classList.add('is_active');
});
