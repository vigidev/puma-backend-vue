<template>
    <div id="Layout">
      <div class="container-scroller">
        <nav class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
          <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
            <router-link class="navbar-brand brand-logo" to="/dashboard">
              <!-- <img src="/static/logo-computing.png" alt="logo"/> -->
              PUMA COMPUTING
            </router-link>
            <!-- <r class="navbar-brand brand-logo-mini" href="/"> -->
            <router-link class="navbar-brand brand-logo-mini" to="/dashboard">
              <!-- <img src="/static/logo-computing-mini.png" alt="logo"/> -->
              PC
            </router-link>
          </div>
          <div class="navbar-menu-wrapper d-flex align-items-stretch">
            <ul class="navbar-nav navbar-nav-right">
              <li class="nav-item nav-profile dropdown">
                <a class="nav-link dropdown-toggle" id="profileDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
                  <div class="nav-profile-img">
                    <img src="/static/computing-black.png" alt="Profile Picture">
                    <span class="availability-status online"></span>             
                  </div>
                  <div v-if="$auth.check()" class="nav-profile-text">
                    <p class="mb-1 text-black">{{ $auth.user().name }}</p>
                  </div>
                </a>
                <div class="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" @click.prevent="$auth.logout()">
                    <i class="mdi mdi-logout mr-2 text-primary"></i>
                    Signout
                  </a>
                </div>
              </li>
              <li class="nav-item nav-settings d-none d-lg-block">
                <a class="nav-link" href="#">
                  <i class="mdi mdi-format-line-spacing"></i>
                </a>
              </li>
            </ul>
            <button @click.prevent="toggleSidebar()" class="navbar-toggler navbar-toggler-right d-lg-none align-self-center">
              <span class="mdi mdi-menu"></span>
            </button>
          </div>
        </nav>
        <div class="container-fluid page-body-wrapper">
        <transition name="slide">
          <nav class="sidebar sidebar-offcanvas" :class="{'active': active}" id="sidebar">
              <ul class="nav">
                <li class="nav-item nav-profile">
                  <a href="#" class="nav-link">
                    <div class="nav-profile-image">
                      <img src="/static/computing-black.png" alt="Profile Picture">
                      <span class="login-status online"></span> <!--change to offline or busy as needed-->              
                    </div>
                    <div v-if="$auth.check()" class="nav-profile-text d-flex flex-column">
                      <span class="font-weight-bold mb-2">{{ $auth.user().name }}</span>
                      <span class="text-secondary text-small">{{ $auth.user().roles }}</span>
                    </div>
                    <!-- <i class="mdi mdi-bookmark-check text-success nav-profile-baduge"></i> -->
                  </a>
                </li>
                <router-link tag="li" class="nav-item" to="/dashboard" exact>
                  <a class="nav-link">
                    <span class="menu-title">Dashboard</span>
                    <i class="mdi mdi-home menu-icon"></i>
                  </a>
                </router-link>
                <router-link tag="li" v-if="$auth.check('Admin')" class="nav-item" to="/about">
                  <a class="nav-link">
                    <span class="menu-title">About</span>
                    <i class="mdi mdi-alert-circle-outline menu-icon"></i>
                  </a>
                </router-link>
                <li :class="['nav-item', {'active': this.$route.path==='/news' || this.$route.path==='/news/category'}]">
                  <a :class="['nav-link', {'collapsed': this.$route.path!=='/news' || this.$route.path!=='/news/category'}]" data-toggle="collapse" href="#news" aria-expanded="false" aria-controls="news">
                    <span class="menu-title">News</span>
                    <i class="menu-arrow"></i>
                    <i class="mdi mdi-file-multiple menu-icon"></i>
                  </a>
                  <div :class="['collapse', {'show': this.$route.path==='/news' || this.$route.path==='/news/category'}]" id="news">
                    <ul class="nav flex-column sub-menu">
                      <router-link tag="li" class="nav-item" to="/news"><a class="nav-link">News</a></router-link>
                      <router-link tag="li" class="nav-item" to="/news/category"><a class="nav-link">Category</a></router-link>
                    </ul>
                  </div>
                </li>
                <li :class="['nav-item', {'active': this.$route.path==='/download' || this.$route.path==='/download/category'}]">
                  <a :class="['nav-link', {'collapsed': this.$route.path!=='/download' || this.$route.path!=='/download/category'}]" data-toggle="collapse" href="#download" aria-expanded="false" aria-controls="download">
                    <span class="menu-title">Download</span>
                    <i class="menu-arrow"></i>
                    <i class="mdi mdi-folder-download menu-icon"></i>
                  </a>
                  <div :class="['collapse', {'show': this.$route.path==='/download' || this.$route.path==='/download/category'}]" id="download">
                    <ul class="nav flex-column sub-menu">
                      <router-link tag="li" class="nav-item" to="/download"><a class="nav-link">Download</a></router-link>
                      <router-link tag="li" class="nav-item" to="/download/category"><a class="nav-link">Category</a></router-link>
                    </ul>
                  </div>
                </li>
              </ul>
            </nav>
          </transition>
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
    data() {
      return {
        active: false
      }
    },
    name: "Layout",
    components: {Navbar, Sidebar, Footer},
    methods: {
      logout() {
        this.$auth.logout({
          makeRequest: true,
          params: {}, // data: {} in axios
          success: function () {},
          error: function () {},
          redirect: '/',
        });
      },
      toggleSidebar() {
        this.active = this.active ? false : true
      }
    }
}
</script>

<style scoped>
.slide-leave-active,
.slide-enter-active {
  transition: 1s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}
</style>
