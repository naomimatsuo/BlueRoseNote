<template>
  <div class="container-loader">
    <div class="d-flex justify-content-center">
      <div class="bg-loader spinner-border text-secondary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-loader {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.3);
}

.bg-loader {
  position: absolute;
  top: 45%;
  z-index: 100;
}
</style>