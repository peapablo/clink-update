<template>
    <div>
      <base-header class="mb-4">
        <div class="row align-items-center py-4" style="row-gap: 16px">
          <div class="col-12" style="position: relative">
            <h6 class="h2 text-white d-inline-block mb-0">
              Summary of this month
            </h6>
            <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
              <route-breadcrumb></route-breadcrumb>
            </nav>
  
            <div class="favorite-button-container">
              <favorite-button path="/dashboard" />
            </div>
          </div>
  
          <div class="col-12 col-md-2">
            <h2 class="text-white d-inline-block mb-2">Month/Year</h2>
            <base-input>
              <flat-picker
                slot-scope="{ focus, blur }"
                @on-open="focus"
                @on-close="blur"
                :config="flatpickerConfig"
                class="form-control datepicker"
                v-model="monthYear_selected"
              ></flat-picker>
            </base-input>
          </div>
          <div class="d-none d-md-block col-md-10"></div>
  
          <div class="col-12 col-md-3">
            <card header-classes="bg-transparent">
              <div class="text-center">
                <div
                  class="
                    icon icon-shape
                    text-white
                    rounded-circle
                    shadow
                    bg-gradient-orange
                  "
                >
                  <i class="ni ni-bullet-list-67"></i>
                </div>
              </div>
  
              <div class="row px-2">
                <div class="col-6 text-start">Inbox</div>
                <div class="col-6 text-right">
                  {{
                    hideSummaryData
                      ? "Loading"
                      : summaryData.section1.count_inbox_total
                      ? summaryData.section1.count_inbox_total
                      : 0
                  }}
                </div>
  
                <div class="col-6 text-start">Check in</div>
                <div class="col-6 text-right">
                  {{
                    hideSummaryData
                      ? "Loading"
                      : summaryData.section1.count_checkin
                      ? summaryData.section1.count_checkin
                      : 0
                  }}
                </div>
  
                <div class="col-6 text-start">Reject</div>
                <div class="col-6 text-right">
                  {{
                    hideSummaryData
                      ? "Loading"
                      : summaryData.section1.count_reject
                      ? summaryData.section1.count_reject
                      : 0
                  }}
                </div>
  
                <div class="col-6 text-start">Waiting</div>
                <div class="col-6 text-right">
                  {{
                    hideSummaryData
                      ? "Loading"
                      : summaryData.section1.count_waiting
                      ? summaryData.section1.count_waiting
                      : 0
                  }}
                </div>
              </div>
            </card>
          </div>
  
          <div class="col-12 col-md-3">
            <card header-classes="bg-transparent">
              <div class="text-center">
                <div
                  class="
                    icon icon-shape
                    text-white
                    rounded-circle
                    shadow
                    bg-gradient-red
                  "
                >
                  <i class="ni ni-folder-17"></i>
                </div>
              </div>
  
              <div class="row px-2">
                <div class="col-6 text-start">Microscopic</div>
                <div class="col-6 text-right">
                  {{
                    hideSummaryData
                      ? "Loading"
                      : summaryData.section2.count_microscopic
                      ? summaryData.section2.count_microscopic
                      : 0
                  }}
                </div>
  
                <div class="col-6 text-start" style="white-space: nowrap">
                  Aerobic Culture
                </div>
                <div class="col-6 text-right">
                  {{
                    hideSummaryData
                      ? "Loading"
                      : summaryData.section2.count_aerobic_culture
                      ? summaryData.section2.count_aerobic_culture
                      : 0
                  }}
                </div>
  
                <div class="col-6 text-start" style="white-space: nowrap">
                  Hemoculture
                </div>
                <div class="col-6 text-right">
                  {{
                    hideSummaryData
                      ? "Loading"
                      : summaryData.section2.count_hemoculture
                      ? summaryData.section2.count_hemoculture
                      : 0
                  }}
                </div>
  
                <div class="col-6 text-start">Others</div>
                <div class="col-6 text-right">
                  {{
                    hideSummaryData
                      ? "Loading"
                      : summaryData.section2.count_other
                      ? summaryData.section2.count_other
                      : 0
                  }}
                </div>
              </div>
            </card>
          </div>
  
          <!-- <div class="col-12 col-md-4">
            <card header-classes="bg-transparent">
              <div
                class="
                  icon icon-shape
                  text-white
                  rounded-circle
                  shadow
                  bg-gradient-info
                "
              >
                <i class="ni ni-chart-bar-32"></i>
              </div>
            </card>
          </div> -->
        </div>
        <!-- <div class="d-none col-sm-2 d-inline-block mb-2 px-0">
          <h2 class="text-white d-inline-block mb-2">Month/Year</h2>
          <base-input>
            <flat-picker
              slot-scope="{ focus, blur }"
              @on-open="focus"
              @on-close="blur"
              :config="flatpickerConfig"
              class="form-control datepicker"
              v-model="monthYear_selected"
              @input="loadSummary()"
            ></flat-picker>
          </base-input>
        </div> -->
        <!-- Card stats -->
        <!-- <div class="row">
          <div class="col-xl-3 col-md-6">
            <NuxtLink to="/inbox">
              <stats-card
                title="Inbox / Reject"
                type="gradient-red"
                :sub-title="summary.countInboxTotal + ' / ' + summary.countReject"
                icon="ni ni-folder-17"
                rou
              >
                <template slot="footer">
                  <span class="text-success mr-2">
                    <i class="fa fa-arrow-up"></i> %
                  </span>
                  <span class="text-nowrap">เดือนที่ผ่านมา</span>
                </template>
              </stats-card>
            </NuxtLink>
          </div>
          <div class="col-xl-3 col-md-6">
            <NuxtLink to="/orderMonitoring">
              <stats-card
                title="On Progress"
                type="gradient-orange"
                :sub-title="summary.countProgress + ''"
                icon="ni ni-bullet-list-67"
              >
                <template slot="footer">
                  <span class="text-success mr-2">PRELIMINARY</span>
                  <span class="text-nowrap">{{ summary.countPreliminary }}</span>
                </template>
              </stats-card>
            </NuxtLink>
          </div>
          <div class="col-xl-3 col-md-6">
            <stats-card
              title="Approve"
              type="gradient-green"
              :sub-title="summary.countApprove + ''"
              icon="ni ni-check-bold"
            >
              <template slot="footer">
                <span class="text-success mr-2">
                  <i class="fa fa-arrow-up"></i> %
                </span>
                <span class="text-nowrap">เดือนที่ผ่านมา</span>
              </template>
            </stats-card>
          </div>
          <div class="col-xl-3 col-md-6">
            <stats-card
              title="KPI Performance"
              type="gradient-info"
              :sub-title="
                ((summary.countApprove / summary.countInboxTotal) * 100).toFixed(
                  2
                ) + '%'
              "
              icon="ni ni-chart-bar-32"
            >
              <template slot="footer">
                <span class="text-success mr-2">
                  <i class="fa fa-arrow-up"></i> %
                </span>
                <span class="text-nowrap">เดือนที่ผ่านมา</span>
              </template>
            </stats-card>
          </div>
        </div> -->
      </base-header>
  
      <!--Charts-->
      <div class="container-fluid">
        <div class="row" style="row-gap: 16px">
          <div class="col-12 col-md-6">
            <card header-classes="bg-transparent" class="relative">
              <div slot="header" class="p-4 row align-items-center">
                <div class="col">
                  <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                  <h5 class="h3 mb-0">Total orders</h5>
                </div>
              </div>
              <doughnut-chart
                v-if="!hideSummaryData"
                :height="350"
                ref="chart1DoughnutChart"
                :chart-data="getChart1"
                :extra-options="chart1Options"
              ></doughnut-chart>
  
              <div v-if="hideSummaryData" style="height: 350px"></div>
  
              <div
                style="
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                "
              >
                <span v-if="hideSummaryData">Loading</span>
                <span v-if="isChart1DataEqualZero && !hideSummaryData"
                  >No Data</span
                >
              </div>
            </card>
          </div>
  
          <div class="col-12 col-md-6">
            <card header-classes="bg-transparent" class="relative">
              <div slot="header" class="p-4 row align-items-center">
                <div class="col">
                  <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                  <h5 class="h3 mb-0">Specimen</h5>
                </div>
              </div>
              <doughnut-chart
                v-if="!hideSummaryData"
                :height="350"
                ref="chart2DoughnutChart"
                :chart-data="getChart2"
                :extra-options="chart2Options"
              ></doughnut-chart>
  
              <div v-if="hideSummaryData" style="height: 350px"></div>
  
              <div
                style="
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                "
              >
                <span v-if="hideSummaryData">Loading</span>
                <span v-if="isChart2DataEqualZero && !hideSummaryData"
                  >No Data</span
                >
              </div>
            </card>
          </div>
        </div>
        <!-- End charts-->
        <!-- start daily report -->
        <!-- end daily report -->
        <LineChart v-if="reactiveProp" :reactiveProp="reactiveProp" />
      </div>
    </div>
  </template>

  <script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { useMainStore } from '@/store';
