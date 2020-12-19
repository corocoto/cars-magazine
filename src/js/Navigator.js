import PubSub from 'pubsub-js';

PubSub.subscribe('goToSlide', (msg,data) => {
    const dots = document.querySelectorAll('nav a');
    dots[data.from].removeAttribute('active');
    dots[data.to].setAttribute('active', true);
});
