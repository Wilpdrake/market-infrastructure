import {onMounted, ref} from 'vue';
import type {productCard} from '../types/product.ts';

const products = ref<productCard[]>([]);
const isLoading = ref(false);

const fetchProducts = async () => {
    isLoading.value = true;
    try {
        const response = await fetch(`http://localhost:8000/api/v1/dev/product-card`, {});
        const data = await response.json();
        products.value = data;
    } catch (e) {
        console.error("Ошибка сети:", e);
    } finally {
        isLoading.value = false;
    }
};

onMounted(fetchProducts);