import { useRouter } from 'vue-router';
import axios from 'axios';
import swal from 'sweetalert2';
import { useRuntimeConfig } from '#app';

// Charts
import LineChart from '@/components/argon-core/Charts/LineChart';
import DoughnutChart from '@/components/argon-core/Charts/DoughnutChart';

// Month, Year Picker
import flatPicker from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect/index.js';
import 'flatpickr/dist/plugins/monthSelect/style.css';

import mappingApi from '@/util/mappingApi';

const router = useRouter();
const store = useMainStore();
store.initializeStore(); // Ensure localStorage values are loaded

const hideSummaryData = ref(true);
const summaryData = ref({
  section1: {},
  section2: {},
  chart1: {},
  chart2: {},
});

const config = useRuntimeConfig();
const monthYear_selected = ref(
  `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`
);

const chartOptions = {
  legend: { display: true },
  responsive: true,
  maintainAspectRatio: false,
  tooltips: {
    callbacks: {
      label: (tooltipItems, data) => {
        const label = data.labels[tooltipItems.index] || '';
        const value = data.datasets[0].data[tooltipItems.index] || 0;
        return `${label} : ${value} %`;
      },
    },
  },
};

const flatpickerConfig = {
  plugins: [
    new monthSelectPlugin({
      shorthand: true,
      dateFormat: 'Y-m',
    }),
  ],
};

