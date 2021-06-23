export default {
    props: ['data'],
    template: `
    <div class="note-img"  >
      <h3>{{title}}</h3>
      <img :src="url" :alt="title"  />
    </div>
`,
    data() {
        return {
            title: this.data.info.title,
            url: this.data.info.url,
        }
    },
    methods: {

    },
    computed: {

    },
    created() {

    }
}