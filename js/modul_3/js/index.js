'use strict';

const logins = ["Mango", "robotGoogles", "Poly", "Aj4x1sBozz", "qwerty123"];

const isLoginValid = function (login) {
  if (login.length <= 14 && login.length >= 4) {
    return true;
  } else {
    return false;
  }

};

const isLoginUnique = function (allLogins, login) {
  return allLogins.includes(login);
};

const addLogin = function (allLogins, login) {
  if (isLoginValid(login)) {
    if (!isLoginUnique(allLogins, login)) {
      allLogins.push(login);
      alert('Логин успешно добавлен!');
    } else {
      alert('Такой логин уже используется!');
    }
  } else {
    alert('Ошибка! Логин должен быть от 4 до 16 символов');
  }
};

addLogin(logins, prompt('Введите логин'));