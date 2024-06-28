<template>
    <div class="animated fadeIn">
        <div class="card">
            <div class="card-body">

                <b-row>
                    <b-col md="4"><b-button @click="showModal" variant="primary">Add Customer</b-button></b-col>
                    <b-col md="4" offset-md="4">
                        <div class="input-group">
                            <input placeholder="Filter by Name" icon="search" v-model="filter">
                            <span class="input-group-btn">
                                <button class="btn btn-outline-success bg-success" type="submit" style="height:35px"><i class="fa fa-search"></i></button>
                            </span>
                        </div>
                    </b-col>

                </b-row>

                <!-- Modal EmergContact -->
                <b-modal id="modal-2" ref="modal-2" hide-footer title="Kontak" ok-only>

                    <b-card>

                        <div class="form-group row">
                            <label for="inputPassword" class="col-sm-2 col-form-label">Nama</label>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" id="" placeholder="" v-model="emerg.Name">
                            </div>

                        </div>
                        <div class="form-group row">
                            <label for="inputPassword" class="col-sm-2 col-form-label">Hubungan</label>
                            <div class="col-sm-6">
                              <b-form-radio-group id="basicInlineRadios"

                                :options="[
                                  {text: 'Teman',value: 'a'},
                                  {text: 'Keluarga',value: 'b'},
                                  {text: 'Saudara',value: 'c'}
                                ]"
                                :checked="a">
                              </b-form-radio-group>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputPassword" class="col-sm-2 col-form-label">Alamat</label>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" id="" placeholder="Blok AA No 10" v-model="emerg.Address">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputPassword" class="col-sm-2 col-form-label">Kota</label>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" id="" placeholder="Jakarta" v-model="emerg.City">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputPassword" class="col-sm-2 col-form-label">No Telepon</label>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" id="" placeholder="081xxxxxxx" v-model="emerg.Phone">
                            </div>
                        </div>
                    </b-card>
                    <div class="modal-footer">
                        <b-button type="submit" size="md" variant="success" v-on:click="saveOrUpdateEmergContact()">Save</b-button>
                        <b-button type="submit" size="md" variant="danger" v-on:click="hideModalEmerg">Close</b-button>


                    </div>

                </b-modal>
                <!-- Modal Attached -->
                <b-modal id="modal-3" ref="modal-3" hide-footer title="Dokumen" ok-only>

                    <b-card>

                        <div class="form-group row">
                            <label for="inputPassword" class="col-sm-2 col-form-label">Judul</label>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" id="" placeholder="" v-model="attached.Tittle">

                            </div>

                        </div>
                        <div class="form-group row">
                            <label for="inputPassword" class="col-sm-2 col-form-label">Nama File</label>
                            <div class="col-sm-6">

                                <b-form-file @change="onFileChange"
                                             id="file"
                                             placeholder="Choose a file..."
                                             drop-placeholder="Drop file here...">
                                </b-form-file>
                            </div>
                        </div>

                    </b-card>
                    <div class="modal-footer">
                        <b-button type="submit" size="md" variant="success" v-on:click="saveOrUpdateAttached()">Save</b-button>
                        <b-button type="submit" size="md" variant="danger" >Close</b-button>


                    </div>

                </b-modal>
                <p></p>

                <!-- Modal Component -->
                <b-modal ref="modal-1" id="modal-1" title="Customer" size="xl" hide-footer ok-only>
                    <b-tabs class="full-widths" v-model="tabIndex[0]">
                        <!--Customers Data-->
                        <b-tab active>
                            <template slot="title">
                                <i class="icon-calculator"></i> {{tabs[0]}}
                            </template>
                            <br>
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Nomor Mitra Binaan</label>
                                <div class="col-sm-6" v-if="setActive">
                                    <input disabled type="text" class="form-control" id="" placeholder="example" v-model="customers.DebCode">
                                </div>
                                <div class="col-sm-6" v-else="setActive">
                                    <input type="text" class="form-control" id="" placeholder="" v-model="customers.DebCode">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Nomor KTP</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" id="" placeholder="" v-model="customers.IDNumber">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Nama Lengkap</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" id="" placeholder="" v-model="customers.FullName">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Tempat(Lahir)</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" id="" placeholder="Tangerang" v-model="customers.PlaceofBirth">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Tanggal Lahir</label>
                                <div class="col-sm-6">
                                    <input type="date" class="form-control" id="" placeholder="Masukan Tanggal lahir" v-model="customers.DateofBirth">

                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Jenis Kelamin</label>
                                <div class="col-sm-6">
                                    <b-form-radio-group :options="radioGender" v-model="customers.Gender" />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Alamat</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" id="" placeholder="Blok AA No 10" v-model="customers.Address">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Provinsi</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" id="" placeholder="" v-model="customers.Prov_code">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Kota / Kabupaten</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" id="" placeholder="" v-model="customers.Dist_code">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Kecamatan</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" id="" placeholder="" v-model="customers.Subdis_code">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Status Kepemilikan rumah</label>
                                <div class="col-sm-6">
                                    <b-form-radio-group v-model="customers.HomeOwnStatus" :options="homeOwnStatus" />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Nomor Telepon / Hp</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" id="" placeholder="081xxxxxxx" v-model="customers.Phone">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">e-mail</label>
                                <div class="col-sm-6">
                                    <input type="email" class="form-control" id="" placeholder="xxxxx@gmail.com" v-model="customers.eMail">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Status Pernikahan</label>
                                <div class="col-sm-6">
                                    <b-form-radio-group :options="maritalStatus" v-model="customers.MaritalStatus"></b-form-radio-group>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Nama Istri / Suami (jika sudah menikah)</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" id="" placeholder="" v-model="customers.SpouseName">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Nama asli ibu kandung/angkat</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" id="" placeholder="" v-model="customers.MotherName">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword" class="col-sm-2 col-form-label"></label>
                                <div class="col-sm-6">

                                    <b-button type="submit" size="md" variant="success" v-on:click="saveOrUpdateCustomer()">Save</b-button>
                                </div>
                            </div>

                        </b-tab>
                        <!--Customers EmergContact-->
                        <b-tab>
                            <template slot="title">
                                <i class="icon-basket-loaded"></i> {{tabs[1]}}
                            </template>
                            <p>Nama-nama keluarga atau relasi yang dapat dihubungi pada situasi darurat</p>
                            <b-button v-b-modal.modal-2 @click="showModalEmerg" variant="primary">Add </b-button>

                            <p></p>
                            <table class="table table-striped table-bordered table-hover">

                                <thead>
                                    <tr>
                                        <th class="text-center">Nama</th>
                                        <th class="text-center">Hubungan</th>
                                        <th class="text-center">Alamat</th>
                                        <th class="text-center">Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(data, index) in EmergItems">
                                        <tr>
                                            <td>{{data.Name}}</td>
                                            <td>{{data.Relation}}</td>
                                            <td>{{data.Address}}</td>

                                            <td class="text-center">
                                                <button type="button" class="btn btn-primary" @click="showEmerg(data.Id)">
                                                    <i class="fa fa-eye"></i>
                                                </button>
                                                <button type="button" v-b-modal.modal-2 class="btn btn-success" @click="editEmerg(data.Id)">
                                                    <i class="fa fa-pencil "></i>
                                                </button>
                                                <button type="button" class="btn btn-danger" @click="deleteEmerg(data.Id)">
                                                    <i class="fa fa-trash"></i>
                                                </button>

                                            </td>

                                        </tr>
                                        <!--Show Data Emerg per Row-->
                                        <tr v-if="openedEmerg.includes(data.Id)">
                                            <td colspan="4">
                                                <b-card>

                                                    <b-row class="mb-4">
                                                        <b-col sm="3" class="text-sm-right"><b>Kota:</b></b-col>
                                                        <b-col>{{ data.City}}</b-col>
                                                    </b-row>

                                                    <b-row class="mb-4">
                                                        <b-col sm="3" class="text-sm-right"><b>No Telepon:</b></b-col>
                                                        <b-col>{{ data.Phone}}</b-col>
                                                    </b-row>


                                                </b-card>
                                            </td>

                                        </tr>
                                    </template>
                                </tbody>

                            </table>

                        </b-tab>
                        <!-- Customers Document-->
                        <b-tab>
                            <template slot="title">
                                <i class="icon-pie-chart"></i> {{tabs[2]}}
                            </template>
                            <br>
                            <b-button v-b-modal.modal-3 @click="showModalAttached" variant="primary">Add </b-button>

                            <p></p>
                            <table class="table table-striped table-bordered table-hover">

                                <thead>
                                    <tr>
                                        <th class="text-center">Tittle</th>
                                        <th class="text-center">FileName</th>
                                        <th class="text-center">Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(data, index) in AttachedItems">
                                        <tr>
                                            <td>{{data.Tittle}}</td>
                                            <td>{{data.Filename}}</td>


                                            <td class="text-center">
                                                <button type="button" class="btn btn-primary" @click="showEmerg(data.Id)">
                                                    <i class="fa fa-eye"></i>
                                                </button>
                                                <button type="button" v-b-modal.modal-2 class="btn btn-success" @click="editEmerg(data.Id)">
                                                    <i class="fa fa-pencil "></i>
                                                </button>
                                                <button type="button" class="btn btn-danger" @click="deleteEmerg(data.Id)">
                                                    <i class="fa fa-trash"></i>
                                                </button>

                                            </td>

                                        </tr>

                                    </template>
                                </tbody>

                            </table>
                        </b-tab>
                        <!--Customers Bussines-->
                        <b-tab>
                            <template slot="title">
                                <i class="icon-pie-chart"></i> {{tabs[3]}}
                            </template>

                        </b-tab>
                    </b-tabs>
                    <div class="modal-footer">
                        <b-button type="submit" size="md" variant="primary" v-on:click="">Load BPM</b-button>
                    </div>
                </b-modal>



                <!-- Table Customers -->
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
                        <template v-for="(data, index) in filterData" v-bind:value="index">
                            <tr>
                                <td>{{ data.DebCode }}</td>
                                <td>{{ data.FullName }}</td>
                                <td>{{ data.IDNumber }}</td>
                                <td>{{ data.PlaceofBirth }}</td>
                                <td class="text-center">
                                    <button type="button" class="btn btn-primary" @click="toggle(data.DebCode)">
                                        <i class="fa fa-eye"></i>
                                    </button>
                                    <button type="button" v-b-modal.modal-1 class="btn btn-success" @click="editCustomer(data.DebCode)">
                                        <i class="fa fa-pencil "></i>
                                    </button>
                                    <button type="button" class="btn btn-danger" @click="deleteCustomer(data.DebCode)">
                                        <i class="fa fa-trash"></i>
                                    </button>

                                </td>

                            </tr>
                            <!--Show Data Customer per Row-->
                            <tr v-if="opened.includes(data.DebCode)">
                                <td colspan="5">
                                    <b-card>

                                        <b-row class="mb-4">
                                            <b-col sm="3" class="text-sm-right"><b>Tanggal Lahir:</b></b-col>
                                            <b-col>{{ data.DateofBirth | formatDate}}</b-col>
                                        </b-row>

                                        <b-row class="mb-4">
                                            <b-col sm="3" class="text-sm-right"><b>Jenis Kelamin:</b></b-col>
                                            <b-col v-if="data.Gender = ">Laki-Laki</b-col>
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

                                            <b-col sm="3" class="text-sm-right" v-if="data.Gender = "><b>Nama Istri:</b></b-col>
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

                            </tr>
                        </template>
                    </tbody>

                </table>


                <!-- Pagination -->
                <b-button @click="prevPage" variant="primary">Previous</b-button>
                <b-button disabled variant="outline-primary">{{currentPage}}</b-button>
                <b-button @click="nextPage" variant="primary">Next</b-button>


            </div>
        </div>

    </div>
