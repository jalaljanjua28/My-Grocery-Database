<template>
  <div v-if="loading" class="loading-container">
    <div class="loading-content">
      <p class="loading-text">Loading...</p>
    </div>
  </div>
</template>

<style></style>

<script>
export default {
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
};
</script>
