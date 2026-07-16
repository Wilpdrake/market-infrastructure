<script lang="ts" setup>
import ProductCard from "@/components/customers/ProductCard.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <Header/>
  <main>
    <div class="body">
      <div class="layout">
        <div class="container">
          <a class="collection-title" href="https://youtu.be/dQw4w9WgXcQ">
            Коллекция. {Апрель:2026}
          </a>
          <form action="/api/v1/dev/email" class="grid flex justify-center gap-5" method="post">
            <input name="email" required type="email"/>
            <button type="submit">Submit</button>
          </form>
          <div class="collection">
            <ProductCard
                v-for="item in products"
                :key="item.uuid"
                :data="item"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
  <Footer/>
</template>
