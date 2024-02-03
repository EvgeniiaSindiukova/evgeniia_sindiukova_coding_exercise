<template>
  <header class="shadow-sm bg-white">
    <nav
      class="container mx-auto p-4 flex flex-col md:flex-row justify-between items-center"
    >
      <ul
        class="flex flex-col md:flex-row gap-4 mx-auto my-3"
        style="max-width: 500px; width: 100%"
      >
        <li class="flex-1 min-w-0">
          <NuxtLink
            to="/"
            class="font-bold text-blue-800 bg-blue-100 hover:bg-blue-200 py-2 px-2 md:px-4 rounded text-center block truncate transition duration-300 ease-in-out hover:shadow-lg"
            >Search</NuxtLink
          >
        </li>
        <li class="flex-1 min-w-0">
          <NuxtLink
            to="/favourites"
            class="font-bold text-blue-800 bg-blue-100 hover:bg-blue-200 py-2 px-2 md:px-4 rounded text-center block truncate transition duration-300 ease-in-out hover:shadow-lg"
            >Favourites</NuxtLink
          >
        </li>
      </ul>
    </nav>
  </header>
  <div>
    <slot />
  </div>
</template>
