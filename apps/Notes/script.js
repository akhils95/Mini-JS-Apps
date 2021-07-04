const modeSwitch = document.getElementById('modeSwitch');
const list = document.querySelector('.list');
const listPage = document.querySelector('.list-wrap');
const addModalBtn = document.querySelector('.add-note');

let currentTheme = localStorage.getItem('asc-notes-theme');
let notesList = localStorage.getItem('asc-notes') ? JSON.parse(localStorage.getItem('asc-notes')) : [];
let lastId = localStorage.getItem('asc-notes-last-id') ? localStorage.getItem('asc-notes-last-id') : 0;

let newTitle = "";
let newBody = "";
let selectedNote;

const displayNoteList = () => {
    if(notesList.length !== 0) {
        list.innerHTML = '';
        notesList.forEach(note => {
            const card = document.createElement('div');
            card.classList.add('note-card');
            card.innerText = note.title;
            card.addEventListener('click', () => {
                newTitle = note.title;
                newBody = note.note;
                selectedNote = note.id;
                loadNote();
            });
            list.appendChild(card);
        })
    } else {
        list.innerHTML = '';
        const noNotes = document.createElement('h1');
        noNotes.innerText = "No notes added yet. Add some to display"
        list.appendChild(noNotes);
    }
}

const showModal = (type) => {
    const addModal = document.createElement('div');
    addModal.classList.add('add-modal');
    const closeIcon =  document.createElement('img');
    closeIcon.src = document.documentElement.getAttribute('data-theme') ==='light' ? 'images/CloseIconLT.svg' : 'images/CloseIconDT.svg';
    const heading = document.createElement('h1');
    heading.innerText = type === 'edit' ? 'Edit Note' : 'Add Note';

    const inputWrap = document.createElement('div');
    const textareaWrap = document.createElement('div');
    inputWrap.classList.add('input-wrap');
    textareaWrap.classList.add('input-wrap');
    const titleLabel = document.createElement('label');
    const noteLabel = document.createElement('label');
    titleLabel.for = "title";
    noteLabel.for = "noteText";
    titleLabel.innerText = "Title";
    noteLabel.innerText = "Note";
    const titleInput = document.createElement('input');
    titleInput.name = "title";
    titleInput.id = "title";
    titleInput.autocomplete = "off";
    const noteTextInput = document.createElement('textarea');
    noteTextInput.name = "noteText";
    noteTextInput.id = "noteText";

    const addBtn = document.createElement('button');

    if (type === 'edit') {
        titleInput.value = newTitle;
        noteTextInput.value = newBody;
        addBtn.innerText = "Update Note";
        addBtn.addEventListener('click', editNote);
    } else {
        addBtn.innerText = "Add Note"
        addBtn.addEventListener('click', addNote);
    }

    inputWrap.appendChild(titleLabel);
    inputWrap.appendChild(titleInput);
    textareaWrap.appendChild(noteLabel);
    textareaWrap.appendChild(noteTextInput);

    addModal.appendChild(closeIcon);
    addModal.appendChild(heading);
    addModal.appendChild(inputWrap);
    addModal.appendChild(textareaWrap);
    addModal.appendChild(addBtn);
    listPage.style.display = "none";
    document.body.appendChild(addModal);
    closeIcon.addEventListener('click', closeModal);
}

const addNote = () => {
    const title = document.getElementById('title').value;
    const note = document.getElementById('noteText').value;
    const memoryObject = {id: lastId, title: title, note: note};
    lastId++;
    notesList.push(memoryObject);
    localStorage.setItem('asc-notes', JSON.stringify(notesList));
    localStorage.setItem('asc-notes-last-id', lastId);
    closeModal();
    displayNoteList();
}

const editNote = () => {
    const updatedTitle = document.getElementById('title').value;
    const updatedBody = document.getElementById('noteText').value;
    console.log(updatedTitle);
    console.log(updatedBody);
    console.log(selectedNote);
    notesList.forEach(note => {
        if(note.id === selectedNote) {
            note.title = updatedTitle;
            note.note = updatedBody;
            newBody = updatedBody;
            newTitle = updatedTitle;
        }
    })
    localStorage.setItem('asc-notes', JSON.stringify(notesList));
    closeModal();
    loadNote();
}

const loadNote = () => {
    listPage.style.display = "none";

    const backBtn = document.createElement('div');
    backBtn.classList.add('back-btn');
    const note = document.createElement('div');
    note.classList.add('note');
    const leftMargin = document.createElement('div');
    leftMargin.classList.add('left-margin');
    const header = document.createElement('header');
    const title = document.createElement('span');
    title.classList.add('title');
    title.innerText = newTitle;
    const body = document.createElement('p');
    body.classList.add('body');
    body.innerText = newBody;
    const action = document.createElement('div');
    action.classList.add('action-btns');
    const edit = document.createElement('img');
    const dlt = document.createElement('img');
    edit.src = "images/EditIcon.svg";
    dlt.src = "images/DeleteIcon.svg";
    action.appendChild(edit);
    action.appendChild(dlt);

    header.appendChild(title);
    note.appendChild(leftMargin);
    note.appendChild(header);
    note.appendChild(body);
    note.appendChild(action);
    document.body.appendChild(note);
    document.body.appendChild(backBtn);
    backBtn.addEventListener('click', goToList);
    dlt.addEventListener('click', deleteNote);
    edit.addEventListener('click', () => {
        showModal('edit');
        document.body.removeChild(backBtn);
        document.body.removeChild(note);
    });
}

const goToList = () => {
    document.body.removeChild(document.querySelector('.note'));
    document.body.removeChild(document.querySelector('.back-btn'));
    listPage.style.display = "flex";
    displayNoteList();
}

const closeModal = () => {
    document.body.removeChild(document.querySelector('.add-modal'));
    listPage.style.display = "flex";
}

const deleteNote = () => {
    notesList = notesList.filter((item) => item.id !== selectedNote);
    localStorage.setItem('asc-notes', JSON.stringify(notesList));
    goToList();
}

const switchMode = () => {
    const imgSrc = modeSwitch.getAttribute('src');
    if (imgSrc.toLowerCase().includes('sun')) {
        modeSwitch.src = 'images/Moon.svg';
        document.documentElement.setAttribute('data-theme', 'dark');
		localStorage.setItem('asc-notes-theme', 'dark');
    } else {
        modeSwitch.src = 'images/Sun.svg';
        document.documentElement.setAttribute('data-theme', 'light');
		localStorage.setItem('asc-notes-theme', 'light');
    }
}

const checkTheme = () => {
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    }
}

modeSwitch.addEventListener('click', switchMode);
addModalBtn.addEventListener('click', () => showModal('add'));
checkTheme();
displayNoteList();