const loadSummary = async () => {
  try {
    hideSummaryData.value = true;
    const url = `${config.public.urlBase}/api/${mappingApi('summary.php')}`;
    const { data } = await axios.get(url, { params: { monthyear: monthYear_selected.value } });

    summaryData.value.section1 = data?.section1 ?? {};
    summaryData.value.section2 = data?.section2 ?? {};
    summaryData.value.chart1 = {
      labels: (data?.chart1?.label ?? []).map((l) => l.charAt(0).toUpperCase() + l.slice(1)),
      datasets: [
        {
          label: 'Data',
          backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
          data: data?.chart1?.value ?? [],
        },
      ],
    };
    summaryData.value.chart2 = {
      labels: (data?.chart2?.label ?? []).map((l) => l.charAt(0).toUpperCase() + l.slice(1)),
      datasets: [
        {
          label: 'Data',
          backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
          data: data?.chart2?.value ?? [],
        },
      ],
    };

    hideSummaryData.value = false;
  } catch (err) {
    swal.fire({
      title: 'ดึงข้อมูลไม่สำเร็จ',
      text: err?.response?.data?.message ?? err?.message ?? 'ไม่สามารถดึงข้อมูลได้',
      icon: 'error',
      confirmButtonText: 'Confirm',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-default',
        cancelButton: 'btn btn-light',
      },
    });
  }
};

watch(monthYear_selected, loadSummary);

onMounted(() => {
  if (!store.accessToken) {
    router.push('/login');
  } else {
    loadSummary();
  }
});

const getChart1 = computed(() => summaryData.value.chart1);
const getChart2 = computed(() => summaryData.value.chart2);
const isChartDataEqualZero = (chartData) => {
  const data = chartData?.datasets?.[0]?.data ?? [];
  return data.every((item) => parseInt(item) === 0 || item === null) || data.length === 0;
};
const isChart1DataEqualZero = computed(() => isChartDataEqualZero(summaryData.value.chart1));
const isChart2DataEqualZero = computed(() => isChartDataEqualZero(summaryData.value.chart2));

const reactiveProp = ref({ message: "This is a reactive prop" });
</script>

  
  
  <style></style>
