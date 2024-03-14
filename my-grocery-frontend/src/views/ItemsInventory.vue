<template>
  <div>
    <router-link to="/" style="text-decoration: none">
      <el-page-header content="Items Inventory"> </el-page-header>
    </router-link>
    <el-card>
      <div class="nav-buttons">
        <router-link to="/recipes-page" class="router_link">
          <el-button type="warning" size="x-small" plain>Recipes</el-button>
        </router-link>
        <router-link to="/health-page" class="router_link">
          <el-button type="info" size="x-small" plain style="margin-left: 10px"
            >Health</el-button
          >
        </router-link>
      </div>
      <search-inventory
        :ExpiredFood="Food_expired"
        :ExpiredNonFood="NonFood_expired"
        :NonExpiredFood="Food_nonexpired"
        :NonExpiredNonFood="NonFood_nonexpired"
        :itemsFood="Food"
        :itemsNonFood="NonFood"
      />
      <el-tabs
        :tab-position="tabPosition"
        style="height: auto"
        v-model="outerActiveTab"
        @tab-click="handleOuterTabClick"
      >
        <!-- Non - Expired Tab -->
        <el-tab-pane name="a" label="Non Expired"
          ><span slot="label" class="el-tabs__label" style="font-size: x-large"
            ><i class="el-icon-success" style=""></i> Non Expired</span
          >
          <el-tabs v-model="innerActiveTab" @tab-click="handleInnerTabClick">
            <el-tab-pane name="1" label="Food"
              ><span
                slot="label"
                class="el-tabs__sublabel"
                style="font-size: large"
                ><i class="el-icon-food" style=""></i> Food</span
              >
              <div>
                <non-expired-list
                  :items="Food_nonexpired"
                  @item-deleted="handleItemDeleted()"
                ></non-expired-list>
              </div>
            </el-tab-pane>
            <el-tab-pane name="2" label="Not Food">
              <span
                slot="label"
                class="el-tabs__sublabel"
                style="font-size: large"
                ><i class="el-icon-bicycle" style=""></i> Non Food</span
              >
              <div>
                <non-expired-list
                  :items="NonFood_nonexpired"
                  @item-deleted="handleItemDeleted()"
                ></non-expired-list>
              </div>
            </el-tab-pane>
          </el-tabs>
          <delete-all-master-non-expired></delete-all-master-non-expired>
        </el-tab-pane>
        <!-- Expired Tab -->
        <el-tab-pane name="b" label="Expired"
          ><span slot="label" class="el-tabs__label" style="font-size: x-large"
            ><i class="el-icon-error" style=""></i> Expired</span
          >
          <el-tabs v-model="innerActiveTab" @tab-click="handleInnerTabClick">
            <el-tab-pane name="3" label="Food"
              ><span
                slot="label"
                class="el-tabs__sublabel"
                style="font-size: large"
                ><i class="el-icon-food" style=""></i> Food</span
              >
              <div>
                <expired-list
                  :items="Food_expired"
                  @item-deleted="handleItemDeleted"
                ></expired-list>
              </div>
            </el-tab-pane>
            <el-tab-pane name="4" label="Not Food">
              <span
                slot="label"
                class="el-tabs__sublabel"
                style="font-size: large"
                ><i class="el-icon-bicycle" style=""></i> Non Food</span
              >
              <div>
                <expired-list
                  :items="NonFood_expired"
                  @item-deleted="handleItemDeleted()"
                ></expired-list>
              </div>
            </el-tab-pane>
          </el-tabs>
          <delete-all-master-expired></delete-all-master-expired>
        </el-tab-pane>
        <!-- Shopping List Tab -->
        <el-tab-pane name="c" label="Shopping"
          ><span slot="label" class="el-tabs__label" style="font-size: x-large"
            ><i class="el-icon-s-claim" style=""></i> Shopping List</span
          >
          <el-tabs v-model="innerActiveTab" @tab-click="handleInnerTabClick">
            <el-tab-pane name="5" label="Food"
              ><span
                slot="label"
                class="el-tabs__sublabel"
                style="font-size: large"
                ><i class="el-icon-food" style=""></i> Food</span
              >
              <div>
                <shopping-list
                  :items="Food"
                  @item-deleted="handleItemDeleted()"
                ></shopping-list>
              </div>
            </el-tab-pane>
            <el-tab-pane name="6" label="Not Food">
              <span
                slot="label"
                class="el-tabs__sublabel"
                style="font-size: large"
                ><i class="el-icon-bicycle" style=""></i> Non Food</span
              >
              <div>
                <shopping-list
                  :items="NonFood"
                  @item-deleted="handleItemDeleted()"
                ></shopping-list>
              </div>
            </el-tab-pane>
          </el-tabs>
          <delete-all-shopping></delete-all-shopping>
        </el-tab-pane>
      </el-tabs>
      <div>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="openDialog"
          plain
          >Add Item</el-button
        >
        <el-dialog :visible.sync="dialogVisible" title="Add Item" width="60%">
          <add-items @item-added="closeDialog" />
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import SearchInventory from "../components/Data-resources/Search-component/SearchInventory.vue";
import ExpiredList from "../components/Data-resources/ProductList/ExpiredList.vue";
import NonExpiredList from "../components/Data-resources/ProductList/NonExpiredList.vue";
import AddItems from "../components/Data-resources/AddItems/AddCustomItem.vue";
import DeleteAllMasterNonExpired from "../components/Data-resources/DeleteItems/DeleteAllMasterNonExpired.vue";
import DeleteAllShopping from "../components/Data-resources/DeleteItems/DeleteAllShopping.vue";
import DeleteAllMasterExpired from "../components/Data-resources/DeleteItems/DeleteAllMasterExpired.vue";
import ShoppingList from "../components/Data-resources/ProductList/ShoppingList.vue";

