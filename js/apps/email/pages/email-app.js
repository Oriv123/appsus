import { emailService } from '../services/email.service.js'
import emailList from '../cmps/email-list.js'
import emailStatus from '../cmps/email-status.js'


export default {
    template: `
     <section class="email-app">
         
     <div class="main">

        <ul class="side-menu">

            <li class="compose">
                <router-link to="/email/compose">Compose</router-link>
            </li> 

            <li class="inbox" @click="currMenu = 'inbox'">
                <router-link to="/email">inbox</router-link>
            </li> 

            <li class="sent" @click="currMenu = 'sent'">
                <router-link to="/email">sent</router-link>
            </li> 

            <li class="starred" @click="currMenu = 'starred'">
                <router-link to="/email" >Starred</router-link>
            </li> 

            <!-- <email-status :percent="readPercentage"/> -->
            
        </ul>


        <router-view 
        :emails="emailsToShow" 
        @remove="removeEmail" 
        @save="loadEmails" 
        @filtered="setFilter"
        @read="updateEmail" 
        @starred="updateEmail"/>
    </div>
     </section>
    `,
    data() {
        return {
            emails: [],
            filterBy: null,
            currMenu: 'inbox'
        }
    },
    methods: {
        loadEmails() {
            emailService.query()
                .then(emails => this.emails = emails);
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        removeEmail(emailId) {
            emailService.remove(emailId)
                .then(this.loadEmails)
                .then(this.$router.push('/email'))
        },
        updateEmail(updatedEmail) {
            emailService.update(updatedEmail)
                .then(() => this.loadEmails())
        }
    },
    computed: {
        emailsToShow() {
            if (this.currMenu === 'inbox') {
                var emailsToShow = this.emails.filter(email => {
                    return email.to === 'appsus@ca.com'
                })
            } else if (this.currMenu === 'sent') {
                var emailsToShow = this.emails.filter(email => {
                    return email.to !== 'appsus@ca.com'
                })
            } else {
                var emailsToShow = this.emails.filter(email => {
                    return email.isStarred === true
                })
            }
            if (this.filterBy && this.filterBy.byName) {
                const searchStr = this.filterBy.byName.toLowerCase()
                emailsToShow = this.emails.filter(email => {
                    return email.subject.toLowerCase().includes(searchStr) || email.body.toLowerCase().includes(searchStr)
                })
            }
            return emailsToShow;
        }
    },
    readPercentage() {
        let readCount = 0;
        for (let i = 0; i < this.emails.length; i++) {
            if (this.emails[i].isRead) readCount++
        }
        return Math.floor(readCount / this.emails.length * 100);
    },

    created() {
        this.loadEmails()
    },
    components: {
        emailList,
        emailStatus
    }
}