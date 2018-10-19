(function (Window) {

    var costo = 0
    var reset;

    var App = {

        htmlElements: {
            select: document.getElementById("selecc"),
            buyBotton: document.getElementsByClassName('buttonBuy'),
            buttonWin: document.getElementsByClassName('buttonWin'),
            cant: document.getElementsByClassName('sel'),
            eter: document.getElementById('costo'),
            table: document.getElementById('padre'),
            modal: document.getElementById('myModal'),
            btn: document.getElementsByClassName("btn"),
            isPurched: document.querySelector(".isPurched"),
            costovar: document.querySelector('.costo'),
            numberWin: document.getElementsByClassName('comprados'),
            check: document.getElementsByClassName('check'),
            number: document.getElementsByClassName('number'),
            start: document.getElementsByClassName('initGame'),
            buttonRestart: document.getElementsByClassName('buttonRestart'),
            div: {},
            tr: {},
            button: {},
            td: {}
        },

        init: function () {
            App.initButton(10, 10, -1);
            App.initClickEvent.buyNumber();
            App.initClickEvent.restartGame();
            reset = false;
        },

        initClickEvent: {
            selectNumber(j) {
                App.htmlElements.button[j].addEventListener("click", App.initbuttonClickEvent);
            },
            deselectNumber() {
                App.htmlElements.div.addEventListener('click', App.selectClickEvent);
            },
            buyNumber() {
                App.htmlElements.buyBotton[0].addEventListener('click', App.loadProcess);
                App.htmlElements.buttonWin[0].addEventListener('click', App.winNumber);
            },
            restartGame() {
                App.htmlElements.buttonRestart[0].addEventListener('click', App.playGame);
            }
        },

        initButton: function (x, y, value) {
            for (i = 1; i <= x; i++) {
                App.htmlElements.tr[i] = document.createElement("tr");
                for (j = 1; j <= y; j++) {
                    value = value + 1;
                    App.htmlElements.td[j] = document.createElement("td");
                    App.htmlElements.button[j] = document.createElement("button");
                    App.htmlElements.button[j].appendChild(document.createTextNode(value));
                    App.htmlElements.button[j].setAttribute("class", String(value) + ' number initGame');
                    App.initClickEvent.selectNumber(j);

                    App.htmlElements.td[j].appendChild(App.htmlElements.button[j]);
                    App.htmlElements.tr[i].appendChild(App.htmlElements.td[j]);
                }
                App.htmlElements.table.appendChild(App.htmlElements.tr[i]);
            }
            App.htmlElements.costovar.appendChild(document.createTextNode('Costo: 0 Ethereum'));
        },

        initbuttonClickEvent: function () {
            var value = this.textContent;
            this.setAttribute("class", "sel number initGame");
            this.disabled = true;
            App.select(value);
        },

        select: function (value) {
            costo = costo + 1;
            App.htmlElements.costovar.innerHTML = 'Costo: ' + costo + ' Ethereum';
            App.htmlElements.div = document.createElement("div");
            App.htmlElements.div.setAttribute("class", "btn initGame");
            App.initClickEvent.deselectNumber();
            App.htmlElements.div.appendChild(document.createTextNode(value));
            App.htmlElements.select.appendChild(
                App.htmlElements.div
            );
        },

        selectClickEvent: function () {
            var cant = App.htmlElements.cant;
            for (var i = 0; i < cant.length; i++) {
                if (this.textContent == cant[i].textContent) {
                    cant[i].disabled = false;
                    cant[i].setAttribute('class', this.textContent + ' number initGame');
                    App.htmlElements.select.removeChild(this);
                    costo = costo - 1;
                    App.htmlElements.costovar.innerHTML = 'Costo: ' + costo + ' Ethereum';
                }
            }
        },

        loadProcess: function () {
            if (App.htmlElements.btn.length >= 1 && App.htmlElements.check[0].checked == true) {
                App.htmlElements.modal.style.display = "block";
                setTimeout(App.buyProcess, 3000);
            }
        },

        buyProcess: function () {
            App.htmlElements.modal.style.display = "none";
            var extention = App.htmlElements.btn.length;
            for (var i = 0; i < extention; i++) {
                App.htmlElements.isPurched.appendChild(App.htmlElements.btn[0]);
            }

            for (var i = 0; i < extention; i++) {
                App.htmlElements.cant[0].setAttribute('class', 'buttonPurched number initFame');
                App.htmlElements.btn[0].setAttribute('class', 'comprados initGame');
            }
            App.htmlElements.check[0].checked = false;
            costo = 0;

            App.htmlElements.costovar.innerHTML = 'Costo: ' + costo + ' Ethereum';
        },

        winNumber: function () {
            if (Object.keys(App.htmlElements.numberWin).length >= 1) {
                App.htmlElements.modal.style.display = "block";
                setTimeout(App.assignWin, 3000);
            }
        },

        assignWin: function () {
            var winner = Math.floor(Math.random() * Math.floor(99));
            App.htmlElements.modal.style.display = "none";

            var len = Object.keys(App.htmlElements.number).length;

            var win = document.getElementsByClassName(winner);

            for (var i = 0; i < len; i++) {

                if (App.htmlElements.numberWin[i].textContent == winner) {
                    var button = App.htmlElements.numberWin[i].textContent;

                    App.htmlElements.number[button].setAttribute('class', 'winButton number initGame');
                    App.htmlElements.numberWin[i].setAttribute('class', 'win initGame');
                    break
                } else {

                    win[0].setAttribute('class', 'winButton initGame');
                    break
                }
            }

            var startLenth = Object.keys(App.htmlElements.start).length;
            for (let i = 0; i < startLenth; i++) {
                App.htmlElements.start[i].setAttribute("style", "pointer-events:none;");
            }
            reset = true;

        },

        playGame: function () {
            if (reset) {
                location.reload();
            }
        }

    };

    Window.App = App;
})(window);

//var costovar = document.getElementById('costo').appendChild(document.createTextNode('Costo: 0 Ethereum'))