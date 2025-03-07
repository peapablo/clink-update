<template>
    <div class="container-fluid">
      <div class="border-bottom">
        <div class="container-fluid py-3">
          <div class="py-3">
            <div class="row">
              <div class="col-6 col-md-4">
                <div>
                  <h1>Setting</h1>
                </div>
              </div>
              <div class="col-6 col-md-4">
                <div class="bg-secondary py-1 px-2 border rounded">
                  <div class="d-flex flex-row align-items-center">
                    <div class="mr-2" style="cursor: pointer">
                      <i class="fas fa-search"></i>
                    </div>
                    <div class="flex-grow-1">
                      <input type="text" class="w-100 border-0 input-style" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="row my-4 mx-1">
            <div
              class="col text-center"
              :class="{
                'active-tab': tableType === 0,
                'tab-table': tableType !== 0,
              }"
              @click="changeTableType(0)"
            >
              General
            </div>
            <div
              class="col text-center"
              :class="{
                'active-tab': tableType === 1,
                'tab-table': tableType !== 1,
              }"
              @click="changeTableType(1)"
            >
              Connection
            </div>
          </div>
          <div v-if="tableType == 0">
            <div class="card">
              <div class="card-header">
                <h3 class="mb-0">HIS/LIS Configuration</h3>
              </div>
              <div class="card-body">
                <form>
                  <div class="form-group row">
                    <label class="col-md-2 col-form-label form-control-label"
                      >Lab No. for Speclman Check In</label
                    >
                    <div class="col-md-10">
                      <base-checkbox v-model="checkboxes.generate" class="mb-3">
                        Auto Generate New Lab No.
                      </base-checkbox>
                      <base-checkbox
                        v-model="checkboxes.generateCatagory"
                        class="mb-3"
                      >
                        Generate New Lab No. by Catagory
                      </base-checkbox>
                      <base-checkbox
                        v-model="checkboxes.generateCatagory"
                        class="mb-3"
                      >
                        Generate New Lab No. by Specimen
                      </base-checkbox>
                      <base-checkbox v-model="checkboxes.auto" class="mb-3">
                        Auto Check In
                      </base-checkbox>
                    </div>
                  </div>
                  <hr />
                  <div class="form-group row">
                    <label
                      for="example-search-input"
                      class="col-md-2 col-form-label form-control-label"
                      >Auto Print</label
                    >
                    <div class="col-md-10">
                      <div class="row">
                        <base-checkbox v-model="checkboxes.generate" class="mb-3">
                          Auto Print Barcode:
                        </base-checkbox>
                        <base-input />
                      </div>
                      <base-checkbox
                        v-model="checkboxes.generateCatagory"
                        class="mb-3"
                      >
                        Auto Print Barcode Client
                      </base-checkbox>
                      <div class="row">
                        <base-checkbox v-model="checkboxes.generate" class="mb-3">
                          Auto Print Report for Whole Order:
                        </base-checkbox>
                        <base-input />
                      </div>
                      <base-checkbox v-model="checkboxes.auto" class="mb-3">
                        Barcode Printer Model is Zebra
                      </base-checkbox>
                    </div>
                  </div>
                  <hr />
                  <div class="form-group row">
                    <label
                      for="example-email-input"
                      class="col-md-2 col-form-label form-control-label"
                      >Result Pending</label
                    >
                    <div class="col-md-10">
                      <div class="row">
                        <base-checkbox v-model="checkboxes.generate" class="mb-3">
                          Message for Result Pending:
                        </base-checkbox>
                        <base-input />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div class="form-group row">
                    <label
                      for="example-url-input"
                      class="col-md-2 col-form-label form-control-label"
                      >Backup Database</label
                    >
                    <div class="col-md-10">
                      <div class="row">
                        <base-checkbox v-model="checkboxes.generate" class="mb-3">
                          Time of day when backup process will be
                          started(HH:MM:SS):
                        </base-checkbox>
                        <base-input
                          type="time"
                          value="12:00:00"
                          id="example-time-input"
                        />
                      </div>
                      <div class="row">
                        Folder to Store the Backup File:<base-input />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div class="form-group row">
                    <label
                      for="example-tel-input"
                      class="col-md-2 col-form-label form-control-label"
                      >Result Pending</label
                    >
                    <div class="col-md-10">
                      <div class="row">
                        Auto Log off Time:
                        <base-input />Minute
                      </div>
                      <div class="row">
                        <p>Date Format:</p>
                        <base-input type="date" id="example-time-input" />
                      </div>
                      <div class="row">
                        <p>Time Format:</p>
                        <base-input
                          type="time"
                          value="12:00:00"
                          id="example-time-input"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div v-if="tableType == 1"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import BaseCheckbox from '@/components/BaseCheckbox.vue'; // Adjust according to your directory structure
  import BaseInput from '@/components/BaseInput.vue'; // Adjust according to your directory structure
  
  // Data
  const tableType = ref(0);
  const checkboxes = ref({
    generate: false,
    generateCatagory: false,
    auto: false,
  });
  
  const changeTableType = (type) => {
    tableType.value = type;
  };
  
  // You can add other properties and methods as needed
  </script>
  
  <style scoped>
  .active-tab {
    font-weight: bold;
    border-bottom: 4px solid #808080;
  }
  .tab {
    cursor: pointer;
  }
  .tab-table {
    cursor: pointer;
    border-bottom: 1px solid #808080;
    padding-bottom: 4px;
  }
  .input-style {
    background-color: transparent;
  }
  .input-style:focus-visible {
    outline: -webkit-focus-ring-color auto 0px !important;
  }
  .swal2-actions {
    justify-content: start !important;
  }
  </style>
  