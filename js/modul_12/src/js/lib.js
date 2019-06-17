function showHandlebars(item,parent) { 
    const source = document.querySelector(item).innerHTML.trim();
    const template = Handlebars.compile(source);
    const markup = template(bookmark);
    const container = document.querySelector(parent);
    container.innerHTML = markup;
}

function isValidUrl(url) { 
    let re = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (re.test(url)) {
        return true;
    } else {
        return false;
    }
};

function IsUniqueByKeyInArrOfObjs(key,arrOfObj,item) { 
    
    if (arrOfObj.find(el => el[key] == item) != undefined) {
        return false
    } else {
        return true;
    }
};
function toLocalstore() {
    localStorage.setItem('bookmark', JSON.stringify(bookmark));
    bookmark = JSON.parse(localStorage.getItem('bookmark'));
}

function creatPreview(ThisUrl) {
    const data = {
        key: '5d069d150872101ed443356f762e9132b58f8c80e131d',
        q: ThisUrl
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
            if(IsUniqueByKeyInArrOfObjs('url',bookmark,response.url)){
                if(preview.error ==  undefined) {
                    preview.id = Date.now();
                    bookmark.unshift(response);
                    toLocalstore();
                    showHandlebars('#bookmark','#bookmark-list');
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
        alert('This is invalid url');
    }
    
};

const UrlDeleting = event => {
    
    if (event.target.getAttribute('id') == "delete") {
        let id = event.target.parentElement.parentElement.getAttribute('bookmarkId');
        bookmark = bookmark.filter(el => el.id != id);
        toLocalstore();
        showHandlebars('#bookmark','#bookmark-list');
    }

};