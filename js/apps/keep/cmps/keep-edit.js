export default {
    props: ['note'],
    template: `
    <div class="keep-edit"  >
        <button @click="togglePin"> 
        {{isPinnedTxt}}
        </button> 
        <button> Style  </button>
        <button @click="toggleEditMode"> Edit </button>
       <button @click="remove(note.id)">Remove</button>
        <section v-if="isOnEditMode" class="edit-section">
           <form @submit="updateNote">
                <input type="text" v-if="newSetting.info.txt" v-model="newSetting.info.txt">
                <input type="text" v-if="newSetting.info.title" v-model="newSetting.info.title">
                <input type="text" v-if="newSetting.info.url" v-model="newSetting.info.url">
                <h2>{{newSetting.todoStr}}</h2>
                <input type="text" v-if="newSetting.info.todos" v-model="newSetting.todosStr">
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
            console.log('removing...');
            this.$emit('remove', noteId);
        },

        updateNote() {
            const data = {
                noteId: this.note.id,
                newSetting: this.newSetting
            }

            this.$emit('change', data);
        },
        toggleEditMode() {
            this.isOnEditMode = !this.isOnEditMode;
        },
        togglePin() {
            this.newSetting.isPinned = !this.newSetting.isPinned;
            this.updateNote()
        }



    },

    computed: {
        isPinnedTxt() {
            return (this.note.isPinned) ? 'Unpin' : 'pin'
        },
        stringifiedTodos() {
            if (!this.note.info.todos) return null;
            return this.note.info.todos.map(todo => todo.txt).join(',');


        }

    },

    created() {

        this.todoStr = this.stringifiedTodos;
        console.log(this.todoStr);
    }
}