<script lang="ts" setup>
import ToggleThemeButton from "../../composables/vue/ToggleThemeButton.vue";
</script>
<template>
  <header class="flex items-center justify-between p-4 bg-white dark:bg-gray-900">
    <div class="flex items-center">
      <div class="relative mx-0">
        <h1 class="text-xl font-semibold text-gray-800 dark:text-white italic" style="font-family: 'Sans', sans-serif">

          Admin Panel

        </h1>
        <p class="text-xs text-gray-500 dark:text-gray-400"></p>
      </div>
    </div>
    <div class="flex items-center space-x-3">
      <ToggleThemeButton/>
      <router-link class="btn-primary"
                   to="/">

        Home Page

      </router-link>
    </div>
  </header>
</template>