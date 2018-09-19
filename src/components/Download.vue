<template>
  <div id="download">
    <sweet-modal icon="warning" ref="dfmodal">
        Are you sure you want to delete '{{ download.title }}' ?
        <template slot="button">
          <button @click="deleteData(download.uid)" class="btn btn-primary">
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
          <input type="text" class="form-control" name="title" id="title" placeholder="Title" v-model="download.title">
        </div>
        <div class="form-group">
          <label for="title">Link</label>
          <input type="text" class="form-control" name="url" id="url" placeholder="Title" v-model="download.url">
        </div>
        <div class="form-group">
          <label for="content">Content</label>
          <vue-editor name="content" id="content" placeholder="Content" v-model="download.content"></vue-editor>
        </div>
        <input hidden name="uid" id="uid" v-model="download.uid">
        <input hidden name="user_id" id="user_id" v-model="download.user_id">
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
        Download
      </h3>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Dashboard</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Download</li>
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
              <tbody v-if="downloads.length>0">
                <tr v-for="download in filteredDownloads" :key="download.uid">
                  <td>
                    <a class="link" @click="mutateData(download)">{{ download.title }}</a>
                  </td>
                  <td>
                    {{ download.created_by_name }}
                  </td>
                  <td>
                    {{ download.download_category_title }}
                  </td>
                  <!-- <td>
                    {{ download.updated_by_name }}
                  </td> -->
                  <td>
                    <button @click="dfModal(download)" class="btn btn-inverse-danger btn-icon">
                      <i class="mdi mdi-delete"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="4" class="text-center text-danger">No Data Found</td>
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
                          :class="[{ disabled: !pagination.prev_page_url }]" @click="fetchDownload(pagination.prev_page_url)">Prev</button>
                  <button type="button" class="btn btn-primary disabled">{{ pagination.current_page }} of {{ pagination.last_page }}</button>
                  <button type="button" class="btn btn-primary"
                          :class="[{ disabled: !pagination.next_page_url }]" @click="fetchDownload(pagination.next_page_url)">Next</button>
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
        downloads: [],
        download: {
          uid: '',
          user_id: '',
          title: '',
          content: '',
          url: ''
        }
      }
    },
    name: 'Download',
    components: {
      VueEditor,
      SweetModal
    },
    created () {
      this.fetchDownload()
    },
    methods: {
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
                this.download.uid = res.data.uid
                this.download.user_id = res.data.created_by
                this.download.title = res.data.title
                this.download.content = res.data.content
                this.download.url = res.data.url
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
              fetch('https://api.pucomputing.org/api/apidownload', {
              method: 'post',
              body: JSON.stringify(this.download),
              headers: new Headers({
                  'Authorization': 'Bearer ' + this.$auth.token(),
                  'content-type': 'application/json'
              })
              })
              .then(res => res.json())
              .then(data => {
                  this.loading = false
                  this.download.uid = ''
                  this.download.user_id = ''
                  this.download.title = ''
                  this.download.content = ''
                  this.download.url = ''
                  this.$modal.hide('edit-data')
                  this.$refs.successModal.open()
                  this.fetchDownload()
              })
              .catch(err => console.log(err))
          } else {
              // Update
              this.loading = true
              fetch('https://api.pucomputing.org/api/apidownload', {
              method: 'put',
              body: JSON.stringify(this.download),
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
                  this.fetchDownload()
              })
              .catch(err => console.log(err))
          }
        },
        mutateData(download) {
          if(download) {
            this.edit = true
            this.download.uid = download.uid
            this.download.user_id = download.created_by
            this.download.title = download.title
            this.download.content = download.content
            this.download.url = download.url
          } else {
            this.edit = false
            this.download.uid = ''
            this.download.user_id = this.$auth.user().id
            this.download.title = ''
            this.download.content = ''
            this.download.url = ''
          }
          this.$modal.show('edit-data');
        },
        closeEditModal() {
          this.$modal.hide('edit-data');
        },
        dfModal(download) {
            this.download.uid = download.uid;
            this.download.title = download.title;
            this.$refs.dfmodal.open();
        },
        cdfModal() {
            this.$refs.dfmodal.close();
        },
        deleteData(uid) {
            this.loading = true
            fetch(`https://api.pucomputing.org/api/apidownload/${uid}`, {
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
                this.fetchDownload();
            })
            .catch(err => {
                console.log(err);
                this.errorModal();
            });
        }
    },
    computed: {
      filteredDownloads() {
        return this.downloads.filter((download) => {
          return download.title.toLowerCase().includes(this.search.toLowerCase());
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
