"use strict";

const gifDisplayfig = document.querySelector('.gif_display');
const title_display = document.querySelector('#default_title');
const btn_right = document.querySelector('.right');
const btn_left = document.querySelector('.left');
const btn_up_L = document.querySelector('.L_up');
const btn_up_R = document.querySelector('.R_up');
const tsest = document.querySelector('.heart');

let retrieved_data;

//getting favourite marked gifs
const init = function () {
    retrieved_data = JSON.parse(localStorage.getItem('datas'));
    if (!retrieved_data) return
    console.log(retrieved_data);
}
init();

class favs_object {

    constructor() {
        this._scroll();
        window.addEventListener('load', this._executer.bind(this))
    }
    // .1 clearing fields
    _clean_fields() {
        gifDisplayfig.innerHTML = '';
        title_display.innerHTML = '';
        btn_left.classList.add('hide');
        btn_right.classList.add('hide');
    };

    // .2 showing buttons
    _buttondisplay() {
        setTimeout(function () {
            btn_left.classList.toggle('hide')
            btn_right.classList.toggle('hide')
        }, 500)
    };

    //.3 inserting gif html
    _htmlstring(arrayH) {
        return arrayH.map(arrayelem => `
    <li class="gif_block" data-id="${arrayelem.Id}"><a href="${arrayelem.url}" target="_blank"><img src="${arrayelem.preview_url}" alt=""></a>
    </li>`).join(' ')
    };


    //.4 rendering html inside div
    _inserter_favs() {
        const htmlel = this._htmlstring(retrieved_data)
        gifDisplayfig.insertAdjacentHTML('beforeend', htmlel);
    }

    //horizontal scroll functionality
    _scroll() {
        //gif scroll
        btn_up_R.addEventListener('click', function () {
            gifDisplayfig.scrollBy(250, 0)
        })
        btn_up_L.addEventListener('click', function () {
            gifDisplayfig.scrollBy(-250, 0)
        })
    };


    // final execution 
    _executer(e) {
        e.preventDefault();
        if (!retrieved_data) return

        if (retrieved_data)
            this._clean_fields();
        this._buttondisplay();
        this._inserter_favs();
    };
}
const fav = new favs_object();

