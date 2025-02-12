class Task {
    constructor (title, description, date) {
        this.title = title;
        this.description = description;
         this.date = new Date(date);
        this.isCompleted = false;
    }

    completion() {
        this.isCompleted = !this.isCompleted;
    }

}

class toDoList {
    constructor(headline) {
        this.headline = headline;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(title) {
        this.tasks = this.tasks.filter(item => item.title == title);
    }

    getHeadline() {
        return this.headline;
    }
}

class User {
    constructor(name) {
        this.name = name;
        this.list = [];
    }

    addList(headline) {
        this.list = this.list.concat(headline);
    }

    removeList(headline) {
        this.list = this.list.filter(item => item.headline == headline);
    }

    getName() {
        return this.name;
    }
}

class DataService {

    setToken(token) {
        this.token = token;
    }

    setUserEqToken(user) {
        this.user = user;
    }

    setNewUser() {
        localStorage.setItem(this.token, JSON.stringify(new User(this.token)));
    }

    setUpdateUser() {
        localStorage.setItem(this.token, JSON.stringify(this.user));
    }

    getToDoList() {
        return JSON.parse(localStorage.getItem(this.token)).list;
    }

    getNameToDoList() {
        return JSON.parse(localStorage.getItem(this.token)).name;
    }

    getCheck() {
        return JSON.parse(localStorage.getItem(this.token));
    }
}

const signin = document.getElementById('sign_in');
const header = document.getElementById('header-text');
const create_user = document.getElementById('create_user');
const user_name = document.getElementById('text_name_user');
const main = document.getElementById('main');
const text_create = document.getElementById('text_create');
create_user.addEventListener('click', createUser);
signin.addEventListener('click', sign_in);
let back = new DataService();


function createUser() {
    back.setToken(user_name.value);
    if (user_name.value != '' && !back.getCheck()) {
        back.setNewUser();
        text_create.style.color = 'green';
        text_create.innerText = 'Successfully';
    }
    else {
        text_create.style.color = 'red';
        text_create.innerText = 'Error';
    }
}

function sign_in() {
    back.setToken(user_name.value);
    if (back.getCheck() === null) {
        text_create.style.color = 'red';
        text_create.innerText = 'Error';
    }
    else if (back.getNameToDoList() == user_name.value) {
        let name = user_name.value;
        let user = new User(name);
        header.style.display = 'none';
        const new_div = document.createElement('div');
        const new_button = document.createElement('button');
        new_button.id = 'sign_out';
        new_button.innerText = 'Sign out';
        text_create.innerText = '';
        new_div.innerText = `Hello ${user.getName()}`;
        main.appendChild(new_div);
        main.appendChild(new_button);
        new_button.addEventListener('click', sign_out);
        addVisual();
        getListFromStorage();
    }
}

function sign_out() {
    header.style.display = 'flex';
    main.innerText = '';
}

function addVisual() {
    const visual = document.createElement('div');
    visual.id = 'visual_add';
    main.appendChild(visual);
    const toDo_headline = document.createElement('input');
    toDo_headline.id = 'toDo_headline';
    toDo_headline.placeholder = 'Your List\'s name...'
    visual.appendChild(toDo_headline);
    const create_toDo = document.createElement('button');
    create_toDo.innerText = 'Create';
    create_toDo.id = 'create_list';
    visual.appendChild(create_toDo);
    create_toDo.addEventListener('click', create_new_container);
}

function create_new_container() {
    const check_list = document.getElementById('main_list');
    back.setToken(user_name.value);
    if (!check_list) {
        const list = document.createElement('div');
        list.id = 'main_list';
        main.appendChild(list);
    }
    const new_list_visual = document.createElement('div');
    new_list_visual.classList.add('todo-container');
    const list = document.getElementById('main_list');
    list.appendChild(new_list_visual);
    const text_headline_visual = document.createElement('header');
    const toDo_headline = document.getElementById('toDo_headline');
    let new_toDoList = new toDoList(toDo_headline.value);
    text_headline_visual.innerText = new_toDoList.getHeadline();
    new_list_visual.appendChild(text_headline_visual);
    const remove_btn = document.createElement('button');
    remove_btn.id = 'remove_btn';
    new_list_visual.appendChild(remove_btn);
    toDo_headline.value = '';
    let user = new User(back.getNameToDoList());
    user.list = back.getToDoList();;
    new_list_visual.setAttribute('remove', user.list.length);
    user.addList(new_toDoList);
    back.setUserEqToken(user);
    back.setUpdateUser();
}

function getListFromStorage() {
    back.setToken(user_name.value);
    let user = new User(back.getNameToDoList());
    user.list = back.getToDoList();
    if (user.list) {
        createListContainerFromStorage();
    }
}

function createListContainerFromStorage() {
    const check_list = document.getElementById('main_list');
    back.setToken(user_name.value);
    const lists_back = back.getToDoList();
    if (!check_list) {
        const list = document.createElement('div');
        list.id = 'main_list';
        main.appendChild(list);
    }
    for (let index = 0; index < lists_back.length; index++) {
        const new_list_visual = document.createElement('div');
        new_list_visual.classList.add('todo-container');
        const list = document.getElementById('main_list');
        list.appendChild(new_list_visual);
        const text_headline_visual = document.createElement('header');
        text_headline_visual.innerText = lists_back[index].headline;
        new_list_visual.appendChild(text_headline_visual);
        const remove_btn = document.createElement('button');
        remove_btn.id = 'remove_btn';
        new_list_visual.appendChild(remove_btn);
        new_list_visual.setAttribute('remove', index);
    }
    const deleteButtons = document.querySelectorAll('#remove_btn');
    deleteButtons.forEach(button => button.addEventListener('click', remove_toDoList));
}

function remove_toDoList() {
    back.setToken(user_name.value);
    const remove_list = this.parentElement;
    const remove_index = remove_list.getAttribute('remove');
    console.log(remove_index);
    let list = back.getToDoList();
    list.splice(remove_index,1);
    let user = new User(back.getNameToDoList());
    user.list = list;
    back.setUserEqToken(user);
    back.setUpdateUser();
    const main_list = document.getElementById('main_list');
    main_list.innerText = '';
    getListFromStorage();
}

function visual_add() {

}



