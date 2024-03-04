<template>
  <div>
    <el-card>
      <el-collapse :accordion="true">
        <div class="recipe-container">
          <!-- Fusion Suggestions Section -->
          <el-collapse-item title="Food Fusion Suggestions">
            <div>
              <el-input
                placeholder="Enter Fusion Options"
                v-model="user_input"
                @change="Fusion_Cuisine_Suggestions()"
                class="input-with-select"
              >
                <el-select
                  class="select"
                  slot="prepend"
                  placeholder="Select Fusion Options"
                  v-model="selectedOption1"
                >
                  <el-option
                    v-for="option in fusionOptions"
                    :key="option"
                    :label="option"
                    :value="option"
                  ></el-option>
                </el-select>
              </el-input>

              <div v-if="loading" class="loading-indicator">
                <el-spinner></el-spinner>
              </div>
              <div v-if="displaySuggestions && !loading">
                <div
                  v-for="(suggestion, index) in fusionSuggestions"
                  :key="index"
                >
                  <p>
                    <strong> Fusion Cuisine Suggestion:</strong>
                    {{ suggestion["Fusion Cuisine Suggestion"] }}
                  </p>
                </div>
              </div>
              <el-button
                type="info"
                plain
                :loading="loading"
                @click="Fusion_Cuisine_Suggestions()"
              >
                Generate Prompt
              </el-button>
            </div>
          </el-collapse-item>

          <!-- User Defined Dish Section -->
          <el-collapse-item title="User Defined Dish">
            <div>
              <el-input
                placeholder="Enter User Defined Dish"
                v-model="user_dish"
                @change="gptFoodWaste()"
                class="input-with-select"
              >
                <el-select
                  class="select"
                  slot="prepend"
                  placeholder="User Defined Dish"
                  v-model="selectedOption2"
                >
                  <el-option
                    v-for="option in dishOptions"
                    :key="option"
                    :label="option"
                    :value="option"
                  ></el-option>
                </el-select>
              </el-input>

              <div v-if="loading" class="loading-indicator">
                <el-spinner></el-spinner>
              </div>
              <div v-if="displayDishes && !loading">
                <div v-for="(fact, index) in definedDishes" :key="index">
                  <p><strong>Fun Facts:</strong> {{ fact["Fun Facts"] }}</p>
                </div>
              </div>
              <el-button
                type="info"
                plain
                :loading="loading"
                @click="User_Defined_Dish()"
              >
                Generate Prompt
              </el-button>
            </div>
          </el-collapse-item>

          <!-- Unique Recipe Section -->
          <el-collapse-item title="Unique Recipe">
            <div>
              <el-input
                placeholder="Unique Recipe"
                v-model="unique_recipe"
                @change="Unique_Recipe()"
                class="input-with-select"
              >
                <el-select
                  class="select"
                  slot="prepend"
                  placeholder="Unique Recipe"
                  v-model="selectedOption3"
                >
                  <el-option
                    v-for="option in recipeOptions"
                    :key="option"
                    :label="option"
                    :value="option"
                  ></el-option>
                </el-select>
              </el-input>

              <div v-if="loading" class="loading-indicator">
                <el-spinner></el-spinner>
              </div>
              <div v-if="displayRecipe && !loading">
                <div v-for="(recipe, index) in uniqueRecipes" :key="index">
                  <p><strong>Recipe:</strong> {{ recipe["Recipe"] }}</p>
                  <p>
                    <strong>Encouragement:</strong>
                    {{ recipe["Encouragement"] }}
                  </p>
                </div>
              </div>
              <el-button
                type="info"
                plain
                :loading="loading"
                @click="Unique_Recipe()"
              >
                Generate Prompt
              </el-button>
            </div>
          </el-collapse-item>

          <!-- Diet Schedule Section -->
          <el-collapse-item title="Diet Schedule">
            <div>
              <div v-if="loading" class="loading-indicator">
                <el-spinner></el-spinner>
              </div>
              <div v-if="displaySchedule && !loading">
                <div v-for="(meal, index) in dietSchedule" :key="index">
                  <p slot="header">
                    Meal Number {{ meal["Meal Number"] }} -
                    {{ meal["Meal Category"] }}
                  </p>
                  <p><Strong>Food Item: </Strong>{{ meal["Food Item"] }}</p>
                  <p>
                    <strong>Meal Suggestion: </strong
                    >{{ meal["Meal Suggestion"] }}
                  </p>
                </div>
              </div>
              <el-button
                @click="Diet_Schedule()"
                type="info"
                plain
                :loading="loading"
                >Generate Prompt</el-button
              >
            </div>
          </el-collapse-item>

          <!-- Generated Recipes Section -->
          <el-collapse-item title="Generated Recipes">
            <div>
              <div v-if="loading" class="loading-indicator">
                <el-spinner></el-spinner>
              </div>
              <div v-if="displayResult && !loading">
                <div v-for="(recipe, index) in generatedRecipes" :key="index">
                  <p slot="header">
                    Group of Items: {{ recipe["Group of Items"].join(", ") }}
                  </p>
                  <p>
                    <strong>Generated Recipe:</strong>
                    {{ recipe["Generated Recipe"] }}
                  </p>
                </div>
              </div>
              <el-button
                @click="Generated_Recipes"
                type="info"
                plain
                :loading="loading"
                >Generate Prompt</el-button
              >
            </div>
          </el-collapse-item>
        </div>
      </el-collapse>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user_input: "",
      user_dish: "",
      unique_recipe: "",
      selectedOption1: null,
      selectedOption2: null,
      selectedOption3: null,
      fusionOptions: [
        "Italian and Japanese",
        "Mexican and Chinese",
        "Indian and French",
        "Chinese and English",
        "Indian and Italian",
      ],
      dishOptions: [
        "Sweet Dishes",
        "Chicken Dishes",
        "Meat Dishes",
        "Milk Dishes",
      ],
      recipeOptions: [
        "banana rice apple",
        "apple rice pie",
        "rice mango tomatoes",
        "onions olives cheese",
        "tomatoes meat onions garlic spices",
      ],
      fusionSuggestions: [],
      definedDishes: [],
      uniqueRecipes: [],
      dietSchedule: [],
      generatedRecipes: [],
      displaySuggestions: false,
      displayDishes: false,
      displayRecipe: false,
      displaySchedule: false,
      displayResult: false,
      loading: false,
    };
  },
  mounted() {
    this.getFusionSuggestions();
    this.getUserDefinedDish();
    this.getUniqueRecipes();
    this.getDietSchedule();
    this.getGeneratedRecipes();
  },
  methods: {
    async getFusionSuggestions() {
      try {
        const response = await fetch(
          "/api/fusion-cuisine-suggestions-using-json"
        );
        const data = await response.json();
        this.fusionSuggestions = data.Fusion_Cuisine_Suggestions;
      } catch (error) {
        console.error("Error fetching fusion suggestions:", error);
      }
      this.displaySuggestions = true;
    },
    async Fusion_Cuisine_Suggestions() {
      try {
        this.loading = true;

        const user_input = this.selectedOption1 || "Italian and Japanese";

        // Send a POST request to generate the Fusion_Cuisine_Suggestions.json file
        await fetch("/api/fusion-cuisine-suggestion-using-gpt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_input }),
        });

        // Retrieve data from the Fusion_Cuisine_Suggestions.json file
        const response = await fetch(
          "/api/fusion-cuisine-suggestions-using-json"
        );
        const data = await response.json();
        this.fusionSuggestions = data.Fusion_Cuisine_Suggestions;
        this.loading = false;
      } catch (error) {
        console.error("Error fetching fusion suggestions:", error);
      }
    },
    async getUserDefinedDish() {
      try {
        // Retrieve data from the Fusion_Cuisine_Suggestions.json file
        const response = await fetch("/api/user-defined-dish-using-json", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        this.definedDishes = data.User_Defined_Dish;
      } catch (error) {
        console.error("Error fetching user defined dish:", error);
      }
      this.displayDishes = true;
    },
    async User_Defined_Dish() {
      try {
        this.loading = true;

        const user_dish = this.selectedOption2 || "Sweet dish";

        // // Send a POST request to generate the Fusion_Cuisine_Suggestions.json file
        await fetch("/api/user-defined-dish-using-gpt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_dish }),
        });
        const response = await fetch("/api/user-defined-dish-using-json");
        const data = await response.json();
        this.definedDishes = data.User_Defined_Dish;
        this.loading = false;
      } catch (error) {
        console.error("Error fetching user defined dish:", error);
      }
    },

    async getUniqueRecipes() {
      try {
        // Send a GET request to retrieve unique recipes data
        const response = await fetch("/api/unique-recipes-using-json");
        const data = await response.json();
        console.log(data);
        this.uniqueRecipes = data.Unique_Recipes;
        console.log("Unique_Recipes", this.uniqueRecipes);
      } catch (error) {
        console.error("Error fetching unique recipes:", error);
      }
      this.displayRecipe = true;
    },
    async Unique_Recipe() {
      try {
        this.loading = true;

        const unique_recipe = this.selectedOption3 || "banana rice apple";

        // Send a POST request to generate the Fusion_Cuisine_Suggestions.json file
        await fetch("/api/unique-recipes-using-gpt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ unique_recipe }),
        });
        // Send a GET request to retrieve unique recipes data
        const response = await fetch("/api/unique-recipes-using-json");
        const data = await response.json();
        console.log(data);
        this.uniqueRecipes = data.Unique_Recipes;
        this.loading = false;

        console.log("Unique_Recipes", this.uniqueRecipes);
      } catch (error) {
        console.error("Error fetching unique recipes:", error);
      }
    },

    async getDietSchedule() {
      try {
        // Send a GET request to retrieve diet schedule data
        const response = await fetch("/api/diet-schedule-using-json");
        const data = await response.json();
        console.log(data);
        this.dietSchedule = data.Diet_Schedule;
        console.log("Diet_Schedule", this.dietSchedule);
      } catch (error) {
        console.error("Error fetching diet schedule:", error);
      }
      this.displaySchedule = true;
    },
    async Diet_Schedule() {
      try {
        this.loading = true;

        // Send a POST request to generate the Fusion_Cuisine_Suggestions.json file
        await fetch("/api/diet-schedule-using-gpt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        // Send a GET request to retrieve diet schedule data
        const response = await fetch("/api/diet-schedule-using-gpt");
        const data = await response.json();
        console.log(data);
        this.dietSchedule = data.Diet_Schedule;
        this.loading = false;

        console.log("Diet_Schedule", this.dietSchedule);
      } catch (error) {
        console.error("Error fetching diet schedule:", error);
      }
    },

    async getGeneratedRecipes() {
      try {
        // Send a GET request to retrieve generated recipes data
        const response = await fetch("/api/recipes-using-json");
        const data = await response.json();
        console.log(data);
        this.generatedRecipes = data.recipes;
        console.log("Generated_Recipes", this.generatedRecipes);
      } catch (error) {
        console.error("Error fetching generated recipes:", error);
      }
      this.displayResult = true;
    },
    async Generated_Recipes() {
      try {
        this.loading = true;
        await fetch("/api/recipes-using-gpt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        const response = await fetch("/api/recipes-using-gpt");
        const data = await response.json();
        console.log(data);
        this.generatedRecipes = data.Generated_Recipes;
        this.loading = false;

        console.log("Generated_Recipes", this.generatedRecipes);
      } catch (error) {
        console.error("Error fetching generated recipes:", error);
      }
    },
  },
};
</script>

<style scoped></style>
