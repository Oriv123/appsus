export default {
    props: ['data'],
    template: `
    <div class="note-video"  >
      <h3>{{noteTitle}}</h3>
      <!-- For Stav-for some reason some vids don't work here but they in w3 schools iframe example
    https://www.w3schools.com/html/tryit.asp?filename=tryhtml_youtubeiframe_autoplay -->
      <iframe  :src="'https://www.youtube.com/embed/'+noteVidId+'?autoplay=0'"></iframe>
    </div>
`,
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {
        noteTitle() {
            return this.data.info.title
        },
        noteVidId() {
            const fullUrl = this.data.info.url
            const idStartIdx = fullUrl.indexOf('?v=');
            let endIdx = fullUrl.indexOf('&');
            if (idStartIdx === -1) return '';
            if (endIdx === -1) endIdx = fullUrl.length;
            const vidId = fullUrl.substring(idStartIdx + 3, endIdx);
            return vidId
        }
    },
    created() {

    }
}