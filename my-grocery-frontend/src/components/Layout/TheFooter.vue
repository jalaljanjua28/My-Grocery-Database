<template>
  <div>
    <footer class="footer1">
      <div class="container">
        <el-row :gutter="20" style="margin-left: 0px">
          <el-col :span="8">
            <h4>About Us</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </el-col>
          <el-col :span="8">
            <h4>Contact</h4>
            <p>123 Street, City</p>
            <p>Phone: 123-456-7890</p>
          </el-col>
          <el-col :span="8" class="footer-column">
            <h4>Follow Us</h4>
            <p>Linkedin</p>
            <p>Twitter</p>
            <p>Facebook</p>
            <p>Instagram</p>

            <div class="social-icons">
              <i class="fab fa-facebook"></i>
              <i class="fab fa-twitter"></i>
              <i class="fab fa-instagram"></i>
            </div>
          </el-col>
        </el-row>
      </div>
    </footer>
    <footer class="footer2">
      <el-row class="el-button-footer">
        <router-link to="items-inventory">
          <el-button class="el-icon-goods"></el-button
        ></router-link>
        <router-link to="barcode-scan">
          <el-button
            style="font-size: xx-large !important"
            class="el-icon-camera"
          ></el-button
        ></router-link>
        <router-link to="shopping-cart">
          <el-button class="el-icon-box"></el-button
        ></router-link>
      </el-row>
    </footer>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {
    addProduct() {
      // Code to add product
    },
    scanToAdd() {
      // Code to scan and add product
    },
    removeProduct() {
      // Code to remove product
    },
    searchProduct() {
      // Code to search for product
    },
  },
};
</script>

<style scoped>
p {
  font-size: 15px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  font-family: "Inter", sans-serif;
  color: black;
}
</style>
