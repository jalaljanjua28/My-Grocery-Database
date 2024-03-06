<template>
  <div>
    <router-link to="/" style="text-decoration: none">
      <el-page-header content="FAQs"> </el-page-header>
    </router-link>
    <el-card style="margin-top: 20px">
      <el-container>
        <el-header>FAQs</el-header>
        <el-main>
          <el-collapse v-model="activeName">
            <el-collapse-item
              v-for="(item, index) in faqs"
              :key="index"
              :title="item.question"
              :name="index"
            >
              {{ item.answer }}
            </el-collapse-item>
          </el-collapse>
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "",
      faqs: [
        {
          question: "What is Element UI?",
          answer:
            "Element UI is a Vue-based UI library that provides a set of high-quality UI components.",
        },
        {
          question: "How to install Element UI?",
          answer:
            "You can install Element UI using npm: npm install element-ui.",
        },
        {
          question: "What are the features of Element UI?",
          answer:
            "Element UI has a wide range of UI components such as Button, Input, Dialog, Tabs, Table, etc.",
        },
      ],
    };
  },
};
</script>
<style scoped></style>