export default {
  components: {
    ShoppingList,
    SearchInventory,
    ExpiredList,
    NonExpiredList,
    AddItems,
    DeleteAllMasterNonExpired,
    DeleteAllShopping,
    DeleteAllMasterExpired,
  },
  data() {
    return {
      outerActiveTab: null,
      innerActiveTab: null,
      Food: [],
      NonFood: [],
      Food_expired: [],
      NonFood_expired: [],
      Food_nonexpired: [],
      NonFood_nonexpired: [],
      items: [],
      tabPosition: "top",
      dialogVisible: false,
      dialogData: {}, // Data to pass to the Add Item component
    };
  },
  mounted() {
    this.master_nonexpired();
    this.shopping_list();
    this.master_expired();
  },

  created() {
    // Retrieve the active tab from local storage on page load
    const storedOuterTab = localStorage.getItem("activeOuterTab");
    console.log(storedOuterTab);
    const storedInnerTab = localStorage.getItem("activeInnerTab");
    console.log(storedInnerTab);

    if (storedOuterTab && storedInnerTab) {
      this.outerActiveTab = storedOuterTab;
      this.innerActiveTab = storedInnerTab;
    }
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    master_expired() {
      fetch(
        "https://my-grocery-app-hlai3cv5za-uc.a.run.app/api/get-master-expired",
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch data.");
          }
        })
        .then((data) => {
          try {
            const base64Data = data.data;
            const binaryData = new Uint8Array(
              [...atob(base64Data)].map((char) => char.charCodeAt(0))
            );

            const textDecoder = new TextDecoder();
            const decodedData = textDecoder.decode(binaryData);

            const parsedData = JSON.parse(decodedData);

            const Food = parsedData.Food.filter(
              (item) => item.Name !== "TestFNE"
            );
            const NonFood = parsedData.Not_Food.filter(
              (item) => item.Name !== "TestFNE"
            );

            for (const id in Food) {
              const item = {
                id: parseInt(id),
                name: Food[id].Name,
                image: Food[id].Image,
                date: Food[id].Date,
                expiry: Food[id].Expiry_Date,
                price: Food[id].Price,
                status: Food[id].Status,
              };
              Food[id] = item;
            }

            for (const id in NonFood) {
              const item = {
                id: parseInt(id),
                name: NonFood[id].Name,
                image: NonFood[id].Image,
                date: NonFood[id].Date,
                price: NonFood[id].Price,
                status: NonFood[id].Status,
              };
              NonFood[id] = item;
            }
            this.Food_expired = Food;
            this.NonFood_expired = NonFood;
          } catch (error) {
            console.error("Error:", error);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    shopping_list() {
      fetch(
        "https://my-grocery-app-hlai3cv5za-uc.a.run.app/api/get-shopping-list",
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch data.");
          }
        })
        .then((data) => {
          try {
            const base64Data = data.data;
            const binaryData = new Uint8Array(
              [...atob(base64Data)].map((char) => char.charCodeAt(0))
            );

            const textDecoder = new TextDecoder();
            const decodedData = textDecoder.decode(binaryData);

            const parsedData = JSON.parse(decodedData);

            const Food = parsedData.Food.filter(
              (item) => item.Name !== "TestFNE"
            );
            const NonFood = parsedData.Not_Food.filter(
              (item) => item.Name !== "TestFNE"
            );

            for (const id in Food) {
              const item = {
                id: parseInt(id),
                name: Food[id].Name,
                image: Food[id].Image,
                date: Food[id].Date,
                expiry: Food[id].Expiry_Date,
                price: Food[id].Price,
                status: Food[id].Status,
                days_left: Food[id].Days_Until_Expiry,
              };
              Food[id] = item;
            }

            for (const id in NonFood) {
              const item = {
                id: parseInt(id),
                name: NonFood[id].Name,
                image: NonFood[id].Image,
                date: NonFood[id].Date,
                price: NonFood[id].Price,
                status: NonFood[id].Status,
                days_left: NonFood[id].Days_Until_Expiry,
              };
              NonFood[id] = item;
            }

            this.Food = Food;
            this.NonFood = NonFood;
          } catch (error) {
            console.error("Error:", error);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    master_nonexpired() {
      fetch(
        "https://my-grocery-app-hlai3cv5za-uc.a.run.app/api/get-master-nonexpired",
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch data.");
          }
        })
        .then((data) => {
          try {
            const base64Data = data.data;
            const binaryData = new Uint8Array(
              [...atob(base64Data)].map((char) => char.charCodeAt(0))
            );

            const textDecoder = new TextDecoder();
            const decodedData = textDecoder.decode(binaryData);
            const parsedData = JSON.parse(decodedData);

            const Food = parsedData.Food.filter(
              (item) => item.Name !== "TestFNE"
            );
            const NonFood = parsedData.Not_Food.filter(
              (item) => item.Name !== "TestFNE"
            );

            for (const id in Food) {
              const item = {
                id: parseInt(id),
                name: Food[id].Name,
                image: Food[id].Image,
                date: Food[id].Date,
                expiry: Food[id].Expiry_Date,
                price: Food[id].Price,
                status: Food[id].Status,
                days_left: Food[id].Days_Until_Expiry,
              };
              Food[id] = item;
            }

            for (const id in NonFood) {
              const item = {
                id: parseInt(id),
                name: NonFood[id].Name,
                image: NonFood[id].Image,
                date: NonFood[id].Date,
                price: NonFood[id].Price,
                status: NonFood[id].Status,
                days_left: NonFood[id].Days_Until_Expiry,
              };
              NonFood[id] = item;
            }
            this.Food_nonexpired = Food;
            this.NonFood_nonexpired = NonFood;
          } catch (error) {
            console.error("Error:", error);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    handleItemDeleted(itemToDelete) {
      this.items = this.items.filter((item) => item !== itemToDelete);
      console.log("Deleted Item:", itemToDelete);
    },
    handleInnerTabClick(tab) {
      // Update the local storage on inner tab change
      localStorage.setItem("activeInnerTab", tab.name);
      console.log("Inner Tab: " + this.innerActiveTab);
    },
    handleOuterTabClick(tab) {
      // Update the local storage on outer tab change
      localStorage.setItem("activeOuterTab", tab.name);
      console.log("Outer Tab: " + this.outerActiveTab);
    },
  },
};
</script>

<style scoped></style>
