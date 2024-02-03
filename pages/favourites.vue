<template>
  <div class="bg-gray-100 p-4 sm:p-8 overflow-x-auto">
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <!-- Mobile -->
      <div class="min-w-full lg:hidden">
        <div
          v-for="favorite in savedResultsFav"
          :key="favorite.name"
          class="p-4 border-b border-gray-200 last:border-b-0"
        >
          <div class="font-semibold text-lg text-blue-800 mb-2">
            {{ favorite.name }}
          </div>
          <div class="text-gray-800">
            <strong>State/Province:</strong>
            {{ favorite["state-province"] || "N/A" }}
          </div>
          <div class="text-gray-800 mt-2">
            <strong>Website:</strong>
            <div v-for="domain in favorite.domains" :key="domain">
              {{ domain }}
            </div>
          </div>
          <button
            @click="removeResult(favorite)"
            class="mt-4 text-white font-semibold py-2 px-4 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 transition ease-in-out duration-150 block w-full text-center bg-red-500 hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      </div>
      <!-- Desktop -->
      <table class="hidden lg:min-w-full lg:table">
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
          <tr v-for="favorite in savedResultsFav" :key="favorite.name">
            <td class="px-6 py-4 border-t border-gray-200 text-gray-900">
              {{ favorite.name }}
            </td>
            <td class="px-6 py-4 border-t border-gray-200 text-gray-900">
              {{ favorite["state-province"] || "N/A" }}
            </td>
            <td class="px-6 py-4 border-t border-gray-200">
              <div v-for="domain in favorite.domains" :key="domain">
                {{ domain }}
              </div>
            </td>
            <td class="px-6 py-4 border-t border-gray-200">
              <button
                @click="removeResult(favorite)"
                class="w-32 text-white bg-red-500 hover:bg-red-600 font-semibold py-2 px-4 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const { savedResultsFav, removeResult } = saveResultsToFavourites();
</script>
