<script setup lang="ts">
import {computed} from 'vue';
import HeaderView from '@/components/Header.vue';

interface User {
  uuid: string;
  name: string;
  surname: string;
  patronymic: string | null;
  email: string;
  contact_number: string | null;
  telegram_username: string | null;
  comment: string | null;
  avatar_image: string | null;
  header_image: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

const mockUser: User = {
  uuid: '550e8400-e29b-41d4-a716-446655440000',
  name: 'Иван',
  surname: 'Иванов',
  patronymic: 'Иванович',
  email: 'ivanov@example.com',
  contact_number: '+7 (999) 123-45-67',
  telegram_username: 'vanya_dev',
  comment: 'Разработчик интерфейсов. Люблю чистый код и Tailwind.',
  avatar_image: null,
  header_image: null,
  role: 'ADMIN',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const props = defineProps<{
  user?: User
}>();

const currentUser = computed(() => props.user || mockUser);

const fullName = computed(() => {
  const u = currentUser.value;
  return [u.surname, u.name, u.patronymic].filter(Boolean).join(' ');
});

const infoFields = computed(() => ({
  'Email': currentUser.value.email,
  'Телефон': currentUser.value.contact_number,
  'Telegram': currentUser.value.telegram_username ? `@${currentUser.value.telegram_username}` : null,
  'Должность': currentUser.value.role,
}));

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
};
</script>

<template>
  <HeaderView/>
  <div class="min-h-screen bg-[#f8fafc] p-4 md:p-8">
    <div class="max-w-4xl mx-auto space-y-6">

      <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="h-32 relative bg-gradient-to-r from-slate-200 to-slate-300">
          <img v-if="currentUser.header_image" :src="currentUser.header_image" class="w-full h-full object-cover"
               alt="Header"/>
          <div v-else class="w-full h-full flex items-center justify-center opacity-20 text-slate-600">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
        </div>

        <div class="px-6 pb-6">
          <div class="relative flex justify-between items-end -mt-12 mb-4">
            <div class="p-1 bg-white rounded-2xl shadow-sm">
              <div
                  class="w-24 h-24 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 overflow-hidden border-2 border-white ring-1 ring-slate-100">
                <img v-if="currentUser.avatar_image" :src="currentUser.avatar_image" class="w-full h-full object-cover"
                     alt="Avatar"/>
                <span v-else class="text-2xl font-bold text-slate-300 uppercase">
                  {{ currentUser.name?.[0] }}{{ currentUser.surname?.[0] }}
                </span>
              </div>
            </div>
            <router-link to="#" class="btn-primary">
              Редактировать
            </router-link>
          </div>

          <div>
            <h1 class="text-2xl font-bold text-slate-900">
              {{ fullName || 'Загрузка...' }}
            </h1>
            <div class="flex items-center gap-2 mt-1">
              <span
                  class="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[10px] font-bold uppercase tracking-wider border border-indigo-100">
                {{ currentUser.role || 'USER' }}
              </span>
              <span class="text-slate-300">|</span>
              <span class="text-sm text-slate-500 font-mono">
                uuid: {{ currentUser.uuid ? currentUser.uuid.split('-')[0] : '--------' }}...
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div class="md:col-span-2 space-y-6">
          <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Основная информация</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
              <div v-for="(val, label) in infoFields" :key="label" class="flex flex-col">
                <label class="text-[11px] font-semibold text-slate-400 uppercase mb-1">{{ label }}</label>
                <span :class="['text-sm font-medium', val ? 'text-slate-800' : 'text-slate-300 italic']">
                  {{ val || 'не указано' }}
                </span>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Комментарий</h2>
            <p :class="['text-sm leading-relaxed', currentUser.comment ? 'text-slate-600' : 'text-slate-400 italic']">
              {{ currentUser.comment || 'Здесь будет отображаться ваш комментарий...' }}
            </p>
          </div>
        </div>

        <div class="space-y-6">
          <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit">
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Системные данные</h3>
            <div class="space-y-4">
              <div class="flex flex-col">
                <span class="text-[11px] text-slate-400 font-medium">Создан</span>
                <span class="text-sm text-slate-700 font-medium">{{ formatDate(currentUser.created_at) }}</span>
              </div>
              <div class="flex flex-col border-t border-slate-50 pt-3">
                <span class="text-[11px] text-slate-400 font-medium">Обновлен</span>
                <span class="text-sm text-slate-700">{{ formatDate(currentUser.updated_at) }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>