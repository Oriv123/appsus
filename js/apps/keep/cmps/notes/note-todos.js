export default {
    props: ['info'],
    template: `
        <div class="note-todos">
                <h2>{{label}}</h2>
                    <ul class="todos-list">
                    <li v-for="todo in info.todos">
                        <p> {{todo.txt}} </p>
                    </li>
                    
                    </ul>
        </div>
    `,
    data() {
        return {
            selectedOpt: '',
        }
    },
    methods: {
        reportVal() {
            this.$emit('setInput', this.selectedOpt)
        }
    }
}