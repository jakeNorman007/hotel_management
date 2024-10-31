<script setup>
import { ref, onMounted } from "vue";
import { getBookingsNoPagination } from "../services/bookingsServices";
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const chartData = ref(null); // Reactive chart data
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});

function nightsGrouping(bookings) {
  const headers = {"1 night": 0, "2-3 nights": 0, "4-5 nights": 0, "5+ nights": 0};

  bookings.forEach(booking => {
    const nights = booking.number_of_nights;
    if (nights === 1) {
      headers["1 night"]++;
    } else if (nights >= 2 && nights <= 3) {
      headers["2-3 nights"]++;
    } else if (nights >= 4 && nights <= 5) {
      headers["4-5 nights"]++;
    } else if (nights > 5) {
      headers["5+ nights"]++;
    }
  });

  return headers;
};

onMounted(async () => {
  const response = await getBookingsNoPagination();
  console.log(response);

  const nightsComputed = nightsGrouping(response);
  chartData.value = {
    labels: Object.keys(nightsComputed),
    datasets: [
      {
        label: "",
        backgroundColor: ["#4ade80", "#9ca3af", "#bbf7d0", "#e5e7eb"],
        borderWidth: 1,
        data: Object.values(nightsComputed),
      },
    ],
  };
});
</script>

<template>
  <div>
    <div class="p-3 m-3 border w-[20rem] h-[20rem]">
      <Doughnut v-if="chartData" :data="chartData" :options="chartOptions"/>
    </div>
  </div>
</template>
