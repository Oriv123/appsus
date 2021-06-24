export default {
    props: ['note'],
    template: `
    <div class="keep-edit"  >
        <button > 
        <label>
        {{isPinnedTxt}}
        <input type="checkbox" name="isPinnedChk" v-model="newSetting.isPinned">       
        </label>
        </button>
        <button> Style  </button>
        <button> Edit </button>
        <button @click="remove(note.id)">Remove</button>
        <section v-if="isOnEditMode">
           <form @sumbit.prevent="updateNote">
                <input type="text" v-if="newSetting.info.txt" v-model="newSetting.info.txt">
                <input type="text" v-if="newSetting.info.title" v-model="newSetting.info.title">
                <input type="text" v-if="newSetting.info.todos" v-model="getTodos">
                <button>Update</button>
           </form>
        </section>
    </div>
`,
    data() {
        return {
            isOnEditMode: true,
            newSetting: {
                isPinned: this.note.isPinned,
                style: this.note.style,
                info: this.note.info,

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
            this.$emit()
        }



    },
    watch: {
        newSetting: {
            handler() {
                // console.log('Greet was modified from', oldVal.txt, 'to:', newVal.txt);
                const data = {
                    note: this.note,
                    newSetting: this.newSetting
                }
                this.$emit('change', data)
            },
            deep: true
        },
    },

    computed: {
        isPinnedTxt() {
            return (this.note.isPinned) ? 'Unpin' : 'pin'
        },
        getTodos() {
            return this.note.info.todos.map(todo => todo.txt).join(',');
        }
    },
    created() {

    }
}