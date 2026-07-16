<script lang="ts" setup>
import {RouterView} from 'vue-router'
import AdminHeader from "@/components/admin/AdminHeader.vue";
import Sidebar from "@/components/admin/Sidebar.vue";
</script>

<template>
  <svg class="hidden">
    <filter id="noise">
      <feTurbulence
          type="fractalNoise"
          baseFrequency="0.80"
          numOctaves="4"
          stitchTiles="stitch"/>
    </filter>
  </svg>
  <body class="dark:text-white">
  <div>
    <AdminHeader/>
  </div>
  <main class="flex h-full bg-white dark:bg-gray-900">
    <div>
      <Sidebar/>
    </div>
    <div class="hidden">
      <button name="burgerMenu" class="border-transparent rounded-md cursor-pointer bg-white hover:bg-red-200">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </div>
    <div class="flex-1 rounded-tl-2xl dark:bg-black/30 bg-gray-200">
      <div>
        <RouterView/>
      </div>
    </div>
  </main>
  </body>
</template>
<style scoped>

</style>