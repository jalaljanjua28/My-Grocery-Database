<template>
  <div>
    <router-link to="/" style="text-decoration: none">
      <el-page-header content="Health Page"> </el-page-header>
    </router-link>

    <el-card
      style="
        margin-top: 20px;
        font-family: 'Inter', sans-serif;
        background-color: #ffffffc9;
        border-radius: 20px;
      "
    >
      <div class="nav-buttons">
        <router-link to="items-inventory" class="router_link">
          <el-button type="primary" size="x-small" plain>Items</el-button>
        </router-link>
        <router-link to="/recipes-page" class="router_link">
          <el-button
            type="warning"
            size="x-small"
            plain
            style="margin-left: 10px"
            >Recipes</el-button
          >
        </router-link>
      </div>
      <health-prompt></health-prompt>
    </el-card>
  </div>
</template>

<script>
import HealthPrompt from "../Data-resources/ChatGPTPrompts/HealthPrompts.vue";
export default {
  components: {
    HealthPrompt,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped></style>
