<template>
  <div>
    <div
      class="bg-blue-100 rounded-lg shadow-md m-4 sm:m-8 lg:m-12 p-4 sm:p-6 lg:p-8"
    >
      <h2 class="text-base sm:text-lg lg:text-xl font-semibold text-blue-700">
        API Response Code
      </h2>
      <p class="mt-1 text-sm sm:text-base lg:text-lg font-medium text-blue-600">
        {{ apiResponse }}
      </p>
    </div>

    <div
      class="bg-green-100 rounded-lg shadow-md m-4 sm:m-8 lg:m-12 p-4 sm:p-6 lg:p-8"
    >
      <h2 class="text-base sm:text-lg lg:text-xl font-semibold text-green-700">
        Response Time
      </h2>
      <p class="mt-1 text-base sm:text-xl lg:text-2xl font-bold text-green-600">
        {{ apiResponseTime }} ms
      </p>
    </div>
    <div
      class="p-4 md:p-8 lg:p-10 overflow-x-auto bg-gray-100 rounded-lg shadow flex flex-col md:flex-row lg:flex-row items-center gap-2 w-full"
    >
      <div class="relative inline-flex w-full lg:flex-grow">
        <svg
          class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 412 232"
        >
          <path
            d="M206 171.144L42.678 7.822c-12.496-12.497-32.758-12.497-45.255 0s-12.497 32.758 0 45.255L192.322 237.678c6.248 6.248 14.432 9.373 22.678 9.373s16.43-3.125 22.678-9.373L414.577 53.077c12.497-12.497 12.497-32.759 0-45.255s-32.758-12.497-45.255 0L206 171.144z"
            fill="#648299"
            fill-rule="nonzero"
          />
        </svg>
        <select
          v-model="selectedCountry"
          class="border border-gray-300 text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none rounded w-full"
        >
          <option
            v-for="country in countryOptions"
            :value="country"
            :key="country"
          >
            {{ country }}
          </option>
        </select>
      </div>
      <input
        type="text"
        placeholder="Search by University or College Name..."
        v-model="searchField"
        class="py-2 px-4 rounded bg-white border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 flex-grow w-full lg:flex-grow"
      />
      <button
        class="font-bold text-blue-800 bg-blue-100 hover:bg-blue-200 py-2 px-4 rounded text-center block truncate transition duration-300 ease-in-out hover:shadow-lg w-full md:w-auto lg:w-1/2 lg:mt-0"
        @click="clearFilters"
      >
        Clear All Filters
      </button>
    </div>
    <div class="bg-gray-100 p-4 sm:p-8 overflow-x-auto">
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="min-w-full lg:hidden">
          <!-- Mobile -->
          <div
            v-for="tableResults in filteredCountriesData"
            :key="tableResults.id"
            class="p-4 border-b border-gray-200 last:border-b-0"
          >
            <div class="font-semibold text-lg text-blue-800 mb-2">
              {{ tableResults.name }}
            </div>
            <div class="text-gray-800">
              <strong>State/Province:</strong>
              {{ tableResults["state-province"] || "N/A" }}
            </div>
            <div class="text-gray-800 mt-2">
              <strong>Website:</strong>
              <div v-for="domain in tableResults.domains" :key="domain">
                {{ domain }}
              </div>
            </div>
            <button
              @click="toggleSaved(tableResults)"
              :class="{
                'bg-green-500 hover:bg-green-600': !isSaved(tableResults),
                'bg-red-500 hover:bg-red-600': isSaved(tableResults),
              }"
              class="mt-4 text-white font-semibold py-2 px-4 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 transition ease-in-out duration-150 block w-full text-center"
            >
              {{ isSaved(tableResults) ? "Unsave" : "Save" }}
            </button>
          </div>
        </div>
        <table class="hidden lg:min-w-full lg:table">
          <!-- Desktop -->
          <thead class="bg-blue-500 text-white">
            <tr>
              <th
                class="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-left"
              >
                Name
              </th>
              <th
                class="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-left"
              >
                State/Province
              </th>
              <th
                class="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-left"
              >
                Website
              </th>
              <th
                class="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-left"
              >
                Favorites
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="tableResults in filteredCountriesData"
              :key="tableResults.id"
            >
              <td class="px-6 py-4 border-t border-gray-200 text-gray-900">
                {{ tableResults.name }}
              </td>
              <td class="px-6 py-4 border-t border-gray-200 text-gray-900">
                {{ tableResults["state-province"] }}
              </td>
              <td class="px-6 py-4 border-t border-gray-200">
                <div v-for="domain in tableResults.domains" :key="domain">
                  {{ domain }}
                </div>
              </td>
              <td class="px-6 py-4 border-t border-gray-200">
                <button
                  @click="toggleSaved(tableResults)"
                  :class="{
                    'w-32 bg-green-500 hover:bg-green-600':
                      !isSaved(tableResults),
                    'w-32 bg-red-500 hover:bg-red-600': isSaved(tableResults),
                  }"
                  class="text-white font-semibold py-2 px-4 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 transition ease-in-out duration-150"
                >
                  {{ isSaved(tableResults) ? "Unsave" : "Save" }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
const searchField = ref("");
const selectedCountry = ref("");
const countryOptions = ref([]);
const apiResponseCode = ref(null);
const apiResponseTime = ref(null);
const countriesData = ref([]);

const fetchCountries = async () => {
  const startTime = performance.now();
  const response = await fetch(`http://universities.hipolabs.com/search`);
  apiResponseCode.value = response.status;
  const endTime = performance.now();
  apiResponseTime.value = endTime - startTime;
  if (!response.ok) {
    console.error("Failed to fetch data:", response.statusText);
    return;
  }
  const data = await response.json();
  const countries = new Set(data.map((country) => country.country));
  countryOptions.value = Array.from(countries);
  selectedCountry.value = countryOptions.value.includes("Canada")
    ? "Canada"
    : countryOptions.value[0];
};

onMounted(fetchCountries);

watchEffect(async () => {
  if (!selectedCountry.value) return;
  const startTime = performance.now();
  console.log(`Fetching data for: ${selectedCountry.value}`);
  const response = await fetch(
    `http://universities.hipolabs.com/search?country=${encodeURIComponent(
      selectedCountry.value
    )}`
  );
  apiResponseCode.value = response.status;
  const endTime = performance.now();
  apiResponseTime.value = endTime - startTime;
  if (!response.ok) {
    console.error("Failed to fetch data:", response.statusText);
    return;
  }
  countriesData.value = await response.json();
  console.log("Fetched data:", countriesData.value);
});

const clearFilters = () => {
  selectedCountry.value = "Canada";
  searchField.value = "";
};

const filteredCountriesData = computed(() => {
  return countriesData.value.filter((country) =>
    country.name.toLowerCase().includes(searchField.value.toLowerCase())
  );
});

const { savedResultsFav, saveResult, removeResult } = saveResultsToFavourites();

function toggleSaved(favorite) {
  if (isSaved(favorite)) {
    removeResult(favorite);
  } else {
    saveResult(favorite);
  }
}

function isSaved(favorite) {
  return !!savedResultsFav.value.find((saved) => saved.name === favorite.name);
}
</script>

<style lang="scss" scoped></style>
