export default {
    props: ['data'],
    template: `
        <div class="note-todos">
                <h2>{{noteTitle}}</h2>
                    <ol class="todos-list">
                    <li v-for="todo in noteTodos">
                        <p> {{todo.txt}} </p>
                    </li>
                    
                    </ol>
        </div>
    `,
    data() {
        return {}
    },
    methods: {

    },
    computed: {
        noteTitle() {
            return this.data.info.title;
        },
        noteTodos() {
            return this.data.info.todos;
        }
    }
}