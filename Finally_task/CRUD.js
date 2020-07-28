function DeleteEdit(el) {
    let wrapper = document.querySelector('.wrapper');
    let deleteData = el.querySelector('.delete');
    let editData = el.querySelector('.edit');
    let input = el.querySelector('input');
    let text = el.querySelector('.text');

    deleteData.addEventListener('click', function () {
        if(!wrapper.classList.contains('disabled')) {
            el.remove();
        }
    });

    editData.addEventListener('click', function () {
        if(!wrapper.classList.contains('disabled')) {
            if (el.classList.contains('edit')) {
                editData.innerText = 'Edit';
                el.classList.remove('edit');
                text.innerText = input.value;
            } else {
                editData.innerText = 'Save';
                el.classList.add('edit');
                el.querySelector('input').focus();
            }
        }
    });
}

function AddButtonAndData(className, value) {
    return `<li class="${className}"> 
                <span class="text">${value}</span>  
                <input type="text" value="${value}"> 
                <button class="delete">Delete</button> 
                <button class="edit">${className.length > 0 ? 'Save' : 'Edit'}</button> 
            </li>`;
}

function EventsToElements(list) {
    let elements = list.querySelectorAll('li');

    elements.forEach(function (el) {
        DeleteEdit(el);
    });
}

function Update(list, items) {
    let html = '';

    items.forEach(function (element, i) {
        html += AddButtonAndData('', element);
    });

    list.innerHTML += html;
}



function Start() {
    let wrapper = document.querySelector('.wrapper');
    let getData = document.querySelector('.get');
    let list = document.querySelector('.list');
    let clearData = document.querySelector('.clear');
    let addData = document.querySelector('.add');
    let busy = false;

    getData.addEventListener('click', function () {
        if(!busy) {
            busy = true;
            list.classList.add('preloader');
            wrapper.classList.add('disabled');
            setTimeout(function(){
                Update(list, items);
                EventsToElements(list);
                busy = false;
                list.classList.remove('preloader');
                wrapper.classList.remove('disabled');
            }, 100);
        }
    });

    clearData.addEventListener('click', function () {
        if(!busy) {
            list.innerHTML = '';
        }
    });

    addData.addEventListener('click', function () {
        if(!busy) {
            list.innerHTML += AddButtonAndData('edit', '');
            EventsToElements(list);
            list.querySelector('li:last-child input').focus();
        }
    });
}

window.addEventListener('load', Start);
