<template>
  <div>
    <el-table :data="items">
      <el-table-column label="Image" prop="image">
        <template slot-scope="scope">
          <img
            :src="scope.row.image"
            :alt="scope.row.name"
            style="max-width: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column label="Name" prop="name"></el-table-column>
      <el-table-column label="Price" prop="price"></el-table-column>
      <el-table-column label="Status" prop="status"></el-table-column>
      <el-table-column label="Expiry">
        <template slot-scope="scope">
          <span>{{ scope.row.date }}</span>
          <br />
          <span>{{ scope.row.expiry }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100%">
        <template slot-scope="scope">
          <el-row>
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
            ></el-button
          ></el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      itemName: "",
      selectOptions: [],
    };
  },

  methods: {
    addItem(itemToAdd) {
      const userConfirmed = confirm("Are you sure you want to add items?");
      if (userConfirmed) {
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
          .then(() => {
            this.itemName = ""; // Clear the input field
          })
          .catch((error) => {
            console.error("Error:", error);
            this.$message({
              message: "An error occurred",
              type: "error",
            });
          });
        alert("Item Added successfully!");
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    },
    deleteItem(itemToDelete) {
      const userConfirmed = confirm("Are you sure you want to delete items?");
      if (userConfirmed) {
        // Send a request to your backend to delete the item by its name
        fetch(
          "https://my-grocery-app-hlai3cv5za-uc.a.run.app/api/removeItem/master-expired",
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
              console.log(`Item '${itemToDelete.name}' deleted successfully.`);
              this.$emit("item-deleted", itemToDelete);
              alert("Item Deleted successfully!");

              setTimeout(() => {
                location.reload();
              }, 2000);
            } else {
              console.error("Error deleting item.");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            this.$message.error("An error occurred");
          });
      }
    },
  },
};
</script>

<style scoped></style>
