import homePage from './pages/home-page.js';
import keepApp from './apps/keep/pages/keep-app.js';
import mailApp from './apps/mail/pages/mail-app.js';


const routes = [{
        path: '/',
        component: homePage
    },
    {
        path: '/mail',
        component: mailApp
    },
    {
        path: '/keep',
        component: keepApp
    },

];

export const router = new VueRouter({ routes });