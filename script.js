"use strict";
/*
const search_btn = document.getElementById('search_btn');
const searchbar = document.querySelector('.search_bar');
const gifDisplayfig = document.querySelector('.gif_display');
const stickerdisplayfig = document.querySelector('.gif_display_two');
const title_display = document.querySelectorAll('#default_title')
const btn_right = document.querySelectorAll('.right');
const btn_left = document.querySelectorAll('.left');



const Api_Key = `UKJnkBYxyQwTfFLSJWkSfCzkrATHaTJq`;
const searched_item_array = []

//helper functions_____

// .1 clearing fields
const clean_fields = function () {
    searchbar.value = '';
    gifDisplayfig.innerHTML = '';
    stickerdisplayfig.innerHTML = '';
    title_display.forEach(elem => elem.innerHTML = '')
    btn_left.forEach(elem => elem.classList.add('hide'))
    btn_right.forEach(elem => elem.classList.add('hide'))
    // btn_left.classList.add('hide');
    // btn_right.classList.add('hide');
};

// .2 inserting gif html
const htmlstring = function (arrayH) {
    return arrayH.map(arrayelem => `
    <li class="gif_block"><a href="${arrayelem.url}"><img src="${arrayelem.preview_url}" alt=""></a>
    <div class="heart"><i class="fa-solid fa-heart"></i></div></li>`).join(' ')
};

// .3 showing buttons
const buttondisplay = function () {
    setTimeout(function () {
        btn_left.forEach(elem => elem.classList.toggle('hide'))
        btn_right.forEach(elem => elem.classList.toggle('hide'))
    }, 500)
};

//creating object
const gif_object = function (elem) {
    let { api_data } = elem;
    console.log(api_data);
    return {
        Id: api_data.id,
        preview_url: api_data.images.preview_gif.url,
        Type: api_data.type,
        url: api_data.url
    }
};


const fetching = async function (searched_item) {
    try {
        const data = await fetch(`https:api.giphy.com/v1/gifs/search?api_key=${Api_Key}&q=${searched_item}`)
        const data_body = await data.json();
        console.log(data_body);
        const imgurlarr = data_body.data.map(elem => {
            return {
                Id: elem.id,
                preview_url: elem.images.preview_gif.url,
                Type: elem.type,
                url: elem.url
            }
        })
        // ______________________________///////

        const htmlelem = htmlstring(imgurlarr);
        gifDisplayfig.insertAdjacentHTML('beforeend', htmlelem)
    } catch (err) {
        console.log(err);
    }
};


const fetcher = async function (searched_item) {
    try {
        const data2 = await fetch(`https:api.giphy.com/v1/stickers/search?api_key=${Api_Key}&q=${searched_item}`)
        const data_body2 = await data2.json();
        const imgurlarr2 = data_body2.data.map(elem => {
            return {
                Id: elem.id,
                preview_url: elem.images.preview_gif.url,
                Type: elem.type,
                url: elem.url
            }
        })
        console.log(imgurlarr2);
        const htmlelem2 = htmlstring(imgurlarr2);
        stickerdisplayfig.insertAdjacentHTML('beforeend', htmlelem2)

    } catch (err) {
        console.log(err);
    }

};

search_btn.addEventListener('click', function (e) {
    e.preventDefault();
    const searched_item = searchbar.value;
    fetching(searched_item)
    fetcher(searched_item)
    clean_fields();
    buttondisplay();
});
*/
const search_btn = document.getElementById('search_btn');
const searchbar = document.querySelector('.search_bar');
const gifDisplayfig = document.querySelector('.gif_display');
const stickerdisplayfig = document.querySelector('.gif_display_two');
const title_display = document.querySelectorAll('#default_title');
const btn_right = document.querySelectorAll('.right');
const btn_left = document.querySelectorAll('.left');
const btn_up_L = document.querySelector('.L_up');
const btn_up_R = document.querySelector('.R_up');
const btn_Below_L = document.querySelector('.L_below');
const btn_Below_R = document.querySelector('.R_below');
const mode_toggler = document.querySelector('.round')
const stylesheet = document.getElementById('style_sheet')
const tsest = document.querySelector('.heart');
const navul = document.querySelector('.nav_ul');
const dropdown_btn = document.querySelector('#dropdown_icon');
let _faviourite_item_array = [];

dropdown_btn.addEventListener('click', function (e) {
    // console.log(e);
    navul.style.display = navul.style.display === 'none' ? 'block' : 'none';
    // navul.style.display = navul.style.display === 'block' ? 'none' : 'block';

})

const switcher = function (css_file) {
    stylesheet.setAttribute('href', css_file);
};


class giphy_object {
    _Api_Key = `UKJnkBYxyQwTfFLSJWkSfCzkrATHaTJq`;
    _searched_item_array = [];

