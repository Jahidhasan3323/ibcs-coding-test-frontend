<template>
  <div>
    <div class="app has-fullwidth">
      <!--[if lt IE 10]>
      <div class="page-message" role="alert">You are using an <strong>outdated</strong> browser. Please <a class="alert-link" href="http://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</div>
      <![endif]-->
      <!-- .app-header -->
      <!-- .app-header -->
      <Header></Header>
      <!-- /.app-header -->
      <!-- .app-main -->
      <main class="app-main">
        <!-- .wrapper -->
        <div class="wrapper">
          <!-- .page -->
          <div class="page">
            <!-- .page-inner -->
            <div class="page-inner">
              <!-- .container -->
              <router-view></router-view>
            </div><!-- /.page-inner -->
          </div><!-- /.page -->
        </div><!-- /.wrapper -->
        <!-- .app-footer -->
        <Footer></Footer>
      </main><!-- /.app-main -->
    </div>
  </div>
</template>

<script>
import Header from '@/components/includes/Header'
import Footer from '@/components/includes/Footer'
export default {
  components: {
    Header, Footer
  },
  name: "Main"
}
</script>

<style scoped>

</style>