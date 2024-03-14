<template>
  <div style="">
    <el-input
      placeholder="Please input"
      v-model="searchQuery"
      class="input-with-select"
      @change="searchItems"
    >
      <el-select v-model="select" slot="prepend" placeholder="Select">
        <el-option label="Not Expired" value="1"></el-option>
        <el-option label="Expired" value="2"></el-option>
        <el-option label="Shopping List" value="3"></el-option>
      </el-select>
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="dialogTableVisible = true"
      ></el-button>
    </el-input>

    <el-dialog
      title="Search Inventory"
      :visible.sync="dialogTableVisible"
      width="65%"
    >
      <div v-if="dialogTableVisible">
        <el-table :data="filteredItems">
          <el-table-column v-for="item in filteredItems" :key="item.id">
            <template slot="header">Image</template>
            <template slot-scope="scope">
              <img
                :src="scope.row.image"
                :alt="scope.row.name"
                style="max-width: 100px"
              />
            </template>
          </el-table-column>

          <el-table-column label="Name" prop="name">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>

          <el-table-column label="Price" prop="price">
            <template slot-scope="scope">
              {{ scope.row.price }}
            </template>
          </el-table-column>

          <el-table-column label="Status" prop="status">
            <template slot-scope="scope">
              {{ scope.row.status }}
            </template>
          </el-table-column>

          <el-table-column label="Expiry">
            <template slot-scope="scope">
              <span>{{ scope.row.date }}</span>
              <br />
              <span v-if="scope.row.expiry">{{ scope.row.expiry }}</span>
              <span v-else>Days_left: {{ scope.row.days_left }}</span>
            </template>
          </el-table-column>

          <el-table-column>
            <template slot-scope="scope">
              <el-row style="display: flex; text-align: center">
                <el-button
                  type="success"
                  icon="el-icon-plus"
                  circle
                  size="x-small"
                  @click="addItem(scope.row)"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  size="x-small"
                  @click="deleteItem(scope.row)"
                ></el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      dialogTableVisible: false,
      select: null,
      filteredItems: [],
      items: [],
    };
  },
  computed: {
    filteredItemsSearch() {
      // If no category is selected, return an empty array
      if (!this.select) return [];

      // Filter items based on the selected category and search query
      return this.filteredItems.filter((item) => {
        if (this.select === "1") {
          return item.status !== "Not Expired";
        } else if (this.select === "2") {
          return item.status === "Expired";
        } else if (this.select === "3") {
          return item.status === "Shopping List";
        }
        return true; // Default to returning all items if no category is selected
      });
    },
  },
  methods: {
    addItem(itemToAdd) {
      fetch(
        "https://my-grocery-app-hlai3cv5za-uc.a.run.app/api/addItem/master-expired",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemName: itemToAdd.name }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          this.$message({
            message: data.message,
            type: "success",
          });
          this.itemName = ""; // Clear the input field
        })
        .catch((error) => {
          console.error("Error:", error);
          this.$message({
            message: "An error occurred",
            type: "error",
          });
        });
      location.reload();
    },
    deleteItem(itemToDelete) {
      // Send a request to your backend to delete the item by its name
      fetch(
        "https://my-grocery-app-hlai3cv5za-uc.a.run.app/api/removeItem/master-non-expired",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemName: itemToDelete.name }),
        }
      )
        .then((response) => {
          if (response.status === 200) {
            this.$message({
              message: "Item deleted",
              type: "success",
            });
            // Item deleted successfully, update UI or show a message
            console.log(`Item '${itemToDelete.name}' deleted successfully.`);
            // Remove the item from the items array
            this.$emit("item-deleted", itemToDelete);
          } else {
            // Item not found or other error, handle accordingly
            console.error("Error deleting item.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          this.$message({
            message: "An error occurred",
            type: "error",
          });
        });
      location.reload();
    },
    searchItems() {
      // Get the search query
      const searchValue = this.searchQuery.toLowerCase();

      // Filter items based on the search query and the selected option
      let filteredItemsByCategory = [];
      if (this.select === "1") {
        filteredItemsByCategory = this.NonExpiredFood.concat(
          this.NonExpiredNonFood
        );
      } else if (this.select === "2") {
        filteredItemsByCategory = this.ExpiredFood.concat(this.ExpiredNonFood);
      } else if (this.select === "3") {
        filteredItemsByCategory = this.itemsFood.concat(this.itemsNonFood);
      } else {
        // If no category is selected, consider all items
        filteredItemsByCategory = [
          ...this.NonExpiredFood,
          ...this.NonExpiredNonFood,
          ...this.ExpiredFood,
          ...this.ExpiredNonFood,
          ...this.itemsFood,
          ...this.itemsNonFood,
        ];
      }

      // Filter items based on the search query and the selected option
      this.filteredItems = filteredItemsByCategory.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue) ||
          item.status.toLowerCase().includes(searchValue)
      );
      this.searchQuery = "";
    },

    updateFilteredItems() {
      // Concatenate all items based on the selected category
      let allItems = [];
      if (this.select === "1") {
        allItems = [...this.NonExpiredFood, ...this.NonExpiredNonFood];
      } else if (this.select === "2") {
        allItems = [...this.ExpiredFood, ...this.ExpiredNonFood];
      } else if (this.select === "3") {
        allItems = [...this.itemsFood, ...this.itemsNonFood];
      }

      // Filter items based on the search query
      this.filteredItems = allItems.filter(
        (item) =>
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.status.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },

  watch: {
    select: "updateFilteredItems",
  },
  props: {
    ExpiredFood: Array,
    ExpiredNonFood: Array,
    NonExpiredFood: Array,
    NonExpiredNonFood: Array,
    itemsFood: Array,
    itemsNonFood: Array,
  },
};
</script>

<style scoped>
.el-input-group {
  width: 100% !important;
}
</style>
