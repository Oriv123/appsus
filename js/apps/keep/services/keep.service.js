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
    //TODO: Check the todos app from MVC class
const defaultNotes = [{
        id: utilitiesService.makeId(),
        type: 'noteTxt',
        isPinned: true,
        info: {
            txt: 'Fullstack Me Baby!'
        },
        style: {
            backgroundColor: '#292929',
            color: 'red'
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
            backgroundColor: 'purple',
            color: 'blue'
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
            backgroundColor: 'yellow',
            color: 'red'
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
            backgroundColor: 'blue',
            color: 'red'
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



// function getPrevNextBookId(bookId) {
//     return storageService.query(BOOKS_KEY)
//         .then(books => {
//             const idx = books.findIndex(book => book.id === bookId)
//             const nextBookId = (idx === books.length - 1) ? books[0].id : books[idx + 1].id
//             const prevBookId = (idx === 0) ? books[books.length - 1].id : books[idx - 1].id
//             return {
//                 nextBookId,
//                 prevBookId
//             }
//         });
// }

// function addReview(bookId, review) {
//     review.id = utilitiesService.makeId();
//     return getBookById(bookId).then(book => {
//         if (!book.reviews) book.reviews = [];
//         book.reviews.push(review);
//         return storageService.put(BOOKS_KEY, book);
//     })
// }

// function removeReview(bookId, reviewId) {
//     return getBookById(bookId)
//         .then(book => {
//             const reviewIdx = book.reviews.findIndex(review => review.id === reviewId);
//             if (reviewIdx === -1) return Promise.reject('Failed to find the review!');
//             book.reviews.splice(reviewIdx, 1);
//             return storageService.put(BOOKS_KEY, book);
//         })
// }

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
    const newNote = {
        type,
        isPinned: true,
        info

    };
    return newNote;

}


//Sorting out the note info
function _formatNote(note, setting) {

    note.isPinned = setting.isPinned;
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
                note.info.todos = setting.todos.split(',').map(txt => {
                    const todo = {
                        id: setting.id || utilitiesService.makeId(),
                        txt,
                        doneAt: setting.doneAt
                    }
                    return todo;
                })
            break;
    }
    return note;



}