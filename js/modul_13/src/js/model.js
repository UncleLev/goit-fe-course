export default class Model {
    constructor(url) {
        this.url = url;
        if (JSON.parse(localStorage.getItem("bookmark")) == null) {
            this.bookmark = [];
        } else {
            this.bookmark = JSON.parse(localStorage.getItem("bookmark"));
        }

    }
    toLocalstore() {
        const item = "bookmark";
        localStorage.setItem(item, JSON.stringify(this.bookmark));
        this.bookmark = JSON.parse(localStorage.getItem(item));
    }
    addItem() {
        const data = {
            key: '5d069d150872101ed443356f762e9132b58f8c80e131d',
            q: this.url,
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
                if (IsUniqueByKeyInArrOfObjs('url', bookmark, response.url)) {
                    if (preview.error == undefined) {
                        preview.id = Date.now();
                        this.bookmark.unshift(response);
                        this.toLocalstore();
                        showHandlebars('#bookmark', '#bookmark-list');
                    } else {
                        alert('impossible to add this url');
                    }
                } else {
                    alert('This url already added');
                }
            })
            .catch(error => console.log('ERROR ' + error));
    }
    // itemDelete = event => {

    //     if (event.target.getAttribute('id') == "delete") {
    //         let id = event.target.parentElement.parentElement.getAttribute('bookmarkId');
    //         this.bookmark = this.bookmark.filter(el => el.id != id);
    //         this.toLocalstore();
    //          showHandlebars('#bookmark', '#bookmark-list');
    //     }
    // }

}