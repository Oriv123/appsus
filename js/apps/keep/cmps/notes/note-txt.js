export default {
    props: ['data'],
    template: `
    <div class="note-txt">
        <p>
            {{noteTxt}}
        </p>
    </div>
`,
    data() {
        return {

        }
    },
    methods: {

    },
    watch: {
        txt() {
            console.log('text');
        }
    },
    created() {

    },
    computed: {
        noteTxt() {
            return this.data.info.txt;
        }
    }
}