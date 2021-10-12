<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  name: "chart",
  data() {
    return {
      data: {
        labels: ["正解数", "不正解数"],
        datasets: [
          {
            label: "pie Dataset",
            data: [this.$store.getters.correctNumber.correctNumber, this.$store.getters.correctNumber.inCorrectNumber],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 1,
          },
        ],
      },
    };
  },
  mounted() {
    this.renderChart(this.data);
  },
};
</script>
