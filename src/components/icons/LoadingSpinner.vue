<template>
  <svg
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
