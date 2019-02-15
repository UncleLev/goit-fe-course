'use strict';

const adminLogin = 'admin';
const adminPassword = 'm4ngo1zh4ackz0r';

//Змінні виводи туксту при введенні данних користувачем 
const Cancel = 'Отменено пользователем!'; //якщо користувач нажав Cancel
const falsePassword = 'Доступ запрещен, неверный пароль!'; //якщо користувач ввів невірний пароль
const truePassword = 'Добро пожаловать!'; //якщо користувач ввів вірний пароль
const falseLogin = 'Доступ запрещен, неверный логин!'; //якщо користувач ввів невірний логін

let login = '0'; //змінна для вводу паролю
let password = '0'; //змінна для вводу логіну

login = prompt('Введите логин'); //введення логіну

if (login !== null) { //перевірка чи на натискання відміни
    if (login == adminLogin) { // перевірка на логіну
        password = prompt('Введите пароль');
        if (password == adminPassword) { //перевірка на пароль
            alert(truePassword);
        } else {
            alert(falsePassword);
        }
    } else {
        alert(falseLogin);
    }
} else { //якщо натиснули відміну
    alert(Cancel);
}


alert('ДОПОЛНИТЕЛЬНОЕ ЗАДАНИЕ');
//змінні збереження кількості місць в групах
const sharm = 15;
const hurgada = 25;
const taba = 6;
//змінні виведення діалогів
const error = 'Ошибка ввода';
const secondCancel = 'Нам очень жаль, приходите еще!';
const yep = 'Приятного путешествия в группе ';
const nope = 'Нам очень жаль, приходите еще!';
const sorry = 'Извините, столько мест нет ни в одной группе!';

let count = 0;//змінна зберігання кількості місць

count = prompt('Введите сколько вам нужно мест');


if (count != null) { //перевірка на нажатя відмінни
    count = Number(count);
    if (count > 0 && Number.isInteger(count)) { //превірка чи число int чи float
        if (count <= taba) { // перевірка на кількість місць
            if (confirm('Вам подходит Таба?')) { //перевірка на збіг з кількістю місць
                alert(yep + 'Таба');
            } else {
                alert(nope);
            }
        } else if (count <= sharm) {//перевірка на збіг з кількістю місць
            if (confirm('Вам подходит Шарм?')) {
                alert(yep + 'Шарм');
            } else {
                alert(nope);
            }
        } else if (count <= hurgada) {//перевірка на збіг з кількістю місць
            if (confirm('Вам подходит Хургада?')) {
                alert(yep + 'Хургада');
            } else {
                alert(nope);
            }
        } else {
            alert(sorry);
        }
    } else {
        alert(error);
    }
} else { 
    alert(secondCancel);
}