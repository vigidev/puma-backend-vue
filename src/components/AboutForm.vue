<template>
  <div id="AboutForm">
    <div class="page-header">
      <h3 class="page-title">
        About
      </h3>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Dashboard</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">About</li>
        </ol>
      </nav>
    </div>
    <div class="row">
      <div class="col-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <form class="forms-sample">
              <div class="form-group">
                <label for="exampleInputName1">Name</label>
                <input type="text" class="form-control" id="exampleInputName1" placeholder="Name">
              </div>
              <div class="form-group">
                <label for="exampleInputEmail3">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail3" placeholder="Email">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword4">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword4" placeholder="Password">
              </div>
              <div class="form-group">
                <label for="exampleSelectGender">Gender</label>
                <select class="form-control" id="exampleSelectGender">
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div class="form-group">
                <label>File upload</label>
                <input type="file" name="img[]" class="file-upload-default">
                <div class="input-group col-xs-12">
                  <input type="text" class="form-control file-upload-info" disabled placeholder="Upload Image">
                  <span class="input-group-append">
                    <button class="file-upload-browse btn btn-gradient-primary" type="button">Upload</button>
                  </span>
                </div>
              </div>
              <div class="form-group">
                <label for="exampleInputCity1">City</label>
                <input type="text" class="form-control" id="exampleInputCity1" placeholder="Location">
              </div>
              <div class="form-group">
                <label for="exampleTextarea1">Textarea</label>
                <textarea class="form-control" id="exampleTextarea1" rows="4"></textarea>
              </div>
              <button type="submit" class="btn btn-gradient-primary mr-2">Submit</button>
              <button class="btn btn-light">Cancel</button>
            </form>
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
        abouts: [],
        about: {
          uid: '',
          content: ''
        }
      }
    },
    name: 'AboutForm',
    created () {
      this.fetchAbout()
    },
    methods: {
      fetchAbout (url) {
        url = url || 'https://api.pucomputing.org/api/abouts'
        fetch(url
        // {
        //   headers: new Headers({
        //     'Authorization': 'Bearer' +
        //       'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL3B1bWEtYmFja2VuZFwvcHVibGljXC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNTMwNzY2NDYzLCJleHAiOjE1MzA3NzAwNjMsIm5iZiI6MTUzMDc2NjQ2MywianRpIjoiWHlSU2p3SUx0WFo5SHNoSCIsInN1YiI6MSwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.x14hrlPcG7O9KWkM1c0N46us9ZJBbicUBpKZyZVqoCU'
        //   })
        // }
        ).then(res => res.json())
        .then(res => {
          console.log(res.data)
          this.abouts = res.data
          this.about.uid = res.data.uid
          this.about.content = res.data.content
        })
        .catch(err => console.log(err))
      },}
  }
</script>