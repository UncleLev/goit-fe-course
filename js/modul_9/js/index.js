'use strict';
/*
  Создайте скрипт секундомера.  
  По ссылке можно посмотреть пример выбрав Stopwatch http://www.online-stopwatch.com/full-screen-stopwatch/
  
  Изначально в HTML есть разметка:
  
  <div class="stopwatch">
    <p class="time js-time">00:00.0</p>
    <button class="btn js-start">Start</button>
    <button class="btn js-take-lap">Lap</button>
    <button class="btn js-reset">Reset</button>
  </div>
  <ul class="laps js-laps"></ul>
  
  Добавьте следующий функционал:
  
  - При нажатии на кнопку button.js-start, запускается таймер, который считает время 
    со старта и до текущего момента времени, обновляя содержимое элемента p.js-time 
    новым значение времени в формате xx:xx.x (минуты:секунды.сотни_миллисекунд).
       
    🔔 Подсказка: так как необходимо отображать только сотни миллисекунд, интервал
                  достаточно повторять не чаще чем 1 раз в 100 мс.
    
  - Когда секундомер запущен, текст кнопки button.js-start меняется на 'Pause', 
    а функционал при клике превращается в оставновку секундомера без сброса 
    значений времени.
    
    🔔 Подсказка: вам понадобится буль который описывает состояние таймера активен/неактивен.
  
  - Если секундомер находится в состоянии паузы, текст на кнопке button.js-start
    меняется на 'Continue'. При следующем клике в нее, продолжается отсчет времени, 
    а текст меняется на 'Pause'. То есть если во время нажатия 'Pause' прошло 6 секунд 
    со старта, при нажатии 'Continue' 10 секунд спустя, секундомер продолжит отсчет времени 
    с 6 секунд, а не с 16. 
    
    🔔 Подсказка: сохраните время секундомера на момент паузы и используйте его 
                  при рассчете текущего времени после возобновления таймера отнимая
                  это значение от времени запуска таймера.
    
  - Если секундомер находится в активном состоянии или в состоянии паузы, кнопка 
    button.js-reset должна быть активна (на нее можно кликнуть), в противном случае
    disabled. Функционал при клике - остановка таймера и сброс всех полей в исходное состояние.
    
  - Функционал кнопки button.js-take-lap при клике - сохранение текущего времени секундомера 
    в массив и добавление в ul.js-laps нового li с сохраненным временем в формате xx:xx.x
*/

/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
  Выполните домашнее задание используя класс с полями и методами.
  
  На вход класс Stopwatch принимает только ссылку на DOM-узел в котором будет 
  динамически создана вся разметка для секундомера.
  
  Должна быть возможность создать сколько угодно экземпляров секундоментов 
  на странице и все они будут работать независимо.
  
  К примеру:
  
  new Stopwatch(parentA);
  new Stopwatch(parentB);
  new Stopwatch(parentC);
  
  Где parent* это существующий DOM-узел. 
*/

class Stopwatch {
    constructor(parents) {
        this.parent = parents;
        // this.parent.innerHTML = ''
        this.parent.innerHTML = '<div class="stopwatch"><p class="time js-time">00:00.0</p><button class="btn js-start">Start</button><button class="btn js-take-lap" disabled>Lap</button><button class="btn js-reset" disabled>Reset</button></div><ul class="laps js-laps"></ul>';
        this.timeView = this.parent.children[0].children[0];
        this.btnStart = this.parent.children[0].children[1];
        this.btnLap = this.parent.children[0].children[2];
        this.btnReset = this.parent.children[0].children[3];
        this.lapsList = this.parent.children[1];
        this.nowTime = null;
        this.startTime = null;
        this.timer;
        this.sec = 0;
        this.ms = 0;
        this.min = 0;

        this.btnStart.addEventListener('click', () => {
            this.startTime = Date.now();

            this.btnReset.removeAttribute('disabled');
            this.btnLap.removeAttribute('disabled');

            if (!this.pause) {
                this.pause = true;
                this.btnStart.textContent = 'Pasue';
                this.btnStart.classList.add('pause');
                this.timer = setInterval(() => {
                    this.ms = (Date.now() - this.startTime);
                    if (this.ms >= 1000) {
                        this.ms = 0;
                        this.startTime = Date.now();
                        this.sec++;
                    }
                    if (this.sec == 60) {
                        this.sec = 0;
                        this.min++;
                    }
                    if (this.sec >= 10 && this.min < 10) {
                        this.timeView.textContent = `0${this.min}:${this.sec}.${this.ms/100 | 0}`;
                    } else if (this.sec >= 10 && this.min >= 10) {
                        this.timeView.textContent = `${this.min}:${this.sec}.${this.ms/100 | 0}`;
                    } else if (this.sec < 10 && this.min >= 10) {
                        this.timeView.textContent = `${this.min}:0${this.sec}.${this.ms/100 | 0}`;
                    } else {
                        this.timeView.textContent = `0${this.min}:0${this.sec}.${this.ms/100 | 0}`;
                    }
                }, 100);
            } else {
                this.pause = false;
                this.btnStart.textContent = 'Continue';
                this.btnStart.classList.remove('pause');
                clearInterval(this.timer);
                this.startTime = Date.now();
            }
        });
        this.btnLap.addEventListener('click', () => {
            this.lapsList.innerHTML += `<li class="laps__item" type="1">${this.min}:${this.sec}.${this.ms}</li>`
        });
        this.btnReset.addEventListener('click', () => {
            this.btnReset.setAttribute('disabled', 'disabled');
            this.btnLap.setAttribute('disabled', 'disabled');
            this.sec = 0;
            this.ms = 0;
            this.min = 0;
            this.timeView.textContent = `0${this.min}:0${this.sec}:${this.ms}`;
            this.btnStart.textContent = 'Start';
            this.pause = false;
            clearInterval(this.timer);
            this.btnStart.classList.remove('pause');

            while (this.lapsList.firstChild) {
                this.lapsList.removeChild(this.lapsList.firstChild)
            }
        });
    }
}
let parentA = document.querySelector('.parentA');
let parentB = document.querySelector('.parentB');
let parentC = document.querySelector('.parentC');

const A = new Stopwatch(parentA);
const B = new Stopwatch(parentB);
const C = new Stopwatch(parentC);