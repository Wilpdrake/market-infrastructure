<script lang="ts" setup>
import {computed, onMounted, onUnmounted, ref, watch} from 'vue';

interface User {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  email: string;
  phone: string;
  role: string;
}

const search = ref('');
const selectedRole = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);

watch(itemsPerPage, () => {
  currentPage.value = 1;
});

const isAdvancedOpen = ref(false);
const advName = ref('');
const advSurname = ref('');
const advPatronymic = ref('');
const advEmail = ref('');
const advPhone = ref('');

const generateFakeUsers = (count: number): User[] => {
  const roles = ['Admin', 'Moderator', 'User', 'Supporter'];

  // FIXME: Demo data. Replace with API call
  const firstNames = [
    'Александр', 'Иван', 'Дмитрий', 'Мария', 'Елена', 'Алексей', 'Андрей', 'Сергей', 'Михаил', 'Николай',
    'Владимир', 'Максим', 'Артем', 'Антон', 'Денис', 'Игорь', 'Олег', 'Павел', 'Роман', 'Егор',
    'Никита', 'Владислав', 'Илья', 'Кирилл', 'Глеб', 'Даниил', 'Ярослав', 'Евгений', 'Руслан', 'Тимур',
    'Анна', 'Ольга', 'Татьяна', 'Наталья', 'Екатерина', 'Светлана', 'Юлия', 'Анастасия', 'Ирина', 'Ксения',
    'Дарья', 'Алина', 'Виктория', 'Евгения', 'Любовь', 'Надежда', 'Вера', 'София', 'Полина', 'Елизавета',
    'Вадим', 'Станислав', 'Артур', 'Георгий', 'Валерий', 'Виталий', 'Юрий', 'Анатолий', 'Борис', 'Виктор',
    'Геннадий', 'Леонид', 'Петр', 'Степан', 'Святослав', 'Ростислав', 'Матвей', 'Марк', 'Давид', 'Альберт',
    'Маргарита', 'Кристина', 'Алена', 'Яна', 'Инна', 'Алла', 'Лариса', 'Марина', 'Оксана', 'Вероника',
    'Ангелина', 'Валерия', 'Василиса', 'Милана', 'Ульяна', 'Таисия', 'Диана', 'Карина', 'Эльвира', 'Нина',
    'Арсений', 'Федор', 'Лев', 'Тихон', 'Семен', 'Вячеслав', 'Кира', 'Лилия', 'Ярослава', 'Родион'
  ];
  const surnames = [
    'Иванов', 'Петров', 'Смирнов', 'Кузнецов', 'Попова', 'Васильев', 'Соколов', 'Михайлов', 'Новиков', 'Федоров',
    'Морозов', 'Волков', 'Алексеев', 'Лебедев', 'Семенов', 'Егоров', 'Павлов', 'Козлов', 'Степанов', 'Николаев',
    'Орлов', 'Андреев', 'Макаров', 'Никитин', 'Захаров', 'Зайцев', 'Соловьев', 'Борисов', 'Яковлев', 'Григорьев',
    'Романов', 'Воробьев', 'Сергеев', 'Кузьмин', 'Фролов', 'Поляков', 'Малышев', 'Сорокин', 'Ильин', 'Гусев',
    'Титов', 'Зимин', 'Кудрявцев', 'Баранов', 'Белов', 'Куликов', 'Максимов', 'Комаров', 'Киселев', 'Медведев',
    'Ершов', 'Никифоров', 'Тарасов', 'Беляев', 'Королев', 'Жуков', 'Власов', 'Дорофеев', 'Румянцев', 'Богданов',
    'Виноградов', 'Мартынов', 'Пономарев', 'Казаков', 'Шаров', 'Плотников', 'Тимофеев', 'Кудряшов', 'Александров', 'Антонов',
    'Данилов', 'Журавлев', 'Денисов', 'Калинин', 'Трофимов', 'Архипов', 'Федотов', 'Рожков', 'Прохоров', 'Савельев',
    'Евдокимов', 'Белоусов', 'Логинов', 'Сазонов', 'Некрасов', 'Кулагин', 'Анисимов', 'Марков', 'Карпов', 'Ковалев',
    'Маслов', 'Кошелев', 'Селезнев', 'Канаев', 'Тихонов', 'Фомин', 'Чесноков', 'Якушев', 'Голубев', 'Панфилов'
  ];
  const patronymics = [
    'Александрович', 'Иванович', 'Дмитриевич', 'Сергеевич', 'Алексеевич', 'Андреевич', 'Михайлович', 'Николаевич', 'Владимирович', 'Максимович',
    'Артемович', 'Антонович', 'Денисович', 'Игоревич', 'Олегович', 'Павлович', 'Романович', 'Егорович', 'Никитич', 'Владиславович',
    'Ильич', 'Кириллович', 'Глебович', 'Данилович', 'Ярославович', 'Евгеньевич', 'Русланович', 'Тимурович', 'Юрьевич', 'Анатольевич',
    'Борисович', 'Викторович', 'Геннадьевич', 'Леонидович', 'Петрович', 'Степанович', 'Валерьевич', 'Витальевич', 'Вадимович', 'Станиславович',
    'Федорович', 'Семенович', 'Вячеславович', 'Матвеевич', 'Маркович', 'Львович', 'Арсеньевич', 'Васильевич', 'Григорьевич', 'Родионович',
    'Александровна', 'Ивановна', 'Дмитриевна', 'Сергеевна', 'Алексеевна', 'Андреевна', 'Михайловна', 'Николаевна', 'Владимировна', 'Максимовна',
    'Артемовна', 'Антоновна', 'Денисовна', 'Игоревна', 'Олеговна', 'Павловна', 'Романовна', 'Егоровна', 'Никитична', 'Владиславовна',
    'Ильинична', 'Кирилловна', 'Глебовна', 'Даниловна', 'Ярославовна', 'Евгеньевна', 'Руслановна', 'Тимуровна', 'Юрьевна', 'Анатольевна',
    'Борисовна', 'Викторовна', 'Геннадьевна', 'Леонидовна', 'Петровна', 'Степановна', 'Валерьевна', 'Витальевна', 'Вадимовна', 'Станиславовна',
    'Федоровна', 'Семеновна', 'Вячеславовна', 'Матвеевна', 'Марковна', 'Львовна', 'Арсеньевна', 'Васильевна', 'Григорьевна', 'Родионовна'
  ];


  //
  return Array.from({length: count}, (_, index) => {
    const id = index + 1;
    return {
      id,
      name: firstNames[Math.floor(Math.random() * firstNames.length)] || '',
      surname: surnames[Math.floor(Math.random() * surnames.length)] || '',
      patronymic: patronymics[Math.floor(Math.random() * patronymics.length)] || '',
      email: `user${id}@example.com` || '',
      phone: `+7 (999) 123-44-${String(id).padStart(2, '0')}` || '',
      role: roles[Math.floor(Math.random() * roles.length)] || ''
    };
  });
};

