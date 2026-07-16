<script lang="ts" setup>
import type {productCard} from "@/stores/product.ts";

defineProps<{
  data: productCard
}>();
</script>
<template>
  <div :id="data.uuid" class="sneaker">
    <a class="sneaker__link" :href="`/test/${data.uuid}`">
      <div class="sneaker__image-wrapper">
        <img :alt="`${ProductCard.name}`" :src="`${data.image}`"
             class="sneaker__image">
      </div>
    </a>
    <div class="sneaker__content">
      <div class="sneaker__content-title">
        {{ data.title }}
      </div>
      <div class="prices">
        <span class="main-price">{{ data.price }} ₽</span>
        <div class="ozon__price">Ozon: {{ data.ozon_price }}</div>
        <div class="wb__price">WB: {{ data.wb_price }}</div>
      </div>
      <div class="sneaker__content-description">
        {{ data.description }}
      </div>
    </div>
  </div>
</template>
