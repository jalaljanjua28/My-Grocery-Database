<template>
  <div>
    <router-link to="/" style="text-decoration: none">
      <el-page-header content="Shopping Cart"> </el-page-header>
    </router-link>
    <el-card>
      <el-container class="account-page">
        <el-header>
          <h1 class="header-title">Enter Items</h1>
        </el-header>
        <el-form class="account-form" :model="newItem">
          <el-form-item label="Item Name">
            <el-input v-model="newItem.name" />
          </el-form-item>
          <el-form-item label="Category">
            <el-input v-model="newItem.category" />
          </el-form-item>
          <el-form-item label="Description">
            <el-input v-model="newItem.description" />
          </el-form-item>
          <el-form-item label="Price">
            <el-input v-model="newItem.price" type="number" />
          </el-form-item>
          <el-form-item>
            <el-button class="el-button" type="primary" @click="addItem" plain
              >Add Item</el-button
            >
          </el-form-item>
        </el-form>
        <el-header>
          <h1 class="header-title">Items Cart</h1>
        </el-header>
        <el-row>
          <el-col :span="24" offset="0">
            <el-card>
              <el-table :data="cartItems" border>
                <el-table-column prop="name" label="Name"></el-table-column>
                <el-table-column prop="price" label="Price"></el-table-column>
                <el-table-column
                  prop="category"
                  label="Category"
                ></el-table-column>
                <el-table-column
                  prop="description"
                  label="Description"
                ></el-table-column>
                <el-table-column label="Action">
                  <template slot-scope="scope">
                    <el-button
                      type="danger"
                      @click="removeFromCart(scope.row)"
                      plain
                      >Remove</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <div class="total-price">Total: {{ totalPrice }}</div>
              <el-button
                type="primary"
                @click="checkout"
                plain
                style="margin-top: 20px"
                >Checkout</el-button
              >
            </el-card>
          </el-col>
        </el-row>
      </el-container>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Items: [],
      newItem: {
        name: "",
        category: "",
        description: "",
        price: "",
      },
      cartItems: [],
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((acc, item) => acc + item.price, 0);
    },
  },
  methods: {
    addItem() {
      this.cartItems.push({
        name: this.newItem.name,
        category: this.newItem.category,
        price: this.newItem.price,
        description: this.newItem.description,
      });
      this.newItem = {
        name: "",
        category: "",
        description: "",
        price: 0,
      };
    },
    removeItem(item) {
      this.cartItems = this.cartItems.filter((i) => i !== item);
    },
    removeFromCart(item) {
      this.cartItems = this.cartItems.filter((i) => i !== item);
    },
    checkout() {
      alert("Checking out...");
    },
  },
};
</script>
<style scoped></style>
