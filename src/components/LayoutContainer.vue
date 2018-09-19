<template>
    <div id="LayoutContainer">
    <div class="container-scroller">
    <Navbar/>
      <div class="container-fluid page-body-wrapper">
        <Sidebar/>
        <div class="main-panel">
        <div class="content-wrapper">
          <div v-if="$auth.ready()">
            <!-- <vue-router></vue-router>-->
            <router-view></router-view>
          </div>
          <div v-if="!$auth.ready()">
            Fetching user...
          </div>
        </div>
        <Footer/>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: "LayoutContainer",
    components: {Navbar, Sidebar, Footer}
}
</script>