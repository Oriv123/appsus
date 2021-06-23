export default {

    template: `
        <section class="keep-add">


         <input type="text"  :placeholder="noteTypePlaceHolder" @keyup.enter="addNote" v-model="newNote.info.value" />
         <button @click="changeNoteType('noteTxt')" title="Add text" >text</button>
         <button @click="changeNoteType('noteImg')" title="Add image URL">img</button>
         <button @click="changeNoteType('noteTodos')" title="Add todos, seperated by commas">todo</button>

        </section>
    `,

    data() {
        return {
            newNote: {
                type: 'noteTxt',
                isPinned: false,
                info: {
                    value: ''
                }
            }
        }
    },
    methods: {
        changeNoteType(noteType) {
            this.newNote.type = noteType;
        },
        addNote() {
            this.$emit('add', this.newNote);
            this.newNote = {
                type: 'noteTxt',
                isPinned: false,
                info: {
                    value: ''
                }
            }
        }

    },
    computed: {
        noteTypePlaceHolder() {
            switch (this.newNote.type) {
                case 'noteTxt':
                    return 'What is on your mind?';

                case 'noteImg':
                    return 'Enter image URL';

                case 'noteTodos':
                    return 'Enter comma seperated list';

                default:
                    return 'error';
            }
        }
    },
    components: {

    },
    created() {

    },
    destroyed() {

    }




};