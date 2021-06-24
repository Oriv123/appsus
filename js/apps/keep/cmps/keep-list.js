import keepPreview from './keep-preview.js';
import keepEdit from './keep-edit.js';

export default {
    props: ['notes'],
    template: `
      <section v-if="notes.length">
       <ul class="notes-list" v-if="pinnedNotes.length">
        <h2>Pinned Notes:</h2>
         <li v-for="note in pinnedNotes" :key="note.id" :style="note.style"   >
        <keep-preview :note="note"  />
        <keep-edit :note="note"  @remove="remove" @change="change"  />
         </li>  
        </ul>
        <ul class="notes-list" v-if="unPinnedNotes.length">
         <h2>Other Notes:</h2>
         <li v-for="note in unPinnedNotes" :key="note.id" :style="note.style"   >
        <keep-preview :note="note"  />
        <keep-edit :note="note"  @remove="remove" @change="change"  />
         </li>  
       </ul>
</section>
    `,
    data() {
        return {
            pinnedNotes: [],
            unPinnedNotes: []
        }
    },
    methods: {
        getPinnedNotes() {
            return this.notes.filter(note => note.isPinned);
        },
        getUnPinnedNotes() {
            return this.notes.filter(note => !note.isPinned);
        },


        remove(noteId) {
            this.$emit('remove', noteId);
        },
        change(data) {
            this.$emit('change', data);
        }

    },
    components: {
        keepPreview,
        keepEdit
    },
    created() {


    },
    watch: {
        notes() {
            this.pinnedNotes = this.getPinnedNotes()
            this.unPinnedNotes = this.getUnPinnedNotes()
        }
    }




};