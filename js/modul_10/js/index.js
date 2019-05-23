'use strict';
/*
  Написать приложение для работы с REST сервисом, 
  все функции делают запрос и возвращают Promise 
  с которым потом можно работать. 
  
  Реализовать следующий функционал:
  - функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.
  
  - функция getUserById(id) - должна вернуть пользователя с переданным id.
  
  - функция addUser(name, age) - должна записывать в БД юзера с полями name и age.
  
  - функция removeUser(id) - должна удалять из БД юзера по указанному id.
  
  - функция updateUser(id, user) - должна обновлять данные пользователя по id. 
    user это объект с новыми полями name и age.
  Документацию по бэкенду и пример использования прочитайте 
  в документации https://github.com/trostinsky/users-api#users-api.
  Сделать минимальный графический интерфейс в виде панели с полями и кнопками. 
  А так же панелью для вывода результатов операций с бэкендом.
*/

const ShowAllUser = document.querySelector('#AllUser');
const ShowIdUser = document.querySelector('#ShowId');
const ShowAddUser = document.querySelector('#AddUser');
const ShowRemoveUser = document.querySelector('#RemoveUser');
const ShowUpdateUser = document.querySelector('#UpdateUser');

const Nav = document.querySelector('.nav');
const FormsList = document.querySelector('.forms');

const FormAll = document.querySelector('#FormAll');
const FormById = document.querySelector('#FormById');
const FormAd = document.querySelector('#FormAd');
const FormRemove = document.querySelector('#FormRemove');
const FormUpdate = document.querySelector('#FormUpdate');

const ResultList = document.querySelector('.result');

const ApiLink = 'https://test-users-api.herokuapp.com/users/';

const User = {
  age: 23,
  name: 'Stark'
}

function ActiveClear() {
  Clear();
  FormsList.childNodes.forEach((el, i) => {
    if (i % 2 != 0 && i != 0) {
      el.classList.remove('search-form--active')
    }
  });
  Nav.childNodes.forEach((el, i) => {
    if (i % 2 != 0 && i != 0) {
      el.classList.remove('btn--active')
    }
  });
};



function Clear() {
  while (ResultList.firstChild) {
    ResultList.removeChild(ResultList.firstChild)
  }
}

function showAll() {
  setTimeout(() => {
    fetch(ApiLink)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }, 2000);
}

function getAllUsers() {
  event.preventDefault();
  Clear();
  fetch(ApiLink)
    .then(response => response.json())
    .then(data => {
      data.data.forEach(element => {
        ResultList.innerHTML += `<li>ID: ${element.id}  <br>Name: ${element.name} <br>Age: ${element.age} <br></li>`;
      });
    })
    .catch(error => console.error(error));
}

function getUserById(id) {
  event.preventDefault();
  Clear();
  fetch(ApiLink + id)
    .then(response => response.json())
    .then(data => {
      ResultList.innerHTML += `<li>ID: ${data.data.id}  <br>Name: ${data.data.name} <br>Age: ${data.data.age} <br></li>`;
    })
    .catch(error => console.error(error));
}

function addUser(name, age) {
  event.preventDefault();
  Clear();
  User.name = name;
  User.age = age;
  fetch(ApiLink, {
      method: 'POST',
      body: JSON.stringify(User),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(response => response.json())
    .then(data => ResultList.innerHTML += `<li>Adding user   <br>Name: ${data.data.name} <br>Age: ${data.data.age} <br></li>`)
    .catch(error => console.log('ERROR' + error));;
}

function removeUser(id) {
  event.preventDefault();
  Clear();
  fetch(ApiLink + id, {
      method: 'DELETE'
    }).then(() => ResultList.innerHTML += `<li>${id} user deleted</li>`)
    .catch(error => console.log('ERROR' + error));
}

function updateUser(id, user) {
  event.preventDefault();
  Clear();
  fetch(ApiLink + id, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(data => ResultList.innerHTML += `<li>Updated <br> ID:${data.data.id} <br>Name: ${data.data.name} <br>Age: ${data.data.age} <br></li>`)
    .catch(error => console.log('ERROR' + error));
}

showAll();

FormAll.addEventListener('submit', getAllUsers);
FormById.addEventListener('submit', () => getUserById(FormById.children[0].value));
FormAd.addEventListener('submit', () => addUser(FormAd.children[0].value, FormAd.children[1].value));
FormRemove.addEventListener('submit', () => removeUser(FormRemove.children[0].value));
FormUpdate.addEventListener('submit', () => {
  User.name = FormUpdate.children[1].value;
  User.age = FormUpdate.children[2].value;
  updateUser(FormUpdate.children[0].value, User);
});

ShowAddUser.addEventListener('click', () => {
  ActiveClear();
  ShowAddUser.classList.add('btn--active');
  FormAd.classList.add('search-form--active');
});

ShowAllUser.addEventListener('click', () => {
  ActiveClear();
  ShowAllUser.classList.add('btn--active');
  FormAll.classList.add('search-form--active');

});

ShowIdUser.addEventListener('click', () => {
  ActiveClear();
  FormById.classList.add('search-form--active');
  ShowIdUser.classList.add('btn--active')
});

ShowRemoveUser.addEventListener('click', () => {
  ActiveClear();
  FormRemove.classList.add('search-form--active');
  ShowRemoveUser.classList.add('btn--active')
});

ShowUpdateUser.addEventListener('click', () => {
  ActiveClear();
  FormUpdate.classList.add('search-form--active');
  ShowUpdateUser.classList.add('btn--active')
});