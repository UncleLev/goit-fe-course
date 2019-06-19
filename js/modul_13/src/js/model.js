export default class Model {
    constructor() {
        if (JSON.parse(localStorage.getItem("bookmark")) == null) {
            this.bookmark = [];
        } else {
            this.bookmark = JSON.parse(localStorage.getItem("bookmark"));
        }

    }
    isValidUrl(url) {
        let re = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (re.test(url)) {
            return true;
        } else {
            return false;
        }
    }
    toLocalstore() {
        const item = "bookmark";
        localStorage.setItem(item, JSON.stringify(this.bookmark));
        this.bookmark = JSON.parse(localStorage.getItem(item));
    }
    addItem(Url, callback) {
        if (!this.isValidUrl(Url)) {
            alert('This is invalid url');
        } else {


            const data = {
                key: '5d09dcd66cccb0feccde63fa107fadd9e5d43a5ae60ef',
                q: Url,
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
                    if (this.IsUniqueByKeyInArrOfObjs('url', this.bookmark, response.url)) {
                        if (preview.error == undefined) {
                            preview.id = Date.now();
                            this.bookmark.unshift(response);
                            this.toLocalstore();
                            callback('#bookmark', '#bookmark-list', this.bookmark);
                        } else {
                            alert('impossible to add this url');
                        }
                    } else {
                        alert('This url already added');
                    }
                })
                .catch(error => console.log('ERROR ' + error));
        }
    }

    IsUniqueByKeyInArrOfObjs(key, arrOfObj, item) {

        if (arrOfObj.find(el => el[key] == item) != undefined) {
            return false
        } else {
            return true;
        }
    }

    removeItem(id, callback) {

        this.bookmark = this.bookmark.filter(el => el.id != id);
        this.toLocalstore();
        callback('#bookmark', '#bookmark-list', this.bookmark);
    }


}