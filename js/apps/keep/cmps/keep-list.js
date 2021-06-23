import keepPreview from './keep-preview.js';

export default {
    props: ['notes'],
    template: `
    <ul class="notes-list">
        <li v-for="note in notes" :key="note.id">

        <keep-preview :note="note"  />
        </section>
    </router-link>
</li>
    </ul>
    `,
    methods: {
        remove(noteId) {
            var isAccepted = confirm('Are you sure you want to remove this note?')
            if (!isAccepted) return;
            console.log('removing...');
            this.$emit('remove', noteId);
        },

    },
    components: {
        keepPreview
    },
    created() {
        console.log(this.notes);
    }




};