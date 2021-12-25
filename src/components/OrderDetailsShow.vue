<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <ul class="list-group">
          <li class="list-group-item bg-info text-white">Order Details</li>
          <li class="list-group-item"><b>Order No: </b> <span class="float-right"> {{ order.order_no }}</span></li>
          <li class="list-group-item"><b>Subtotal: </b> <span class="float-right"> {{ order.sub_total }}</span></li>
          <li class="list-group-item"><b>Grand Total: </b> <span class="float-right"> {{ order.grand_total }}</span>
          </li>
          <li class="list-group-item"><b>Status: </b> <span class="float-right"> {{ order.status }}</span></li>
        </ul>
      </div>
      <div class="col-md-12">
        <div class="card mt-5">
          <div class="card-header bg-primary text-white">
            Order Item
          </div>
          <div class="card-body">
            <table class="table table-bordered table-striped">
              <thead>
              <tr>
                <th>SI</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>subtotal</th>
                <th>Image</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in order.order_items">
                <th>{{ index + 1 }}</th>
                <th>{{ item.product.name }}</th>
                <th>{{ item.price }}</th>
                <th>{{ item.quantity }}</th>
                <th>{{ item.sub_total }}</th>
                <th><img :src="item.product.image" style="width: 50px; height: 50px"></th>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderDetailsShow",
  props: ['order']
}
</script>

<style scoped>

</style>