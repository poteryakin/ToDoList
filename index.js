class Task {
    constructor (title) {
        this.title = title;
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
    const toDo_headline = document.getElementById('toDo_headline');
    if (toDo_headline.value != '') {
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
        let new_toDoList = new toDoList(toDo_headline.value);
        text_headline_visual.innerText = new_toDoList.getHeadline();
        new_list_visual.appendChild(text_headline_visual);
        // task
        const block_about_task = document.createElement('div');
        block_about_task.id = 'block_about_task';
        new_list_visual.appendChild(block_about_task);
        const input_task = document.createElement('input');
        input_task.classList.add('input_task');
        block_about_task.appendChild(input_task);
        input_task.placeholder = 'Write your task...'
        const create_task = document.createElement('button');
        create_task.id = 'create_task';
        create_task.innerText = 'Create';
        block_about_task.appendChild(create_task);
        create_task.addEventListener('click', create_new_task);
        // task
        // remove_btn
        const remove_btn = document.createElement('button');
        remove_btn.id = 'remove_btn';
        new_list_visual.appendChild(remove_btn);
        toDo_headline.value = '';
        let user = new User(back.getNameToDoList());
        user.list = back.getToDoList();;
        new_list_visual.setAttribute('remove', user.list.length);
        const deleteButtons = document.querySelectorAll('#remove_btn');
        deleteButtons.forEach(button => button.addEventListener('click', remove_toDoList));
        // remove_btn
        user.addList(new_toDoList);
        back.setUserEqToken(user);
        back.setUpdateUser();
    }   
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
        // task
        const block_about_task = document.createElement('div');
        block_about_task.id = 'block_about_task';
        new_list_visual.appendChild(block_about_task);
        const input_task = document.createElement('input');
        input_task.classList.add('input_task');
        block_about_task.appendChild(input_task);
        input_task.placeholder = 'Write your task...'
        const create_task = document.createElement('button');
        create_task.id = 'create_task';
        create_task.innerText = 'Create';
        block_about_task.appendChild(create_task);
        const task_list = document.createElement('ul');
        task_list.id = 'task_list';
        new_list_visual.appendChild(task_list);
        for (let i = 0; i < lists_back[index].tasks.length; i++) {
            const new_task_on_list = document.createElement('li');
            new_task_on_list.innerText = lists_back[index].tasks[i].title;
            task_list.appendChild(new_task_on_list);
        }
        create_task.addEventListener('click', create_new_task);

        // task
    }
    const deleteButtons = document.querySelectorAll('#remove_btn');
    deleteButtons.forEach(button => button.addEventListener('click', remove_toDoList));
}

function remove_toDoList() {
    back.setToken(user_name.value);
    const remove_list = this.parentElement;
    const remove_index = remove_list.getAttribute('remove');
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

function create_new_task() {
    // back
    const input_task = document.getElementsByClassName('input_task');
    const task = Array.from(input_task).find(input => input.value != '');
    back.setToken(user_name.value);
    let new_task = new Task(task.value);
    const parent_list = (this.parentElement).parentElement;
    const parent_list_index = parent_list.getAttribute('remove');
    let user = new User(back.getNameToDoList());
    let list = back.getToDoList();
    user.list = list;
    user.list[parent_list_index].tasks.push(new_task);
    //back
    // visual task
    const check_task_list = document.getElementById('task_list')
    if (!check_task_list) {
        const task_list = document.createElement('ul');
        task_list.id = 'task_list';
        parent_list.appendChild(task_list);
    }
    const task_list = document.getElementById('task_list');
    const new_task_on_list = document.createElement('li');
    task_list.appendChild(new_task_on_list);
    new_task_on_list.innerText = task.value;
    // visual task
    back.setUserEqToken(user);
    back.setUpdateUser();
    task.value = '';
}

function getTaskFromSrotage() {

}






