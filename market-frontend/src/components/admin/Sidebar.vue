<script lang="ts" setup>
import {useBreadcrumbs} from "@/composables/ts/use.breadcrumbs.ts";
import {currentPage} from '@/composables/ts/use.current.page.ts';

const bcData = useBreadcrumbs();

const {currentLabel} = currentPage(bcData);
</script>
<template>
  <aside class="sticky top-0 w-[260px] h-screen px-5 py-8 overflow-y-auto bg-white bg-gray-200 dark:bg-gray-900">

    <div class="flex flex-col justify-between flex-1 mt-6">
      <nav class="flex-1 -mx-3 space-y-3">

        <router-link
            :class="currentLabel === 'dashboard' ? 'bg-gray-100 dark:bg-gray-800' : ''"
            class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            to="/admin/dashboard">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                stroke-linecap="round"
                stroke-linejoin="round"/>
          </svg>
          <span class="mx-2 text-sm font-medium">Dashboard</span>
        </router-link>

        <router-link
            :class="currentLabel === 'users' ? 'bg-gray-100 dark:bg-gray-800' : ''"
            class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            to="/admin/users">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                stroke-linecap="round"
                stroke-linejoin="round"/>
          </svg>
          <span class="mx-2 text-sm font-medium">Users</span>
        </router-link>

        <router-link
            :class="currentLabel === 'products' ? 'bg-gray-100 dark:bg-gray-800' : ''"
            class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            to="/admin/products">
          <svg class="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                d="m12 12l8.073-4.625M12 12v9.25M12 12L7.963 9.688m12.11-2.313a3.17 3.17 0 0 0-1.165-1.156L16.25 4.696m3.823 2.679c.275.472.427 1.015.427 1.58v6.09a3.15 3.15 0 0 1-1.592 2.736l-5.316 3.046A3.2 3.2 0 0 1 12 21.25M3.926 7.375a3.14 3.14 0 0 0-.426 1.58v6.09c0 1.13.607 2.172 1.592 2.736l5.316 3.046A3.2 3.2 0 0 0 12 21.25M3.926 7.375a3.17 3.17 0 0 1 1.166-1.156l5.316-3.046a3.2 3.2 0 0 1 3.184 0l2.658 1.523M3.926 7.375l4.037 2.313m0 0l8.287-4.992" fill="none" stroke="currentColor" stroke-linejoin="round"
                stroke-width="1.5"/>
          </svg>
          <span class="mx-2 text-sm font-medium">Products</span>
        </router-link>
      </nav>

      <div class="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
        <router-link
            class="flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            to="#">
          <img alt="Avatar" class="object-cover w-8 h-8 rounded-full" src="https://unsplash.com">
          <div class="ml-3 overflow-hidden">
            <p class="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">Alex Gzhel</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">admin@gzhel.art</p>
          </div>
        </router-link>
      </div>
    </div>
  </aside>
</template>
