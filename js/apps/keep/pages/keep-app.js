import { keepService } from '../services/keep.service.js';
import keepList from '../cmps/keep-list.js'
import keepAdd from '../cmps/keep-add.js';
import keepFilter from '../cmps/keep-filter.js';

export default {
    template: `
                <main class="keep-app ">
                    <keep-filter  @filtered="setFilter"> </keep-filter>
                    <keep-add @add="addNote"> </keep-add>
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
        },
        filterBy: {
            handler() {
                this.loadNotes();
            },
            deep: true

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
            return this.notesToShow.filter(note => note.isPinned);
        },
        getUnPinnedNotes() {
            return this.notesToShow.filter(note => !note.isPinned);
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
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },

        isFilterUnTouched() {
            return !this.filterBy.title && this.filterBy.type === 'All';
        }

    },
    computed: {
        notesToShow() {
            if (!this.filterBy || this.isFilterUnTouched()) return this.notes;
            let notesToShow = this.notes;
            if (this.filterBy && this.filterBy.type !== 'All') {
                notesToShow = notesToShow.filter(note => note.type === this.filterBy.type);
            }

            const searchStr = this.filterBy.title.toLowerCase();
            notesToShow = notesToShow.filter(note => {
                switch (note.type) {
                    case 'noteTxt':
                        const t = note.info.txt.toLowerCase().includes(searchStr);
                        return t
                    case 'noteImg':
                        return note.info.title.toLowerCase().includes(searchStr) ||
                            note.info.url.toLowerCase().includes(searchStr);
                    case 'noteTodos':
                        return note.info.title.toLowerCase().includes(searchStr) ||
                            note.info.todos.some(todo => todo.txt.toLowerCase().includes(searchStr));
                    case 'noteVideo':
                        return note.info.title.toLowerCase().includes(searchStr) ||
                            note.info.url.toLowerCase().includes(searchStr);

                    default:
                        console.log('error');
                        return null;
                }
            })

            return notesToShow;
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
        keepAdd,
        keepFilter

    }
};