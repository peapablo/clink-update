import { defineComponent, defineProps, watch } from "vue";
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import globalOptionsMixin from "@/components/argon-core/Charts/globalOptionsMixin";

// Register chart.js modules
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

export default defineComponent({
  name: "doughnut-chart",
  components: {
    Doughnut,
  },
  mixins: [globalOptionsMixin],
  setup() {
    const props = defineProps({
      chartData: Object,
      extraOptions: Object,
      reactiveProp: Object,
    });

    // Watch for changes in `reactiveProp`
    watch(
      () => props.reactiveProp,
      (newVal) => {
        console.log("Reactive Prop Updated:", newVal);
      },
      { immediate: true }
    );

    return {
      props,
    };
  },
});
