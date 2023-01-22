<script setup lang="ts">
import { EntryPoint, TheUnfollowers } from "./components";
import { useGitHubStore } from "./stores";

const ghStore = useGitHubStore();

async function onGet(tokenOrUsername: any) {
  await ghStore.getData(tokenOrUsername);
}
</script>

<template>
  <div class="lg:w-xl flex flex-col items-center">
    <EntryPoint @on-get="onGet" />

    <div class="lg:max-w-xl my-6" v-if="ghStore.isResultReady">
      <p class="text-xl font-light text-center text-slate-600">
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
      @on-get="onGet"
    />
    <p
      v-if="ghStore.isResultReady"
      class="text-red-900 text-xl font-light text-center mt-6"
    >
      Looks like you're the only one putting in the effort in these one-sided
      relationships, these users are getting a free ride by not following you
      back despite you following them. 😎
    </p>
  </div>
</template>
