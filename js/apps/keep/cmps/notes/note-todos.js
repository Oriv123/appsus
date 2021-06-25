export default {
    props: ['data'],
    template: `
        <div class="note-todo">
                <h2>{{noteTitle}}</h2>
                    <ol class="todos-list">
                    <li v-for="todo in noteTodos" :key="todo.id" :class="setTodoClassStatus(todo)" @click="toggleTodo(todo.id)">

                        <p> 
                            <span v-if="todo.doneAt"> {{getDateTime(todo.doneAt)}}</span>
                            {{todo.txt}}
                         </p>
                    </li>
                    
                    </ol>
        </div>
    `,
    data() {
        return {}
    },
    methods: {
        toggleTodo(todoId) {
            this.$emit('toggleTodo', todoId);
        },
        setTodoClassStatus(todo) {
            return (todo.doneAt) ? 'done' : '';
        },
        getDateTime(timeStamp) {
            const date = new Date(timeStamp).toLocaleDateString();
            const time = new Date(timeStamp).toLocaleTimeString();
            return date + ' ' + time;
        }
    },
    computed: {
        noteTitle() {
            return this.data.info.title;
        },
        noteTodos() {
            return this.data.info.todos;
        },
    }
}