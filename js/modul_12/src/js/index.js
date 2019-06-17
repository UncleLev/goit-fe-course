const btnSave = document.querySelector('.btn-js');
const urlInput = document.querySelector('#urlAddress');
let bookmark = JSON.parse(localStorage.getItem('bookmark'));

if (bookmark == null) {
    bookmark = [];
}

showHandlebars('#bookmark','#bookmark-list');
const btnDelete = document.querySelector('#bookmark-list');

btnSave.addEventListener('click', UrlSaving);
btnDelete.addEventListener('click', UrlDeleting);
