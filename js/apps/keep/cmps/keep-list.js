import keepPreview from './keep-preview.js';
import keepEdit from './keep-edit.js';

export default {
    props: ['notes'],
    template: `
    <ul class="notes-list">
        <li v-for="note in notes" :key="note.id" :style="note.style" >

        <keep-preview :note="note"  />
        <keep-edit :note="note"  @remove="remove"  />
        </section>
    </router-link>
</li>
    </ul>
    `,
    methods: {
        remove(noteId) {
            this.$emit('remove', noteId);
        },

    },
    components: {
        keepPreview,
        keepEdit
    },
    created() {}




};