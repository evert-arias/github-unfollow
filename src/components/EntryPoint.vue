<script setup lang="ts">
import { ref } from "vue";

const username = ref("");
</script>

<template>
  <div class="flex flex-col space-y-6 w-full max-w-xl">
    <font-awesome-icon icon="fa-brands fa-github" class="text-8xl" />
    <div class="flex gap-2 items-center justify-center">
      <h1
        class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
      >
        GitHub
        <span
          class="underline underline-offset-3 decoration-8 decoration-red-800 dark:red-blue-300"
          >Unfollow</span
        >
      </h1>
    </div>
    <div class="flex space-x-2">
      <input
        class="font-medium text-lg shadow appearance-none border rounded py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        v-model="username"
        type="text"
        placeholder="GitHub username or token"
      />
      <button
        @click="$emit('on-get', username)"
        class="bg-sky-500 hover:bg-sky-400 text-white font-bold py-2 px-4 border-b-4 border-sky-700 hover:border-sky-500 rounded uppercase w-36"
      >
        Get
      </button>
    </div>
  </div>
</template>
