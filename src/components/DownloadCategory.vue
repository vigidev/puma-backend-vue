<template>
  <div id="downloadcategory">
    <!-- <sweet-modal icon="error" ref="errormodal">
      <div v-if="error">
        <b><h5>We got some error!</h5></b>
        {{ error }}
      </div>
    </sweet-modal> -->
    <sweet-modal icon="warning" ref="dfmodal">
        Are you sure you want to delete Category '{{ downloadcategory.title }}' ?
        <template slot="button">
          <button @click="deleteData(downloadcategory.uid)" class="btn btn-primary">
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
          <label for="title">Title</label>
          <input type="text" class="form-control" name="title" id="title" placeholder="Title" v-model="downloadcategory.title">
        </div>
        <!-- <div class="form-group">
          <label for="content">Content</label>
          <vue-editor name="content" id="content" placeholder="Content" v-model="downloadcategory.content"></vue-editor>
        </div> -->
        <input hidden name="uid" id="uid" v-model="downloadcategory.uid">
        <input hidden name="user_id" id="user_id" v-model="downloadcategory.user_id">
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
        Download Category
      </h3>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Dashboard</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Download Category</li>
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
                    Created By
                  </th>
                  <!-- <th>
                    Last Update By
                  </th> -->
                  <th>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody v-if="downloadcategories.length>0">
                <tr v-for="downloadcategory in filteredDownloadCategories" :key="downloadcategory.uid">
                  <td>
                    <a class="link" @click="mutateData(downloadcategory)">{{ downloadcategory.title }}</a>
                  </td>
                  <td>
                    {{ downloadcategory.created_by_name }}
                  </td>
                  <!-- <td>
                    {{ downloadcategory.updated_by_name }}
                  </td> -->
                  <td>
                    <button @click="dfModal(downloadcategory)" class="btn btn-inverse-danger btn-icon">
                      <i class="mdi mdi-delete"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="3" class="text-center text-danger">No Data Found</td>
                </tr>
              </tbody>
            </table>

            <div class="card-bottom">
              <!-- <div class="rows-menu">
                Rows per page <select name="rows" id="rows"></select>
              </div> -->
              <div class="col-md-6 offset-md-6 text-right">
                <div class="btn-group-sm" role="group" aria-label="Pagination">
                  <button type="button" class="btn btn-primary"
                          :class="[{ disabled: !pagination.prev_page_url }]" @click="fetchDownloadCategory(pagination.prev_page_url)">Prev</button>
                  <button type="button" class="btn btn-primary disabled">{{ pagination.current_page }} of {{ pagination.last_page }}</button>
                  <button type="button" class="btn btn-primary"
                          :class="[{ disabled: !pagination.next_page_url }]" @click="fetchDownloadCategory(pagination.next_page_url)">Next</button>
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
        downloadcategories: [],
        downloadcategory: {
          uid: '',
          user_id: '',
          title: ''
        }
      }
    },
    name: 'DownloadCategory',
    components: {
      VueEditor,
      SweetModal
    },
    created () {
      this.fetchDownloadCategory()
    },
    methods: {
        fetchDownloadCategory(url) {
            url = url || 'https://api.pucomputing.org/api/apidownloadcategories'
            fetch(url, {
                headers: new Headers({
                  'Authorization': 'Bearer ' + this.$auth.token(),
                })
              }).then(res => res.json())
              .then(res => {
                console.log(res.data)
                this.downloadcategories = res.data
                this.downloadcategory.uid = res.data.uid
                this.downloadcategory.user_id = res.data.created_by
                this.downloadcategory.title = res.data.title
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
        addData() {
          if (this.edit === false) {
              // Add
              this.loading = true
              fetch('https://api.pucomputing.org/api/apidownloadcategory', {
              method: 'post',
              body: JSON.stringify(this.downloadcategory),
              headers: new Headers({
                  'Authorization': 'Bearer ' + this.$auth.token(),
                  'content-type': 'application/json'
              })
              })
              .then(res => res.json())
              .then(data => {
                  this.downloadcategory.uid = ''
                  this.downloadcategory.user_id = ''
                  this.downloadcategory.title = ''
                  this.loading = false
                  this.$modal.hide('edit-data')
                  this.$refs.successModal.open()
                  this.fetchDownloadCategory()
              })
              .catch(err => console.log(err))
          } else {
              // Update
              this.loading = true
              fetch('https://api.pucomputing.org/api/apidownloadcategory', {
              method: 'put',
              body: JSON.stringify(this.downloadcategory),
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
                  this.fetchDownloadCategory()
              })
              .catch(err => console.log(err))
          }
        },
        mutateData(downloadcategory) {
          if(downloadcategory) {
            this.edit = true
            this.downloadcategory.uid = downloadcategory.uid
            this.downloadcategory.user_id = downloadcategory.created_by
            this.downloadcategory.title = downloadcategory.title
          } else {
            this.edit = false
            this.downloadcategory.uid = ''
            this.downloadcategory.user_id = this.$auth.user().id
            this.downloadcategory.title = ''
          }
          this.$modal.show('edit-data');
        },
        closeEditModal() {
          this.$modal.hide('edit-data');
        },
        dfModal(downloadcategory) {
            this.downloadcategory.uid = downloadcategory.uid;
            this.downloadcategory.title = downloadcategory.title;
            this.$refs.dfmodal.open();
        },
        cdfModal() {
            this.$refs.dfmodal.close();
        },
        deleteData(uid) {
            this.loading = true
            fetch(`https://api.pucomputing.org/api/apidownloadcategory/${uid}`, {
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
                this.fetchDownloadCategory();
            })
            .catch(err => {
                console.log(err);
                this.errorModal();
            });
        }
    },
    computed: {
      filteredDownloadCategories() {
        return this.downloadcategories.filter((downloadcategory) => {
          return downloadcategory.title.toLowerCase().includes(this.search.toLowerCase());
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
.rows-menu {
  display: flex;
  justify-content: flex-start
}
.pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
