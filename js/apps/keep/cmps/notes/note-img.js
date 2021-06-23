export default {
    props: ['data'],
    template: `color
    <div class="note-img" >
        <!-- TODO: Where the title will go? -->
      <img :src="url" :alt="title"  />
    </div>
`,
    data() {
        return {
            title: this.data.info.title,
            url: this.data.info.url,
            style: this.data.style
        }
    },
    methods: {

    }
}