export default {
    name: 'email-filter',
    template: `
        <section class="email-filter">

            <img src="css/icons/search.png" alt="">

            <input 
            type="text" 
            @input="setFilter" 
            placeholder="Search all Emails" 
            v-model="filterBy.byName">

            <select v-model="filterBy.kind">
                <option>All</option>
                <option>Unread</option>
                <option>Read</option>
            </select>

        </section>    
    `,
    data() {
        return {
            filterBy: {
                byName: '',
                kind: 'All'
            }
        }
    },
    methods: {
        setFilter() {
            this.$emit('filtered', this.filterBy)
        }
    }
}