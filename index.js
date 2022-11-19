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
    <label>Почтовый адрес и индекс
    <input name="address_${curFieldNameId}" type="text">
</label>
    <label>Электронный адрес участника
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

    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());

    console.log(values);

    const santaForm = document.querySelector('.santaForm')
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

    fetch('https://httpbin.org/post', {
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

}



form.addEventListener('submit', retrieveFormValue);