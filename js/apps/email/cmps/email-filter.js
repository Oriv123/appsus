export default {
    name: 'email-filter',
    template: `
        <section class="email-filter">
            <img src="css/icons/search.png" alt="">
            <input type="text" @input="setFilter" placeholder="Search all Emails" v-model="filterBy.byName">
        </section>    
    `,
    data() {
        return {
            filterBy: {
                byName: '',
            }
        }
    },
    methods: {
        setFilter() {
            this.$emit('filtered', this.filterBy)
        }
    }
}