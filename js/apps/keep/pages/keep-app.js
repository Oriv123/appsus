import { keepService } from '../services/keep.service.js';
import keepList from '../cmps/keep-list.js'
import keepAdd from '../cmps/keep-add.js';
// import bookFilter from '../cmps/book-filter.js'

export default {
    template: `
                <main class="keep-app app-main">
                    <keep-add @add="addNote"> </keep-add>
                <!-- <book-filter @filtered="setFilter"> </book-filter> -->
              <section v-if="pinnedNotes.length">
              <h2>Pinned Notes:</h2>
                 <keep-list  :notes="pinnedNotes" @remove="removeNote" @change="changeSetting"  @toggleTodo="toggleTodo"/>
              </section>
                <section v-if="unPinnedNotes.length">
                <h2>Unpinned Notes:</h2>
                 <keep-list  :notes="unPinnedNotes" @remove="removeNote" @change="changeSetting"  @toggleTodo="toggleTodo"/>
                </section>
               </main>
    `,
    data() {
        return {
            notes: [],
            pinnedNotes: [],
            unPinnedNotes: [],
            filterBy: null,
        }
    },
    created() {
        this.loadNotes();

    },
    watch: {
        notes() {
            this.pinnedNotes = this.getPinnedNotes();
            this.unPinnedNotes = this.getUnPinnedNotes();
        }
    },
    methods: {
        loadNotes() {
            keepService.query()
                .then(notes => {
                    this.notes = notes;
                })
        },
        getPinnedNotes() {
            return this.notes.filter(note => note.isPinned);
        },
        getUnPinnedNotes() {
            return this.notes.filter(note => !note.isPinned);
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
            keepService.editNote(data.noteId, data.newSetting)
                .then(() => {
                    this.loadNotes()
                })

        },
        toggleTodo(data) {
            keepService.editTodo(data.noteId, data.todoId)
                .then(() => {
                    this.loadNotes();
                })
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
        },

    },
    components: {
        keepList,
        keepAdd

    }
};