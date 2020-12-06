import PubSub from 'pubsub-js';
import {TimelineLite} from "gsap";

PubSub.subscribe('goToSlide', function (msg,data) {
    // console.log(msg,data);
    const sections = document.querySelectorAll('.section');
    const currentSlide = sections[data.from];
    const newSlide = sections[data.to];
    const elements = currentSlide.querySelectorAll('.data-stagger');
    const newElements = newSlide.querySelectorAll('.data-stagger');

    const tl=new TimelineLite();
    tl
        .staggerFromTo(elements, 0.3, { y: 0, opacity: 1 }, { y: -20, opacity: 0 }, .1)
        .to(currentSlide, 1, { y: '-100%', opacity: 0 })
        .fromTo(newSlide, 1, { y:'100%' }, { y: '0%', opacity: 1 }, .3)
        .staggerFromTo(newElements, .3, { y: 20, opacity: 0},{ y: 0, opacity: 1}, .1, '-=.4');
});
