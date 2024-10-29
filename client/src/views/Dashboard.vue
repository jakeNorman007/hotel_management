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
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
        data: Object.values(nightsComputed),
      },
    ],
  };
});
</script>

<template>
  <div>
    <div class="flex justify-end items-center pr-[3rem] w-full h-[5rem] border-b border-black shadow-md shadow-gray-200">
      <div>
        <p>Welcome, user</p>
      </div>
    </div>
    <div class="p-3 m-3 border border-black w-[20rem] h-[20rem]">
      <Doughnut v-if="chartData" :data="chartData" :options="chartOptions"/>
    </div>
  </div>
</template>
