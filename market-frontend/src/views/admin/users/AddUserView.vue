<script lang="ts" setup>

</script>

<template>
  <div class="coverflow-hidden rounded-x1 container flex flex-col justify-center items-center my-6">
    <form action="/api/v1/user/add" class="admin-form" method="POST">
      <div class="p-10">
        <div class="admin-form-input_group">
          <div class="admin-form-input">
            <label for="name">Name <span style="color: red">*</span></label>
            <input id="name" name="name" placeholder="Ivan" required type="text">
            <div class="error_message">{{ $message }}</div>
          </div>
          <div class="admin-form-input">
            <label for="surname">Surname <span style="color: red">*</span></label>
            <input id="username" name="surname" placeholder="Ivanov" required type="text">
          </div>
          <div class="admin-form-input">
            <label for="patronymic">Patronymic</label>
            <input id="username" name="patronymic" placeholder="Ivanovich" type="text">
          </div>
        </div>
        <div class="admin-form-input_group">
          <div class="admin-form-input">
            <label for="email">Email <span style="color: red">*</span></label>
            <input id="email" name="email" placeholder="mail@example.com" required type="email">
          </div>
          <div class="admin-form-input">
            <label for="contact_number">Contact phone number <span style="color: red">*</span></label>
            <input id="contact_number" name="contact_number" placeholder="79999999999" required type="text">
          </div>
          <div class="admin-form-input">
            <label for="telegram_username">Telegram username</label>
            <input id="telegram_username" name="telegram_username" placeholder="@username" type="text">
          </div>
        </div>
        <div class="admin-form-input_group">
          <div class="admin-form-input">
            <label for="password">Password <span style="color: red">*</span></label>
            <input id="password" v-model="password" name="password" required>
          </div>
          <div class="admin-form-input">
            <label for="confirm_password">Confirm password <span style="color: red">*</span></label>
            <input id="confirm_password" :value="password" name="confirm_password" required>
          </div>
          <div class="admin-form-input">
            <label for="role">Role <span style="color: red">*</span></label>
            <select id="role" name="role" required>
              <option selected value="user">User</option>
              <option value="support">Supporter</option>
              <option value="moderator">Moderator</option>
              <option value="admin">Admin</option>
            </select>
            <div class="error_message">{{ $message }}</div>
          </div>
        </div>
        <div class="admin-form-input_group">
          <div class="admin-form-input">
            <div class="admin-form-input">
              <label for="comment">Comment</label>
              <textarea id="comment" name="comment" placeholder="Add a comment"></textarea>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="flex items-center justify-between w-full">
      <router-link class="btn-primary self-start flex items-center" to="/admin/users">

        <svg height="13" viewBox="0 0 42 42" width="13" xmlns="http://www.w3.org/2000/svg">
          <path d="M27.066 1L7 21.068l19.568 19.569l4.934-4.933l-14.637-14.636L32 5.933z" fill="currentColor"/>
        </svg>
        <span class="ml-2">Back</span>

      </router-link>
      <button class="btn-primary self-end" type="submit">
        Add a New User
      </button>
    </div>
  </div>
</template>