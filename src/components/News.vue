<template>
  <div id="news">
    <sweet-modal icon="warning" ref="dfmodal">
        Are you sure you want to delete Category '{{ news.title }}' ?
        <template slot="button">
          <button @click="deleteData(news.uid)" class="btn btn-primary">
            <span v-if="loading">Deleting...</span>
            <span v-else>Yes, Delete</span>
          </button> &nbsp;&nbsp;
          <button @click="cdfModal()" class="btn">Nope, Cancel</button>
        </template>
    </sweet-modal>
    <sweet-modal icon="success" ref="successModal">
      Success!
    </sweet-modal>
    <modal name="edit-data" height="auto" :scrollable="true">
      <div class="container-fluid">
      <form @submit.prevent="addData" class="forms-sample">
        <div class="form-group">
          <label for="category">Category</label>
            <select class="custom-select" placeholder="Category" v-model="news.newscategory_id" required>
              <option :disabled="news.newscategory_id === 0 ? 'disabled' : ''" value="">Category</option>
              <option v-for="nc in newscategories" :key="nc.id"
                      :value="nc.id"
                      :selected="nc.id === news.newscategory_id ? 'selected' : 'disabled'">
                      {{ nc.title }}
              </option>
            </select>
        </div>
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" class="form-control" name="title" id="title" placeholder="Title" v-model="news.title">
        </div>
        <div class="form-group">
          <label for="poster">Poster</label>
          <input type="text" class="form-control" name="poster" id="poster" placeholder="Poster URL" v-model="news.poster">
          <small class="text-danger"><i>*Please use URL since the upload doesn't work for now</i></small>
        </div>
        <div class="form-group">
          <label for="url">URL</label>
          <input type="text" class="form-control" name="url" id="url" placeholder="URL" v-model="news.url">
          <small class="text-danger"><i>*Set URL if it's use external URL</i></small>
        </div>
        <div class="form-group">
          <label for="headline">Headline</label>
          <textarea class="form-control" name="headline" id="headline" placeholder="Headline" v-model="news.headline"></textarea>
        </div>
        <div class="form-group">
          <label for="content">Content</label>
          <vue-editor name="content" id="content" placeholder="Content" v-model="news.content"></vue-editor>
        </div>
        <!-- <div class="form-group">
          <label for="poster">Poster</label>
          <input type="file" name="poster" class="file-upload-default">
          <div class="input-group col-xs-12">
            <input type="text" class="form-control file-upload-info" disabled placeholder="Upload Image">
            <span class="input-group-append">
              <button class="file-upload-browse btn btn-gradient-primary" type="button">Upload</button>
            </span>
          </div>
          <input type="file" class="form-control" name="poster" id="poster" placeholder="Poster" :change="onImageChange">
        </div> -->
        <input v-if="edit" hidden name="uid" id="uid" v-model="news.uid">
        <input hidden name="user_id" id="user_id" v-model="news.user_id">
        <button type="submit" class="btn btn-gradient-primary mr-2">
          <span v-if="loading">Saving...</span>
          <span v-else>Save</span>
        </button>
        <button @click.prevent="closeEditModal()" class="btn btn-light">Cancel</button>
      </form>
      </div>
    </modal>
    <div class="page-header">
      <h3 class="page-title">
        News
      </h3>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Dashboard</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">News</li>
        </ol>
      </nav>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <div class="card-description row">
              <div class="col-md-6">
                <button @click="mutateData()" class="btn btn-gradient-primary">Create</button>
              </div>
              <div class="col-md-6">
                <input class="form-control" type="text" v-model="search" placeholder="Search by Title" />
              </div>
            </div>
            <table class="table table-bordered table-responsive-sm">
              <thead>
                <tr>
                  <th>
                    Title
                  </th>
                  <th>
                    Category
                  </th>
                  <th>
                    Featured
                  </th>
                  <th>
                    Published
                  </th>
                  <th>
                    Created By
                  </th>
                  <th>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody v-if="newsy.length>0">
                <tr v-for="news in filteredNewsy" :key="news.uid">
                  <td>
                    <a class="link" @click="mutateData(news)">{{ news.title }}</a>
                  </td>
                  <td>
                    {{ news.newscategory_title }}
                  </td>
                  <td>
                    <div v-if="news.published==='1'&&news.newscategory_title==='Event'">
                      <button v-if="news.featured==='1'" @click="featureData(news.uid)" class="btn btn-sm btn-gradient-primary">YES</button>
                      <button v-else-if="news.featured==='0'" @click="featureData(news.uid)" class="btn btn-sm">NO</button>
                    </div>
                    <div v-else-if="news.published==='0'&&news.newscategory_title==='Event'">
                      <button v-if="news.featured==='1'" @click="featureData(news.uid)" class="btn btn-sm btn-gradient-primary" disabled>YES</button>
                      <button v-else-if="news.featured==='0'" @click="featureData(news.uid)" class="btn btn-sm" disabled>NO</button>
                    </div>
                  </td>
                  <td>
                    <button v-if="news.published==='1'" @click="publishData(news.uid)" class="btn btn-sm btn-gradient-primary">YES</button>
                    <button v-else-if="news.published==='0'" @click="publishData(news.uid)" class="btn btn-sm">NO</button>
                  </td>
                  <td>
                    {{ news.created_by_name }}
                  </td>
                  <td>
                    <button @click="dfModal(news)" class="btn btn-inverse-danger btn-icon">
                      <i class="mdi mdi-delete"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="6" class="text-center text-danger">No Data Found</td>
                </tr>
              </tbody>
            </table>

            <div class="card-bottom row">
              <!-- <div class="rows-menu">
                Rows per page <select name="rows" id="rows"></select>
              </div> -->
              <div class="col-md-6 offset-md-6 text-right">
                <div class="btn-group-sm" role="group" aria-label="Pagination">
                  <button type="button" class="btn btn-primary"
                          :class="[{ disabled: !pagination.prev_page_url }]" @click="fetchNews(pagination.prev_page_url)">Prev</button>
                  <button type="button" class="btn btn-primary disabled">{{ pagination.current_page }} of {{ pagination.last_page }}</button>
                  <button type="button" class="btn btn-primary"
                          :class="[{ disabled: !pagination.next_page_url }]" @click="fetchNews(pagination.next_page_url)">Next</button>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import SweetModal from 'sweet-modal-vue/src/components/SweetModal.vue'

  export default {
    data () {
      return {
        edit: false,
        loading: false,
        pagination: {},
        search: '',
        newscategories: [],
        newsy: [],
        news: {
          newscategory_id: '',
          uid: '',
          user_id: '',
          title: '',
          poster: '',
          url: '',
          headline: '',
          content: '',
          // poster: ''
        }
      }
    },
    name: 'News',
    components: {
      VueEditor,
      SweetModal
    },
    created () {
      this.fetchCategory()
      this.fetchNews()
    },
    methods: {
        fetchCategory() {
            let vm = this;
            vm.loading = true;
            fetch('https://api.pucomputing.org/api/apinewscategories', {
                headers: new Headers({
                    'Authorization': 'Bearer '+ this.$auth.token(), 
                    // 'Content-Type': 'application/x-www-form-urlencoded'
                }), 
            })
                .then(res => res.json())
                .then(res => {
                    vm.loading = false;
                    vm.newscategories = res.data;
                })
                .catch(err => {
                    console.log(err);
                    this.errorModal(err);
                });
        },
        fetchNews(url) {
            url = url || 'https://api.pucomputing.org/api/apinewsy'
            fetch(url, {
                headers: new Headers({
                  'Authorization': 'Bearer ' + this.$auth.token(),
                })
              }).then(res => res.json())
              .then(res => {
                // console.log(res.data)
                this.newsy = res.data
                this.news.uid = res.data.uid
                this.news.user_id = res.data.created_by
                this.news.title = res.data.title
                this.news.poster = res.data.poster
                this.news.url = res.data.url
                this.news.headline = res.data.headline
                this.news.content = res.data.content
                this.news.poster = res.data.poster
                this.makePagination(res.meta, res.links);
              })
              .catch(err => console.log(err))
        },
        makePagination(meta, links) {
            let pagination = {
                current_page: meta.current_page,
                last_page: meta.last_page,
                next_page_url: links.next,
                prev_page_url: links.prev
            };
            this.pagination = pagination;
        },
        onImageChange(e) {
          let files = e.target.files || e.dataTransfer.files;
          if (!files.length)
            return;
          this.createImage(files[0]);
        },
        createImage(file) {
          let reader = new FileReader();
          let vm = this;
          reader.onload = (e) => {
            vm.image = e.target.result;
          };
          reader.readAsDataURL(file);
        },
        addData() {
          if (this.edit === false) {
              // Add
              this.loading = true
              fetch('https://api.pucomputing.org/api/apinews', {
              method: 'post',
              body: JSON.stringify(this.news),
              headers: new Headers({
                  'Authorization': 'Bearer ' + this.$auth.token(),
                  'content-type': 'application/json'
              })
              })
              .then(res => res.json())
              .then(data => {
                  this.loading = false
                  this.news.uid = ''
                  this.news.user_id = ''
                  this.news.title = ''
                  this.news.poster = ''
                  this.news.url = ''
                  this.news.headline = ''
                  this.news.content = ''
                  this.news.poster = ''
                  this.$modal.hide('edit-data')
                  this.$refs.successModal.open()
                  this.fetchNews()
              })
              .catch(err => console.log(err))
          } else {
              // Update
              this.loading = true
              fetch('https://api.pucomputing.org/api/apinews', {
              method: 'put',
              body: JSON.stringify(this.news),
              headers: new Headers({
                  'Authorization': 'Bearer ' + this.$auth.token(),
                  'content-type': 'application/json'
              })
              })
              .then(res => res.json())
              .then(data => {
                  this.loading = false
                  this.$modal.hide('edit-data')
                  this.$refs.successModal.open()
                  this.fetchNews()
              })
              .catch(err => console.log(err))
          }
        },
        featureData(uid, state) {
              this.loading = true
              fetch(`https://api.pucomputing.org/api/apinews/feature/${uid}`, {
              method: 'get',
              headers: new Headers({
                  'Authorization': 'Bearer ' + this.$auth.token(),
                  'content-type': 'application/json'
              })
              })
              .then(res => res.json())
              .then(data => {
                  this.loading = false
                  this.$refs.successModal.open()
                  this.fetchNews()
              })
              .catch(err => console.log(err))
        },
        publishData(uid, state) {
              this.loading = true
              fetch(`https://api.pucomputing.org/api/apinews/publish/${uid}`, {
              method: 'get',
              headers: new Headers({
                  'Authorization': 'Bearer ' + this.$auth.token(),
                  'content-type': 'application/json'
              })
              })
              .then(res => res.json())
              .then(data => {
                  this.loading = false
                  this.$refs.successModal.open()
                  this.fetchNews()
              })
              .catch(err => console.log(err))
        },
        mutateData(news) {
          if(news) {
            this.edit = true
            this.news.newscategory_id = news.newscategory_id
            this.news.uid = news.uid
            this.news.user_id = news.created_by
            this.news.title = news.title
            this.news.poster = news.poster
            this.news.url = news.url
            this.news.headline = news.headline
            this.news.content = news.content
            // this.news.poster = news.poster
          } else {
            this.edit = false
            this.news.newscategory_id = ''
            // this.news.uid = ''
            this.news.user_id = this.$auth.user().id
            this.news.title = ''
            this.news.poster = ''
            this.news.url = ''
            this.news.headline = ''
            this.news.content = ''
            // this.news.poster = ''
          }
          this.$modal.show('edit-data');
        },
        closeEditModal() {
          this.$modal.hide('edit-data');
        },
        dfModal(news) {
            this.news.uid = news.uid;
            this.news.title = news.title;
            this.$refs.dfmodal.open();
        },
        cdfModal() {
            this.$refs.dfmodal.close();
        },
        deleteData(uid) {
            this.loading = true
            fetch(`https://api.pucomputing.org/api/apinews/${uid}`, {
                method: 'delete',
                headers: new Headers({
                    'Authorization': 'Bearer ' + this.$auth.token(),
                    'content-type': 'application/json'
                })
            })
            .then(res => res.json())
            .then(data => {
                this.loading = false
                this.cdfModal();
                this.$refs.successModal.open();
                this.fetchNews();
            })
            .catch(err => {
                console.log(err);
                this.errorModal();
            });
        }
    },
    mounted() {
      let fileupload = document.createElement('script');
      fileupload.setAttribute('src', "http://www.bootstrapdash.com/demo/purple-admin-free/js/file-upload.js");
      fileupload.async = true;
      document.body.appendChild(fileupload);
    },
    computed: {
      filteredNewsy() {
        return this.newsy.filter((news) => {
          return news.title.toLowerCase().includes(this.search.toLowerCase());
        });
      },
    }
  }
</script>

<style>
.v--modal-overlay {
  z-index: 1035;
}
.forms-sample {
  margin-bottom: 2.5%;
  margin-top: 2.5%;
}
.link {
  cursor: pointer;
}
.card-bottom {
  margin-top: 2.5%;
}
/* .rows-menu {
  display: flex;
  justify-content: flex-start
}
.pagination {
  display: flex;
  justify-content: flex-end;
} */
</style>
