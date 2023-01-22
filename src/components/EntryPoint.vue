<script lang="ts">
import { ref } from "vue";

export default {
  props: {
    isLoading: Boolean,
  },

  setup() {
    const tokenOrUsername = ref();

    const lookupInput = ref();

    return { tokenOrUsername, lookupInput };
  },

  mounted() {
    this.lookupInput.addEventListener("keydown", (e: any) => {
      if (e.key === "Enter") {
        this.$emit("on-lookup", this.tokenOrUsername);
      }
    });
  },
};
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
        ref="lookupInput"
        class="font-medium text-lg shadow appearance-none border rounded py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        v-model="tokenOrUsername"
        type="text"
        placeholder="GitHub username or token"
      />
      <button
        :disabled="isLoading"
        type="button"
        @click="$emit('on-lookup', tokenOrUsername)"
        class="bg-sky-500 hover:bg-sky-400 text-white font-bold py-2 px-4 border-b-4 border-sky-700 hover:border-sky-500 rounded uppercase w-36"
      >
        <div class="flex items-center justify-center">
          <svg
            v-if="isLoading"
            class="animate-spin h-5 w-5 mr-3"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
              opacity=".25"
            />
            <circle class="spinner" cx="12" cy="2.5" r="1.5" />
          </svg>
          <span v-if="!isLoading">Lookup</span>
        </div>
      </button>
    </div>
  </div>
</template>
<style scoped>
.spinner {
  transform-origin: center;
  animation: spinner 0.75s linear infinite;
}
@keyframes spinner {
  100% {
    transform: rotate(360deg);
  }
}
</style>
