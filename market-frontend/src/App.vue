<script lang="ts" setup>
import {RouterView} from 'vue-router'
import Loading from "@/composables/vue/Loading.vue";
</script>

<template>
  <Loading/>
  <RouterView/>
</template>

<style scoped>
@reference url("@/assets/css/app.css");
</style>