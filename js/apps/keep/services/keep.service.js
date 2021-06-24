// import { defaultBooks } from './books.js';
import { storageService } from '../../../services/async-storage-service.js'
import { utilitiesService } from '../../../services/utilities.service.js';


const KEEP_KEY = 'keepCache';

export const keepService = {
        query,
        addNote,
        editNote,
        removeNote

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
            backgroundColor: '#292929',
            color: 'red'
        }
    },
    {
        id: utilitiesService.makeId(),
        type: 'noteTodos',
        isPinned: true,
        info: {
            title: 'How was it:',
            todos: [
                { txt: 'Do that', doneAt: null },
                { txt: 'Do this', doneAt: 187111111 }
            ]
        },
        style: {
            backgroundColor: '#292929',
            color: 'red'
        }
    }
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
    const newNote = _formatNote(note);
    return storageService.post(KEEP_KEY, newNote)
        .then(note => note);
}

function editNote(noteId, newSetting) {
    return _getNoteById(noteId)
        .then(note => {
            for (const key in newSetting) {
                note[key] = newSetting[key];
            }
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




//Sorting out the note info
function _formatNote(note) {

    const { type } = note;
    const info = {};
    switch (type) {
        case 'noteTxt':
            info.txt = note.info.value;
            break;
        case 'noteImg':
            info.title = 'Edit Title',
                info.url = note.info.value;
            break;
        case 'noteTodos':
            info.title = 'Edit title',
                info.todos = note.info.value.split(',').map(txt => {
                    const todo = {
                        txt,
                        doneAt: null
                    }
                    return todo;
                })
            break;
        default:
            break;
    }
    const newNote = {
        type,
        isPinned: true,
        info

    };
    return newNote;



}