    constructor() {
        search_btn.addEventListener('click', this._executer.bind(this));
        this._scroll();
        mode_toggler.addEventListener('click', this._switched.bind(this));
        //faviourite heart active function
        gifDisplayfig.addEventListener('click', this._heart.bind(this));
        stickerdisplayfig.addEventListener('click', this._heart.bind(this));
        this.getting_data();
    }
    // .1 clearing fields
    _clean_fields() {
        searchbar.value = '';
        gifDisplayfig.innerHTML = '';
        stickerdisplayfig.innerHTML = '';
        title_display.forEach(elem => elem.innerHTML = '')
        btn_left.forEach(elem => elem.classList.add('hide'))
        btn_right.forEach(elem => elem.classList.add('hide'))
    };


    // .2 inserting gif html
    _htmlstring(arrayH) {
        return arrayH.map(arrayelem => `
    <li class="gif_block" data-id="${arrayelem.Id}"><a href="${arrayelem.url}" target="_blank"><img src="${arrayelem.preview_url}" alt=""></a>
    <div class="heart"><i class="fa-solid fa-heart heart_logo"></i></div></li>`).join(' ')
    };

    // .3 showing buttons
    _buttondisplay() {
        setTimeout(function () {
            btn_left.forEach(elem => elem.classList.toggle('hide'))
            btn_right.forEach(elem => elem.classList.toggle('hide'))
        }, 500)
    };


    //gifs fetching function
    async _fetching(searched_item) {
        try {
            const data = await fetch(`https:api.giphy.com/v1/gifs/search?api_key=${this._Api_Key}&q=${searched_item}`)
            const data_body = await data.json();
            console.log(data_body);
            const imgurlarr = data_body.data.map(elem => {
                return {
                    Id: elem.id,
                    preview_url: elem.images.preview_gif.url,
                    Type: elem.type,
                    url: elem.url
                }
            })
            this._searched_item_array.push(imgurlarr);
            console.log(this._searched_item_array);
            const htmlelem = this._htmlstring(imgurlarr);
            gifDisplayfig.insertAdjacentHTML('beforeend', htmlelem);
        } catch (err) {
            console.log(err)
        }
    };


    //sticker fetching function
    async _fetcher(searched_item) {
        try {
            const data2 = await fetch(`https:api.giphy.com/v1/stickers/search?api_key=${this._Api_Key}&q=${searched_item}`)
            const data_body2 = await data2.json();
            const imgurlarr2 = data_body2.data.map(elem => {
                return {
                    Id: elem.id,
                    preview_url: elem.images.preview_gif.url,
                    Type: elem.type,
                    url: elem.url
                }
            })

            this._searched_item_array.push(imgurlarr2);
            const htmlelem2 = this._htmlstring(imgurlarr2);
            stickerdisplayfig.insertAdjacentHTML('afterbegin', htmlelem2)
        } catch (err) {
            // this._errmsg(err)
            console.log(err);
        }

    };


    //horizontal scroll functionality
    _scroll() {
        //gif scroll
        btn_up_R.addEventListener('click', function () {
            gifDisplayfig.scrollBy(250, 0)
        })
        btn_up_L.addEventListener('click', function () {
            gifDisplayfig.scrollBy(-250, 0)
        })
        btn_Below_L.addEventListener('click', function () {
            stickerdisplayfig.scrollBy(-250, 0)
        })
        btn_Below_R.addEventListener('click', function () {
            stickerdisplayfig.scrollBy(250, 0)
        })
    };


    // darkmode toggle functionality
    _switcher(css_file) {
        stylesheet.setAttribute('href', css_file);
    };

    _switched() {
        const link = stylesheet.getAttribute('href');
        if (link === 'style.css') {
            console.log('this is link1');
            this._switcher('dark.css')
        } else {
            console.log('this is link2');
            this._switcher('style.css')
        }
    }

    //marking fav 
    _heart(e) {
        let Heart_L = e.target.classList.contains('heart_logo')
        if (!Heart_L) return
        if (Heart_L)
            e.target.style.color = '#ef202b'//changing color
        let Divs = e.target;
        let parent = Divs.closest('li')//selecting parent li
        let parent_data = parent.dataset.id
        let loopnum = 2;
        //running loop so that we can  iterate through both sticker and gif array in this array 
        // and filter out those heart marked item and checking this from comparing IDs 
        for (let i = 0; i <= this._searched_item_array.length; i++) {
            if (i < loopnum)
                this._searched_item_array[i].filter(elem => {
                    if (elem.Id === parent_data)
                        _faviourite_item_array.push(elem)
                })
        }
        this._storing();
        // console.log(_faviourite_item_array);

    }


    _storing() {
        localStorage.setItem('datas', JSON.stringify(_faviourite_item_array))
    }

    getting_data() {
        let store = JSON.parse(localStorage.getItem('datas'))

        store ? _faviourite_item_array = store : _faviourite_item_array = []

        console.log(_faviourite_item_array);
    }
    _errmsg() {
        this._clean_fields()
        title_display.forEach(elem => {
            elem.innerHTML = 'Hey, search for something !'
        })

    }



    // final execution 
    _executer(e) {
        e.preventDefault();
        const searched_item = searchbar.value;
        if (!searched_item) return this._errmsg()
        if (searched_item)
            this._fetching(searched_item)
        this._fetcher(searched_item)
        this._clean_fields();
        this._buttondisplay();
    };
}
const giphied = new giphy_object();


