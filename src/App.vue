<script setup lang="ts">
import { EntryPoint, TheUnfollowers } from "./components";
import { useMainStore } from "./stores/main-store";

const store = useMainStore();

function getResult(username: any) {
  console.log("Username", username);
  store.getUnfollowers(username);
}
</script>

<template>
  <div class="lg:w-xl flex flex-col items-center">
    <EntryPoint @on-get="getResult" />

    <div class="lg:w-md my-6" v-if="store.isResultReady">
      <p class="text-red-900 text-xl font-light text-center">
        Looks like you're the only one putting in the effort in these one-sided
        relationships, these users are getting a free ride by not following you
        back despite you following them. 😇
      </p>
    </div>
    <TheUnfollowers
      :users="store.unfollowers"
      v-if="store.isResultReady"
      @on-get="getResult"
    />
  </div>
</template>
