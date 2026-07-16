<script setup lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>
<template>
  <Header/>
  <main class="html">
    <section class="section-one relative h-[600px] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0"><img
          alt="Gzhel porcelain figurines"
          class="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1711008009125-4677474f38e7?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;q=80&amp;w=1920">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/60"></div>
      </div>
      <div class="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"><h1 class="text-5xl md:text-7xl mb-6">
        Authentic Gzhel Art</h1>
        <p class="text-xl md:text-2xl mb-8 opacity-95">Discover the timeless beauty of traditional Russian porcelain
          figurines</p>
        <router-link
            class="bg-white text-blue-900 px-8 py-4 rounded-full inline-flex items-center gap-3 hover:bg-blue-50 transition-all transform hover:scale-105"
            to="test">
          <svg class="lucide lucide-shopping-bag w-5 h-5" fill="none" height="24" stroke="currentColor"
               stroke-linecap="round"
               stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
            <path d="M3 6h18"></path>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          Shop Collection
        </router-link>
      </div>
    </section>
    <section class="section-two py-20 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <svg class="lucide lucide-award w-8 h-8 text-blue-900" fill="none" height="24" stroke="currentColor"
                   stroke-linecap="round"
                   stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                    d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
                <circle cx="12" cy="8" r="6"></circle>
              </svg>
            </div>
            <h3 class="text-xl mb-3">Authentic Craftsmanship</h3>
            <p class="text-slate-600 leading-relaxed">Each piece is handcrafted by skilled artisans following
              centuries-old Gzhel traditions</p></div>
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <svg class="lucide lucide-truck w-8 h-8 text-blue-900" fill="none" height="24" stroke="currentColor"
                   stroke-linecap="round"
                   stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                <path d="M15 18H9"></path>
                <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                <circle cx="17" cy="18" r="2"></circle>
                <circle cx="7" cy="18" r="2"></circle>
              </svg>
            </div>
            <h3 class="text-xl mb-3">Free Worldwide Shipping</h3>
            <p class="text-slate-600 leading-relaxed">Complimentary shipping on all orders with secure, insured
              packaging</p></div>
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <svg class="lucide lucide-shield w-8 h-8 text-blue-900" fill="none" height="24" stroke="currentColor"
                   stroke-linecap="round"
                   stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
              </svg>
            </div>
            <h3 class="text-xl mb-3">Certificate of Authenticity</h3>
            <p class="text-slate-600 leading-relaxed">Every figurine comes with a certificate verifying its origin and
              craftsmanship</p></div>
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <svg class="lucide lucide-sparkles w-8 h-8 text-blue-900" fill="none" height="24" stroke="currentColor"
                   stroke-linecap="round"
                   stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                <path d="M20 3v4"></path>
                <path d="M22 5h-4"></path>
                <path d="M4 17v2"></path>
                <path d="M5 18H3"></path>
              </svg>
            </div>
            <h3 class="text-xl mb-3">Limited Edition Pieces</h3>
            <p class="text-slate-600 leading-relaxed">Exclusive designs and rare collectibles available for discerning
              collectors</p></div>
        </div>
      </div>
    </section>
    <section class="section-thee py-20 px-4 bg-slate-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16"><h2 class="text-4xl md:text-5xl mb-4">Featured Collection</h2>
          <p class="text-xl text-slate-600 max-w-2xl mx-auto">Handcrafted masterpieces featuring the iconic blue and
            white patterns of Gzhel artistry</p></div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
              class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 group cursor-pointer">
            <div class="relative h-80 overflow-hidden bg-slate-100"><img
                alt="Traditional Figurine Set"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src="https://images.unsplash.com/photo-1711008009125-4677474f38e7?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;q=80&amp;w=800">
              <router-link
                  class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors">
                <svg class="lucide lucide-heart w-5 h-5 text-blue-900" fill="none" height="24" stroke="currentColor"
                     stroke-linecap="round"
                     stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </router-link>
            </div>
            <div class="p-6"><h3 class="text-xl mb-2">Traditional Figurine Set</h3>
              <div class="flex items-center justify-between"><span class="text-2xl text-blue-900">$89.99</span>
                <router-link class="bg-blue-900 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition-colors">
                  Add to
                  Cart
                </router-link>
              </div>
            </div>
          </div>
          <div
              class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 group cursor-pointer">
            <div class="relative h-80 overflow-hidden bg-slate-100"><img
                alt="Blue Hat Gentleman"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src="https://images.unsplash.com/photo-1735381178168-61630ef0aa93?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;q=80&amp;w=800">
              <router-link
                  class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors">
                <svg class="lucide lucide-heart w-5 h-5 text-blue-900" fill="none" height="24" stroke="currentColor"
                     stroke-linecap="round"
                     stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </router-link>
            </div>
            <div class="p-6"><h3 class="text-xl mb-2">Blue Hat Gentleman</h3>
              <div class="flex items-center justify-between"><span class="text-2xl text-blue-900">$65.99</span>
                <router-link class="bg-blue-900 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition-colors">
                  Add to
                  Cart
                </router-link>
              </div>
            </div>
          </div>
          <div
              class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 group cursor-pointer">
            <div class="relative h-80 overflow-hidden bg-slate-100"><img
                alt="Gzhel Cat Collection"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src="https://images.unsplash.com/photo-1612646444409-ded6a340899f?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;q=80&amp;w=800">
              <router-link
                  class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors">
                <svg class="lucide lucide-heart w-5 h-5 text-blue-900" fill="none" height="24" stroke="currentColor"
                     stroke-linecap="round"
                     stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </router-link>
            </div>
            <div class="p-6"><h3 class="text-xl mb-2">Gzhel Cat Collection</h3>
              <div class="flex items-center justify-between"><span class="text-2xl text-blue-900">$54.99</span>
                <router-link class="bg-blue-900 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition-colors">
                  Add to
                  Cart
                </router-link>
              </div>
            </div>
          </div>
          <div
              class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 group cursor-pointer">
            <div class="relative h-80 overflow-hidden bg-slate-100"><img
                alt="Colorful Bird Figurine"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src="https://images.unsplash.com/photo-1723110871046-efb4468cddb5?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;q=80&amp;w=800">
              <router-link
                  class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors">
                <svg class="lucide lucide-heart w-5 h-5 text-blue-900" fill="none" height="24" stroke="currentColor"
                     stroke-linecap="round"
                     stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </router-link>
            </div>
            <div class="p-6"><h3 class="text-xl mb-2">Colorful Bird Figurine</h3>
              <div class="flex items-center justify-between"><span class="text-2xl text-blue-900">$72.99</span>
                <router-link class="bg-blue-900 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition-colors">
                  Add to
                  Cart
                </router-link>
              </div>
            </div>
          </div>
          <div
              class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 group cursor-pointer">
            <div class="relative h-80 overflow-hidden bg-slate-100"><img
                alt="Miniature Collection"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src="https://images.unsplash.com/photo-1711008009081-d07a62c3fa1f?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;q=80&amp;w=800">
              <router-link
                  class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors">
                <svg class="lucide lucide-heart w-5 h-5 text-blue-900" fill="none" height="24" stroke="currentColor"
                     stroke-linecap="round"
                     stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </router-link>
            </div>
            <div class="p-6"><h3 class="text-xl mb-2">Miniature Collection</h3>
              <div class="flex items-center justify-between"><span class="text-2xl text-blue-900">$95.99</span>
                <router-link class="bg-blue-900 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition-colors">
                  Add to
                  Cart
                </router-link>
              </div>
            </div>
          </div>
          <div
              class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 group cursor-pointer">
            <div class="relative h-80 overflow-hidden bg-slate-100"><img
                alt="Lady in Pot"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src="https://images.unsplash.com/photo-1735381352561-1610df8fee35?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;q=80&amp;w=800">
              <router-link
                  class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors">
                <svg class="lucide lucide-heart w-5 h-5 text-blue-900" fill="none" height="24" stroke="currentColor"
                     stroke-linecap="round"
                     stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </router-link>
            </div>
            <div class="p-6"><h3 class="text-xl mb-2">Lady in Pot</h3>
              <div class="flex items-center justify-between"><span class="text-2xl text-blue-900">$68.99</span>
                <router-link class="bg-blue-900 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition-colors">
                  Add to
                  Cart
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section-foo py-20 px-4 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
      <div class="max-w-4xl mx-auto text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
          <svg class="lucide lucide-mail w-8 h-8" fill="none" height="24" stroke="currentColor" stroke-linecap="round"
               stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"
               xmlns="http://www.w3.org/2000/svg">
            <rect height="16" rx="2" width="20" x="2" y="4"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </svg>
        </div>
        <h2 class="text-3xl md:text-4xl mb-4">Join Our Collector's Circle</h2>
        <p class="text-xl mb-8 opacity-90">Get exclusive access to new arrivals, special offers, and the fascinating
          history behind each piece</p>
        <form class="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" method="post">
          <input
              class="flex-1 px-6 py-4 rounded-full text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter your email"
              type="email">
          <button
              class="bg-white text-blue-900 px-8 py-4 rounded-full hover:bg-blue-50 transition-colors whitespace-nowrap"
              type="submit">
            Subscribe Now
          </button>
        </form>
        <p class="mt-4 text-sm opacity-75">No spam, unsubscribe anytime. We respect your privacy.</p></div>
    </section>

  </main>
  <Footer/>
