<template>
  <div>
    <el-header class="header">
      <header-logo></header-logo>
      <the-menu></the-menu>
    </el-header>
  </div>
</template>

<script>
import TheMenu from "../UI/TheMenu.vue";
import HeaderLogo from "../UI/HeaderLogo.vue";

export default {
  components: {
    TheMenu,
    HeaderLogo,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>
