export default {
    name: 'email-preview',
    props: ['email'],
    template: `
        <section class="email-preview" :class="toggleClass" @click="updateIfRead">

        <div class="star" :class="{starred: email.isStarred}" @click.stop.prevent="toggleStarred(email)">
        <i class="fas fa-star"></i>
        </div>

			<div class="from" :class="{bold: !this.email.isRead}"> 
                {{email.from}}
            </div>  

            <div class="content " :class="{bold: !this.email.isRead}" >
                {{email.subject}}
                </div>
                
                 <div class="email-desc">
                {{email.body.substring(0, 30)}}...
            </div>
            

                <div class="sent-at">
				{{sentAt}}
			    </div>

                <div>
             <span 
             @click.stop="deleteMail(email.id)" 
             class="mail-trash" > 
             <i class="far fa-trash-alt"></i> 
            </span> 
        </div>

        <!-- <div>
             <span 
             @click.stop="restoreMail(email.id)" 
             class="mail-trash" v-if="folder==='trash'"
             ><i class="fas fa-undo"></i> 
            </span>
            </div> -->

        </section>
        `,
    methods: {
        updateIfRead() {
            if (!this.email.isRead) this.email.isRead = true;
            this.$emit('read', this.email)
        },
        toggleStarred(email) {
            email.isStarred = !email.isStarred
            this.$emit('starred', email)
        }
    },
    computed: {
        toggleClass() {
            return this.email.isRead ? 'read ' : 'unread '

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