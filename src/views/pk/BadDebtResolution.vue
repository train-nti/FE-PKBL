<template>
  <div class="animated fadeIn">
      <div class="card">
          <div class="card-body">
            <h4><strong>Bad Debt Resolution</strong></h4>
              <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">Mitra Binaan</label>
                  <div class="col-sm-6">
                      <input type="text" class="form-control" id="" placeholder="" value="[A0395] Heri Kusheri" disabled>
                  </div>
              </div>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Status</label>
                  <div class="col-sm-6">
                      <input type="text" class="form-control" id="" placeholder="" value="Macet" disabled>
                  </div>
              </div>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Sisa Piutang</label>
                  <div class="col-sm-6">
                      <input type="number" class="form-control" id="" placeholder="" value="13.400.000" disabled>
                  </div>
              </div>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Tunggakan</label>
                  <div class="col-sm-6">
                      <input type="number" class="form-control" id="" placeholder="" value="4.500.000" disabled>
                  </div>
              </div>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Angsuran Bulanan</label>
                  <div class="col-sm-6">
                      <input type="number" class="form-control" id="" placeholder="" value="1.500.000" disabled>
                  </div>
              </div>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Sisa Bulan Angsuran</label>
                  <div class="col-sm-6">
                      <input type="number" class="form-control" id="" placeholder="" value="9" disabled>
                  </div>
              </div>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label"></label>
                  <div class="col-sm-6">
                      <b-form-checkbox-group v-model="selected" name="flavour1a" :options="options" />
                  </div>
              </div>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Tanggal Upaya Penyelesaian</label>
                  <div class="col-sm-6">
                      <input type="date" class="form-control" id="" placeholder="" >
                  </div>
              </div>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Referensi Persetujuan</label>
                  <div class="col-sm-6">
                      <input type="text" class="form-control" id="" placeholder="" >
                  </div>
              </div>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Ubah Jasa Admin</label>
                  <div class="col-sm-6">
                      <input type="text" class="form-control" id="" placeholder="" value="" disabled>
                  </div>
              </div>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Tenor Baru</label>
                  <div class="col-sm-6">
                      <input type="text" class="form-control" id="" placeholder="" >

                  </div>
                  <div class="col-sm-1">
                      <b-button variant="success">Calculate</b-button>

                  </div>

              </div>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Angsuran Baru</label>
                  <div class="col-sm-6">
                      <input type="number" class="form-control" id="" placeholder="1.500.000" >
                  </div>
              </div>
              <b-button variant="primary">Save</b-button>
              <!--<br>-->



          </div>
      </div>
  </div>
</template>

<script>


    const items = [
        { name: 'Pertanian', amount: '2.500.000.000', action: '', _rowVariant: 'success' },
    ]

    export default {
        name: '',
        
        data() {
            return {
                tabIndex: [0, 0],
                tabs: [
                    'Penyaluran PK',
                    'Biaya Operasional PK',
                    'Penyaluran BL',
                    'Biaya Operasional BL'
                ],
                items: items,
                fields: [
                    { key: 'name', label: 'Sektor Usaha', sortable: true },
                    { key: 'amount', label: 'Anggaran'},
                    { key: 'action', label: 'Action' },


                ],
                currentPage: 1,
                perPage: 5,
                totalRows: items.length,
                pageOptions: [5, 10, 15],
                bordered: true,
                selected: ['1'], // Must be an array reference!
        options: [
          { text: 'Reskedul', value: '1' },
          { text: 'Rekondusi', value: '2' },

        ],


            }
        }

    }


</script>

<style scoped>
    @import '../../assets/css/TabsCenter.css';
</style>
