<script setup lang="ts">
import { EntryPoint, TheUnfollowers } from "./components";
import { useMainStore } from "./stores/main-store";

const store = useMainStore();

async function onGet(tokenOrUsername: any) {
  await store.getData(tokenOrUsername);
  console.log(`followers: ${store.followers.length}`);
  console.log(`following: ${store.following.length}`);
  console.log(`unfollowers: ${store.unfollowers.length}`);
}
</script>

<template>
  <div class="lg:w-xl flex flex-col items-center">
    <EntryPoint @on-get="onGet" />

    <div class="lg:max-w-xl my-6" v-if="store.isResultReady">
      <p class="text-xl font-light text-center text-slate-600">
        This user is currently following
        <span class="text-orange-700 font-bold">{{
          store.following.length
        }}</span>
        other users and has
        <span class="text-green-700 font-bold">{{
          store.followers.length
        }}</span>
        followers.
      </p>
    </div>
    <TheUnfollowers
      :users="store.unfollowers"
      v-if="store.isResultReady"
      @on-get="onGet"
    />
    <p
      v-if="store.isResultReady"
      class="text-red-900 text-xl font-light text-center mt-6"
    >
      Looks like you're the only one putting in the effort in these one-sided
      relationships, these users are getting a free ride by not following you
      back despite you following them. 😎
    </p>
  </div>
</template>
