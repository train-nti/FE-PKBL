<template>
  <div>
    <b-tabs class="full-widths" v-model="tabIndex[0]">
        <b-tab v-for="(tab,index) in elements.DocElements" :key="tab.Tab" v-if="tab.Tab != null">
            <template slot="title">
                <i class="icon-calculator"></i> {{ tab.Tab }}
            </template>
            <br>
            <b-row v-for="(element,indexForm) in tab.Form" :key="element.name" v-if="tab.Form != null">
                <b-col sm="12" v-if="element.ItemType == 'text'">
                  <b-form-group>
                    <label for="ccnumber">{{ element.Caption }}</label>
                    <b-form-input type="text" id="element.name" v-model="dataElement[index][indexForm]"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col sm="12" v-if="element.ItemType == 'enum'">
                  <b-form-group>
                    <label for="{ccnumber}">{{ element.Caption }}</label>
                    <b-form-select id="element.Name"
                      :plain="true"
                      :options="element.enumlist"
                      v-model="dataElement[index][indexForm]">
                    </b-form-select>
                  </b-form-group>
                </b-col>
                <b-col sm="12" v-if="element.ItemType == 'checkbox'">
                  <b-form-group>
                    <label for="{ccnumber}">{{ element.Caption }}</label>
                    <b-form-checkbox-group
                      :options="element.enumlist"
                      v-model="dataElement[index][indexForm]"
                    ></b-form-checkbox-group>
                  </b-form-group>
                </b-col>
                <b-col sm="12" v-if="element.ItemType == 'radio'">
                  <b-form-group>
                    <label for="{ccnumber}">{{ element.Caption }}</label>
                    <b-form-radio-group
                      :options="element.enumlist"
                      v-model="dataElement[index][indexForm]"
                    ></b-form-radio-group>
                  </b-form-group>
                </b-col>
                <b-col sm="12" v-if="element.ItemType == 'numeric'">
                  <label for="ccnumber">{{ element.Caption }}</label>
                  <b-form-input type="number" id="element.name" v-model="dataElement[index][indexForm]"></b-form-input>
                </b-col>
                <b-col sm="12" v-if="element.ItemType == 'textarea'">
                  <label for="ccnumber">{{ element.Caption }}</label>
                  <textarea id="element" rows="5" class="form-control" v-model="dataElement[index][indexForm]"></textarea>
                </b-col>
                <b-col sm="12" v-if="element.ItemType == 'date'">
                  <b-form-group>
                    <label for="ccnumber">{{ element.Caption }}</label>
                    <b-form-input type="date" id="element.name" v-model="dataElement[index][indexForm]"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col sm="12" v-if="element.ItemType == 'email'">
                  <b-form-group>
                    <label for="ccnumber">{{ element.Caption }}</label>
                    <b-form-input type="email" id="element.name" v-model="dataElement[index][indexForm]"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col sm="12" v-if="element.ItemType == 'image'">
                  <label for="ccnumber" v-model="dataElement[index][indexForm]">{{ element.Caption }}</label>
                  <b-form-file accept="image/*" />
                </b-col>
            </b-row>
            <b-row v-if="tab.Table != null" style="padding:0.5%">
              <b-col sm="12">
                <p>{{ tab.Table.Description }}</p>
                <!-- <br> -->
                <b-button  @click="buttonClicked(index)"  variant="primary">Add </b-button><br><br>
                <table class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th class="text-center" v-for="Field in tab.Table.Field">{{ Field.Caption }}</th>
                            <th class="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="data in tab.Table.Row" v-if="tab.Table.Row[0] != null">
                            <tr>
                                <td v-for="row in data">{{ row }}</td>

                                <td class="text-center">
                                    <button type="button" v-b-modal.modal-2 class="btn btn-success" @click="editElement(data[0])">
                                        <i class="fa fa-pencil "></i>
                                    </button>
                                    <button type="button" class="btn btn-danger" @click="deleteElement(data[0])">
                                        <i class="fa fa-trash"></i>
                                    </button>

                                </td>

                            </tr>
                        </template>
                    </tbody>

                </table>
              </b-col>
            </b-row>
        </b-tab>
    </b-tabs>
  </div>
</template>

<script>

export default {
  name: 'g-field',
  inheritAttrs: false,
  props: {
    elementData:{
      type: Object,
      default: {}
    },
    showModal: {
      type: Function,
      default() {
          return function () {};
      }
    },
    getData: {
      type: Function,
      default() {
          return function () {};
      }
    },
  },
  data: () => {
    return {
      tabIndex: [0, 0]
    }
  },
  computed: {
    elements: function() {
      console.log("Element JSON",this.elementData)
      const elements = this.elementData
      return elements
    },
    dataElement: function functionName() {
      var dataElement = []
      for (var i = 0; i < this.elementData.DocElements.length; i++) {
        dataElement.push([]);
      }
      console.log(dataElement);
      return dataElement
    }
  },
  methods: {
    buttonClicked: function (indexTab) {
      this.showModal(indexTab); // invoke func passed via prop
    },
    getDataElement(){
       return this.dataElement
    },
  }
}
</script>
