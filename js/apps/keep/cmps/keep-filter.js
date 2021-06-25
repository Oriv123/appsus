export default {
    template: `
    <section class="keep-filter">
    <i class="fas fa-search"></i>
        <input v-model="filterBy.title" type="search" @input="filter"  placeholder="Search notes"> 
<!-- 
        Price
        From
        <section class="prices-filter">
       <input v-model.number="filterBy.minPrice" type="number" @input="filter"  placeholder="minimum price" />
       to
        <input v-model.number="filterBy.maxPrice" type="number" @input="filter"  placeholder="maximum price" />
      </section> -->
    </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                type: 'All'
            }
        };
    },
    methods: {
        filter() {
            this.$emit('filtered', this.filterBy);
        }
    }
};