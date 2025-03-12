import { defineComponent, defineProps, watch } from "vue";
import { Pie } from "vue-chartjs";
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
  name: "pie-chart",
  components: {
    Pie,
  },
  mixins: [globalOptionsMixin],
  setup() {
    const props = defineProps({
      chartData: Object,
      extraOptions: Object,
      reactiveProp: Object,
    });

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
