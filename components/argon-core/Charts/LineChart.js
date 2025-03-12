import { defineComponent, defineProps, watch, toRefs } from "vue";
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
  setup(props) {
    const { reactiveProp } = toRefs(props); // ✅ Convert to a reactive reference

    watch(
      reactiveProp, // ✅ Watch the reactive ref
      (newVal) => {
        if (!newVal) return; // Prevent null errors
        console.log("Reactive Prop Updated:", newVal);
      },
      { immediate: true }
    );

    return {
      reactiveProp,
    };
  },
});
