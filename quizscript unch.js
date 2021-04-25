const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");
const ii = document.getElementById("imo");
let dragon = 0;
class Quiz {
    constructor(type, questions, results) {
        this.type = type;
        this.questions = questions;
        this.results = results;
        this.score = 0;
        this.result = 0;
        this.current = 0;
    }
    Click(index) {
        if (this.current == 0) {
            this.Next();
            return index;
        } else {
            let value = this.questions[this.current].Click(index);
            this.score += value;
            let correct = -1;
            if (value >= 1) {
                correct = index;
            } else {
                for (let i = 0; i < this.questions[this.current].answers.length; i++) {
                    if (this.questions[this.current].answers[i].value >= 1) {
                        correct = i;
                        break;
                    }
                }
            }
            this.Next();
            return correct;
        }
    }

    Next() {
        this.current++;
        if (this.current >= this.questions.length) {
            this.End();
        }
    }

    End() {
        for (let i = 0; i < this.results.length; i++) {
            if (this.results[i].Check(this.score)) {
                this.result = i;
            }
        }
    }
}

class Question {
    constructor(text, answers) {
        this.text = text;
        this.answers = answers;
    }
    Click(index) {
        return this.answers[index].value;
    }
}
class Answer {
    constructor(text, value) {
        this.text = text;
        this.value = value;
    }
}
class Result {
    constructor(text, value) {
        this.text = text;
        this.value = value;
    }
    Check(value) {
        if (this.value <= value) {
            return true;
        } else {
            return false;
        }
    }
}

const results = [
    new Result("Видимо Вы с этой темой - самые удаленные точки во множестве точек.", 0),
    new Result("Рандом не вариант!", 1),
    new Result("Ошиблись в ударении? хех", 2),
    new Result("Молодца! Где-то на страничке появилась фича ;)", 3)
];

const questions = [
    new Question("Если хочешь, можешь пройти тест по этому алгоритму :)", [
        new Answer("Давай, попробую!", 0),
        new Answer("Ок", 0),
        new Answer("То что нужно", 0),
    ]),
    new Question("Через какие вершины нужно проводить опорные параллельные прямые?", [
        new Answer("Случайные", 0),
        new Answer("Соседние", 0),
        new Answer("Противоположные", 1),
    ]),
    new Question("Как выбрать следующую пару точек?", [
        new Answer("Взять две следующие по движению точки", 0),
        new Answer("Взять точку, принадлежащую меньшему углу, а вторую оставить прежней", 1),
        new Answer("Взять точку, принадлежащую большему углу, а вторую оставить прежней", 0),
    ]),
    new Question("И напоследок немного орфоэпии :3 Куда ставится ударение в слове калиперы (ответ в видео)", [
        new Answer("кАлиперы", 1),
        new Answer("калИперы", 0),
        new Answer("калипЕры", 0),
    ])

];
const quiz = new Quiz(1, questions, results);



Update();

function Update() {
    if (quiz.current < quiz.questions.length) {
        headElem.innerHTML = quiz.questions[quiz.current].text;
        buttonsElem.innerHTML = "";
        for (let i = 0; i < quiz.questions[quiz.current].answers.length; i++) {
            let btn = document.createElement("button");
            btn.className = "button";
            btn.innerHTML = quiz.questions[quiz.current].answers[i].text;
            btn.setAttribute("index", i);
            buttonsElem.appendChild(btn);
        }
        pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;
        Init();
    } else {
        buttonsElem.innerHTML = "";
        headElem.innerHTML = quiz.results[quiz.result].text;
        if (quiz.result == 3) {
            dragon = 1;
            alert(dragon);
        }
        quiz.current = 0;
        setTimeout(Update, 3000);
    }
}

function Init() {
    let btns = document.getElementsByClassName("button");
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function(e) { Click(e.target.getAttribute("index")); });
    }
}

function Click(index) {
    let correct = quiz.Click(index);
    let btns = document.getElementsByClassName("button");

    //Делаем кнопки серыми
    for (let i = 0; i < btns.length; i++) {
        btns[i].className = "button button_passive";
    }

    //Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
    if (quiz.type == 1) {
        if (correct >= 0) {
            btns[correct].className = "button button_correct";
        }

        if (index != correct) {
            btns[index].className = "button button_wrong";
        }
    }
    setTimeout(Update, 1000);
}

function setNewImage() {
    alert(dragon);
    if (dragon == 1) {
        document.getElementById("imo").src = "bill.png";
    }


}

function setOldImage() {
    if (dragon == 1) {
        document.getElementById("imo").src = "lines_image.svg";
        alert(windows.dragon);
    }
}