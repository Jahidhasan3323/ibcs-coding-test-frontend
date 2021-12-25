<template>
  <OrderDetailsShow :order="order"/>
</template>

<script>
import OrderDetailsShow    from "@/components/OrderDetailsShow";
import NotificationService from "@/services/notification.service";
export default {
  name      : "show",
  components: {OrderDetailsShow},
  data      : () => ({
    order: {},
  }),
  mounted() {
    this.getOrder(this.$route.params.id);
  },
  methods: {
    getOrder(id) {
      let params = {
        type: this.$route.query.type
      }
      ApiService.get(`/order/${id}`, {params: params}).then((res) => {
        this.order = res.data.data;
      }).catch(error => {
        NotificationService.error(error.response.data.message);
      })
    },
  }
}
</script>