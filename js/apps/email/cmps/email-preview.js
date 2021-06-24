export default {
    name: 'email-preview',
    props: ['email'],
    template: `
        <section class="email-preview" :class="toggleClass" @click="updateIfRead">

			<div class="from">
                <!-- {{email.from}} -->
            ori zaken
            </div>  

            <div class="content">
                {{email.subject}}
                </div>
                
                 <div class="email-desc">
                {{email.body.substring(0, 30)}}...
            </div>
            </div>
            

                <div class="sent-at">
				{{sentAt}}
			    </div>
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
            console.log(this.email);
            return this.email.isRead ? 'read' : 'unread'

        },
        sentAt() {
            let currDate = moment(Date.now())
            let emailDate = moment(this.email.sentAt)

            if (currDate.diff(emailDate, 'days') === 0) {
                return moment(emailDate).format('LT')
            } else if (currDate.diff(emailDate, 'years') === 0) {
                return moment(emailDate).format('MMM, D')
            } else {
                return moment(emailDate).format('l')
            }
        },
    }
}