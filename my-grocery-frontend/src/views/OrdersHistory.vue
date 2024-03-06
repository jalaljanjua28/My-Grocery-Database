<template>
  <div>
    <router-link to="/" style="text-decoration: none">
      <el-page-header content="Order History"> </el-page-header>
    </router-link>
    <el-card>
      <el-container class="order-page">
        <el-header>
          <h1 class="header-title">My Orders</h1>
        </el-header>
        <el-main>
          <el-table
            :data="orders"
            class="order-table"
            stripe
            style="width: 100%"
          >
            <el-table-column prop="orderId" label="Order ID" />
            <el-table-column prop="product" label="Product" />
            <el-table-column prop="quantity" label="Quantity" />
            <el-table-column prop="status" label="Status" />
            <el-table-column prop="date" label="Date" />
            <el-table-column label="Actions" width="100">
              <template slot-scope="scope">
                <el-button
                  size="small"
                  type="text"
                  @click="handleViewOrder(scope.row)"
                >
                  View
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [
        {
          orderId: "12345",
          product: "Product 1",
          quantity: 2,
          status: "Delivered",
          date: "2022-12-01",
        },
        {
          orderId: "56789",
          product: "Product 2",
          quantity: 1,
          status: "Pending",
          date: "2022-11-30",
        },
      ],
    };
  },
  methods: {
    handleViewOrder() {
      // code to view order details
    },
  },
};
</script>

<style scoped></style>
