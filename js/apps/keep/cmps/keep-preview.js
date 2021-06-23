import noteTxt from "./notes/note-txt.js";
import noteImg from "./notes/note-img.js";
import noteTodos from "./notes/note-todos.js";

export default {
    props: ['note'],
    template: `
    <div class="note-preview">
    <component :is="note.type"  :data="note">
   </component>
    </div>
    `,
    computed: {

    },

    created() {},

    components: {
        noteTxt,
        noteImg,
        noteTodos
    }

};