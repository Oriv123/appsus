export default {
    props: ['data'],
    template: `
    <div class="note-txt">
        <p>
            {{txt}}
        </p>
    </div>
`,
    data() {
        return {
            txt: this.data.info.txt
        }
    },
    methods: {

    },
    created() {

    }
}