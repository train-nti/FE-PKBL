<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <strong>Organization Template : Head Office</strong> <small>Form</small>
          </div>
          <b-row>
            <b-col sm="12">
                <b-form-group>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Level</th>
                                <th scope="col">Name of organization</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>0</td>
                                <th scope="row"><a href="Board of Director">Board of Director</a></th>
                                <th scope="row"><a href="Product Division">delete</a></th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <th scope="row"><a href="Directory of Commerce">Directory of Commerce</a></th>
                                <th scope="row"><a href="Product Division">delete</a></th>
                            </tr>
                            <tr>
                                <td>2</td>
                                <th scope="row"><a href="Product Division">Product Division</a></th>
                                <th scope="row"><a href="Product Division">delete</a></th>
                            </tr>
                        </tbody>
                    </table>
                    <button type="button" class="btn btn-outline-primary">Save Changes</button>
                </b-form-group>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'document',
  data () {
    return {
      selected: [], // Must be an array reference!
      show: true
    }
  },
  methods: {
    click () {
      // do nothing
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
