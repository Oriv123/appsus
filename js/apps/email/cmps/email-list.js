import emailPreview from './email-preview.js'
import emailFilter from './email-filter.js'

export default {
    name: 'email-list',
    props: ['emails'],
    template: ` 
    <section class="email-list-container">
        <email-filter @filtered="setFilter"/>
        <ul class="email-list">
            <li v-for="email in emails" :key="email.id" class="email-preview-container">
                <div class="star-list modify-container">
                    <span class="star star-1 fa fa-star" :class="{starred: email.isStarred}" @click="toggleStarred(email)"></span>
                    <input type="checkbox" id="checkbox" @click="toggleRead(email)">
                </div>
                <router-link :to="'/email/'+email.id">
                    <email-preview :email="email" @read="setEmailToRead"/>
                </router-link>
            </li>
        </ul>
    </section>
    `,
    methods: {
        setFilter(filterBy) {
            this.$emit('filtered', filterBy)
        },
        setEmailToRead(readEmail) {
            this.$emit('read', readEmail)
        },
        toggleStarred(email) {
            email.isStarred = !email.isStarred
            this.$emit('starred', email)

        },
        toggleRead(email, ev) {
            email.isRead = !email.isRead
            this.$emit('read', email)
        },
        title(email) {
            return email.isRead ? 'Unread' : 'Read'
        }
    },
    components: {
        emailPreview,
        emailFilter
    }
}