var countOfFields = 1; // Текущее число полей
var curFieldNameId = 1; // Уникальное значение для атрибута name

function deleteField(a) {
    // Получаем доступ к ДИВу, содержащему поле
    var contDiv = a.parentNode;
    // Удаляем этот ДИВ из DOM-дерева
    contDiv.parentNode.removeChild(contDiv);
    // Уменьшаем значение текущего числа полей
    countOfFields--;
    // Возвращаем false, чтобы не было перехода по сслыке
    return false;
}

function addField() {

    // Увеличиваем текущее значение числа полей
    countOfFields++;
    // Увеличиваем ID
    curFieldNameId++;
    // Создаем элемент ДИВ
    var div = document.createElement("div");
    // Добавляем HTML-контент с пом. свойства innerHTML
    div.innerHTML = `<div class="field">
    <label>Имя участника игры
        <input name="name_${curFieldNameId}" type="text">
    </label>
    <label>Почтовый&nbspадрес и индекс
    <input name="address_${curFieldNameId}" type="text">
</label>
    <label>Электронный&nbspадрес участника
        <input name="email_${curFieldNameId}" type="email">
    </label>
    <a class="deleteButton" onclick="return deleteField(this)" href="#">удалить</a>
</div>`;
    // Добавляем новый узел в конец списка полей
    document.getElementById("parentId").appendChild(div);
    // Возвращаем false, чтобы не было перехода по сслыке
    return false;
}

const {
    form
} = document.forms;

function retrieveFormValue(event) {
    event.preventDefault();
    const santaForm = document.querySelector('.santaForm')
    let inputsFilled = Array.from(document.querySelectorAll('input')).every(v => v.value)
    if (inputsFilled === true) {
        let names = Array(...santaForm.querySelectorAll('input[name^=name]')).map(i => i.value)
        let addresses = Array(...santaForm.querySelectorAll('input[name^=address]')).map(i => i.value)
        let emails = Array(...santaForm.querySelectorAll('input[name^=email]')).map(i => i.value)


        emails.push(emails.shift())
        const result = []
        for (let i = 0; i < emails.length; i++) {
            result.push({
                email: emails[i],
                name: names[i],
                address: addresses[i],
            })
        }

        fetch('http://santa.strigo.ru/create', {
            method: 'POST',
            body: JSON.stringify(result),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        })
            .then(response => response.json())
            .then(values => {
                console.log(values)

                document.querySelector('.messageDiv').innerHTML = 'Данные игроков отправлены!';

            })
            .catch(error => console.log(error))


    } else {
        document.querySelector('.messageDiv').innerHTML = 'Заполните все поля формы';
    }
}


form.addEventListener('submit', retrieveFormValue);

document.addEventListener("DOMContentLoaded", function () {
    hand.classList.add('animated1');
})
scratchbtn.onclick = function () {
    try {
        hand.classList.remove('animated2');
        hand1.classList.remove('animated2');
        setTimeout(() => {
            hand.classList.add('animated2');
            hand1.classList.add('animated2');
        }, 1)
    } finally {
        let thanks = ['мррpppp...', 'мррррpp!', 'спасибо!', 'с наступающим!'];
        let element = document.getElementById('thanksdiv');

        for (let i = 0; i < thanks.length; i++) {
            setTimeout(() => {

                element.innerHTML = `<p>${thanks [i]}</p>`;

            }, (i + 1) * 1000)
        }


    }
}

function setCountdownValue(id, value) {
    document.getElementById(id).innerHTML = value;
}

const durationToSeconds = {
    tday: 86400,
    thour: 3600,
    tmin: 60,
    tsec: 1
}
const timeend = new Date(2023, 0, 1, 0, 0, 0);

function countdown() {
    let diff = Math.floor((timeend.getTime() - new Date().getTime()) / 1000);

    if (diff <= 0) {
        for (let durationName of Object.keys(durationToSeconds)) {
            setCountdownValue(durationName, 0)
        }
        return
    }

    for (let durationName of Object.keys(durationToSeconds)) {
        const secondsInDuration = durationToSeconds[durationName]
        const value = Math.floor(diff / secondsInDuration)
        setCountdownValue(durationName, value)
        diff -= value * secondsInDuration
    }
}

setInterval(countdown, 200);