<template>
    <div class="animated fadeIn">
        <div class="card">
            <div class="card-body">
                <table class="table table-striped table-bordered table-hover">

                    <thead>
                        <tr>
                            <th @click="sort('DebCode')" class="text-center">Nomor Mitra Binaan</th>
                            <th @click="sort('FullName')" class="text-center">Nama Lengkap</th>
                            <th @click="sort('IDNumber')" class="text-center">Nomor KTP</th>
                            <th @click="sort('PlaceofBirth')" class="text-center">Tempat Lahir</th>
                            <th class="text-center">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        <!--<template v-for="(data, index) in filterData" v-bind:value="index">-->
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td class="text-center">
                                    <button type="button" class="btn btn-primary" @click="">
                                        <i class="fa fa-eye"></i>
                                    </button>
                                    <button type="button" v-b-modal.modal-1 class="btn btn-success" @click="">
                                        <i class="fa fa-pencil "></i>
                                    </button>
                                    <button type="button" class="btn btn-danger" @click="">
                                        <i class="fa fa-trash"></i>
                                    </button>

                                </td>

                            </tr>
                            <!--<tr v-if="opened.includes(data.DebCode)">
                                <td colspan="5">
                                    <b-card>

                                        <b-row class="mb-4">
                                            <b-col sm="3" class="text-sm-right"><b>Tanggal Lahir:</b></b-col>
                                            <b-col>{{ data.DateofBirth | formatDate}}</b-col>
                                        </b-row>

                                        <b-row class="mb-4">
                                            <b-col sm="3" class="text-sm-right"><b>Jenis Kelamin:</b></b-col>
                                            <b-col v-if="data.Gender === true">Laki-Laki</b-col>
                                            <b-col v-else>Perempuan</b-col>
                                        </b-row>

                                        <b-row class="mb-4">
                                            <b-col sm="3" class="text-sm-right"><b>Alamat:</b></b-col>
                                            <b-col>{{ data.Address }}</b-col>
                                        </b-row>

                                        <b-row class="mb-4">
                                            <b-col sm="3" class="text-sm-right"><b>Provinsi:</b></b-col>
                                            <b-col>{{ data.Prov_code }}</b-col>
                                        </b-row>

                                        <b-row class="mb-4">
                                            <b-col sm="3" class="text-sm-right"><b>Kota / Kabupaten:</b></b-col>
                                            <b-col>{{ data.Dist_code }}</b-col>
                                        </b-row>

                                        <b-row class="mb-4">
                                            <b-col sm="3" class="text-sm-right"><b>Kecamatan:</b></b-col>
                                            <b-col>{{ data.Subdis_code }}</b-col>
                                        </b-row>

                                        <b-row class="mb-4">
                                            <b-col sm="3" class="text-sm-right"><b>Status Kepemilikan rumah:</b></b-col>
                                            <b-col>{{ data.HomeOwnStatus }}</b-col>
                                        </b-row>
                                        <b-row class="mb-4">
                                            <b-col sm="3" class="text-sm-right"><b>Nomor Telepon / Hp:</b></b-col>
                                            <b-col>{{ data.Phone }}</b-col>
                                        </b-row>
                                        <b-row class="mb-4">
                                            <b-col sm="3" class="text-sm-right"><b>e-mail:</b></b-col>
                                            <b-col>{{ data.eMail }}</b-col>
                                        </b-row>
                                        <b-row class="mb-4">
                                            <b-col sm="3" class="text-sm-right"><b>Status Pernikahan:</b></b-col>
                                            <b-col>{{ data.MaritalStatus }}</b-col>
                                        </b-row>

                                        <b-row class="mb-4">

                                            <b-col sm="3" class="text-sm-right" v-if="data.Gender === true"><b>Nama Istri:</b></b-col>
                                            <b-col v-if="data.Gender === true">{{ data.SpouseName }}</b-col>
                                            <b-col sm="3" class="text-sm-right" v-if="data.Gender === false"><b>Nama Suami:</b></b-col>
                                            <b-col v-if="data.Gender === false">{{ data.SpouseName }}</b-col>



                                        </b-row>
                                        <b-row class="mb-4">
                                            <b-col sm="3" class="text-sm-right"><b>Nama asli ibu kandung:</b></b-col>
                                            <b-col>{{ data.MotherName }}</b-col>
                                        </b-row>
                                    </b-card>
                                </td>

                            </tr>-->
                        <!--</template>-->
                    </tbody>

                </table>
                

            </div>
            </div>
        </div>
</template>

<script>
    import apiDebitor from '@/api/PK/DebitorApiService';
    import vSelect from '../../../node_modules/vue-select/dist/vue-select'
    import '../../../node_modules/vue-select/dist/vue-select.css';
    import "../../../node_modules/vue-select/src/scss/vue-select.scss";
    import moment from '../../../node_modules/moment/moment'
    export default {
        name: '',
        components: { 'v-select': vSelect,},
        data() {
            return {
                dataDebitor: {},
                test: {},
                coba2: [],
                active: false,
                options: [],
                f: {},
                items: [
                    { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
                    { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
                    { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
                    { age: 38, first_name: 'Jami', last_name: 'Carney' }
                ],
           
            };
        },
        async created() {
            moment.locale('id');
            this.getAll()
            

        },
        methods: {
            async getAll() {
                var c = await apiDebitor.getAll()
                //console.log(c);
                
                this.loading = true
                this.options = [];
                for (var i = 0; i < c.length; i++) {
                    
                    this.options.push({ code: c[i].DebCode, name : c[i].FullName });
                    
                }
                console.log(this.options);
                try {
                    this.dataDebitor = await apiDebitor.getAll()

                    //this.itemsArray = () => this.items

                } finally {
                    this.loading = false
                }
            },
            coba() {
                var getDateNow = [];
                var angsuranPokok,angsuranBunga,totalAngsuran,sisa, perRow = 0;
                this.active = true
                
                    this.coba2 = [];
                
                //this.test
                console.log(this.f.Test1);
                for (var i = 1; i <= this.test.Tenor; i++) {
                    //moment.locale('id');
                    getDateNow = moment().add(i, 'M').format('MMMM YYYY')
                    console.log(getDateNow);
                    angsuranBunga = this.test.nilai * 6 / 100 / this.test.Tenor
                    angsuranPokok = this.test.nilai / this.test.Tenor
                    totalAngsuran = angsuranBunga + angsuranPokok
                    sisa = this.test.nilai
                    perRow = sisa - (i * angsuranPokok)
                    console.log(angsuranBunga)
                    this.coba2.push({ test: getDateNow, ne: angsuranPokok, bunga: angsuranBunga, total: totalAngsuran, sisa: perRow})
                }
                console.log(this.coba2);
                
            },
            //angsuranPokok() {

            //}
        }

    }


</script>

<style scoped>
    @import '../../assets/css/TabsCenter.css';
</style>
