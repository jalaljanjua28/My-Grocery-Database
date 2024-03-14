<template>
  <el-container class="add-item-container">
    <el-main>
      <el-form :model="form" label-width="120px">
        <el-form-item label="Item Name">
          <el-input v-model="form.item_name"></el-input>
        </el-form-item>
        <el-form-item label="Price">
          <el-input v-model="form.item_price"></el-input>
        </el-form-item>
        <el-form-item label="Item Date">
          <el-input v-model="form.item_date"></el-input>
        </el-form-item>
        <el-form-item label="Item Expiry">
          <el-input v-model="form.item_expiry"></el-input>
        </el-form-item>
        <el-form-item label="Item Status">
          <el-input v-model="form.item_status"></el-input>
        </el-form-item>
        <el-form-item label="Item Days Left">
          <el-input v-model="form.item_day_left"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="AddItem" plain>Add Item</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        item_name: "",
        item_price: "",
        item_status: "",
        item_date: "",
        item_expiry: "",
        item_day_left: "",
      },
    };
  },
  methods: {
    AddItem() {
      const requestData = {
        item_name: this.form.item_name,
        item_price: this.form.item_price,
        item_status: this.form.item_status,
        item_date: this.form.item_date,
        item_expiry: this.form.item_expiry,
        item_day_left: this.form.item_day_left,
      };
      axios
        .post("https://my-grocery-app-hlai3cv5za-uc.a.run.app/api", requestData)
        .then((response) => {
          this.$message({
            message: "Item Added Successfully",
            type: "success",
          });
          console.log(response.data);
          this.$emit("item-added", requestData); // Emit an event with the added item data
          // Introduce a delay of 2000 milliseconds (2 seconds) before reloading the page
          setTimeout(() => {
            location.reload();
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });
      this.form.item_name = "";
      this.form.item_price = "";
      this.form.item_status = "";
      this.form.item_date = "";
      this.form.item_expiry = "";
      this.form.item_day_left = "";
    },
  },
};
</script>

<style scoped>
.el-button {
  margin-top: 15px;
}
div {
  width: -webkit-fill-available !important;
}
</style>
