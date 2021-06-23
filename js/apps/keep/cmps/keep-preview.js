import noteTxt from "./notes/note-txt.js";
import noteImg from "./notes/note-img.js";
import noteTodos from "./notes/note-todos.js";

export default {
    props: ['note'],
    template: `
    <div class="note-preview">
    <component :is="note.type" :style="note.style"  :data="note">
   </component>
        <button @click="remove(note.id)">✖</button>
    </div>
    `,
    computed: {

    },
    methods: {
        remove(noteId) {
            var isAccepted = confirm('Are you sure you want to remove this note?')
            if (!isAccepted) return;
            console.log('removing...');
            this.$emit('remove', noteId);
        },

    },
    created() {},

    components: {
        noteTxt,
        noteImg,
        noteTodos
    }

};