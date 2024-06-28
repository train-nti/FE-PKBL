<template>
  <div>
    <b-tabs class="full-widths" v-model="tabIndex[0]" v-if="elements.DocElements != null">
        <b-tab v-for="(tab,index) in elements.DocElements" :key="tab.Tab" v-if="tab.Tab != null">
            <template slot="title">
                <i class="icon-calculator"></i> {{ tab.Tab }}
            </template>
            <br>
            <b-row v-for="(element,indexForm) in tab.Form" :key="element.name" v-if="tab.Form != null">
                <b-col sm="12" v-if="element.ItemType == 'text'">
                  <b-form-group v-if="element.StepDisplay.find(checkStep) == StepDisplay">
                    <label for="ccnumber">{{ element.Caption }}
                      <b class="text-danger" v-if="element.Required  "> *</b>
                    </label>
                    <b-form-input type="text" id="element.name"
                    :disabled="element.Disabled   || element.StepDisable.find(checkStep) == StepDisable"
                    :required="element.Required  "
                    v-model="dataElement[index][indexForm]"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col sm="12" v-if="element.ItemType == 'enum'">
                  <b-form-group v-if="element.StepDisplay.find(checkStep) == StepDisplay">
                    <label for="{ccnumber}">{{ element.Caption }}
                      <b class="text-danger" v-if="element.Required  "> *</b>
                    </label>
                    <b-form-select id="element.Name"
                      :plain="true"
                      :options="element.enumlist"
                      :disabled="element.Disabled   || element.StepDisable.find(checkStep) == StepDisable"
                      :required="element.Required  "
                      v-model="dataElement[index][indexForm]">
                    </b-form-select>
                  </b-form-group>
                </b-col>
                <b-col sm="12" v-if="element.ItemType == 'checkbox'">
                  <b-form-group v-if="element.StepDisplay.find(checkStep) == StepDisplay">
                    <label for="{ccnumber}">{{ element.Caption }}
                      <b class="text-danger" v-if="element.Required  "> *</b>
                    </label>
                    <b-form-checkbox-group
                      :options="element.enumlist"
                      :disabled="element.Disabled   || element.StepDisable.find(checkStep) == StepDisable"
                      :required="element.Required  "
                      v-model="dataElement[index][indexForm]"
                    ></b-form-checkbox-group>
                  </b-form-group>
                </b-col>
                <b-col sm="12" v-if="element.ItemType == 'radio'">
                  <b-form-group v-if="element.StepDisplay.find(checkStep) == StepDisplay">
                    <label for="{ccnumber}">{{ element.Caption }}
                      <b class="text-danger" v-if="element.Required  "> *</b>
                    </label>
                    <b-form-radio-group
                      :options="element.enumlist"
                      :disabled="element.Disabled   || element.StepDisable.find(checkStep) == StepDisable"
                      :required="element.Required  "
                      v-model="dataElement[index][indexForm]"
                    ></b-form-radio-group>
                  </b-form-group>
                </b-col>
                <b-col sm="12" v-if="element.ItemType == 'numeric' && element.StepDisplay.find(checkStep) == StepDisplay">
                  <label for="ccnumber">{{ element.Caption }}
                    <b class="text-danger" v-if="element.Required  "> *</b>
                  </label>
                  <b-form-input type="number" id="element.name"
                  :disabled="element.Disabled   || element.StepDisable.find(checkStep) == StepDisable"
                  :required="element.Required  "
                  v-model="dataElement[index][indexForm]"></b-form-input>
                </b-col>
                <b-col sm="12" v-if="element.ItemType == 'textarea' && element.StepDisplay.find(checkStep) == StepDisplay">
                  <label for="ccnumber">{{ element.Caption }}
                    <b class="text-danger" v-if="element.Required  "> *</b>
                  </label>
                  <textarea id="element" rows="5" class="form-control"
                  :disabled="element.Disabled   || element.StepDisable.find(checkStep) == StepDisable"
                  :required="element.Required  "
                  v-model="dataElement[index][indexForm]"></textarea>
                </b-col>
                <b-col sm="12" v-if="element.ItemType == 'date' && element.StepDisplay.find(checkStep) == StepDisplay">
                  <b-form-group v-if="element.StepDisplay.find(checkStep) == StepDisplay">
                    <label for="ccnumber">{{ element.Caption }}
                      <b class="text-danger" v-if="element.Required  "> *</b>
                    </label>
                    <b-form-input type="date" id="element.name"
                    :disabled="element.Disabled   || element.StepDisable.find(checkStep) == StepDisable"
                    :required="element.Required  "
                    v-model="dataElement[index][indexForm]"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col sm="12" v-if="element.ItemType == 'email'">
                  <b-form-group v-if="element.StepDisplay.find(checkStep) == StepDisplay">
                    <label for="ccnumber">{{ element.Caption }}
                      <b class="text-danger" v-if="element.Required  "> *</b>
                    </label>
                    <b-form-input type="email" id="element.name"
                    :disabled="element.Disabled   || element.StepDisable.find(checkStep) == StepDisable"
                    :required="element.Required  "
                    v-model="dataElement[index][indexForm]"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col sm="12" v-if="element.ItemType == 'image' && element.StepDisplay.find(checkStep) == StepDisplay">
                  <label for="ccnumber" v-model="dataElement[index][indexForm]">{{ element.Caption }}
                    <b class="text-danger" v-if="element.Required  "> *</b>
                  </label>
                  <b-form-file accept="image/*" />
                </b-col>
            </b-row>
            <b-row v-if="tab.Table != null" style="padding:0.5%">
              <b-col sm="12">
                <p>{{ tab.Table.Description }}</p>
                <!-- <br> -->
                <b-button  @click="showModalElement(index)"  variant="primary">Add </b-button><br><br>
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
    <b-modal id="element" ref="element" hide-footer :title="'Add '+titleModalElement" ok-only>
        <b-row v-for="(element,indexForm) in elementsField" :key="element.name" >
            <b-col sm="12" v-if="element.ItemType == 'text'">
              <b-form-group>
                <label for="ccnumber">{{ element.Caption }}</label>
                <b-form-input type="text" id="element.name" v-model="dataElement[indexTab][indexForm]"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="12" v-if="element.ItemType == 'enum'">
              <b-form-group>
                <label for="{ccnumber}">{{ element.Caption }}</label>
                <b-form-select id="element.Name"
                  :plain="true"
                  :options="element.enumlist"
                  v-model="dataElement[indexTab][indexForm]">
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col sm="12" v-if="element.ItemType == 'checkbox'">
              <b-form-group>
                <label for="{ccnumber}">{{ element.Caption }}</label>
                <b-form-checkbox-group
                  :options="element.enumlist"
                  v-model="dataElement[indexTab][indexForm]"
                ></b-form-checkbox-group>
              </b-form-group>
            </b-col>
            <b-col sm="12" v-if="element.ItemType == 'radio'">
              <b-form-group>
                <label for="{ccnumber}">{{ element.Caption }}</label>
                <b-form-radio-group
                  :options="element.enumlist"
                  v-model="dataElement[indexTab][indexForm]"
                ></b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col sm="12" v-if="element.ItemType == 'numeric'">
              <label for="ccnumber">{{ element.Caption }}</label>
              <b-form-input type="number" id="element.name" v-model="dataElement[indexTab][indexForm]"></b-form-input>
            </b-col>
            <b-col sm="12" v-if="element.ItemType == 'textarea'">
              <label for="ccnumber">{{ element.Caption }}</label>
              <textarea id="element" rows="5" class="form-control" v-model="dataElement[indexTab][indexForm]"></textarea>
            </b-col>
            <b-col sm="12" v-if="element.ItemType == 'date'">
              <b-form-group>
                <label for="ccnumber">{{ element.Caption }}</label>
                <b-form-input type="date" id="element.name" v-model="dataElement[indexTab][indexForm]"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="12" v-if="element.ItemType == 'email'">
              <b-form-group>
                <label for="ccnumber">{{ element.Caption }}</label>
                <b-form-input type="email" id="element.name" v-model="dataElement[indexTab][indexForm]"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="12" v-if="element.ItemType == 'image'">
              <label for="ccnumber" v-model="dataElement[indexTab][indexForm]">{{ element.Caption }}</label>
              <b-form-file accept="image/*" />
            </b-col>
        </b-row>
        <div class="modal-footer">
          <b-button type="submit" size="md" variant="success" v-on:click="saveOrUpdateElement()">Save</b-button>
          <b-button type="submit" size="md" variant="danger" v-on:click="hideModalElement">Close</b-button>
        </div>
    </b-modal>
  </div>
