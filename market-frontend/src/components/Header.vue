<script lang="ts" setup>
import ToggleThemeButton from "../composables/vue/ToggleThemeButton.vue";

let token = sessionStorage.getItem('token')
</script>
<template>
  <header class="header">
    <div class="max-w-7xl mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <h1 class="text-2xl md:text-3xl">
            <router-link class="text-blue-900"
                         to="/">

              Wood&Clay


            </router-link>
          </h1>
        </div>
        <nav class="hidden md:flex items-center gap-8">
          <router-link
              class="text-slate-700 hover:text-blue-900 transition-colors dark:text-orange-600 dark:hover:text-orange-400"
              to="/">
            Home

          </router-link>
          <router-link
              class="text-slate-700 hover:text-blue-900 transition-colors dark:text-orange-600 dark:hover:text-orange-400"
              to="test">
            Collection

          </router-link>
          <router-link
              class="text-slate-700 hover:text-blue-900 transition-colors dark:text-orange-600 dark:hover:text-orange-400"
              to="about">
            About

          </router-link>
          <router-link
              class="text-slate-700 hover:text-blue-900 transition-colors dark:text-orange-600 dark:hover:text-orange-400"
              to="contact">
            Contact

          </router-link>
        </nav>
        <div class="flex items-center gap-4">
          <ToggleThemeButton/>
          <router-link
              class="p-2 hover:bg-slate-100 rounded-full transition-colors h-5 w-5 dark:bg-gray-900 dark:hover:bg-gray-800"
              to="profile">

            <svg class="lucide lucide-user w-5 h-5 text-slate-700" fill="none" height="24" stroke="currentColor"
                 stroke-linecap="round"
                 stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>

          </router-link>
          <router-link class="p-2 hover:bg-slate-100 rounded-full transition-colors relative h-5 w-5"
                       to="cart">

            <svg class="lucide lucide-shopping-cart w-5 h-5 text-slate-700" fill="none" height="24"
                 stroke="currentColor" stroke-linecap="round"
                 stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"
                 xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="21" r="1"></circle>
              <circle cx="19" cy="21" r="1"></circle>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
            </svg>

            <span
                class="absolute -top-1 -right-1 bg-blue-900 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">

              3

            </span>
          </router-link>
          <div class="flex">
            <router-link class="btn-default"
                         to="admin">
              <!--                         v-if="user && user.role === 'admin'"-->

              Admin Panel

            </router-link>
            <router-link class="btn-primary ml-4"
                         to="signin"
                         v-if="token == null">

              Login

            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>