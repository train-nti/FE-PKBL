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
                                <fieldset>
                                    <center>
                                        <div class="form-group row">
                                            <label for="first_name" class="col-sm-2 col-form-label">Subordinat Of</label>
                                            <div class="col-lg-4">
                                                <select class="form-control">
                                                    <option>Ordinary select box</option>
                                                    <option value="United States">United States</option>
                                                    <option value="United Kingdom">United Kingdom</option>
                                                    <option value="Afghanistan">Afghanistan</option>
                                                </select>
                                            </div>

                                        </div>
                                        <div class="form-group row">
                                            <label for="first_name" class="col-sm-2 col-form-label">Office Code</label>
                                            <div class="col-sm-4">
                                                <input type="text" class="form-control" id="first_name" name="first_name">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="last_name" class="col-sm-2 col-form-label">Office Name</label>
                                            <div class="col-sm-4">
                                                <input type="text" class="form-control" id="last_name" name="last_name">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="last_name" class="col-sm-2 col-form-label">Territorials</label>
                                            <div class="col-sm-4">
                                                <table class="table">
                                                    <thead class="thead-dark">
                                                        <tr>
                                                            <th scope="col">Districs</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Kota Bandung</td>
                                                            <th scope="row"><a href="#">delete</a></th>

                                                        </tr>
                                                        <tr>
                                                            <td>Kab Bandung</td>
                                                            <th scope="row"><a href="#">delete</a></th>

                                                        </tr>
                                                        <tr>
                                                            <td>Kab Bandung Barat</td>
                                                            <th scope="row"><a href="#">delete</a></th>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <button type="button" class="btn btn-outline-primary">Add New</button>
                                            </div>
                                        </div>
                                    </center>
                                </fieldset>

                                <button type="button" class="btn btn-outline-primary">Save Changes</button>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>



