export default class EventEmitter {
    constructor(){
        this.event = {};
    }

    on(type, callback) {
        this.event[type] = this.event[type] || [];

        this.event[type].push(callback);
    }
    emit(type, ...arg){
        if(this.event[type]){
            this.event[type].forEach(callback => callback(...arg));
        }
    }
}