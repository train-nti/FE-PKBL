<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Journal Records</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
          <tr>
            <th>Journal Number</th>
            <th>JournalDate</th>
            <th>Description</th>
            <th>Journal Type</th>
            <th>&nbsp;</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="record in records" :key="record.Jrn_ID">
            <td>{{ record.JournalNumber }}</td>
            <td>{{ record.JournalDate }}</td>
            <td>{{ record.Description }}</td>
            <td>{{ record.JournalType }}</td>
            <td class="text-right">
              <a href="#" @click.prevent="updateFoodRecord(record)">Edit</a> -
              <a href="#" @click.prevent="deleteFoodRecord(record.Jrn_ID)">Delete</a>
            </td>
          </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.Jrn_ID ? 'Edit Journal ' + model.JournalNumber : 'New Journal Record')">
          <form @submit.prevent="createFoodRecord">
            <b-form-group label="Jurnal Number">
              <b-form-input type="text" v-model="model.JournalNumber"></b-form-input>
            </b-form-group>
            <b-form-group label="Journal Date">
              <b-form-input rows="4" v-model="model.JournalDate" type="datetime-local"></b-form-input>
            </b-form-group>
            <b-form-group label="Description">
              <b-form-input rows="4" v-model="model.Description"></b-form-input>
            </b-form-group>
            <b-form-group label="Journal Type">
              <b-form-input rows="4" v-model="model.JournalType" type="Number"></b-form-input>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save Record</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import api from '@/FoodRecordsApiService';

  export default {
    data() {
      return {
        loading: false,
        records: [],
        model: {}
      };
    },
    async created() {
      this.getAll()
    },
    methods: {
      async getAll() {
        this.loading = true

        try {
          this.records = await api.getAll()
        } finally {
          this.loading = false
        }
      },
      async updateFoodRecord(foodRecord) {
        // We use Object.assign() to create a new (separate) instance
        this.model = Object.assign({}, foodRecord)
      },
      async createFoodRecord() {
        const isUpdate = !!this.model.Jrn_ID;

        if (isUpdate) {
          await api.update(this.model.Jrn_ID, this.model)
        } else {
          await api.create(this.model)
        }

        // Clear the data inside of the form
        this.model = {}

        // Fetch all records again to have latest data
        await this.getAll()
      },
      async deleteFoodRecord(id) {
        if (confirm('Are you sure you want to delete this record?')) {
          // if we are editing a food record we deleted, remove it from the form
          if (this.model.Jrn_ID === id) {
            this.model = {}
          }

          await api.delete(id)
          await this.getAll()
        }
      }
    }
  }
</script>
