export default {
    template: `
        <div v-if="msg"  class="user-msg" :class="msg.type">
            <button @click="closeMsg">✖</button>
            <p>{{msg.txt}}</p>
            <router-link :to="msg.link" class="link">{{msg.linkTitle}}</router-link>
        </div>
    `,
    data() {
        return {
            // txt: '',
            // type: '',
            // linkTitle: '',
            // link: ''
            msg: null,
            timeout: null



        };
    },
    // created() {
    //     // eventBus.$on('show-msg', this.showMsg);
    // },
    // destroyed() {
    //     eventBus.$off('show-msg', this.showMsg);
    //     if (this.timeout) {
    //         clearTimeout(this.timeout);
    //         this.timeout = null;
    //     }
    // },
    // methods: {
    //     showMsg(msg) {
    //         this.msg = msg;
    //         this.timeout = setTimeout(() => {
    //             this.msg = null;
    //         }, 1000 * 3);
    //     },
    //     closeMsg() {
    //         clearTimeout(this.timeout);
    //         this.timeout = null;
    //         this.msg = null;
    //     }
    // }
};