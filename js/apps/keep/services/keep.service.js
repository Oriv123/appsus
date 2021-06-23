// import { defaultBooks } from './books.js';
import { storageService } from '../../../services/async-storage-service.js'
import { utilitiesService } from '../../../services/utilities.service.js';


const KEEP_KEY = 'keepCache';

export const keepService = {
        query,
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
        info: {
            label: 'How was it:',
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

function saveBook(book) {
    return storageService.post(BOOKS_KEY, book)
        .then(book => book);
}

function removeNote(noteId) {
    return storageService.remove(KEEP_KEY, noteId);
}



function getBookById(bookId) {
    return storageService.get(BOOKS_KEY, bookId);
}

function getPrevNextBookId(bookId) {
    return storageService.query(BOOKS_KEY)
        .then(books => {
            const idx = books.findIndex(book => book.id === bookId)
            const nextBookId = (idx === books.length - 1) ? books[0].id : books[idx + 1].id
            const prevBookId = (idx === 0) ? books[books.length - 1].id : books[idx - 1].id
            return {
                nextBookId,
                prevBookId
            }
        });
}

function addReview(bookId, review) {
    review.id = utilitiesService.makeId();
    return getBookById(bookId).then(book => {
        if (!book.reviews) book.reviews = [];
        book.reviews.push(review);
        return storageService.put(BOOKS_KEY, book);
    })
}

function removeReview(bookId, reviewId) {
    return getBookById(bookId)
        .then(book => {
            const reviewIdx = book.reviews.findIndex(review => review.id === reviewId);
            if (reviewIdx === -1) return Promise.reject('Failed to find the review!');
            book.reviews.splice(reviewIdx, 1);
            return storageService.put(BOOKS_KEY, book);
        })
}