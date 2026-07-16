<script lang="ts" setup>

</script>

<template>
  <div class="coverflow-hidden rounded-x1 container">
    <div class="flex items-center justify-between">
      <div class="flex items-center my-6">
        <input id="search" class="search" type="text" @input="filterproducts" placeholder="Search Product...">
        <button class="btn-default__search" @click="filterproducts">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20">
            <path
                d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33l-1.42 1.42l-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
          </svg>
        </button>
      </div>
      <router-link class="btn-primary" to="/admin/products/add">


        <span class="mr-2">Add Product</span>

        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20">
          <path fill="currentColor" d="M11 9V4H9v5H4v2h5v5h2v-5h5V9z"/>
        </svg>


      </router-link>
    </div>
    <table class="admin-table">
      <thead>
      <tr>
        <th class="px-6 py-3 text-left">
          #ID
        </th>
        <th class="px-6 py-3 text-left">
          productname
        </th>
        <th class="px-6 py-3 text-left">
          price
        </th>
        <th class="px-6 py-3 text-left">
          Actions
        </th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td class="px-6 py-4">
          1
        </td>
        <td class="px-6 py-4">
          productname
        </td>
        <td class="px-6 py-4">
          123
        </td>
        <td class="px-6 py-4 flex justify-between">

          <router-link
              class="text-black dark:text-blue-500 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-sm w-6 h-6 flex justify-center items-center"
              label="View" :to="`product/profile/`">

            <svg height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg" class="fill-current">
              <path
                  d="M2.097 12c1.441 4.08 5.332 7 9.903 7c4.57 0 8.46-2.92 9.902-7C20.461 7.92 16.57 5 12 5c-4.57 0-8.462 2.92-9.903 7Zm-2.008-.304C1.7 6.654 6.421 3 12 3c5.58 0 10.302 3.654 11.91 8.696l.098.304l-.097.304C22.3 17.346 17.578 21 12 21C6.42 21 1.698 17.346.09 12.304L-.009 12l.097-.304ZM12 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0a5 5 0 0 1-10 0Z"
              />
            </svg>

          </router-link>

          <router-link
              class="text-indigo-600 hover:text-indigo-900 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-sm w-6 h-6 flex justify-center items-center"
              label="Edit" to="product/edit">

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
             href="" onclick="return confirm('Are you sure want to delete this product?')">

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
</template>
