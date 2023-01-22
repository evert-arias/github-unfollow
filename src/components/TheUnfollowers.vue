<script setup lang="ts">
import type { TUser } from "@/types/gh-followers.types";
const props = defineProps<{
  users: TUser[];
}>();
</script>
<template>
  <div class="w-full">
    <div class="bg-yellow-50 rounded-md overflow-hidden">
      <div class="bg-yellow-100 px-6 py-2 flex justify-center">
        <span class="text-lg font-medium text-red-900"
          >The Unfollowers! {{ props.users.length }}</span
        >
        <button
          class="hover:bg-red-400 text-red-900 font-bold py-1 px-1 border-b-4 border-red-700 hover:border-red-500 rounded ml-auto uppercase"
        >
          Unfollow All
        </button>
      </div>
      <ul class="space-y-4 p-6 overflow-auto h-96">
        <li v-for="user in props.users" class="flex items-center gap-4">
          <a
            :href="user.html_url"
            class="rounded-full border-4 border-red-200 hover:border-red-500 overflow-hidden"
          >
            <img :src="user.avatar_url" alt="Avatar" class="h12 w-12" />
          </a>
          <a
            :href="user.html_url"
            target="_blank"
            class="text-lg font-semibold text-sky-800 underline decoration-8 decoration-red-100 hover:decoration-red-500"
            >{{ user.login }}</a
          >
          <button
            @click="$emit('on-get', user.login)"
            class="w-24 bg-sky-200 hover:bg-sky-400 text-sky-900 font-bold py-1 px-1 border-b-4 border-sky-700 hover:border-sky-500 rounded ml-auto uppercase"
          >
            Get
          </button>
          <button
            class="bg-red-200 hover:bg-red-400 text-red-900 font-bold py-1 px-1 border-b-4 border-red-700 hover:border-red-500 rounded uppercase"
          >
            Unfollow
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>