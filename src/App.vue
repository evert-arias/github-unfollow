<script setup lang="ts">
import { reactive, ref } from "vue";
import { EntryPoint, TheUnfollowers } from "./components";
import { useGitHubStore } from "./stores";

const ghStore = useGitHubStore();

const isLoading = ref(false);

async function onLookup(tokenOrUsername: any) {
  isLoading.value = true;
  await ghStore.getData(tokenOrUsername);
  isLoading.value = false;
}
</script>

<template>
  <div class="lg:w-lg flex flex-col items-center">
    <EntryPoint @on-lookup="onLookup" :is-loading="isLoading" />

    <div class="lg:max-w-xl my-6" v-if="ghStore.isResultReady">
      <p class="text-xl font-light text-center text-slate-600 dark:text-white">
        This user is currently following
        <span class="text-orange-700 font-bold">{{
          ghStore.following.length
        }}</span>
        other users and has
        <span class="text-green-700 font-bold">{{
          ghStore.followers.length
        }}</span>
        followers.
      </p>
    </div>
    <TheUnfollowers
      :users="ghStore.unfollowers"
      v-if="ghStore.isResultReady"
      @on-lookup="onLookup"
      class="md:max-w-xl"
    />
  </div>
</template>
