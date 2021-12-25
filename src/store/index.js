import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)
import NotificationService from "@/services/notification.service";

export default new Vuex.Store({
    state: {
        user: {},
        carts: [],
    },
    getters: {
        totalPrice: state => {
            let total = 0;
            state.carts.filter((item) => {
                total += (item.price * item.quantity);
            });
            return total;
        },
        totalCarts: state => {
            return state.carts.length;
        },
        getCart: state => {
            return state.carts;
        },
        getUser: state => {
            return state.user;
        }

    },
    mutations: {
        setUserInfo(state, payload) {
            state.user = payload;
        },
        removeUserInfo(state) {
            state.user = {};
        },
        async ADD_TO_CART(state, item) {
            let found = state.carts.find(product => product.product_id == item.product_id);
            if (found) {
                let stock_quantity = false
                await ApiService.get(`/check-product-stock/${found.product_id}`).then((res) => {
                    stock_quantity = res.data;
                    console.log(stock_quantity, 'stock_quantity')
                }).catch(error => {
                    NotificationService.error(error.response.data.message);
                })
                if (stock_quantity > found.quantity) {
                    found.quantity++;
                    found.sub_total = found.price * found.quantity;
                    NotificationService.success('Updated to cart');
                } else {
                    NotificationService.error('Product Quantity Exceed Availability!');
                }
            } else {
                state.carts.push(item);
                NotificationService.success('Added to cart');
            }
            this.commit('SAVE_CART');
        },
        async UPDATE_TO_CART(state, updated_cart) {
            let found = state.carts.find(product => product.product_id == updated_cart.product_id);
            if (updated_cart.quantity > 0) {
                let stock_quantity = false
                await ApiService.get(`/check-product-stock/${found.product_id}`).then((res) => {
                    stock_quantity = res.data;
                }).catch(error => {
                    NotificationService.error(error.response.data.message);
                })
                if (stock_quantity >= updated_cart.quantity) {
                    found.quantity  = updated_cart.quantity;
                    found.sub_total = found.price * updated_cart.quantity;
                    this.commit('SAVE_CART');
                    NotificationService.success('Updated cart');
                } else {
                    NotificationService.error('Product Quantity Exceed Availability!');
                }
            } else {
                this.commit('REMOVE_FROM_CART', found);
                NotificationService.success('Removed cart');
            }
        },
        SAVE_CART(state) {
            window.localStorage.setItem('carts', JSON.stringify(state.carts));
        },
        REMOVE_FROM_CART(state, item) {
            let index = state.carts.indexOf(item);
            state.carts.splice(index, 1);
            this.commit('SAVE_CART');
            NotificationService.success('Removed cart');
        },
        REMOVE_ALL_CARTS(state, items) {
            window.localStorage.removeItem('carts');
            this.state.carts = []
            this.commit('SAVE_CART');
        },
    },
    actions: {},
    modules: {},
    plugins: [createPersistedState()],
})
