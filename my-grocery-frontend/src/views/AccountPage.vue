<template>
  <div>
    <router-link to="/" style="text-decoration: none">
      <el-page-header content="Account Page"> </el-page-header>
    </router-link>
    <el-card style="margin-top: 20px; font-family: 'Inter', sans-serif">
      <el-container class="account-page">
        <el-header style="height: 0px">
          <h1 class="header-title">My Account</h1>
        </el-header>
        <el-main style="margin-top: 50px">
          <el-form class="account-form" :model="form" ref="form">
            <el-form-item label="Username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="Email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="Password">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateAccount" plain
                >Update Account</el-button
              >
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    updateAccount() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // API call to update account details
        }
      });
    },
  },
};
</script>

<style scoped></style>
