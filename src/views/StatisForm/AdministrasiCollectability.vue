<template>
<div class="">
  <div class="card">
    <div class="card-body">
    	 <b-button class="mt-3" variant="primary" block @click="showModal">Closing Kolektabilitas</b-button>
		<b-modal ref="my-modal" hide-footer title="Tanggal Closing" v-if="Confiq.Value == 0">
	      <div class="d-block text-center">
	      	<date-picker  style="width: 100%;" v-model="Administrasi.ClosingDate" :input-attr="{ required: true }" valueType="YYYY-MM-DD" format="DD/MMM/YYYY" lang="id"></date-picker>
	        <!-- <input type="date"  v-model="Administrasi.ClosingDate" value="Administrasi" class="form-control" id="" placeholder=""> -->
	      </div>
	      <div class="d-block text-center">
	      	<b-form-select  v-model="Administrasi.Month" :options="options_Month" required></b-form-select>
	      </div>
	      <div class="d-block text-center">
	      	<b-form-select  v-model="Administrasi.Year" :options="options_Year" required></b-form-select>
	      </div>
	      <b-button class="mt-2" variant="success" block @click="simpanData">Simpan</b-button>
	    </b-modal>
	    <b-modal ref="my-modal" hide-footer title="Persentase Progress" v-if="Confiq.Value != 0">
	      <div class="d-block text-center">
	      	 <b-progress :max="max">
		      <b-progress-bar :value="Number(Confiq.Value)" :label="`${((Number(Confiq.Value) / max) * 100).toFixed(0)}%`"></b-progress-bar>
		    </b-progress>
	      </div>
	    </b-modal>
    </div>
</div>
</div>
</template>
<script>
	  import moment from 'moment';
import apiConfiq from '@/api/PK/ConfiqApiService';
import apiRunnable from '@/api/PK/RunnableApiService';
export default {
  	data() { 
	    return { 
	    	max: 100,
	    	Administrasi:{
	    		Month:"",
	    		Year:""
	    	},
	    	options_Month:[],
	    	options_Year:[],
	    	Confiq:{
	    		Value: 0
	    	}
	    }
	},
	async created() {
		this.options_Month = [{text:"--- Pilih Bulan ---",value:""}]
		for (var i = 1; i <= 12; i++) {
			this.options_Month.push(i)
		}
		this.options_Year = [{text:"--- Pilih Tahun ---",value:""}]
		for (var i = 1945; i <= 2110; i++) {
			this.options_Year.push(i)
		}
	},
	async mounted() {
			this.showConfiq()
		  this.showModal();
		},
	  methods: {
		  showModal() {
		  	 this.showConfiq()
		    this.$refs['my-modal'].show()
		  },
		  hideModal() {
		    this.$refs['my-modal'].hide()
		  },
		 async simpanData(){
		  	this.Confiq.Value = Number(this.Confiq.Value) + 1
		  	var ubahConfiq = await apiConfiq.update("POSTING_COLLECTIBILITY",this.Confiq)
		  	// var ubahClosingMonthly = await apiRunnable.getSPClosingMonthly(this.Administrasi.ClosingDate,this.Administrasi.Month,this.Administrasi.Year)
		  	var ubahSPClosingCollectability = await apiRunnable.getSPClosingCollectability(this.Administrasi.ClosingDate,this.Administrasi.Month,this.Administrasi.Year)
		  	console.log("DATA",this.Administrasi)
		  	// console.log("UbahClosing",ubahClosingMonthly)
		  	console.log("UbahClosing",ubahSPClosingCollectability)
		  	this.hideModal()
		  	 this.showConfiq()
		  	 this.bersihData()
		  },
		 async showConfiq(){
		  	var dataConfiq = await apiConfiq.getByCode("POSTING_COLLECTIBILITY")
			this.Confiq = dataConfiq.Data[0]
			console.log(dataConfiq)
		  },
		  bersihData(){
		  	this.Administrasi.ClosingDate = ""
		  	this.Administrasi.Month = ""
		  	this.Administrasi.Year = ""
		  }
		},
}
</script>