const users = ref<User[]>(generateFakeUsers(15000));

watch([search, selectedRole, advName, advSurname, advPatronymic, advEmail, advPhone], () => {
  currentPage.value = 1;
});

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    if (search.value.trim()) {
      const q = search.value.toLowerCase();
      const fio = `${user.surname} ${user.name} ${user.patronymic}`.toLowerCase();
      if (!fio.includes(q)) return false;
    }
    if (selectedRole.value && user.role !== selectedRole.value) return false;
    if (advName.value.trim() && !user.name.toLowerCase().includes(advName.value.toLowerCase())) return false;
    if (advSurname.value.trim() && !user.surname.toLowerCase().includes(advSurname.value.toLowerCase())) return false;
    if (advPatronymic.value.trim() && !user.patronymic.toLowerCase().includes(advPatronymic.value.toLowerCase())) return false;
    if (advEmail.value.trim() && !user.email.toLowerCase().includes(advEmail.value.toLowerCase())) return false;
    return !(advPhone.value.trim() && !user.phone.replace(/\D/g, '').includes(advPhone.value.replace(/\D/g, '')));
  });
});

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredUsers.value.slice(start, start + itemsPerPage.value);
});

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage.value));

const resetAdvanced = () => {
  advName.value = '';
  advSurname.value = '';
  advPatronymic.value = '';
  advEmail.value = '';
  advPhone.value = '';
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isAdvancedOpen.value) {
    isAdvancedOpen.value = false;
  }
};

