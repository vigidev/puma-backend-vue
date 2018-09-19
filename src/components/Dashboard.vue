<template>
  <div id="dashboard">
    <notifications group="auth" position="bottom right"/>
    <div class="row">
          </div>
          <div class="page-header">
            <h3 class="page-title">
              <span class="page-title-icon bg-gradient-primary text-white mr-2">
                <i class="mdi mdi-home"></i>                 
              </span>
              Dashboard
            </h3>
            <nav aria-label="breadcrumb">
              <ul class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page">
                  <span></span>
                  <!-- <span v-if="msg">Welcome!</span> -->
                  <!-- <span v-else> -->
                    Overview
                    <!-- </span> -->
                  <i class="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                </li>
              </ul>
            </nav>
          </div>
          <div class="row">
            <div class="col-md-4 stretch-card grid-margin">
              <div class="card bg-gradient-primary card-img-holder text-white">
                <div class="card-body">
                  <img src="/static/dashboard/circle.svg" class="card-img-absolute" alt="circle-image"/>
                  <h4 class="font-weight-normal mb-3">News
                    <i class="mdi mdi-file-multiple mdi-24px float-right"></i>
                  </h4>
                  <h2 class="mb-5">{{ newsy.length }}</h2>
                  <h6 class="card-text"><router-link class="text-white" to="/news">Go to News</router-link></h6>
                </div>
              </div>
            </div>
            <div class="col-md-4 stretch-card grid-margin">
              <div class="card bg-gradient-primary card-img-holder text-white">
                <div class="card-body">
                  <img src="/static/dashboard/circle.svg" class="card-img-absolute" alt="circle-image"/>                  
                  <h4 class="font-weight-normal mb-3">Downloads
                    <i class="mdi mdi-folder-download mdi-24px float-right"></i>
                  </h4>
                  <h2 class="mb-5">{{ downloads.length }}</h2>
                  <h6 class="card-text"><router-link class="text-white" to="/downloads">Go to Downloads</router-link></h6>
                </div>
              </div>
            </div>
            <div v-if="$auth.check('Admin')" class="col-md-4 stretch-card grid-margin">
              <div class="card bg-gradient-primary card-img-holder text-white">
                <div class="card-body">
                  <img src="/static/dashboard/circle.svg" class="card-img-absolute" alt="circle-image"/>                                    
                  <h4 class="font-weight-normal mb-3">Abouts
                    <i class="mdi mdi-alert-circle-outline mdi-24px float-right"></i>
                  </h4>
                  <h2 class="mb-5">{{ abouts.length }}</h2>
                  <h6 class="card-text"><router-link class="text-white" to="/abouts">Go to Abouts</router-link></h6>
                </div>
              </div>
            </div>
          </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        newsy: [],
        downloads: [],
        abouts: [],
        // news: {
        //   uid: ''
        // },
        // download: {
        //   uid: ''
        // },
        // about: {
        //   uid: ''
        // }
      }
    },
    name: 'dashboard',
    created () {
      this.fetchNews()
      this.fetchDownload()
      this.fetchAbout()
    },
    methods: {
        fetchNews(url) {
          url = url || 'https://api.pucomputing.org/api/apinewsy'
          fetch(url, {
              headers: new Headers({
                'Authorization': 'Bearer ' + this.$auth.token(),
              })
            }).then(res => res.json())
            .then(res => {
              this.newsy = res.data
              // this.news.uid = res.data.uid
            })
            .catch(err => console.log(err))
        },
        fetchDownload(url) {
          url = url || 'https://api.pucomputing.org/api/apidownloads'
          fetch(url, {
              headers: new Headers({
                'Authorization': 'Bearer ' + this.$auth.token(),
              })
            }).then(res => res.json())
            .then(res => {
              console.log(res.data)
              this.downloads = res.data
              // this.download.uid = res.data.uid
            })
            .catch(err => console.log(err))
        },
        fetchAbout(url) {
          url = url || 'https://api.pucomputing.org/api/apiabouts'
          fetch(url, {
              headers: new Headers({
                'Authorization': 'Bearer ' + this.$auth.token(),
              })
            }).then(res => res.json())
            .then(res => {
              console.log(res.data)
              this.abouts = res.data
              // this.about.uid = res.data.uid
            })
            .catch(err => console.log(err))
        },
      beforeRouteEnter(to, from, next) {
        next(vm => {
          if (from.path === '/login') {
            vm.msg = true;
            // this.msg = true;
            vm.$notify({
              group: 'auth',
              type: 'success',
              title: 'Welcome ' + vm.$auth.user().name + '!',
              text: 'Hello ' + vm.$auth.user().name + '! You have successfully sign in!'
            });
          } else {
            vm.msg = false;
            // this.msg = false;
          }
          next()
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
