
<template>
    <div class="container">
        <div class="large-12 medium-12 small-12 cell">
            <label>
                File
                <input type="file" id="file" ref="file"  @change="handleFileUpload" />
            </label>
            <button v-on:click="downloadFile()" download>Submit</button>
            <label id="output"></label>
            <!-- <a href="#" class="btn brn-primary" v-on:click="downloadFile()">Download</a> -->
            <a :href="downloadFile()" download>Download</a>
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
        data() {
            return {
                file: '',
                url: ''
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
                formData.append('Tittle', "COBA1");
                formData.append('DebCode', "BL0");
                //formData.append('CreatedBy', "IPUL lah");
                /*
                  Make the request to the POST /single-file URL
                */
                axios.post('http://localhost:30678/api/attached',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then(function (data) {
                    alert("Berhasil!!");
                    console.log('SUCCESS!!');
                    console.log(data);
                    this.url = data;
                })
                    .catch(function () {
                        console.log('FAILURE!!');
                    });
            },

            downloadFile() {
                /*
                        Initialize the form data
                    */
                let formData = new FormData();

                /*
                    Add the form data we need to submit
                */
                formData.append('id', "149");
                /*
                  Make the request to the POST /single-file URL
                */
                axios.post('http://localhost:30678/api/attached/download',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then(function (data) {
                    console.log('SUCCESS!!');
                    console.log(data);
                    // let link = document.createElement('a')
                    // link.href = window.URL.createObjectURL(data)
                    // link.download = filename

                    // document.body.appendChild(link);
                    // link.click()
                    // document.body.removeChild(link);
                })
                    .catch(function () {
                        console.log('FAILURE!!');
                    });
            },
            /*
              Handles a change on the file upload
            */
            handleFileUpload(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.file = files[0];

                console.log(this.file);
            }
        }
    }
</script>
