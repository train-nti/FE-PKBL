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
                                        <b-table show-empty
                                                 stacked="md"
                                                 :items="Posisi"
                                                 :bordered="bordered"
                                                 :fields="isi"
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
                                            <i class="icon-pie-chart"></i> {{tabs[2]}}
                                        </template>
                                        <br>3. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                        officia deserunt mollit anim id est laborum.
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
                    'Work Units',
                    'Positions',
                    'View as Chart',
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
