<template>
  <div class="row">
    <div class="col-md-8 cart">
      <div class="card">
        <div class="card-body">
          <div class="title">
            <div class="row">
              <div class="col">
                <h4><b>Shopping Cart</b></h4>
              </div>
              <div class="col align-self-center text-right text-muted">{{ totalCarts }} Items</div>
            </div>
          </div>
          <div class="row main align-items-center border-top py-3">
            <div class="col-2"><b>Image</b></div>
            <div class="col-3">
              <b>Details</b>
            </div>
            <div class="col-2"><b>Quantity</b></div>
            <div class="col-2"><b>Price</b></div>
            <div class="col-2"><b>Subtottal</b></div>
            <div class="col-1"><b class="float-left">Action</b></div>
          </div>
          <div class="row border-top border-bottom">

            <div class="row main align-items-center py-2" v-for="item in getCart">
              <div class="col-2"><img class="img-fluid" :src="item.image"></div>
              <div class="col-3">
                <p>{{ item.name }}</p>
              </div>
              <div class="col-2">
                <input @change="updateToCart(item.product_id, $event)" type="number" :value="item.quantity"
                       class="w-50" min="1" oninput="this.value = Math.abs(this.value)"/>
              </div>
              <div class="col-2">{{ item.price }}</div>
              <div class="col-2">{{ item.sub_total }}</div>
              <div class="col-1 "><span @click="removedCart(item)" class="close float-left" style="cursor: pointer">&#10005;</span>
              </div>
            </div>

          </div>
          <div class="row main align-items-center border-top py-3">
            <div class="col-3 offset-9 float-end">
              Total: {{ totalPrice }}
            </div>
          </div>
          <div class="back-to-shop"><a @click="$router.push('/')" style="cursor: pointer">&leftarrow;<span
              class="text-muted">Back to shop</span></a></div>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card">
        <div class="card-header">
          Order Summary
        </div>
        <div class="card-body">
          <div class="mb-3">
            <label for="address" class="form-label">Address</label>
            <textarea class="form-control" id="address" rows="3" v-model="form.shipping_address" required></textarea>
          </div>
          <div class="mb-3">
            <label for="note" class="form-label">Note</label>
            <textarea class="form-control" id="note" rows="3" v-model="form.note"></textarea>
          </div>
          <div class="mb-3 border-top pt-2">
            <h6>GRAND TOTAL: {{ totalPrice }} </h6>
            <button @click="orderSubmit" v-if="user_logged" class="btn btn-info" :disabled="orderProcessing">Place an order <i :class=" orderProcessing ? 'spinner-border spinner-border-sm': '' "></i></button>
            <button v-else class="btn btn-info" @click="$router.push('/login?from_url=checkout')">Login First</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import NotificationService from "@/services/notification.service";
import ApiService from "@/services/ApiService";
import TokenService from "@/services/TokenService";

export default {
  name: "Cart",
  data: () => ({
        form: {
          note: '',
          shipping_address: '',
        },
        user_logged: false,
        orderProcessing: false
      }
  ),
  computed: {
    ...mapGetters(["totalPrice", "totalCarts", 'getCart']),
    getGrandTotal() {
      return parseFloat(this.totalPrice) + parseFloat(this.form.shipping_cost);
    }
  },
  mounted() {
    if (TokenService.getToken()) {
      this.user_logged = true
    } else {
      this.user_logged = false
    }
  },
  methods: {
    loginFirst() {
      localStorage.setItem('redirect_to_cart', 'yes');
      this.$router.push({name: 'userLogin'})
    },
    removedCart(item) {
      this.$store.commit('REMOVE_FROM_CART', item)
    },
    updateToCart(product_id, $event) {
      let updated_cart = {
        product_id,
        quantity: $event.target.value
      }
      this.$store.commit('UPDATE_TO_CART', updated_cart)
    },
    orderSubmit() {
      Swal.fire({
        title: 'Are you sure confirm your order?',
        text: "Do you want to confirm your order?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, confirm!'
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.getCart.length <= 0) {
            NotificationService.error("Cart is empty");
            return;
          }
          if (!this.form.shipping_address) {
            NotificationService.error("Give an address");
            return;
          }
          let form = {
            ...this.form,
            carts: this.getCart,
          }
          this.orderProcessing =true
          ApiService.post(`/order`, form).then(res => {
            this.$router.push('/order-list');
            this.$store.commit('REMOVE_ALL_CARTS', {})
            NotificationService.success(res.data.message);
            this.orderProcessing =false
          }).catch(error => {
            NotificationService.error(error.response.data.message);
            this.orderProcessing =false
          })
        }
      }).catch(error => {
        NotificationService.error(error.response.data.message);
      })
    }
  },
}
</script>

<style scoped>

</style>