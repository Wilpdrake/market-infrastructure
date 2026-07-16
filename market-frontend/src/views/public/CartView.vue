<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
// Импортируем существующий компонент шапки вашего проекта
import Header from '@/components/Header.vue'
import {useNavigation} from "../../composables/ts/use.route.navigation";

interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
  image: string
  code: string
  inStock: boolean
}

const router = useRouter()

// Демо-данные товаров
const cartItems = ref<CartItem[]>([
  {
    id: 1,
    title: 'Фарфоровая фигурка «Птица счастья»',
    code: 'GZ-0482',
    price: 4500,
    quantity: 1,
    image: 'https://unsplash.com',
    inStock: true
  },
  {
    id: 2,
    title: 'Ваза коллекционная «Зимняя сказка»',
    code: 'GZ-1105',
    price: 12800,
    quantity: 2,
    image: 'https://unsplash.com',
    inStock: true
  }
])

// Изменение количества
const updateQuantity = (id: number, delta: number) => {
  const item = cartItems.value.find(i => i.id === id)
  if (item) {
    const newQty = item.quantity + delta
    if (newQty <= 0) {
      removeItem(id)
    } else {
      item.quantity = newQty
    }
  }
}

// Удаление товара из корзины
const removeItem = (id: number) => {
  cartItems.value = cartItems.value.filter(i => i.id !== id)
}

// Расчеты стоимости
const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

const formatPrice = (value: number) => {
  return value.toLocaleString('ru-RU') + ' ₽'
}

// Функция для кнопки «Назад»
const {goBack} = useNavigation()

</script>

<template>
  <div class="min-h-screen bg-white font-sans text-slate-800 flex flex-col">

    <!-- Подключаем существующий компонент шапки -->
    <Header />

    <!-- Основной контент страницы -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">

      <!-- Кнопка «Вернуться назад» и Заголовок -->
      <div class="border-b border-slate-200 pb-5 mb-8 space-y-4">

        <div class="flex justify-between items-baseline">
          <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Корзина покупок</h1>
          <span class="text-sm text-slate-400 font-medium" v-if="cartItems.length > 0">
            Предметов в заказе: {{ cartItems.reduce((acc, i) => acc + i.quantity, 0) }}
          </span>
        </div>
      </div>

      <!-- Пустая корзина -->
      <div v-if="cartItems.length === 0" class="text-center py-24 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <svg class="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <h2 class="text-xl font-bold text-slate-900">Ваша корзина пуста</h2>
        <p class="text-sm text-slate-400 mt-1 max-w-sm mx-auto mb-6">
          Похоже, вы еще не добавили ни одного шедевра гжельского фарфора.
        </p>
        <!-- Использование стандартизированного класса проекта -->
        <router-link to="/" class="btn-primary inline-block">
          Вернуться в каталог
        </router-link>
      </div>

      <!-- Основной контент страницы (Сетка) -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        <!-- Левый блок: Список товаров -->
        <div class="lg:col-span-2 space-y-4">
          <div
              v-for="item in cartItems"
              :key="item.id"
              class="flex flex-col sm:flex-row gap-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative transition hover:shadow-md"
          >
            <!-- Картинка товара -->
            <div class="w-full sm:w-32 h-32 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0">
              <img :src="item.image" :alt="item.title" class="w-full h-full object-cover">
            </div>

            <!-- Контентная часть карточки -->
            <div class="flex flex-col justify-between flex-1">
              <div class="flex justify-between items-start gap-4">
                <div>
                  <h3 class="text-base font-bold text-slate-900">{{ item.title }}</h3>
                  <p class="text-xs text-slate-400 mt-1">Артикул: {{ item.code }}</p>
                  <div class="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    В наличии, готово к отправке
                  </div>
                </div>

                <!-- Удаление -->
                <button
                    @click="removeItem(item.id)"
                    class="text-slate-400 hover:text-rose-500 transition p-1"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Управление количеством и Цена -->
              <div class="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">

                <!-- Селектор количества -->
                <div class="flex items-center border border-slate-200 bg-white rounded-lg shadow-sm overflow-hidden">
                  <button
                      @click="updateQuantity(item.id, -1)"
                      class="px-3 py-1.5 text-slate-500 hover:bg-slate-50 text-sm font-semibold transition border-transparent"
                  >
                    -
                  </button>
                  <span class="px-3 text-sm font-bold text-slate-800 min-w-[32px] text-center">
                    {{ item.quantity }}
                  </span>
                  <button
                      @click="updateQuantity(item.id, 1)"
                      class="px-3 py-1.5 text-slate-500 hover:bg-slate-50 text-sm font-semibold transition border-transparent"
                  >
                    +
                  </button>
                </div>

                <!-- Блок цен -->
                <div class="text-right">
                  <span class="text-xs text-slate-400 block mb-0.5" v-if="item.quantity > 1">
                    {{ formatPrice(item.price) }} / шт.
                  </span>
                  <span class="text-lg font-extrabold text-slate-900">
                    {{ formatPrice(item.price * item.quantity) }}
                  </span>
                </div>

              </div>
            </div>
          </div>
        </div>

        <!-- Правый блок: Сводка заказа -->
        <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 lg:sticky lg:top-6">
          <h2 class="text-lg font-bold text-slate-900">Сводка заказа</h2>

          <div class="space-y-3 text-sm border-b border-slate-200 pb-4">
            <div class="flex justify-between text-slate-500">
              <span>Стоимость товаров</span>
              <span class="font-medium text-slate-800">{{ formatPrice(subtotal) }}</span>
            </div>
            <div class="flex justify-between text-slate-500">
              <span>Доставка по всему миру</span>
              <span class="text-emerald-600 font-semibold">Бесплатно</span>
            </div>
          </div>

          <!-- Итоговая стоимость -->
          <div class="flex justify-between items-baseline">
            <span class="text-base font-bold text-slate-900">Итого к оплате</span>
            <span class="text-2xl font-black text-blue-600 tracking-tight">
              {{ formatPrice(subtotal) }}
            </span>
          </div>

          <!-- Главная кнопка действия использует стандартизированный класс проекта -->
          <button class="btn-primary w-full text-center">
            Перейти к оформлению
          </button>

          <!-- Информационные триггеры -->
          <div class="space-y-3 pt-2">
            <div class="flex items-center gap-2.5 text-xs text-slate-500">
              <svg class="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Сертификат подлинности к каждому изделию</span>
            </div>
            <div class="flex items-center gap-2.5 text-xs text-slate-500">
              <svg class="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <span>Надежная противоударная упаковка фарфора</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>
