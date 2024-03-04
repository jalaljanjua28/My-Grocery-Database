<template>
  <div>
    <el-table :data="items" style="width: 100%">
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
      <el-table-column label="Days" prop="days_left"></el-table-column>
      <el-table-column label="Add">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="x-small"
            @click="addExpiry(scope.row)"
          ></el-button>
          <el-dialog :visible.sync="dialogVisible" title="Add Expiry">
            <el-form :model="form" label-width="120px">
              <el-form-item label="Item Name">
                <el-input v-model="form.item_name" disabled></el-input>
              </el-form-item>
              <el-form-item label="Days to Extend">
                <el-input
                  v-model="form.days_to_extend"
                  type="number"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="info" @click="updateExpiry"
                  >Update Expiry</el-button
                >
              </el-form-item>
            </el-form>
          </el-dialog>
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
import axios from "axios";
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      dialogVisible: false, // Control the visibility of the dialog
      form: {
        item_name: "",
        days_to_extend: "",
      },
    };
  },

  methods: {
    addItem(itemToAdd) {
      const userConfirmed = confirm("Are you sure you want to add items?");
      if (userConfirmed) {
        fetch("/api/addItem/master-nonexpired", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemName: itemToAdd.name }),
        })
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
        fetch("/api/removeItem/master-nonexpired", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemName: itemToDelete.name }),
        })
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
    addExpiry(item) {
      // Open the dialog to add expiry
      this.form.item_name = item.name;
      this.form.days_to_extend = 0;
      this.dialogVisible = true;
    },
    updateExpiry() {
      const requestData = {
        item_name: this.form.item_name,
        days_to_extend: this.form.days_to_extend,
      };
      axios
        .post("/api/update-master-nonexpired-item-expiry", requestData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      this.form.item_name = "";
      this.form.days_to_extend = "";
      location.reload();
    },
  },
};
</script>

<style scoped>
.el-button--primary:focus,
.el-button--primary:hover {
  background: blue;
  border-color: #66b1ff;
  color: #fff;
}
</style>
