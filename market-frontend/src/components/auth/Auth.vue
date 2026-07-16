<script setup lang="ts">
import {useAuthStore} from "@/stores/auth.ts";
import {ref} from "vue";

const token = ref(localStorage.getItem('token'));
</script>

<template>
  <h1>
    Auth Token:
    "{{ useAuthStore.token }}"
    Session Token:
    "{{ token }}"
  </h1>
</template>
