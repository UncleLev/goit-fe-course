import EventEmitter from './event.js';

export default class View extends EventEmitter {
    constructor() {
        super();
        this.form = document.querySelector('.form');
        this.btnSave = document.querySelector('.btn-js');
        this.input = document.querySelector('#urlAddress');
        this.form.addEventListener('submit',this.UrlSaving.bind(this));
        this.btnDelete = document.querySelector('#bookmark-list');
        this.btnDelete.addEventListener('click',this.UrlDeleting.bind(this));
    }
    UrlSaving(event){
        event.preventDefault();
        const value = this.input.value;
        this.emit('add',value);
        
    }
    UrlDeleting(event) {
        event.preventDefault();
        if (event.target.getAttribute('id') == "delete"){
            const id = event.target.closest('.bookmark').getAttribute('bookmarkId')
            this.emit('remove',id);
            console.log(id);
        }
        
        
    }
    showHandlebars(item, parent, array) {
        const source = document.querySelector(item).innerHTML.trim();
        const template = Handlebars.compile(source);
        const markup = template(array);
        const container = document.querySelector(parent);
        container.innerHTML = markup;
    }
    
}