onMounted(() => window.addEventListener('keydown', handleKeyDown));
onUnmounted(() => window.removeEventListener('keydown', handleKeyDown));
</script>
<template>
  <div class="admin-panel_container" style="font-family: Sans, sans-serif">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="navbar-container">
        <div class="search flex-1 md:flex-initial">
          <input id="search" v-model="search" class="search__input" placeholder="Поиск по ФИО..." type="text">
          <button class="search__button">
            <svg height="15" viewBox="0 0 20 20" width="15">
              <path
                  d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33l-1.42 1.42l-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
            </svg>
          </button>
        </div>

        <div class="dropdown-container">
          <select v-model="selectedRole"
                  class="border-transparent hover:bg-gray-200 dark:hover:bg-gray-500 bg-white dark:bg-gray-600 text-sm text-black dark:text-white focus:outline-none rounded-md px-4 h-10"
                  name="navbar-roles-selector">
            <option value="">All roles</option>
            <option value="Admin">Admin</option>
            <option value="Moderator">Moderator</option>
            <option value="User">User</option>
            <option value="Supporter">Supporter</option>
          </select>
        </div>

        <button class="btn-default" @click="isAdvancedOpen = true" name="navbar-adv-search-btn">
          Advanced Search
        </button>

        <div class="flex items-center gap-2 px-4 h-10 bg-white rounded-md dark:bg-gray-600" name="navbar-showby-selector">
          <span class="text-sm">Show by:</span>
          <div class="dropdown-container">
            <select
              v-model.number="itemsPerPage"
              class="border-transparent hover:bg-gray-200 dark:hover:bg-gray-500 bg-white dark:bg-gray-600 text-sm text-black dark:text-white focus:outline-none rounded p-1">
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
          </div>
        </div>

      </div>

      <router-link class="btn-primary self-start md:self-auto" name="admin__addUserButton" to="/admin/users/add">
        <span class="mr-2">Add User</span>
        <svg height="15" viewBox="0 0 20 20" width="15">
          <path d="M11 9V4H9v5H4v2h5v5h2v-5h5V9z" fill="currentColor"/>
        </svg>
      </router-link>
    </div>

    <div class="hidden md:block overflow-x-auto">
      <table class="admin-table">
        <thead>
        <tr>
          <th class="px-6 py-3 text-left">#ID</th>
          <th class="px-6 py-3 text-left">Фамилия</th>
          <th class="px-6 py-3 text-left">Имя</th>
          <th class="px-6 py-3 text-left">Отчество</th>
          <th class="px-6 py-3 text-left">Email</th>
          <th class="px-6 py-3 text-left">Телефон</th>
          <th class="px-6 py-3 text-left">Роль</th>
          <th class="px-6 py-3 text-left">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in paginatedUsers" :key="user.id">
          <td class="px-6 py-4">{{ user.id }}</td>
          <td class="px-6 py-4 font-semibold">{{ user.surname }}</td>
          <td class="px-6 py-4">{{ user.name }}</td>
          <td class="px-6 py-4">{{ user.patronymic }}</td>
          <td class="px-6 py-4">{{ user.email }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ user.phone }}</td>
          <td class="px-6 py-4">{{ user.role }}</td>
          <td class="px-6 py-4 flex justify-between gap-2">
            <router-link
                :to="`user/profile/${user.id}`"
                class="text-black dark:text-blue-500 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-sm w-6 h-6 flex justify-center items-center">
              <svg class="fill-current" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M2.097 12c1.441 4.08 5.332 7 9.903 7c4.57 0 8.46-2.92 9.902-7C20.461 7.92 16.57 5 12 5c-4.57 0-8.462 2.92-9.903 7Zm-2.008-.304C1.7 6.654 6.421 3 12 3c5.58 0 10.302 3.654 11.91 8.696l.098.304l-.097.304C22.3 17.346 17.578 21 12 21C6.42 21 1.698 17.346.09 12.304L-.009 12l.097-.304ZM12 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0a5 5 0 0 1-10 0Z"
                />
              </svg>
            </router-link>
            <router-link
                :to="`user/edit/${user.id}`"
                class="text-indigo-600 hover:text-indigo-900 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-sm w-6 h-6 flex justify-center items-center">
              <svg fill="#000000" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" stroke="#e88f23" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                  <path
                      d="M19.09 14.441v4.44a2.37 2.37 0 0 1-2.369 2.369H5.12a2.37 2.37 0 0 1-2.369-2.383V7.279a2.356 2.356 0 0 1 2.37-2.37H9.56"/>
                  <path
                      d="M6.835 15.803v-2.165c.002-.357.144-.7.395-.953l9.532-9.532a1.362 1.362 0 0 1 1.934 0l2.151 2.151a1.36 1.36 0 0 1 0 1.934l-9.532 9.532a1.361 1.361 0 0 1-.953.395H8.197a1.362 1.362 0 0 1-1.362-1.362M19.09 8.995l-4.085-4.086"/>
                </g>
              </svg>
            </router-link>
            <a class="text-indigo-600 hover:text-indigo-900 hover:bg-gray-300 rounded-sm dark:hover:bg-gray-700 w-6 h-6 flex justify-center items-center"
               href="" onclick="return confirm('Are you sure want to delete this user?')">
              <svg height="20" viewBox="0 0 26 26" width="20" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11.5-.031c-1.958 0-3.531 1.627-3.531 3.594V4H4c-.551 0-1 .449-1 1v1H2v2h2v15c0 1.645 1.355 3 3 3h12c1.645 0 3-1.355 3-3V8h2V6h-1V5c0-.551-.449-1-1-1h-3.969v-.438c0-1.966-1.573-3.593-3.531-3.593h-3zm0 2.062h3c.804 0 1.469.656 1.469 1.531V4H10.03v-.438c0-.875.665-1.53 1.469-1.53zM6 8h5.125c.124.013.247.031.375.031h3c.128 0 .25-.018.375-.031H20v15c0 .563-.437 1-1 1H7c-.563 0-1-.437-1-1V8zm2 2v12h2V10H8zm4 0v12h2V10h-2zm4 0v12h2V10h-2z"
                    fill="#e82323"/>
              </svg>
            </a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="block md:hidden space-y-4">
      <div v-for="user in paginatedUsers" :key="user.id"
           class="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm space-y-2 text-black dark:text-gray-200">
        <div class="flex justify-between items-center border-b dark:border-gray-700 pb-2 text-xs">
          <span class="text-gray-400">#{{ user.id }}</span>
          <span class="font-bold">{{ user.role }}</span>
        </div>
        <div class="text-base font-bold">{{ user.surname }} {{ user.name }} {{ user.patronymic }}</div>
        <div class="text-xs text-gray-500 dark:text-gray-400"><strong>Email:</strong> {{ user.email }}</div>
        <div class="text-xs text-gray-500 dark:text-gray-400"><strong>Тел:</strong> {{ user.phone }}</div>
        <div class="flex justify-end gap-4 pt-2 border-t dark:border-gray-700 text-sm font-medium">
          <router-link :to="`user/profile/${user.id}`" class="text-blue-500">View</router-link>
          <router-link :to="`user/edit/${user.id}`" class="text-orange-500">Edit</router-link>
        </div>
      </div>
    </div>

    <div v-if="paginatedUsers.length === 0" class="text-center p-8 text-gray-400 dark:text-gray-500 mt-4">
      No users found.
    </div>

    <div v-if="totalPages > 1" class="flex justify-center items-center gap-4 mt-4 text-sm text-black dark:text-white">
      <button :disabled="currentPage === 1" class="btn-default disabled:opacity-[50%]"
              @click="currentPage--">

        <i class="fa-solid fa-arrow-left"></i> &nbsp; <span name="">Previous Page</span>

      </button>
      <span style="font-family: Sans, sans-serif">Page {{ currentPage }} of {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages"
              class="btn-default disabled:opacity-[50%]"
              @click="currentPage++">

        <span>Next Page</span> &nbsp;<i class="fa-solid fa-arrow-right"></i>

      </button>
    </div>

    <div v-if="isAdvancedOpen" class="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
         @click.self="isAdvancedOpen = false">
      <div
          class="bg-white dark:bg-gray-900 text-black dark:text-white rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4 border dark:border-gray-700">
        <h3 class="text-lg font-bold border-b dark:border-gray-700 pb-2">

          Advanced Search

        </h3>
        <div class="grid grid-cols-1 gap-3 text-sm">
          <label class="admin-form-input">
            <span>

            Surname

          </span>
            <input v-model="advSurname"
                   class="w-full mt-1 border dark:border-gray-600 p-2 rounded-md bg-transparent"
                   type="text">
          </label>
          <label class="admin-form-input">
            <span>

            Name

          </span>
            <input v-model="advName"
                   class="w-full mt-1 border dark:border-gray-600 p-2 rounded-md bg-transparent"
                   type="text">
          </label>
          <label class="admin-form-input">
            <span>

              Patronymic

            </span>
            <input v-model="advPatronymic"
                   class="w-full mt-1 border dark:border-gray-600 p-2 rounded-md bg-transparent"
                   type="text">
          </label>
          <label class="admin-form-input">
            <span>

              Email

            </span>
            <input v-model="advEmail"
                   class="w-full mt-1 border dark:border-gray-600 p-2 rounded-md bg-transparent"
                   type="text">
          </label>
          <label class="admin-form-input">
            <span>

              Phone

            </span>
            <input v-model="advPhone"
                   class="w-full mt-1 border dark:border-gray-600 p-2 rounded-md bg-transparent"
                   type="text">
          </label>
        </div>
        <div class="flex justify-between items-center pt-4 border-t dark:border-gray-700">
          <button class="btn-red" @click="resetAdvanced">

            Clear

          </button>
          <button class="btn-primary" @click="isAdvancedOpen = false">

            Apply

          </button>
        </div>
      </div>
    </div>
  </div>
  <router-link to="/admin/users/add">
    <span class="btn-primary__mobile_add fa-solid fa-plus"></span>
  </router-link>
</template>
