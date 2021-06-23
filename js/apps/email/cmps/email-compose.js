import { emailService } from '../services/email.service.js'
import { eventBus } from '../../../services/event-bus-service.js'

export default {
    name: 'email-compose',
    template: `
    <section>
       
    </section>
    `,
    data() {
        return {
            email: null,
        }
    },
    methods: {

    },
    computed: {},
    created() {},
}