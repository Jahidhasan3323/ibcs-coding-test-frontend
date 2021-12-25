import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//services
import ApiService from './services/ApiService'
import TokenService from './services/TokenService'
//sweetalert2
import Swal from 'sweetalert2'


window.Swal = require('sweetalert2');
//Toast
window.Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (!TokenService.getToken()) {
            store.commit('setUserInfo',{});
            TokenService.destroyToken();
            next({
                name: 'login',
                params: {nextUrl: to.fullPath}
            })
        } else {
            // check token validity
            ApiService.get('/user').then(response => {
                next()
            }).catch(error => {
                //if token is not valid destroy token
                TokenService.destroyToken();
                next('/login')
            })
        }
    }
    // if user already login then redirect the user to profile
    if (to.name == 'login') {
        // TODO:redirect to profile
        if (TokenService.getToken()) {
            next('/');
        }
    }

    next();
});

window.ApiService = ApiService
Vue.config.productionTip = false
//init api service
ApiService.init();
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
