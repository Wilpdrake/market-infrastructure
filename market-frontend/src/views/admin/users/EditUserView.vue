<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import type User from '@/types/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// Инициализируем пустой объект или null, чтобы избежать проблем с v-model
const user = ref<User | null>(null)

async function fetchUser() {
  const id = route.params.id as string
  const data = await userStore.getUser(id)
  // Создаем копию объекта, чтобы не мутировать данные в сторе до сохранения
  user.value = data ? { ...data } : null
}

fetchUser()

async function updateUser() {
  // Если данные еще не загрузились, ничего не делаем
  if (!user.value) return

  const id = route.params.id as string

  // Вариант 1: Если ваш стор принимает обычный объект (рекомендуется во Vue)
  await userStore.updateUser(id, user.value)

  // Вариант 2: Если бэкенд строго требует FormData (раскомментируйте, если нужно):
  /*
  const formData = new FormData()
  formData.append('username', user.value.username)
  formData.append('email', user.value.email)
  if (user.value.password) formData.append('password', user.value.password)
  formData.append('role', user.value.role)
  await userStore.updateUser(id, formData)
  */

  router.push('/admin/users')
}
</script>

<template>
  <!-- Исправили опечатки в классах: overflow-hidden и rounded-xl -->
  <div class="overflow-hidden rounded-xl container flex justify-center items-center h-screen bg-slate-50">

    <!-- Добавили проверку v-if, чтобы форма не рендерилась с пустым user -->
    <form v-if="user" @submit.prevent="updateUser" class="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-white p-10 rounded-xl shadow-md w-full max-w-lg">

      <div class="col-span-2">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-700">Username</label>
        <!-- Убрали знак "?" из v-model -->
        <input
            id="username"
            v-model="user.username"
            type="text"
            class="rounded-md border border-gray-300 p-2 w-full focus:outline-none focus:border-blue-500"
            required
        />
      </div>

      <div class="col-span-2">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-700">Email</label>
        <input
            id="email"
            v-model="user.email"
            type="email"
            class="rounded-md border border-gray-300 p-2 w-full focus:outline-none focus:border-blue-500"
            required
        />
      </div>

      <div class="col-span-2">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-700">Password</label>
        <input
            id="password"
            v-model="user.password"
            type="password"
            class="rounded-md border border-gray-300 p-2 w-full focus:outline-none focus:border-blue-500"
            placeholder="Оставьте пустым, если не хотите менять"
        />
      </div>

      <div class="col-span-2">
        <label for="role" class="block mb-2 text-sm font-medium text-gray-700">Role</label>
        <select
            id="role"
            v-model="user.role"
            class="rounded-md border border-gray-300 p-2 w-full bg-white focus:outline-none focus:border-blue-500"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div class="col-span-2 mt-2">
        <button type="submit" class="rounded-md bg-blue-600 hover:bg-blue-700 transition-colors text-white p-2 w-full font-medium">
          Update User
        </button>
      </div>
    </form>

    <!-- Спиннер или заглушка на время загрузки данных -->
    <div v-else class="text-gray-500">Загрузка данных пользователя...</div>

  </div>
</template>