</template>
<style scoped>

.section-one {
  font-synthesis: none;
  --font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --color-blue-50: oklch(97% .014 254.604);
  --color-blue-100: oklch(93.2% .032 255.585);
  --color-blue-600: oklch(54.6% .245 262.881);
  --color-blue-700: oklch(48.8% .243 264.376);
  --color-blue-800: oklch(42.4% .199 265.638);
  --color-blue-900: oklch(37.9% .146 265.522);
  --color-slate-50: oklch(98.4% .003 247.858);
  --color-slate-100: oklch(96.8% .007 247.896);
  --color-slate-400: oklch(70.4% .04 256.788);
  --color-slate-500: oklch(55.4% .046 257.417);
  --color-slate-600: oklch(44.6% .043 257.281);
  --color-slate-700: oklch(37.2% .044 257.287);
  --color-slate-800: oklch(27.9% .041 260.031);
  --color-slate-900: oklch(20.8% .042 265.755);
  --color-gray-100: oklch(96.7% .003 264.542);
  --color-black: #000;
  --color-white: #fff;
  --spacing: .25rem;
  --container-sm: 24rem;
  --container-lg: 32rem;
  --container-xl: 36rem;
  --container-2xl: 42rem;
  --container-4xl: 56rem;
  --container-7xl: 80rem;
  --text-xs: .75rem;
  --text-xs--line-height: calc(1 / .75);
  --text-sm: .875rem;
  --text-sm--line-height: calc(1.25 / .875);
  --text-base: 1rem;
  --text-base--line-height: 1.5;
  --text-lg: 1.125rem;
  --text-lg--line-height: calc(1.75 / 1.125);
  --text-xl: 1.25rem;
  --text-xl--line-height: calc(1.75 / 1.25);
  --text-2xl: 1.5rem;
  --text-2xl--line-height: calc(2 / 1.5);
  --text-3xl: 1.875rem;
  --text-3xl--line-height: 1.2;
  --text-4xl: 2.25rem;
  --text-4xl--line-height: calc(2.5 / 2.25);
  --text-5xl: 3rem;
  --text-5xl--line-height: 1;
  --text-7xl: 4.5rem;
  --text-7xl--line-height: 1;
  --font-weight-semibold: 600;
  --tracking-tight: -.025em;
  --tracking-widest: .1em;
  --leading-relaxed: 1.625;
  --radius-xs: .125rem;
  --radius-2xl: 1rem;
  --ease-in-out: cubic-bezier(.4, 0, .2, 1);
  --animate-pulse: pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;
  --blur-sm: 8px;
  --aspect-video: 16/9;
  --default-transition-duration: .15s;
  --default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  --default-font-family: var(--font-sans);
  --default-mono-font-family: var(--font-mono);
  --color-border: var(--border);
  -webkit-text-size-adjust: 100%;
  tab-size: 4;
  line-height: 1.5;
  font-family: var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
  font-feature-settings: var(--default-font-feature-settings, normal);
  font-variation-settings: var(--default-font-variation-settings, normal);
  -webkit-tap-highlight-color: transparent;
  font-size: var(--font-size);
  --banner-height: 48px;
  --banner-height-v2: 40px;
  --full-height-with-banner: calc(100dvh - var(--banner-height));
  --font-size: 16px;
  --background: #fff;
  --foreground: oklch(14.5% 0 0);
  --card: #fff;
  --card-foreground: oklch(14.5% 0 0);
  --popover: oklch(100% 0 0);
  --popover-foreground: oklch(14.5% 0 0);
  --primary: #030213;
  --primary-foreground: oklch(100% 0 0);
  --secondary: oklch(95% .0058 264.53);
  --secondary-foreground: #030213;
  --muted: #ececf0;
  --muted-foreground: #717182;
  --accent: #e9ebef;
  --accent-foreground: #030213;
  --destructive: #d4183d;
  --destructive-foreground: #fff;
  --border: #0000001a;
  --input: transparent;
  --input-background: #f3f3f5;
  --switch-background: #cbced4;
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --ring: oklch(70.8% 0 0);
  --chart-1: oklch(64.6% .222 41.116);
  --chart-2: oklch(60% .118 184.704);
  --chart-3: oklch(39.8% .07 227.392);
  --chart-4: oklch(82.8% .189 84.429);
  --chart-5: oklch(76.9% .188 70.08);
  --radius: .625rem;
  --sidebar: oklch(98.5% 0 0);
  --sidebar-foreground: oklch(14.5% 0 0);
  --sidebar-primary: #030213;
  --sidebar-primary-foreground: oklch(98.5% 0 0);
  --sidebar-accent: oklch(97% 0 0);
  --sidebar-accent-foreground: oklch(20.5% 0 0);
  --sidebar-border: oklch(92.2% 0 0);
  --sidebar-ring: oklch(70.8% 0 0);
  color: var(--foreground);
  box-sizing: border-box;
  border: 0 solid;
  margin: 0;
  padding: 0;
  border-color: var(--border);
  outline-color: color-mix(in oklab, var(--ring) 50%, transparent);
  position: relative;
  display: flex;
  height: 600px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.section-two {
  font-synthesis: none;
  --font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --color-blue-50: oklch(97% .014 254.604);
  --color-blue-100: oklch(93.2% .032 255.585);
  --color-blue-600: oklch(54.6% .245 262.881);
  --color-blue-700: oklch(48.8% .243 264.376);
  --color-blue-800: oklch(42.4% .199 265.638);
  --color-blue-900: oklch(37.9% .146 265.522);
  --color-slate-50: oklch(98.4% .003 247.858);
  --color-slate-100: oklch(96.8% .007 247.896);
  --color-slate-400: oklch(70.4% .04 256.788);
  --color-slate-500: oklch(55.4% .046 257.417);
  --color-slate-600: oklch(44.6% .043 257.281);
  --color-slate-700: oklch(37.2% .044 257.287);
  --color-slate-800: oklch(27.9% .041 260.031);
  --color-slate-900: oklch(20.8% .042 265.755);
  --color-gray-100: oklch(96.7% .003 264.542);
  --color-black: #000;
  --color-white: #fff;
  --spacing: .25rem;
  --container-sm: 24rem;
  --container-lg: 32rem;
  --container-xl: 36rem;
  --container-2xl: 42rem;
  --container-4xl: 56rem;
  --container-7xl: 80rem;
  --text-xs: .75rem;
  --text-xs--line-height: calc(1 / .75);
  --text-sm: .875rem;
  --text-sm--line-height: calc(1.25 / .875);
  --text-base: 1rem;
  --text-base--line-height: 1.5;
  --text-lg: 1.125rem;
  --text-lg--line-height: calc(1.75 / 1.125);
  --text-xl: 1.25rem;
  --text-xl--line-height: calc(1.75 / 1.25);
  --text-2xl: 1.5rem;
  --text-2xl--line-height: calc(2 / 1.5);
  --text-3xl: 1.875rem;
  --text-3xl--line-height: 1.2;
  --text-4xl: 2.25rem;
  --text-4xl--line-height: calc(2.5 / 2.25);
  --text-5xl: 3rem;
  --text-5xl--line-height: 1;
  --text-7xl: 4.5rem;
  --text-7xl--line-height: 1;
  --font-weight-semibold: 600;
  --tracking-tight: -.025em;
  --tracking-widest: .1em;
  --leading-relaxed: 1.625;
  --radius-xs: .125rem;
  --radius-2xl: 1rem;
  --ease-in-out: cubic-bezier(.4, 0, .2, 1);
  --animate-pulse: pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;
  --blur-sm: 8px;
  --aspect-video: 16/9;
  --default-transition-duration: .15s;
  --default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  --default-font-family: var(--font-sans);
  --default-mono-font-family: var(--font-mono);
  --color-border: var(--border);
  -webkit-text-size-adjust: 100%;
  tab-size: 4;
  line-height: 1.5;
  font-family: var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
  font-feature-settings: var(--default-font-feature-settings, normal);
  font-variation-settings: var(--default-font-variation-settings, normal);
  -webkit-tap-highlight-color: transparent;
  font-size: var(--font-size);
  --banner-height: 48px;
  --banner-height-v2: 40px;
  --full-height-with-banner: calc(100dvh - var(--banner-height));
  --font-size: 16px;
  --background: #fff;
  --foreground: oklch(14.5% 0 0);
  --card: #fff;
  --card-foreground: oklch(14.5% 0 0);
  --popover: oklch(100% 0 0);
  --popover-foreground: oklch(14.5% 0 0);
  --primary: #030213;
  --primary-foreground: oklch(100% 0 0);
  --secondary: oklch(95% .0058 264.53);
  --secondary-foreground: #030213;
  --muted: #ececf0;
  --muted-foreground: #717182;
  --accent: #e9ebef;
  --accent-foreground: #030213;
  --destructive: #d4183d;
  --destructive-foreground: #fff;
  --border: #0000001a;
  --input: transparent;
  --input-background: #f3f3f5;
  --switch-background: #cbced4;
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --ring: oklch(70.8% 0 0);
  --chart-1: oklch(64.6% .222 41.116);
  --chart-2: oklch(60% .118 184.704);
  --chart-3: oklch(39.8% .07 227.392);
  --chart-4: oklch(82.8% .189 84.429);
  --chart-5: oklch(76.9% .188 70.08);
  --radius: .625rem;
  --sidebar: oklch(98.5% 0 0);
  --sidebar-foreground: oklch(14.5% 0 0);
  --sidebar-primary: #030213;
  --sidebar-primary-foreground: oklch(98.5% 0 0);
  --sidebar-accent: oklch(97% 0 0);
  --sidebar-accent-foreground: oklch(20.5% 0 0);
  --sidebar-border: oklch(92.2% 0 0);
  --sidebar-ring: oklch(70.8% 0 0);
  color: var(--foreground);
  box-sizing: border-box;
  border: 0 solid;
  margin: 0;
  padding: 0;
  border-color: var(--border);
  outline-color: color-mix(in oklab, var(--ring) 50%, transparent);
  background-color: var(--color-white);
  padding-inline: calc(var(--spacing) * 4);
  padding-block: calc(var(--spacing) * 20);
}

.section-thee {
  font-synthesis: none;
  --font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --color-blue-50: oklch(97% .014 254.604);
  --color-blue-100: oklch(93.2% .032 255.585);
  --color-blue-600: oklch(54.6% .245 262.881);
  --color-blue-700: oklch(48.8% .243 264.376);
  --color-blue-800: oklch(42.4% .199 265.638);
  --color-blue-900: oklch(37.9% .146 265.522);
  --color-slate-50: oklch(98.4% .003 247.858);
  --color-slate-100: oklch(96.8% .007 247.896);
  --color-slate-400: oklch(70.4% .04 256.788);
  --color-slate-500: oklch(55.4% .046 257.417);
  --color-slate-600: oklch(44.6% .043 257.281);
  --color-slate-700: oklch(37.2% .044 257.287);
  --color-slate-800: oklch(27.9% .041 260.031);
  --color-slate-900: oklch(20.8% .042 265.755);
  --color-gray-100: oklch(96.7% .003 264.542);
  --color-black: #000;
  --color-white: #fff;
  --spacing: .25rem;
  --container-sm: 24rem;
  --container-lg: 32rem;
  --container-xl: 36rem;
  --container-2xl: 42rem;
  --container-4xl: 56rem;
  --container-7xl: 80rem;
  --text-xs: .75rem;
  --text-xs--line-height: calc(1 / .75);
  --text-sm: .875rem;
  --text-sm--line-height: calc(1.25 / .875);
  --text-base: 1rem;
  --text-base--line-height: 1.5;
  --text-lg: 1.125rem;
  --text-lg--line-height: calc(1.75 / 1.125);
  --text-xl: 1.25rem;
  --text-xl--line-height: calc(1.75 / 1.25);
  --text-2xl: 1.5rem;
  --text-2xl--line-height: calc(2 / 1.5);
  --text-3xl: 1.875rem;
  --text-3xl--line-height: 1.2;
  --text-4xl: 2.25rem;
  --text-4xl--line-height: calc(2.5 / 2.25);
  --text-5xl: 3rem;
  --text-5xl--line-height: 1;
  --text-7xl: 4.5rem;
  --text-7xl--line-height: 1;
  --font-weight-semibold: 600;
  --tracking-tight: -.025em;
  --tracking-widest: .1em;
  --leading-relaxed: 1.625;
  --radius-xs: .125rem;
  --radius-2xl: 1rem;
  --ease-in-out: cubic-bezier(.4, 0, .2, 1);
  --animate-pulse: pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;
  --blur-sm: 8px;
  --aspect-video: 16/9;
  --default-transition-duration: .15s;
  --default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  --default-font-family: var(--font-sans);
  --default-mono-font-family: var(--font-mono);
  --color-border: var(--border);
  -webkit-text-size-adjust: 100%;
  tab-size: 4;
  line-height: 1.5;
  font-family: var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
  font-feature-settings: var(--default-font-feature-settings, normal);
  font-variation-settings: var(--default-font-variation-settings, normal);
  -webkit-tap-highlight-color: transparent;
  font-size: var(--font-size);
  --banner-height: 48px;
  --banner-height-v2: 40px;
  --full-height-with-banner: calc(100dvh - var(--banner-height));
  --font-size: 16px;
  --background: #fff;
  --foreground: oklch(14.5% 0 0);
  --card: #fff;
  --card-foreground: oklch(14.5% 0 0);
  --popover: oklch(100% 0 0);
  --popover-foreground: oklch(14.5% 0 0);
  --primary: #030213;
  --primary-foreground: oklch(100% 0 0);
  --secondary: oklch(95% .0058 264.53);
  --secondary-foreground: #030213;
  --muted: #ececf0;
  --muted-foreground: #717182;
  --accent: #e9ebef;
  --accent-foreground: #030213;
  --destructive: #d4183d;
  --destructive-foreground: #fff;
  --border: #0000001a;
  --input: transparent;
  --input-background: #f3f3f5;
  --switch-background: #cbced4;
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --ring: oklch(70.8% 0 0);
  --chart-1: oklch(64.6% .222 41.116);
  --chart-2: oklch(60% .118 184.704);
  --chart-3: oklch(39.8% .07 227.392);
  --chart-4: oklch(82.8% .189 84.429);
  --chart-5: oklch(76.9% .188 70.08);
  --radius: .625rem;
  --sidebar: oklch(98.5% 0 0);
  --sidebar-foreground: oklch(14.5% 0 0);
  --sidebar-primary: #030213;
  --sidebar-primary-foreground: oklch(98.5% 0 0);
  --sidebar-accent: oklch(97% 0 0);
  --sidebar-accent-foreground: oklch(20.5% 0 0);
  --sidebar-border: oklch(92.2% 0 0);
  --sidebar-ring: oklch(70.8% 0 0);
  color: var(--foreground);
  box-sizing: border-box;
  border: 0 solid;
  margin: 0;
  padding: 0;
  border-color: var(--border);
  outline-color: color-mix(in oklab, var(--ring) 50%, transparent);
  background-color: var(--color-slate-50);
  padding-inline: calc(var(--spacing) * 4);
  padding-block: calc(var(--spacing) * 20);
}

.section-foo {
  font-synthesis: none;
  --font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --color-blue-50: oklch(97% .014 254.604);
  --color-blue-100: oklch(93.2% .032 255.585);
  --color-blue-600: oklch(54.6% .245 262.881);
  --color-blue-700: oklch(48.8% .243 264.376);
  --color-blue-800: oklch(42.4% .199 265.638);
  --color-blue-900: oklch(37.9% .146 265.522);
  --color-slate-50: oklch(98.4% .003 247.858);
  --color-slate-100: oklch(96.8% .007 247.896);
  --color-slate-400: oklch(70.4% .04 256.788);
  --color-slate-500: oklch(55.4% .046 257.417);
  --color-slate-600: oklch(44.6% .043 257.281);
  --color-slate-700: oklch(37.2% .044 257.287);
  --color-slate-800: oklch(27.9% .041 260.031);
  --color-slate-900: oklch(20.8% .042 265.755);
  --color-gray-100: oklch(96.7% .003 264.542);
  --color-black: #000;
  --color-white: #fff;
  --spacing: .25rem;
  --container-sm: 24rem;
  --container-lg: 32rem;
  --container-xl: 36rem;
  --container-2xl: 42rem;
  --container-4xl: 56rem;
  --container-7xl: 80rem;
  --text-xs: .75rem;
  --text-xs--line-height: calc(1 / .75);
  --text-sm: .875rem;
  --text-sm--line-height: calc(1.25 / .875);
  --text-base: 1rem;
  --text-base--line-height: 1.5;
  --text-lg: 1.125rem;
  --text-lg--line-height: calc(1.75 / 1.125);
  --text-xl: 1.25rem;
  --text-xl--line-height: calc(1.75 / 1.25);
  --text-2xl: 1.5rem;
  --text-2xl--line-height: calc(2 / 1.5);
  --text-3xl: 1.875rem;
  --text-3xl--line-height: 1.2;
  --text-4xl: 2.25rem;
  --text-4xl--line-height: calc(2.5 / 2.25);
  --text-5xl: 3rem;
  --text-5xl--line-height: 1;
  --text-7xl: 4.5rem;
  --text-7xl--line-height: 1;
  --font-weight-semibold: 600;
  --tracking-tight: -.025em;
  --tracking-widest: .1em;
  --leading-relaxed: 1.625;
  --radius-xs: .125rem;
  --radius-2xl: 1rem;
  --ease-in-out: cubic-bezier(.4, 0, .2, 1);
  --animate-pulse: pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;
  --blur-sm: 8px;
  --aspect-video: 16/9;
  --default-transition-duration: .15s;
  --default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  --default-font-family: var(--font-sans);
  --default-mono-font-family: var(--font-mono);
  --color-border: var(--border);
  -webkit-text-size-adjust: 100%;
  tab-size: 4;
  line-height: 1.5;
  font-family: var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
  font-feature-settings: var(--default-font-feature-settings, normal);
  font-variation-settings: var(--default-font-variation-settings, normal);
  -webkit-tap-highlight-color: transparent;
  font-size: var(--font-size);
  --banner-height: 48px;
  --banner-height-v2: 40px;
  --full-height-with-banner: calc(100dvh - var(--banner-height));
  --font-size: 16px;
  --background: #fff;
  --foreground: oklch(14.5% 0 0);
  --card: #fff;
  --card-foreground: oklch(14.5% 0 0);
  --popover: oklch(100% 0 0);
  --popover-foreground: oklch(14.5% 0 0);
  --primary: #030213;
  --primary-foreground: oklch(100% 0 0);
  --secondary: oklch(95% .0058 264.53);
  --secondary-foreground: #030213;
  --muted: #ececf0;
  --muted-foreground: #717182;
  --accent: #e9ebef;
  --accent-foreground: #030213;
  --destructive: #d4183d;
  --destructive-foreground: #fff;
  --border: #0000001a;
  --input: transparent;
  --input-background: #f3f3f5;
  --switch-background: #cbced4;
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --ring: oklch(70.8% 0 0);
  --chart-1: oklch(64.6% .222 41.116);
  --chart-2: oklch(60% .118 184.704);
  --chart-3: oklch(39.8% .07 227.392);
  --chart-4: oklch(82.8% .189 84.429);
  --chart-5: oklch(76.9% .188 70.08);
  --radius: .625rem;
  --sidebar: oklch(98.5% 0 0);
  --sidebar-foreground: oklch(14.5% 0 0);
  --sidebar-primary: #030213;
  --sidebar-primary-foreground: oklch(98.5% 0 0);
  --sidebar-accent: oklch(97% 0 0);
  --sidebar-accent-foreground: oklch(20.5% 0 0);
  --sidebar-border: oklch(92.2% 0 0);
  --sidebar-ring: oklch(70.8% 0 0);
  box-sizing: border-box;
  border: 0 solid;
  margin: 0;
  padding: 0;
  border-color: var(--border);
  outline-color: color-mix(in oklab, var(--ring) 50%, transparent);
  --tw-gradient-position: to bottom right in oklab;
  background-image: linear-gradient(var(--tw-gradient-stops));
  --tw-gradient-from: var(--color-blue-900);
  --tw-gradient-to: var(--color-blue-700);
  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));
  padding-inline: calc(var(--spacing) * 4);
  padding-block: calc(var(--spacing) * 20);
  color: var(--color-white);
}

</style>

