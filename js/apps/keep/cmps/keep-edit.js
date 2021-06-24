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
                <input type="text" v-if="newSetting.info.txt" v-model="newSetting.info.txt">
                <input type="text" v-if="newSetting.info.title" v-model="newSetting.info.title">
                <input type="text" v-if="newSetting.info.url" v-model="newSetting.info.url">
                <input type="text" name="todo" v-if="newSetting.info.todos" v-model="newSetting.todosStr">
                <button>Update</button>
           </form>
        </section>
    </div>
`,
    data() {
        return {
            isOnEditMode: false,
            newSetting: {
                isPinned: this.note.isPinned,
                style: this.note.style,
                info: {...this.note.info },
                todosStr: ''
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
            if (this.newSetting.info.todos) {

                this.newSetting.info.todos = this.formattedTodos;
            }
            const data = {
                noteId: this.note.id,
                newSetting: this.newSetting
            }

            this.$emit('change', data);
            this.isOnEditMode = false;
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
            const todos = this.newSetting.todosStr.split(',').map(txt => {
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

    created() {
        if (this.note.info.todos) {
            this.newSetting.todosStr = this.stringifiedTodos;
        }
    },

}