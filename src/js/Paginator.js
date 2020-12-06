import PubSub from 'pubsub-js';
export default class Paginator {
    constructor(){
        this.scrollEvents = this.scrollEvents.bind(this);
        this.clickLinkEventHandler = this.clickLinkEventHandler.bind(this);


        this.activeSlide = 0;
        this.max = document.querySelectorAll('.section').length - 1;
        this.canGo = 1;

        window.addEventListener('wheel', this.scrollEvents);
        this.clickEvents();
    }

    scrollEvents(){
        if (this.canGo){
            this.canGo = false;
            const direction= e.deltaY > 0 ? 1 : -1;
            const newSlide = this.activeSlide + direction;

            setTimeout(()=> this.canGo = true, 1300);
            if (newSlide > this.max || newSlide < 0) return;
            PubSub.publish('goToSlide', {from: this.activeSlide, to: newSlide});
            this.activeSlide =newSlide;
        }     
    }
    clickEvents(){
        const links = document.querySelectorAll('.pagination a');
        for (let link of links){
            link.addEventListener('click', this.clickLinkEventHandler)
        }
    }

    clickLinkEventHandler(e){
        e.preventDefault();
        if (this.canGo){
            const newSlide= +this.getAttribute('data-gotoslide');
            if (newSlide !== this.activeSlide){
                PubSub.publish('goToSlide', {from: this.activeSlide, to: newSlide});
                this.activeSlide = newSlide;
            }
        }
    }
}
