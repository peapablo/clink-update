import { defineComponent, defineProps, watch } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

// Register chart.js modules
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

export default defineComponent({
  name: "line-chart",
  components: {
    Line,
  },
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
