import View from './js/view.js';
import Model from './js/model.js';
import Controler from './js/controler.js';
import EventEmitter from './js/event.js';
import './scss/style.scss';

const view = new View;
const model = new Model;


new Controler(model,view);

view.showHandlebars('#bookmark', '#bookmark-list',model.bookmark);
console.log(view.btnDelete);