</template>

<script>
import gField from '@/views/base/FieldsGenerator.vue'
import dynamic from '@/api/DynamicApiService';

export default {
  name: 'g-form',
  components: {gField},
  inheritAttrs: false,
  props: {
    elementData:{
      type: Object,
      default: {}
    },
    dataElement:{
      type: Array,
      default: []
    },
    StepDisplay:{
      type: Number,
      default: 0
    },
    StepDisable:{
      type: Number,
      default: 0
    },
  },
  data: () => {
    return {
      titleModalElement:'',
      elementsField: [],
      currentElement:{},
      tabIndex: [0, 0]
    }
  },
  computed: {
    elements: function() {
      console.log("Element JSON",this.elementData)
      const elements = this.elementData
      this.currentElement = this.elementData
      return elements
    },
  },
  watch: {
    currentElement: async function () {
      console.log(this.elements.DocElements.length);

      if (this.elementData.DocElements != null) {
        var i = 0
        for (var tab of this.elementData.DocElements) {
          this.dataElement.push([]);
          console.log(tab.Form);
          var element = tab.Form
          if (element != null) {
            for (var j = 0; j < element.length; j++) {
              if (element[j].Generate != null) {
                console.log('hai');
                var data = await this.generate(element[j].Generate)
                this.dataElement[i].push([data])
              }else {
                this.dataElement[i].push([])
              }

            }
          }

          i++
        }
      }
      console.log(this.dataElement);

    },
  },
  mounted: function () {
    this.$nextTick(function () {


    })
  },
  methods: {
    showModalElement(indexTab) {
      console.log(indexTab);
      this.indexTab = indexTab
      this.dataElement[0] = indexTab + 1
      this.titleModalElement = this.elements.DocElements[indexTab].Tab
      this.elementsField = this.elements.DocElements[indexTab].Table.Field
      console.log(this.elementsField);
      this.$refs['element'].show();
    },
    checkStep(step) {
      return step >= this.StepDisplay;
    },
    hideModalElement() {
        this.$refs['element'].hide()
        //console.log("yo baka")
       //this.setActive = false;

    },
    saveOrUpdateElement(key){
      console.log(this.elements.DocElements[this.indexTab].Table.Row);
      var number = this.elements.DocElements[this.indexTab].Table.Row.length + 1;
      // this.dataElement[this.indexTab][key] = number
      this.elements.DocElements[this.indexTab].Table.Row.push(this.dataElement[this.indexTab])
      this.hideModalElement(true)
    },
    getData(){

      return this.dataElement
    },
    async generate(generate){
      var words = generate.split("->")
      var val = ''
      for (var word of words) {
        // console.log(word)
        if (word.substr(0, 1) == '$') {
          var filter = word.split('(')
          console.log(filter);
          switch (filter[0]) {
            case '$year':
              word = new Date().getFullYear()
              break;
            case '$inc':
              // hitung total data
              var inc = await dynamic.getCount(filter[1].substr(0,filter[1].length - 1))
              word = parseInt(inc.Total) + 1
              break;
            default:

          }
        }
        val += word
        console.log(val);
      }
      console.log(generate);
      return val
    },
  }
}
</script>
