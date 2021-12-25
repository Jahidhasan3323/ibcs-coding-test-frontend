<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <div class="row">
          <div class="col-md-6">
            <h5>Product List</h5>
          </div>
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-6">
                <select v-model="form.sort_by" @change="getProducts()" class="form-control">
                  <option value="">Sort By</option>
                  <option value="ASC">Price low to high</option>
                  <option value="DESC">Price high to low</option>
                </select>
              </div>
              <div class="col-md-6">
                <input @keyup="getProducts()" class="form-control" placeholder="search product" v-model="form.search">
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row pswp-gallery">
      <div v-for="product in products" class="col-xl-3 col-lg-4 col-sm-6">
        <!-- .card -->
        <div class="card card-figure">
          <!-- .card-figure -->
          <figure class="figure">
            <!-- .figure-img -->
            <div class="figure-img">
              <img style="height:180px" class="img-fluid" :src="product.image" alt="Card image cap">
              <div class="figure-action">
                <span @click="addToCart(product)" v-if="product.quantity > 0" href="#"
                      class="btn btn-block btn-sm btn-primary">Add to cart</span>
                <a v-else href="#" class="btn btn-block btn-sm btn-default bg-red text-white">Out of stock</a>
              </div>
            </div><!-- /.figure-img -->
            <!-- .figure-caption -->
            <figcaption class="figure-caption">
              <h6 class="figure-title">
                <a href="#">{{ product.name }} </a>
                <span class="float-right text-primary">{{ product.price }}</span>
              </h6>
              <p class="text-muted mb-0"> {{ product.description.substr(1, 40) }} <span
                  v-if="product.description.length >= 50">...</span></p>
            </figcaption><!-- /.figure-caption -->
          </figure><!-- /.card-figure -->
        </div><!-- /.card -->
      </div>
    </div>
    <pagination v-if="products.length>0" :pagination="pagination" @paginate="getProducts()" :offset="5"/>
  </div>
</template>

<script>

import {mapGetters} from "vuex";
import Pagination from "@/components/Pagination";

export default {
  name: "Home",
  components: {Pagination},
  data: () => ({
    pagination: {
      current_page: 1,
    },
    form: {
      per_page: 12,
      search: '',
      sort_by: '',
    },
    products: [],
  }),
  computed: {
    ...mapGetters(["totalCarts"])
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    addToCart(product) {
      let cart = {
        product_id: product.id,
        name: product.name,
        image: product.image,
        quantity: 1,
        price: product.price,
        sub_total: product.price * 1,
      }
      this.$store.commit('ADD_TO_CART', cart)
    },
    getProducts() {
      let params = {
        per_page: this.form.per_page,
        page: this.pagination.current_page,
        search: this.form.search,
        sort_by: this.form.sort_by,
      };
      ApiService.get(`/products`, {params: params}).then((res) => {
        this.products = res.data.data;
        this.pagination = res.data.meta;
      }).catch(error => {
      })
    }
  }
}
</script>
