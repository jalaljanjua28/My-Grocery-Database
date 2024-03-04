<template>
  <div>
    <el-row class="block-col-2">
      <el-col :span="12">
        <el-dropdown>
          <span class="el-dropdown-link">
            Menu <i class="el-icon-menu"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/account-page" style="text-decoration: none"
              ><el-dropdown-item style="border-bottom: none"
                ><i class="el-icon-user"></i>Account</el-dropdown-item
              ></router-link
            >
            <router-link to="/recipes-page" style="text-decoration: none"
              ><el-dropdown-item style="border-bottom: none"
                ><i class="el-icon-notebook-2"></i>Recipes</el-dropdown-item
              ></router-link
            >
            <router-link to="/shopping-cart" style="text-decoration: none">
              <el-dropdown-item style="border-bottom: none"
                ><i class="el-icon-shopping-cart-full"></i>Shopping
                Cart</el-dropdown-item
              ></router-link
            >
            <router-link to="/orders-history" style="text-decoration: none">
              <el-dropdown-item style="border-bottom: none"
                ><i class="el-icon-takeaway-box"></i>Order
                History</el-dropdown-item
              ></router-link
            >
            <router-link to="/items-inventory" style="text-decoration: none">
              <el-dropdown-item style="border-bottom: none"
                ><i class="el-icon-fork-spoon"></i>Items
                Inventory</el-dropdown-item
              ></router-link
            >
            <router-link to="/barcode-scan" style="text-decoration: none">
              <el-dropdown-item style="border-bottom: none"
                ><i class="el-icon-camera" style="font-size: large"></i>Barcode
                Scan</el-dropdown-item
              ></router-link
            ><router-link to="/about-us" style="text-decoration: none"
              ><el-dropdown-item style="border-bottom: none"
                ><i class="el-icon-info"></i>About Us</el-dropdown-item
              ></router-link
            >
            <router-link to="/faqs-page" style="text-decoration: none"
              ><el-dropdown-item style="border-bottom: none"
                ><i class="el-icon-question"></i>FAQs</el-dropdown-item
              ></router-link
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
.el-col-12 {
  width: 100%;
}
</style>
