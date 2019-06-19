export default class Controler {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        view.on('add', this.AddUrl.bind(this));
        view.on('remove', this.RemoveUrl.bind(this));
    }
    AddUrl(Url) {
        console.log(Url);
        this.model.addItem(Url,this.view.showHandlebars);
    }

    RemoveUrl(id) {
        this.model.removeItem(id,this.view.showHandlebars);
    }
}