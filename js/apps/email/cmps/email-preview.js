export default {
    name: 'email-preview',
    props: ['email'],
    template: `
        <section class="email-preview" :class="toggleClass" @click = "updateIfRead">
            <h4>{{email.subject}} 
                <!-- <span class="email-desc">{{email.body.substring(0, 50)}}... -->
                <!-- </span> -->
            </h4> 
        </section>
        `,
    methods: {
        updateIfRead() {
            if (!this.email.isRead) this.email.isRead = true;
            this.$emit('read', this.email)
        }
    },
    computed: {
        toggleClass() {
            return this.email.isRead ? 'read' : 'unread'
        }
    }
}