/* 
  Напишите приложение для хранения url веб-страниц в виде карточек-закладок. 
  
  Реализуйте следующий функционал:
    - Используйте Gulp для сборки проекта, JS обработан транспайлером Babel, ресурсы оптимизированы
    
    - Для добавления новой закладки, в приложении есть форма с элементом input и кнопкой "Добавить"
    
    - В приложении есть список всех добавленных карточек-закладок, располагающийся под формой
    
    - Некоторые элементы интерфейса создаются динамически. Используйте шаблонизатор Handlebars для
      создания списка карточек. Форма уже есть в HTML при загрузке страницы.
      
    - При добавлении ссылки в поле формы и нажатии на кнопку "Добавить", происходят проверки:
        * на существование закладки с такой ссылкой в текущей коллекции закладок. Если такая закладка есть,
          всплывает диалоговое окно оповещающее пользователя о том, что такая закладка уже есть.
        * при условии валидной, еще не существующей в коллекции ссылки, карточка с такой ссылкой
          добавляется в коллекцию.
          
    - В интерфейсе, новые карточки добавляются наверх списка, а не вниз.
    
    - Каждая карточка-закладка содержит кнопку для удаления карточки из коллекции, при клике 
      на кнопку происходит удаление.
      
    - При повторном посещении страницы с одного и того же устройства и браузера, пользователь видит
      все карточки-закладки которые были во время последнего его посещения. Используйте localStorage
      
  🔔 Оформление интерфейса произвольное
*/

/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
    - При добавлении ссылки в поле формы и нажатии на кнопку "Добавить", происходи проверка 
      на валидность введенной ссылки: если был введен невалидный url то должно всплывать 
      диалоговое окно, оповещающее пользователя о том, что это невалидный url. Используйте
      регулярные выражения для валидации url.
          
    - Каждая карточка содержит превью изображение и базовую информацию о странице по адресу закладки,
      для получения этой информации воспользуйтесь этим Rest API - https://www.linkpreview.net/
*/

const btnSave = document.querySelector('.btn-js');
const urlInput = document.querySelector('#urlAddress');
let bookmark = JSON.parse(localStorage.getItem('bookmark'));

let datas;


if (bookmark == null) {
    bookmark = [];
}


function showCard() {
    const source = document.querySelector('#bookmark').innerHTML.trim();
    const template = Handlebars.compile(source);
    const markup = template(bookmark);
    const container = document.querySelector('#bookmark-list');
    container.innerHTML = markup;
}

function toLocalstore() {
    localStorage.setItem('bookmark', JSON.stringify(bookmark));
    bookmark = JSON.parse(localStorage.getItem('bookmark'));
}

function isValidUrl(url) {
    re = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (re.test(url)) {
        return true;
    } else {
        return false;
    }
};

function IsUnique(url) {
    if (bookmark.find(el => el.url == url) != undefined) {
        return false
    } else {
        return true;
    }
};

function creatPreview(url) {
    const data = {
        key: '5d069d150872101ed443356f762e9132b58f8c80e131d',
        q: url
    }
    let preview;
    fetch('https://api.linkpreview.net', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(response => {
            preview = response;
            if(IsUnique(url)){
                if(preview.error ==  undefined) {
                    preview.id = Date.now();
                    bookmark.unshift(response);
                    toLocalstore();
                    showCard();
                } else {
                    alert('impossible to add this url');
                }
            } else {
                alert('This url already added');
            }
        })
        .catch(error => console.log('ERROR ' + error));


}

function UrlSaving() {
    event.preventDefault();

    let curentUrl = urlInput.value;
    if (isValidUrl(curentUrl)) {
        creatPreview(curentUrl)
    } else {
        console.log('This is invalid url');
    }
    
};

const UrlDeleting = event => {
    
    if (event.target.getAttribute('id') == "delete") {
        let id = event.target.parentElement.parentElement.getAttribute('bookmarkId');
        bookmark = bookmark.filter(el => el.id != id);
        toLocalstore();
        showCard();
    }

};

showCard();
const btnDelete = document.querySelector('#bookmark-list');

btnSave.addEventListener('click', UrlSaving);
btnDelete.addEventListener('click', UrlDeleting);
