import PubSub from 'pubsub-js';
export default class Paginator {
    constructor(){
        this.scrollEvents = this.scrollEvents.bind(this);
        this.clickLinkEventHandler = this.clickLinkEventHandler.bind(this);

        this.activeSlide = 0;
        this.max = document.querySelectorAll('section').length - 1;
        this.canGo = 1;

        window.addEventListener('wheel', this.scrollEvents);
        this.clickEvents();
    }

    scrollEvents({deltaY}){
        if (this.canGo){
            this.canGo = false;
            const direction= deltaY > 0 ? 1 : -1;
            const newSlide = this.activeSlide + direction;

            setTimeout(()=> this.canGo = true, 1300);
            if (newSlide > this.max || newSlide < 0) return;
            PubSub.publish('goToSlide', {from: this.activeSlide, to: newSlide});
            this.activeSlide =newSlide;
        }     
    }
    clickEvents(){
        const links = document.querySelectorAll('nav a');
        for (let link of links){
            link.addEventListener('click', this.clickLinkEventHandler)
        }
    }

    clickLinkEventHandler(e){
        e.preventDefault();
        if (this.canGo){
            const newSlide = +e.target.getAttribute('data-gotoslide');
            if (newSlide !== this.activeSlide){
                PubSub.publish('goToSlide', {from: this.activeSlide, to: newSlide});
                this.activeSlide = newSlide;
            }
        }
    }
}
