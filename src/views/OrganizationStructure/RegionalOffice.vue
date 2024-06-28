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
                                <b-tabs class="full-width" v-model="tabIndex[0]">
                                    <b-tab active>
                                        <template slot="title">
                                            <i class="icon-calculator"></i> {{tabs[0]}}
                                        </template>
                                        <h1>Regional Office</h1>
                                        <br>
                                        <b-table show-empty
                                                 stacked="md"
                                                 :items="Unit"
                                                 :bordered="bordered"
                                                 :fields="fields"
                                                 :current-page="currentPage"
                                                 :per-page="perPage">
                                            <template slot="action" slot-scope="data">
                                                <!-- <b-button @click="removeRow(data.item.index);">Remove</b-button>-->
                                                <b-button variant="danger" class="fa fa-close"></b-button>
                                            </template>
                                        </b-table>
                                        <b-button variant="primary">Save</b-button>
                                        <b-row>
                                            <b-col md="6" class="my-1">
                                                <b-pagination :total-rows="totalRows"
                                                              :per-page="perPage"
                                                              v-model="currentPage"
                                                              class="my-0" />
                                            </b-col>
                                        </b-row>
                                    </b-tab>
                                    <b-tab>

                                        <template slot="title">
                                            <i class="icon-basket-loaded"></i> {{tabs[1]}}
                                        </template>
                                        <br>
                                        <table class="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Code</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">address</th>
                                                    <th scope="col">Phone</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row"><a href="#">SUMBU</a></th>
                                                    <td>Sumatera Bagian Utara</td>
                                                    <td>JL Merdeka 121 Medan</td>
                                                    <td>0897233322</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"><a href="#">SUMBS</a></th>
                                                    <td>Sumatera Bagian Selatan</td>
                                                    <td>JL Musi Raya 213 Palembang</td>
                                                    <td>0897330003</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"><a href="#">JKK</a></th>
                                                    <td>Jakarta Jabar Banten</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"><a href="#">SUMBU</a></th>
                                                    <td>Sumatera Bagian Utara</td>
                                                    <td>JL Merdeka 121 Medan</td>
                                                    <td>0897233322</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"><a href="#">SUMBU</a></th>
                                                    <td>Sumatera Bagian Utara</td>
                                                    <td>JL Merdeka 121 Medan</td>
                                                    <td>0897233322</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </b-tab>
                                </b-tabs>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>
<script>


    const Unit = [
        { name: '0', amount: 'Board of Director', label: '', action: '', _rowVariant: 'success' },
        { name: '1', amount: 'Directory of Commerce', label: 'Board of Director', action: '', _rowVariant: 'success' },
        { name: '1', amount: 'Directory of Finance', label: 'Board of Director', action: '', _rowVariant: 'success' },
        { name: '2', amount: 'Product Division', label: 'Dir of Commerce', action: '', _rowVariant: 'success' },
        { name: '3', amount: 'Product Division2', label: 'Board of Director', action: '', _rowVariant: 'success' },
        { name: '4', amount: 'Product Division3', label: 'Board of Director', action: '', _rowVariant: 'success' },
    ]

    const items = [
        { name: 'CEO', amount: '', label: '', action: 'Board of Director', _rowVariant: 'success' },
        { name: 'CFO', amount: 'CEO', label: 'Board of Director', action: '', _rowVariant: 'success' },
        { name: 'Finance Group Head', amount: 'CFO', label: 'Directory of Finance', action: '', _rowVariant: 'success' },
        { name: 'Acounting Div Head', amount: 'CFO', label: 'Directory of Finance', action: '', _rowVariant: 'success' },
    ]
    export default {
        name: 'document',
        data() {
            return {
                tabIndex: [0, 0],
                tabs: [
                    'Headquarter',
                    'Regional Office',
                ],

                Unit: Unit,
                Posisi: items,

                fields: [
                    { key: 'name', label: 'Level', sortable: true },
                    { key: 'amount', label: 'Work Unit Name' },
                    { key: 'label', label: 'Subordinat of' },
                    { key: 'action', label: 'Action' },


                ],

                isi: [
                    { key: 'name', label: 'Position', sortable: true },
                    { key: 'amount', label: 'Responsible to' },
                    { key: 'label', label: 'Work Unit' },
                    { key: 'action', label: 'Action' },


                ],
                currentPage: 1,
                perPage: 5,
                totalRows: items.length,
                pageOptions: [5, 10, 15],
                bordered: true,



            }
        }

    }


</script>
