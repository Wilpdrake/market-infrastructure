<script lang="ts" setup>
import {onMounted, ref} from 'vue'

const isLoading = ref(true)

onMounted(() => {
  window.addEventListener('load', () => {
    isLoading.value = false
  })
})
</script>

<template>
  <Transition
      leave-active-class="transition duration-500 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
  >
    <div v-if="isLoading"
         class="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-800 z-50 fullscreen bg-transparent">
      <div class="flex space-x-4">
        <span class="dot"></span>
        <span class="dot delay-200"></span>
        <span class="dot delay-400"></span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
@import "../../assets/css/app.css";

@reference url("../asstest/css/app.css");
.dot {
  @apply w-4 h-4 bg-blue-600 rounded-full opacity-0;
  animation: fade-in-out 1.5s infinite ease-in-out;
}

.delay-200 {
  animation-delay: 0.2s;
}

.delay-400 {
  animation-delay: 0.4s;
}

@keyframes fade-in-out {
  0%, 100% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
