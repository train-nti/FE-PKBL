
<template>
    <div>
        <!-- <div class="large-12 medium-12 small-12 cell">
            <label>
                File
                <input type="file" id="file" ref="file"  @change="handleFileUpload" />
            </label>
            <button v-on:click="submitFile()">Submit</button>
            <a href="http://localhost:30678/api/attached/download?id=30">Download</a>
        </div> -->
        <div class="form-group row">
            <label for="inputPassword" class="col-sm-2 col-form-label">{{labels}}</label>
            <div class="col-sm-8">
              <div class="input-group">
                <b-form-file @change="handleFileUpload"
                             id="file"
                             ref="file"
                             placeholder="Choose a file..."
                             drop-placeholder="Drop file here..."
                             :state="Boolean(file)">

                </b-form-file>
                <span class="input-group-btn" style="padding-left:10px">
                    <button v-if="active" class="btn btn-outline-success bg-success" type="submit" @click="submitFile" style="height:35px">Upload</button>
                </span>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    export default {
        /*
          Defines the data used by the component
        */
        props: {
          labels: {
            type: String,
            required: true,
            default : "Surat K"
          },
          items: {
            type: String
          },
          url : {
            type: String,
            required: true
          },
          // active: {
          //   type: Boolean,
          //   default : false
          // },
        },
        data() {
            return {
                file: '',
                dataRes : [],
                active : false
            }
        },

        methods: {
            /*
              Submits the file to the server
            */
            submitFile() {
                /*
                        Initialize the form data
                    */
                let formData = new FormData();

                /*
                    Add the form data we need to submit
                */
                formData.append('file', this.file);
                formData.append('Tittle', this.file.name.split('.').slice(0, -1).join('.'));
                formData.append('DebCode', this.items);
                formData.append('CreatedBy', "System");
                /*
                  Make the request to the POST /single-file URL
                */
                axios.post(this.url,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then(data => {
                
                   this.showNotif(data.data, this.labels)

                });


            },

            //downloadFile() {
            //    /*
            //            Initialize the form data
            //        */
            //    //let formData = new FormData();

            //    /*
            //        Add the form data we need to submit
            //    */
            //    //formData.append('id', "3");
            //    /*
            //      Make the request to the POST /single-file URL
            //    */
            //    axios.post('http://localhost:30678/api/attached/download?id=3',
            //        formData,
            //        {
            //            headers: {
            //                'Content-Type': 'multipart/form-data'
            //            }
            //        }
            //    ).then(function (data) {
            //        console.log('SUCCESS!!');
            //        console.log(data);
            //    })
            //        .catch(function () {
            //            console.log('FAILURE!!');
            //        });
            //},
            /*
              Handles a change on the file upload
            */
            handleFileUpload(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.active = true;
                this.file = files[0];

                console.log(this.file);
            }
        }
    }
</script>
