import appHeader from './cmps/app-header.js';
import appFooter from './cmps/app-footer.js';
import { router } from './router.js';
import userMsg from './cmps/user-msg.js';


const options = {
    el: '#app',
    router,
    template: `
        <section>
            <h1>ori</h1>
            <!-- <app-header />
            <router-view />
            <user-msg />
            <app-footer /> -->
        </section>
    `,
    components: {
        appHeader,
        userMsg,
        appFooter
    }
};

const app = new Vue(options);