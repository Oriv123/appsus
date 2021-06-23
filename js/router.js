import homePage from './pages/home-page.js';
import keepApp from './apps/keep/pages/keep-app.js';
import emailApp from './apps/email/pages/email-app.js';


const routes = [{
        path: '/',
        component: homePage
    },
    {
        path: '/email',
        component: emailApp
    },
    {
        path: '/keep',
        component: keepApp
    },

];

export const router = new VueRouter({ routes });