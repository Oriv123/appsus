import { keepService } from '../services/keep.service.js';
import keepList from '../cmps/keep-list.js'
import keepAdd from '../cmps/keep-add.js';
// import bookFilter from '../cmps/book-filter.js'

export default {
    template: `
                <section class="keep-app app-main">
                    <keep-add @add="addNote"> </keep-add>
                <!-- <book-filter @filtered="setFilter"> </book-filter>
                <router-link to="/book/add" class="add-books-link"  >Add books</router-link>  -->
                 <keep-list  :notes="notesToShow" @remove="removeNote" @change="changeSetting"/>
                </section>
    `,
    data() {
        return {
            notes: [],
            filterBy: null,
        }
    },
    created() {
        this.loadNotes();
    },
    methods: {
        loadNotes() {
            keepService.query()
                .then(notes => this.notes = notes);
        },
        removeNote(noteId) {
            keepService.removeNote(noteId)
                .then(() => this.loadNotes())
        },
        addNote(newNote) {
            keepService.addNote(newNote)
                .then(() => {
                    this.loadNotes()
                })

        },
        changeSetting(data) {
            keepService.editNote(data.note, data.newSetting)
                .then(this.loadNotes)
        }
        // setFilter(filterBy) {
        //     if (!filterBy.maxPrice) filterBy.maxPrice = Infinity;
        //     this.filterBy = filterBy
        // },
        // isFilterEmpty() {
        //     return !this.filterBy || (!this.filterBy.title && !this.filterBy.minPrice && this.filterBy.maxPrice === Infinity);
        // }
    },
    computed: {
        notesToShow() {
            return this.notes;
            // const searchStr = this.filterBy.title.toLowerCase();
            // const booksToShow = this.books.filter((book, idx) => {
            //     var bookPrice = book.listPrice.amount;
            //     const isTitleIncludes = book.title.toLowerCase().includes(searchStr)
            //     const isInclude = isTitleIncludes &&
            //         bookPrice >= this.filterBy.minPrice &&
            //         bookPrice <= this.filterBy.maxPrice;
            //     return isInclude
            // });
            // console.log('booksToShow', booksToShow);
            // return booksToShow;
        }
    },
    components: {
        keepList,
        keepAdd

    }
};