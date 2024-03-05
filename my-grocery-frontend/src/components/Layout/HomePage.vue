<template>
  <div>
    <div class="nav-buttons">
      <router-link to="items-inventory" class="router_link">
        <el-button type="primary" size="x-small" plain>Items</el-button>
      </router-link>
      <router-link to="/recipes-page" class="router_link">
        <el-button type="warning" size="x-small" plain style="margin-left: 10px"
          >Recipes</el-button
        >
      </router-link>
      <router-link to="/health-page" class="router_link">
        <el-button type="info" size="x-small" plain style="margin-left: 10px"
          >Health</el-button
        >
      </router-link>
    </div>
    <div v-if="displayJokes">
      <el-card v-for="(joke, index) in jokes" :key="index">
        <p class="joke-card">
          {{ joke["Food Joke"] }}
        </p>
        <el-button :loading="loading" type="info" @click="gptJokes()" plain
          >Generate Prompt</el-button
        >
      </el-card>
    </div>
    <offers-page></offers-page>
    <el-card>
      <section>
        <el-tabs
          v-model="outerActiveTab"
          @tab-click="handleOuterTabClick"
          class="custom-tabs"
        >
          <el-tab-pane name="1" label="Food"
            ><span slot="label" class="el-tabs__label"
              ><i class="el-icon-food"></i> Food</span
            >
            <div>
              <purchased-list
                :items="Food_nonexpired"
                @item-deleted="handleItemDeleted()"
              ></purchased-list>
            </div>
          </el-tab-pane>
          <el-tab-pane name="2" label="Not Food">
            <span slot="label" class="el-tabs__label"
              ><i class="el-icon-bicycle"></i> Non Food</span
            >
            <div>
              <purchased-list
                :items="NonFood_nonexpired"
                @item-deleted="handleItemDeleted()"
              ></purchased-list>
            </div>
          </el-tab-pane>
        </el-tabs>
      </section>
      <delete-all-purchase-list></delete-all-purchase-list>
    </el-card>
    <home-prompt></home-prompt>
  </div>
</template>

<script>
import OffersPage from "@/views/OffersList.vue";
import HomePrompt from "../Data-resources/ChatGPTPrompts/HomePrompts.vue";
import PurchasedList from "../Data-resources/ProductList/PurchasedList.vue";
import DeleteAllPurchaseList from "../Data-resources/DeleteItems/DeleteAllPurchaseList.vue";

export default {
  components: {
    OffersPage,
    HomePrompt,
    PurchasedList,
    DeleteAllPurchaseList,
  },
  data() {
    return {
      loading: false,
      outerActiveTab: null,
      jokes: [],
      displayJokes: false,
      Food: [],
      NonFood: [],
      Food_nonexpired: [],
      NonFood_nonexpired: [],
      item: [],
    };
  },
  async mounted() {
    try {
      await this.jsonJokes();
      await this.purchased_list();
    } catch (error) {
      console.error("Error loading data:", error);
    }
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
    purchased_list() {
      fetch("/api/get-purchase-list", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      })
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

      // You can access the deleted item and target tab name here
      console.log("Deleted Item:", itemToDelete);

      // Update the active tab when an item is deleted
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
    async jsonJokes() {
      // Make a request to your backend endpoint
      fetch("/api/jokes-using-json")
        .then((response) => response.json())
        .then((data) => {
          if (data.jokes) {
            this.jokes = data.jokes;
          } else {
            this.errorMessage = "Error retrieving jokes.";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          this.errorMessage = "Error retrieving jokes.";
        });
      this.displayJokes = true;
    },
    async gptJokes() {
      try {
        this.loading = true;
        await fetch("/api/jokes-using-gpt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        const response = await fetch("/api/jokes-using-gpt");
        const data = await response.json();
        this.jokes = data.jokes;
        this.loading = false;
        console.log("Jokes:", this.jokes);
        this.user_input = "";
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>
<style scoped>
.el-page-header {
  display: none !important;
}
</style>
