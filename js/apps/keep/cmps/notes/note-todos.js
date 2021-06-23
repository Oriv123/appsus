export default {
    props: ['data'],
    template: `
        <div class="note-todos">
                <h2>{{label}}</h2>
                    <ol class="todos-list">
                    <li v-for="todo in todos">
                        <p> {{todo.txt}} </p>
                    </li>
                    
                    </ol>
        </div>
    `,
    data() {
        return {
            label: this.data.info.label,
            todos: this.data.info.todos
        }
    },
    methods: {

    }
}