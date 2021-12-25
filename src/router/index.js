import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Checkout from '../views/Checkout.vue'
import MainLayout from "@/views/Layouts/Main";
import OrderList from "@/views/Order/OrderList";
import OrderDetails from "@/views/Order/OrderDetails";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '',
                component: Home,
                name:'home',
                meta: {
                    title: 'Home',
                    requireAuth: false
                }
            },
            {
                path: 'about',
                component: About,
                meta: {
                    title: 'About',
                    requireAuth: true
                }
            },
            {
                path: 'checkout',
                component: Checkout,
                meta: {
                    title: 'Checkout',
                    requireAuth: false
                }
            },
            {
                path: 'order-list',
                component: OrderList,
                meta: {
                    title: 'OrderList',
                    requireAuth: true
                }
            },
            {
                path: '/order/:id',
                component: OrderDetails,
                meta: {
                    title: 'OrderDetails',
                    requireAuth: true
                }
            },
        ],
    },

    {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/Login'),
        meta: {
            title: 'Login'
        }
    },
    {
        path: '/registration',
        name: 'registration',
        component: () => import('../views/auth/Registration'),
        meta: {
            title: 'Login'
        }
    },
]

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes
})
export default router
