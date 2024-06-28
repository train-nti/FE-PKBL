<template>
<div class="">
  <div class="card">
    <div class="card-body">
    	 <b-button class="mt-3" variant="primary" block @click="showModal">Closing Kolekbilitas</b-button>
		<b-modal ref="my-modal" hide-footer title="Tanggal Closing" v-if="Confiq.Value == 0">
	      <div class="d-block text-center">
	        <input type="date"  v-model="Administrasi" value="Administrasi" class="form-control" id="" placeholder="">
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
import apiConfiq from '@/api/PK/ConfiqApiService';
import apiRunnable from '@/api/PK/RunnableApiService';
export default {
  	data() {
	    return {
	    	max: 100,
	    	Administrasi:null,
	    	Confiq:{
	    		Value: 0
	    	}
	    }
	},
	async created() {
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
		  	var ubahClosingCollectibility = await apiRunnable.getClosingCollectibility(this.Administrasi)
		  	console.log("UbahClosing",ubahClosingCollectibility)
		  	this.hideModal()
		  	 this.showConfiq()
		  },
		 async showConfiq(){
		  	var dataConfiq = await apiConfiq.getByCode("POSTING_COLLECTIBILITY")
			this.Confiq = dataConfiq.Data[0]
			console.log(dataConfiq)
		  }
		},
}
</script>