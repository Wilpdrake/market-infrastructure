<script lang="ts" setup>
</script>
<template>
  <footer class="footer bg-slate-900 text-white py-16 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div><h3 class="text-2xl mb-4">Wood&Clay</h3>
          <p class="text-slate-400 mb-6">Bringing the timeless beauty of Russian porcelain artistry to collectors
            worldwide since 2010.</p>
          <div class="flex gap-4">
            <router-link
                class="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                to="#">
              <svg class="lucide lucide-facebook w-5 h-5" fill="none" height="24" stroke="currentColor"
                   stroke-linecap="round"
                   stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </router-link>
            <router-link
                class="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                to="#">
              <svg class="lucide lucide-instagram w-5 h-5" fill="none" height="24" stroke="currentColor"
                   stroke-linecap="round"
                   stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"
                   xmlns="http://www.w3.org/2000/svg">
                <rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </router-link>
            <router-link
                class="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                to="#">
              <svg class="lucide lucide-twitter w-5 h-5" fill="none" height="24" stroke="currentColor"
                   stroke-linecap="round"
                   stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </router-link>
          </div>
        </div>
        <div><h4 class="text-lg mb-4">Shop</h4>
          <ul class="space-y-3 text-slate-400">
            <li>
              <router-link class="hover:text-white transition-colors" to="#">All Figurines</router-link>
            </li>
            <li>
              <router-link class="hover:text-white transition-colors" to="#">New Arrivals</router-link>
            </li>
            <li>
              <router-link class="hover:text-white transition-colors" to="#">Limited Edition</router-link>
            </li>
            <li>
              <router-link class="hover:text-white transition-colors" to="#">Gift Sets</router-link>
            </li>
          </ul>
        </div>
        <div><h4 class="text-lg mb-4">Information</h4>
          <ul class="space-y-3 text-slate-400">
            <li>
              <router-link class="hover:text-white transition-colors" to="#">About Gzhel</router-link>
            </li>
            <li>
              <router-link class="hover:text-white transition-colors" to="#">Shipping &amp; Returns</router-link>
            </li>
            <li>
              <router-link class="hover:text-white transition-colors" to="#">Care Instructions</router-link>
            </li>
            <li>
              <router-link class="hover:text-white transition-colors" to="#">FAQs</router-link>
            </li>
          </ul>
        </div>
        <div><h4 class="text-lg mb-4">Contact Us</h4>
          <ul class="space-y-4 text-slate-400">
            <li class="flex items-start gap-3">
              <svg class="lucide lucide-map-pin w-5 h-5 mt-1 flex-shrink-0" fill="none" height="24"
                   stroke="currentColor" stroke-linecap="round"
                   stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>123 Art District, Moscow, Russia</span></li>
            <li class="flex items-center gap-3">
              <svg class="lucide lucide-phone w-5 h-5 flex-shrink-0" fill="none" height="24" stroke="currentColor"
                   stroke-linecap="round"
                   stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>+7 (495) 123-4567</span></li>
            <li class="flex items-center gap-3">
              <svg class="lucide lucide-mail w-5 h-5 flex-shrink-0" fill="none" height="24" stroke="currentColor"
                   stroke-linecap="round"
                   stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"
                   xmlns="http://www.w3.org/2000/svg">
                <rect height="16" rx="2" width="20" x="2" y="4"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              <span>info@gzhelgallery.com</span></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"><p
          class="text-slate-400 text-sm">© 2026 Wood&Clay. All rights reserved.</p>
        <div class="flex gap-6 text-sm text-slate-400">
          <router-link class="hover:text-white transition-colors" to="#">Privacy
            Policy
          </router-link>
          <router-link class="hover:text-white transition-colors" to="#">Terms of Service</router-link>
          <router-link
              class="hover:text-white transition-colors"
              to="#">Cookie
            Policy
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>
<style scoped>
.footer {
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
  background-color: var(--color-slate-900);
  padding-inline: calc(var(--spacing) * 4);
  padding-block: calc(var(--spacing) * 16);
  color: var(--color-white);
}
</style>