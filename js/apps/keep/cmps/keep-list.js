import keepPreview from './keep-preview.js';

export default {
    props: ['notes'],
    template: `
    <ul class="notes-list">
        <li v-for="note in notes" :key="note.id">

        <keep-preview :note="note" @remove="remove"  />
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
        keepPreview
    },
    created() {}




};