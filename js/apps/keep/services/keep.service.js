// import { defaultBooks } from './books.js';
import { storageService } from '../../../services/async-storage-service.js'
import { utilitiesService } from '../../../services/utilities.service.js';


const KEEP_KEY = 'keepCache';

export const keepService = {
    query,
    addNote,
    editNote,
    editTodo,
    removeNote,

}
const defaultNotes = [{
        id: utilitiesService.makeId(),
        type: 'noteTxt',
        isPinned: true,
        info: {
            txt: 'Fullstack Me Baby!'
        },
        style: {
            backgroundColor: '#292929',
            color: '#ff0000'
        }
    },
    {
        id: utilitiesService.makeId(),
        type: 'noteImg',
        isPinned: true,
        info: {
            url: 'https://th.bing.com/th/id/OIP.nKmUMQosDufQgbOAeTkUzQHaEK?w=297&h=180&c=7&o=5&pid=1.7',
            title: 'Me playing Mi'
        },
        style: {
            backgroundColor: '#6a0dad',
            color: '#0000ff'
        }
    },
    {
        id: utilitiesService.makeId(),
        type: 'noteTodos',
        isPinned: true,
        info: {
            title: 'How was it:',
            todos: [
                { id: utilitiesService.makeId(), txt: 'Do that', doneAt: null },
                { id: utilitiesService.makeId(), txt: 'Do this', doneAt: 187111111 }
            ]
        },
        style: {
            backgroundColor: '#FFFF00',
            color: '#ff0000'
        }
    },
    {
        id: utilitiesService.makeId(),
        type: 'noteVideo',
        isPinned: true,
        info: {

            url: 'https://www.youtube.com/watch?v=tgbNymZ7vqY',
            title: 'Coding Academy'
        },
        style: {
            backgroundColor: '#0000ff',
            color: '#ff0000'
        }
    },
];



function query() {
    return storageService.query(KEEP_KEY)
        .then(notes => {
            if (!notes.length) {
                const defNotes = defaultNotes;
                storageService.postMany(KEEP_KEY, defNotes)
                return defNotes;
            }
            return notes;

        })
}

function addNote(note) {
    const newNote = _formatNewNote(note.type, note.info);
    return storageService.post(KEEP_KEY, newNote)
        .then(note => note);
}

function editNote(noteId, newSetting) {
    return _getNoteById(noteId)
        .then(note => {

            const modifiedNote = _formatNote(note, newSetting);
            return storageService.put(KEEP_KEY, modifiedNote);
        })
}

function editTodo(noteId, todoId) {
    return _getNoteById(noteId)
        .then(note => {
            if (!note.info.todos) return Promise.reject('error finding todos');
            const todo = note.info.todos.find(todo => todo.id === todoId);
            if (todo.doneAt) todo.doneAt = null;
            else todo.doneAt = Date.now();
            return storageService.put(KEEP_KEY, note);
        })
}

function removeNote(noteId) {
    return storageService.remove(KEEP_KEY, noteId);
}


function _getNoteById(noteId) {
    return storageService.get(KEEP_KEY, noteId);
}

function _formatNewNote(type, setting) {
    const info = {}
    switch (type) {
        case 'noteTxt':
            info.txt = setting.value;
            break;
        case 'noteImg':
        case 'noteVideo':
            info.title = 'New note'
            info.url = setting.value
            break;
        case 'noteTodos':
            info.title = 'New note';
            info.todos = setting.value.split(',').map(txt => {
                const todo = {
                    id: setting.id || utilitiesService.makeId(),
                    txt,
                    doneAt: setting.doneAt
                }
                return todo;
            })
            break;
    }
    const style = { color: '#292929', backgroundColor: '#ffffff' };
    const newNote = {
        type,
        isPinned: true,
        info,
        style

    };
    return newNote;

}

//Sorting out the note info
function _formatNote(note, setting) {

    note.isPinned = setting.isPinned;
    const { color, backgroundColor } = setting.style;
    note.style = { color, backgroundColor };
    switch (note.type) {
        case 'noteTxt':
            note.info.txt = setting.txt
            break;
        case 'noteImg':
        case 'noteVideo':
            note.info.title = setting.title,
                note.info.url = setting.url
            break;
        case 'noteTodos':
            note.info.title = setting.title,
                //TODO: Should be based id not idx
                note.info.todos = setting.todos.split(',').map((txt, idx) => {
                    let doneAt = null;
                    const currTodo = note.info.todos[idx];
                    if (currTodo) doneAt = currTodo.doneAt;
                    const todo = {
                        id: (currTodo) ? currTodo.id : utilitiesService.makeId(),
                        txt,
                        doneAt
                    }
                    return todo;
                })
            break;
    }
    return note;



}