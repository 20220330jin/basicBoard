import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'BoardMain',
        component: () => import('@/components/board/BoardMain.vue')
    },
    {
        path: '/detail/:boardId',
        name: 'BoardInfo',
        component: () => import('@/components/board/BoardInfo.vue')
    },
    {
        path: '/boardWrite',
        name: 'BoardForm',
        component: () => import('@/components/board/BoardForm.vue')
    },
    {
        path: '/boardUpdate/:boardId',
        name: 'BoardUpdate',
        component: () => import('@/components/board/BoardUpdate.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router;