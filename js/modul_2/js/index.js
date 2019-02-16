'use strict';

const numbers = [];

let userInput = 0; //ввід числа юзером
let total = 0; //загальна сума чисел
let exit = true; //змінна для виходу з циклу
let i = 0; 


do {

    userInput = prompt('введите число'); //введення числа
    
    if (userInput != null) { //перевірка на відмінну

        numbers[i] = Number(userInput);
        i += 1; 
    
    } else {

        alert('Отмена');
        exit = false;
    
    }
} while (exit);

if (numbers[0] != undefined) { //перевірка на пустоту масиву

    for (i = 0; i < (numbers.length); i += 1) { //підрахування суми

        total = total + numbers[i];
    
    }

    alert('Общая сумма чисел равна ' + total);// виведення суми
} else {

    alert('Масив пустой');
}


alert('Додаткове завдання');

const passwords = ['qwerty', '111qwe', '123123', 'r4nd0mp4zzw0rd'];
let attempts = 3;
let userPassword = 0; //змінна зберігання введеного паролю
let check = false; //змінна для перевірки


exit = true;

do {

    userPassword = prompt('Введите пароль'); //введення пароля
    
    if (userPassword != null) { //перевірка на відмінну

    	for (i = 0; i < passwords.length; i += 1) { // пошук на збіг з паролями

    		if (userPassword == passwords[i]) { //знайдений збіг
        
                alert('Добро пожаловать!');
                check = true; 
        
            }
        }
        
        if (check == true) { //вихід з циклу якщо пароль вірний
        
            break;
        
        }

    	attempts = attempts - 1;
       	
       	if (attempts == 0) { //перевірка на закінчення спроб
        
            alert ('У вас закончились попытки, аккаунт заблокирован!');
    		break;
        
        }
        
        alert('Неверный пароль, у вас осталось ' + attempts + ' попыток');
    
    } else { //нажаття відміна

        alert('Отмена');
        exit = false;
    
    }

} while (exit);