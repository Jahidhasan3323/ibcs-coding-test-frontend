<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header bg-info text-white">
          Order List
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <input @change="getLists()" class="form-control" placeholder="Search..." v-model="form.search" autocomplete="off">
              </div>
            </div>
            <div class="col-md-4">
              <div class="mb-3">
                <select  v-model="form.status" @change="getLists()"
                        class="form-control">
                  <option value="">Sort By Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body">
          <table class="table table-bordered table-striped">
            <thead>
            <tr>
              <th>Order</th>
              <th> Subtotal</th>
              <th> Grand Total</th>
              <th> Status</th>
              <th> Action</th>
            </tr>
            </thead>
            <tbody>
            <template v-if="orders.length">
              <tr v-for="(order, index) in orders">
                <td>{{ order.order_no }}</td>
                <td>{{ order.sub_total }}</td>
                <td>{{ order.grand_total }}</td>
                <td>
                  {{ order.status }}
                  <div v-if="order.order_status_history">
                    <span v-if="order.order_status_history.approved">
                     Approved: {{ order.order_status_history.approved }}<br>
                    </span>
                    <span v-if="order.order_status_history.processing">
                     Processing: {{ order.order_status_history.processing }}<br>
                    </span>
                    <span v-if="order.order_status_history.shipped">
                     Shipped: {{ order.order_status_history.shipped }}<br>
                    </span>
                    <span v-if="order.order_status_history.delivered">
                     Delivered: {{ order.order_status_history.delivered }}<br>
                    </span>
                    <span v-if="order.order_status_history.rejected">
                     Rejected: {{ order.order_status_history.rejected }}<br>
                    </span>
                  </div>
                </td>
                <td>
                  <router-link title="Show Order" :to="`order/${order.id}`"
                               class="btn btn-info">
                    <i class="fas fa-eye"></i>
                  </router-link>
                </td>
              </tr>
            </template>
            <template v-if="!orders.length">
              <tr>
                <th class="text-center font-weight-bolder h-20" colspan="100%">No data found</th>
              </tr>
            </template>
            </tbody>
          </table>
          <pagination v-if="orders.length > 0" :pagination="pagination" @paginate="getLists()" :offset="5"/>
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
import Pagination from "@/components/Pagination";

export default {
  name: "OrderList",
  components: {Pagination},
  data: () => ({
    pagination: {
      current_page: 1,
    },
    form: {
      per_page: 15,
      search: '',
      status: '',
    },
    orders: [],
  }),
  mounted() {
    this.getLists();
  },
  methods: {
    getLists() {
      let params = {
        ...this.form,
        page: this.pagination.current_page
      }
      ApiService.get(`/order`, {params: params}).then((res) => {
        this.orders = res.data.data;
        this.pagination = res.data.meta;
      }).catch(error => {
        NotificationService.error(error.response.data.message);
      })
    },
    edit(id) {
      NotificationService.success('Order Edit working on');
    },
    destroy(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          ApiService.delete(`/user/orders/${id}`,).then(res => {
            this.getLists();
            NotificationService.success(res.data.message);
          }).catch(error => {
            NotificationService.error(error.response.data.message);
          })
        }
      }).catch(error => {
        NotificationService.error(error.response.data.message);
      })
    },
  }
}
</script>

<style scoped>

</style>