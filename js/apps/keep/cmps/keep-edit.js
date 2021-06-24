export default {
    props: ['note'],
    template: `
    <div class="keep-edit"  >
    <button @click="changeSetting('isPinned')"> Pin </button>
    <button> Style  </button>
    <button> Edit </button>
    <button @click="remove(note.id)">Remove</button>
    </div>
`,
    data() {
        return {
            newSetting: {
                isPinned: this.note.isPinned,
                style: this.note.style,
                info: this.note.info

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

        changeSetting(settingKey) {
            if (!this.newSetting[settingKey]) {

            }
        }

    },
    computed: {

    },
    created() {

    }
}