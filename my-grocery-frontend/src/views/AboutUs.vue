<template>
  <div>
    <router-link to="/" style="text-decoration: none">
      <el-page-header content="About us"> </el-page-header>
    </router-link>
    <el-container class="profile-page" style="font-family: 'Inter', sans-serif">
      <el-main>
        <el-row :gutter="20" style="margin-top: 30px">
          <el-col :span="12">
            <el-card class="profile-card">
              <el-header>
                <h1 class="header-title">{{ companyName }}</h1>
              </el-header>
              <div class="profile-card-header">
                <h2>About Us</h2>
              </div>
              <div class="profile-card-body">
                <p>{{ companyDescription }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="profile-card">
              <div class="profile-card-header">
                <h2>Contact Us</h2>
              </div>
              <div class="profile-card-body">
                <p>Phone: {{ companyPhone }}</p>
                <p>Email: {{ companyEmail }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-card class="feedback-card">
              <div class="feedback-card-header">
                <h2>Leave a Feedback</h2>
              </div>
              <div class="feedback-card-body">
                <el-form
                  ref="feedbackForm"
                  :model="feedbackForm"
                  :rules="feedbackRules"
                >
                  <el-form-item label="Name" prop="name">
                    <el-input
                      v-model="feedbackForm.name"
                      placeholder="Name"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="Email" prop="email">
                    <el-input
                      v-model="feedbackForm.email"
                      placeholder="Email"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="Message" prop="message">
                    <el-input
                      type="textarea"
                      v-model="feedbackForm.message"
                      placeholder="Message"
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitFeedback" plain
                      >Submit</el-button
                    >
                  </el-form-item>
                </el-form>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      companyName: "My Grocery Home",
      companyDescription:
        "We are a leading company in the field of technology, providing innovative solutions for our clients.",
      companyPhone: "051-215-3113",
      companyEmail: "jalaljanjua88@gmail.com",
      feedbackForm: {
        name: "",
        email: "",
        message: "",
      },
      feedbackRules: {
        name: [
          {
            required: true,
            message: "Please input your name",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "Please input your email",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Please enter a valid email address",
            trigger: "blur",
          },
        ],
        message: [
          {
            required: true,
            message: "Please input your message",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitFeedback() {
      this.$refs.feedbackForm.validate((valid) => {
        if (valid) {
          // Submit the feedback form
          console.log(this.feedbackForm);
        } else {
          console.log("Error: Invalid form");
        }
      });
    },
  },
};
</script>
<style scoped></style>
