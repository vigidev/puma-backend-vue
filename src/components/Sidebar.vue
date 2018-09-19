<template>
<div id="sidebar">
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
          <!-- <li class="nav-item sidebar-actions">
            <span class="nav-link">
              <div class="border-bottom">
                <h6 class="font-weight-normal mb-3">Projects</h6>                
              </div>
              <button class="btn btn-block btn-lg btn-gradient-primary mt-4">+ Add a project</button>
              <div class="mt-4">
                <div class="border-bottom">
                  <p class="text-secondary">Category</p>                  
                </div>
                <ul class="gradient-bullet-list mt-4">
                  <li>Free</li>
                  <li>Pro</li>
                </ul>
              </div>
            </span>
          </li> -->
        </ul>
      </nav>
</div>
</template>

<script>
export default {
    data() {
      return {
        active: false
      }
    },
    name: 'sidebar'
}
</script>