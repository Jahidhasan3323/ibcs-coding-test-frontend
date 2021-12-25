<template>
  <header class="app-header app-header-dark">
    <!-- .navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary py-lg-0">
      <!-- .container -->
      <div class="container">
        <!-- .navbar-brand -->
        <h4>Ecommerce</h4>
        <button class="hamburger hamburger-squeeze d-flex d-lg-none" type="button" data-toggle="collapse"
                data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false"
                aria-label="Toggle navigation"><span class="hamburger-box"><span class="hamburger-inner"></span></span>
        </button> <!-- .navbar-collapse -->
        <div class="collapse navbar-collapse ml-lg-6" id="navbarTogglerDemo01">
          <!-- .navbar-nav -->
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <!-- Dashboard -->
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/checkout">Checkout</router-link>
            </li>


          </ul><!-- /.navbar-nav -->
          <!-- .top-bar-search -->
          <div class="top-bar-list">
            <!-- .top-bar-item -->
            <!-- .top-bar-item -->
            <div class="top-bar-item top-bar-item-right px-0 d-none d-sm-flex">
              <!-- .nav -->
              <ul class="header-nav nav">
                <!-- .nav-item -->
                <li class="nav-item dropdown header-nav-dropdown ">
                  <a class="nav-link" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span
                      class="fa fa-cart-plus"></span><span class="badge badge-warning px-1 py-0 position-relative"
                                                           style="top:-6px">{{ totalCarts }}</span></a>
                  <!-- .dropdown-menu -->
                  <div class="dropdown-menu dropdown-menu-rich dropdown-menu-right">
                    <div class="dropdown-arrow"></div>
                    <h6 class="dropdown-header stop-propagation">
                      <span>Cart list</span>
                    </h6><!-- .dropdown-scroll -->
                    <div class="dropdown-scroll perfect-scrollbar" style="overflow:hidden scroll">
                      <!-- .dropdown-item -->
                      <span class="dropdown-item unread" v-for="item in getCart">
                        <div class="user-avatar">
                          <img :src="item.image" alt="">
                        </div>
                        <div class="dropdown-item-body">
                          <span @click="removedCart(item)" class="float-right badge badge-warning"><i
                              class="fa fa-times"></i></span>
                          <p class="subject"> {{ item.name }} </p>
                          <p class="text text-truncate"> </p><span class="date">Quantity: {{ item.quantity }}</span>
                        </div>
                      </span> <!-- /.dropdown-item -->

                    </div><!-- /.dropdown-scroll -->
                    <router-link to="checkout" class="dropdown-footer">Checkout <i
                        class="fas fa-fw fa-long-arrow-alt-right"></i></router-link>
                  </div><!-- /.dropdown-menu -->
                </li><!-- /.nav-item -->
                <li class="nav-item ">
                  <router-link class="nav-link" to="/login" v-if="Object.keys(getUser).length <= 0">Login</router-link>
                </li>
              </ul><!-- /.nav -->
            </div><!-- /.top-bar-item -->
          </div>
          <!-- .btn-account -->

          <div class="navbar-nav dropdown d-flex mr-lg-n3" v-if="Object.keys(getUser).length > 0">
            <button class="btn-account w-100" type="button" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false"><span class="user-avatar user-avatar-md mr-lg-0"><img
                src="assets/images/avatars/profile.jpg" alt=""></span> <span class="account-summary d-lg-none"><span
                class="account-name">{{ getUser.name }}</span></span></button> <!-- .dropdown-menu -->
            <div class="dropdown-menu dropdown-menu-right">
              <div class="dropdown-arrow mr-3"></div>
              <h6 class="dropdown-header d-none d-lg-block d-lg-none"> {{ getUser.name }} </h6>
              <a class="dropdown-item"
                 href="#"><span
                  class="dropdown-icon oi oi-person"></span> Profile</a>
              <router-link class="dropdown-item"
                 to="/order-list"><span
                  class="dropdown-icon oi oi-person"></span> Order List</router-link>
              <a class="dropdown-item"
                 style="cursor: pointer"
                 @click="logout()"><span
                  class="dropdown-icon oi oi-account-logout"></span> Logout</a>
            </div><!-- /.dropdown-menu -->
          </div>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container -->
    </nav><!-- /.navbar -->
  </header><!-- /.app-header -->
</template>
<script>
import {mapGetters} from "vuex";
import TokenService from "@/services/TokenService";

export default {
  computed: {
    ...mapGetters(["totalCarts", "getCart", "getUser"])
  },
  methods: {
    removedCart(item) {
      this.$store.commit('REMOVE_FROM_CART', item)
    },
    logout() {
      TokenService.destroyToken();
      this.$store.commit('removeUserInfo')
      this.$router.push('/login')
    }
  }
}
</script>