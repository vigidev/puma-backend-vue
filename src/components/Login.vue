<template>
  <div id="Login">
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex justify-content-center auth">
        <div class="row">
          <div class="col-sm-4 col-lg-12 mx-auto">
            <div class="auth-form-light text-left p-5">
              <div class="brand-logo">
                <img src="https://iqyoe.github.io/puma-web/assets/img/horizontal-logo-comp-lengkap-hitam.png">
              </div>
              <form @submit.prevent="login" class="pt-3">
                <div class="form-group">
                  <input type="email" class="form-control form-control-lg" :class="{'is-invalid': error}" id="email" v-model="email" placeholder="Email" required>
                  <div v-if="error">
                    <small id="emailHelp" class="text-danger">
                      Invalid Credentials. Did you type the right email?
                    </small>
                  </div>
                </div>
                <div class="form-group">
                  <input type="password" class="form-control form-control-lg" :class="{'is-invalid': error}" id="password" v-model="password" placeholder="Password" required>
                  <div v-if="error">
                    <small id="passwordHelp" class="text-danger">
                      Invalid Credentials. Did you type the right password?
                    </small>
                  </div>
                </div>
                <div class="mt-3">
                  <button type="submit" class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn">
                    <span v-if="loading">SIGNING IN...</span>
                    <span v-else>SIGN IN</span>
                    </button>
                </div>
                <!-- <div class="my-2 d-flex justify-content-between justify-content-center">
                  <div class="form-check">
                    <label class="form-check-label text-muted">
                      <input type="checkbox" class="form-check-input">
                      Keep me signed in
                    </label>
                  </div>
                  <a href="#" class="auth-link text-black">Forgot password?</a>
                </div>
                <div class="mb-2">
                  <button type="button" class="btn btn-block btn-facebook auth-form-btn">
                    <i class="mdi mdi-facebook mr-2"></i>Connect using facebook
                  </button>
                </div>
                <div class="text-center mt-4 font-weight-light">
                  Don't have an account? <a href="register.html" class="text-primary">Create</a>
                </div> -->
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
  <!-- container-scroller -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      loading: false,
      error: false,
      access_token: ''
    }
  },
  name: 'Login',
  methods: {
    login() {
      var app = this
      app.loading = true
      if (app.$route.query.redirect_url) {
      this.$auth.login({
        params: {
          email: app.email,
          password: app.password
        }, 
        success: function (data) {
          console.log(data.headers.get('authorization'))
          app.loading = false;
          app.access_token = data.headers.get('authorization');
        },
        error: function (err) {
          app.loading = false;
          app.error = true;
          // this.errorModal();
        },
        redirect: '/callback?access_token='+app.access_token+'&token_type=Bearer&redirect_url='+app.$route.query.redirect_url,
        // redirect: redirectUrl,
        fetchUser: true,
      });
      } else {
      this.$auth.login({
        params: {
          email: app.email,
          password: app.password
        }, 
        success: function (data) {
          app.loading = false;
          // this.successModal();
        },
        error: function (err) {
          app.loading = false;
          app.error = true;
          // this.errorModal();
        },
        redirect: 'dashboard',
        // redirect: redirectUrl,
        fetchUser: true,
      });
      }
    }
  }
}
</script>

<style>
.brand-logo {
    text-align: center;
}
</style>
