export default {
    props: ['note'],
    template: `
    <div class="keep-edit"  >
        <!-- TODO: Use Icons -->
        <button @click="togglePin" :class="pinToggeling" :title="pinText"> 
        <i class="fas fa-thumbtack"></i>
        </button> 
        <!-- TODO: Add style edit-background and color -->
        <button title="Change color"> <i class="fas fa-tint"></i>  </button>
        <button @click="toggleEditMode" title="Edit"> 
        <i class="fas fa-edit" ></i>
     </button>
       <button @click="remove(note.id)" title="Delete">
       <i class="fas fa-trash"></i>
       </button>
        <section v-if="isOnEditMode" class="edit-section">
           <form @submit="updateNote">
                <input type="text" v-if="newSetting.txt" v-model="newSetting.txt">
                <input type="text" v-if="newSetting.title" v-model="newSetting.title">
                <input type="text" v-if="newSetting.url" v-model="newSetting.url">
                <input type="text" name="todo" v-if="newSetting.todos" v-model="newSetting.todos">
                <button>Update</button>
           </form>
        </section>
    </div>
`,
    data() {
        return {
            isOnEditMode: false,
            newSetting: {

            }
        }
    },
    methods: {
        remove(noteId) {
            var isAccepted = confirm('Are you sure you want to remove this note?')
            if (!isAccepted) return;
            this.$emit('remove', noteId);
        },

        updateNote() {
            // if (this.newSetting.info.todos) {

            //     this.newSetting.info.todos = this.formattedTodos;
            // }
            const data = {
                noteId: this.note.id,
                newSetting: this.newSetting
            }

            this.$emit('change', data);
            this.isOnEditMode = false;
            this.newSetting = {};
        },
        toggleEditMode() {
            this.isOnEditMode = !this.isOnEditMode;
        },
        togglePin() {
            this.newSetting.isPinned = !this.newSetting.isPinned;
            this.updateNote()
        },




    },

    computed: {
        pinToggeling() {
            return { pinned: this.newSetting.isPinned }
        },
        stringifiedTodos() {
            if (!this.note.info.todos) return null;

            return this.note.info.todos.map(todo => todo.txt).join(',');

        },
        formattedTodos() {
            const todos = this.newSetting.todosStr.split(',').map((txt, idx) => {
                const todo = {

                    txt,
                    doneAt: null
                }
                return todo;
            })
            return todos;
        },
        pinText() {
            return (this.newSetting.isPinned) ? 'Unpin' : 'pin';
        }


    },
    watch: {
        note: {
            handler() {
                this.newSetting.isPinned = this.note.isPinned
                const { type } = this.note;
                switch (type) {
                    case 'noteTxt':
                        this.newSetting.txt = this.note.info.txt;
                        break;
                    case 'noteImg':
                    case 'noteVideo':
                        this.newSetting.title = this.note.info.title;
                        this.newSetting.url = this.note.info.url;
                        break
                    case 'noteTodos':
                        this.newSetting.todos = this.stringifiedTodos;
                        break

                    default:
                        break;
                }
            },
            immediate: true,
            deep: true
        }
    },

    created() {

        // if (this.note.info.todos) {
        //     this.newSetting.todosStr = this.stringifiedTodos;
        // }
    },

}