</template>

<script>

    import apiDebitor from '@/api/PK/DebitorApiService';
    import apiEmerg from '@/api/PK/EmergApiService';
    import apiAttached from '@/api/PK/AttachedApiService'
    import Swal from '../../../../node_modules/sweetalert2/dist/sweetalert2'
    import BPagination from '../../../../node_modules/bootstrap-vue/es/components/pagination/pagination'
    import moment from '../../../../node_modules/moment/moment'
    import '../../../../node_modules/sweetalert2/src/sweetalert2.scss'

    export default {
        name: '',
        components: {
            'b-pagination': BPagination,},
        data() {
            return {
                files: '',
                filter: '',
                id: null,
                idEmerg:null,
                CustomersItems: [],
                EmergItems: [],
                AttachedItems:[],
                paginateLength: null,
                setActive: false,
                //setAddEmerg: false,
                search:"",
                opened: [],
                openedEmerg: [],
                customers: {},
                emerg: {},
                attached: {},
                tabIndex: [0, 0],
                tabs: [
                    'Data Pribadi',
                    'Kontak Darurat',
                    'Dok. Identitas',
                    'Data Usaha'
                ],
                currentSort: 'DebCode',
                currentSortDir: 'asc',
                pageSize: 10,
                currentPage: 1,
                bordered: true,

                radioGender: [
                    { text: 'Laki-laki', value: 'true' },
                    { text: 'Perempuan', value: 'false' },
                ],

                homeOwnStatus: [
                    { text: 'Sendiri ', value: '1' },
                    { text: 'Keluarga ', value: '2' },
                    { text: 'Sewa ', value: '3' }
                ],
                maritalStatus: [
                    { text: 'Belum Menikah ', value: '1' },
                    { text: 'Nikah ', value: '2' },
                    { text: 'Janda / Duda ', value: '3' }
                ],
                selectedAddress: '1',
                optionsAddress: [
                    { text: 'Sama dengan rumah', value: '1' },
                ],
            };
        },

        async created() {
            this.getAll()

        },
        methods: {
            async getAll() {

                this.loading = true

                try {
                    var debitorData = await apiDebitor.getAll()
                    this.CustomersItems = debitorData.Data
                    //var emergData = await apiEmerg.getAll()

                    //console.log("ini", debitorData.Data)



                } finally {
                    this.loading = false
                }
            },
            //Modal
            showModal() {
                this.$refs['modal-1'].show();
                this.setActive = false;
                this.customers = {};
                this.emerg = {};
                this.EmergItems = {};
                this.id = null;

            },
            showModalEmerg() {

                this.$refs['modal-2'].show();
                this.emerg = {};
                //this.setAddEmerg = true;
                this.idEmerg = null;


            },
            showModalAttached() {

                this.$refs['modal-3'].show();
                //this.emerg = {};
                //this.setAddEmerg = true;
               // this.idEmerg = null;


            },
            hideModal() {
                this.$refs['modal-1'].hide()
                this.setActive = false;

            },
            hideModalEmerg() {
                this.$refs['modal-2'].hide()
                //console.log("yo baka")
               //this.setActive = false;

            },
            async saveOrUpdateEmergContact() {


                var result
                const isUpdate = !!this.idEmerg

                this.emerg.DebCode = this.customers.DebCode
                if (isUpdate) {
                    result = await apiEmerg.update(this.idEmerg, this.emerg)
                } else {
                    result = await apiEmerg.create(this.emerg)
                }

                var dataEmerg = await ap.getByCode(this.customers.DebCode);
                this.EmergItems = dataEmerg.Data

                if (result.Status) {

                    this.alertSuccess();
                } else {
                    this.alertFail();
                }

                //this.getAll()

            },
            async saveOrUpdateAttached() {
                var file = this.files
                var formData = new FormData();
                formData.append('DebCode', this.customers.DebCode);
                formData.append('FileName', file.name);
                formData.append('FileExtension', file.type);
                formData.append('FileContent', file);

                for (var pair of formData.entries()) {
                    console.log(pair[0] + ', ' + pair[1]);
                }

                this.attached.DebCode = this.customers.DebCode
                this.attached.FileName = file.name
                this.attached.FileExtension = file.type
                this.attached.FileContent = file
                this.attached.FileExtension = file.type
                var data = await apiAttached.create(formData)
                console.log("data", data )
                //this.getAll()

            },
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;

                if (!files.length)
                    return;
                this.files = files[0];

            },

            formatDate(value) {
                return moment(String(value)).format('YYYY-MM-DD')
            },
            nextPage: function () {
                if ((this.currentPage * this.pageSize) < this.CustomersItems.length) this.currentPage++;
            },
            prevPage: function () {
                if (this.currentPage > 1) this.currentPage--;
            },
            sort: function (s) {
                //if s == current sort, reverse
                if (s === this.currentSort) {
                    this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
                }
                this.currentSort = s;
            },
            toggle(id) {

                const index = this.opened.indexOf(id);
                //console.log(index);
                if (index > -1) {
                    this.opened.splice(index, 1)
                } else {
                    this.opened.push(id)
                }
            },
            showEmerg(id) {

                const index = this.openedEmerg.indexOf(id);
                console.log(id, " test ", index)
                //console.log(index);
                if (index > -1) {
                    this.openedEmerg.splice(index, 1)
                } else {
                    this.openedEmerg.push(id)
                }
            },
            async editCustomer(id) {

                this.setActive = true;
                this.emerg = {}
                var data = await apiDebitor.getOne(id);
                var dataEmerg = await apiEmerg.getByCode(id);
                this.EmergItems = dataEmerg.Data
                var dataAttached = await apiAttached.getAll();

               console.log("data ",dataAttached.Data.FileName)
                this.id = data.Data[0].DebCode;
                this.customers = data.Data[0]
                this.customers.DateofBirth = this.formatDate(this.customers.DateofBirth)

            },
            async editEmerg(id) {

                //this.setAddEmerg = false;
                //this.emerg = {}
                //var data = await apiDebitor.getOne(id);
                var dataEmerg = await apiEmerg.getOne(id);

                this.idEmerg = dataEmerg.Data[0].Id;
                this.emerg = dataEmerg.Data[0]
                //this.EmergItems = dataEmerg.Data
                console.log("test", this.idEmerg)
                //this.id = data.Data[0].DebCode;
                //this.customers = data.Data[0]
                //this.customers.DateofBirth = this.formatDate(this.customers.DateofBirth)

            },
            async deleteCustomer(id) {
                try {
                    let result = await Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    });
                    //console.log("result", result.value)
                    if (result.value) {

                        //data = await apiDebitor.delete(id);
                        //console.log("test", data )
                        //this.getAll()
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        await apiDebitor.delete(id);
                        this.getAll()

                    }
                }
                catch (e) {

                }

            },
            async deleteEmerg(id) {
                try {
                    let result = await Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    });
                    //console.log("result", result.value)
                    if (result.value) {

                        //data = await apiDebitor.delete(id);
                        //console.log("test", data )
                        //this.getAll()
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        await apiEmerg.delete(id);
                        var dataEmerg = await apiEmerg.getByCode(this.customers.DebCode);
                        this.EmergItems = dataEmerg.Data

                    }
                }
                catch (e) {

                }

            },
            alertSuccess() {
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Do you want to continue',
                    type: 'success',
                    showConfirmButton: true,

                    confirmButtonText: 'Ok',

                })
            },

            alertFail() {
                Swal.fire({
                    title: 'Gagal!',
                    text: 'Do you want to continue',
                    type: 'error',
                    showConfirmButton: true,

                    confirmButtonText: 'Ok',

                })
            },
            async saveOrUpdateCustomer() {

                var result
                const isUpdate = !!this.id


                if (isUpdate) {
                    result = await apiDebitor.update(this.id, this.customers)
                } else {
                    result = await apiDebitor.create(this.customers)

                }


                if (result.Status) {
                   // this.id = this.customers.DebCode
                    this.alertSuccess();
                } else {
                    this.alertFail();
                }
                //console.log(this.id)
                this.getAll()
            }

        },
        computed: {
            filterData: function () {
                return this.CustomersItems.sort((a, b) => {
                    let modifier = 1;
                    if (this.currentSortDir === 'desc') modifier = -1;
                    if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                    if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                    return 0;
                }).filter((row, index) => {
                    let start = (this.currentPage - 1) * this.pageSize;
                    let end = this.currentPage * this.pageSize;
                    if (index >= start && index < end) return true;
                    }).filter((item) => {

                       // console.log(item)
                        return item.FullName.toLowerCase().includes(this.filter.toLowerCase());

                    //var search = this.search;
                    //if (!search) {
                    //    return data;
                    //}

                    //search = search.trim().toLowerCase();
                });
            }
        }
    }
</script>

<style scoped>

    @import '../../../assets/css/TabsCenter.css';

</style>
