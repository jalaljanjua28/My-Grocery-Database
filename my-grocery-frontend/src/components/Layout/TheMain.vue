<template>
  <div>
    <el-main class="main-content">
      <home-page></home-page>
      <br />
      <barcode-dummy class="barcode" ref="BarcodeDummy" />
    </el-main>
  </div>
</template>

<script>
import BarcodeDummy from "@/views/BarcodeDummy.vue";
import HomePage from "./HomePage.vue";

export default {
  components: {
    BarcodeDummy,
    HomePage,
  },
  data() {
    return {};
  },
  mounted() {
    this.$refs.BarcodeDummy.simulateUpload();
    console.log("simulateUpload function triggered in BarcodeDummy.vue");
  },
  methods: {},
};
</script>

<style scoped>
.barcode {
  display: none;
}
</style>
