<template>
  <el-card>
    <el-collapse :accordion="true">
      <div>
        <!-- Food Waste Reduction Suggestions Section -->
        <el-collapse-item title="Food Waste Reduction Suggestions">
          <div>
            <el-input
              placeholder="Enter Food Waste Reduction Suggestion"
              v-model="user_input"
              class="input-with-select"
              @change="gptFoodWaste()"
            >
              <el-select
                slot="prepend"
                placeholder="Choose Food Waste Reduction Suggestions"
                v-model="selectedValue"
                class="select"
              >
                <el-option
                  v-for="option in foodReductionOptions"
                  :key="option"
                  :label="option"
                  :value="option"
                ></el-option>
              </el-select>
            </el-input>
            <!-- Loading indicator -->
            <div v-if="loading" class="loading-indicator">
              <el-spinner></el-spinner>
            </div>

            <div v-if="displayWasteReduction && !loading">
              <div
                v-for="(suggestion, index) in foodWasteReductionSuggestions"
                :key="index"
                :body-style="{ height: 'auto' }"
              >
                <p>
                  <strong>Food Waste Reduction Suggestion:</strong>
                  {{ suggestion["Food Waste Reduction Suggestion"] }}
                </p>
              </div>
            </div>
            <el-button
              @click="gptFoodWaste()"
              :loading="loading"
              type="info"
              plain
            >
              Generate Prompt
            </el-button>
          </div>
        </el-collapse-item>

        <!-- Ethical Eating Suggestions Section -->
        <el-collapse-item title="Ethical Eating Suggestions">
          <div>
            <!-- Loading indicator -->
            <div v-if="loading" class="loading-indicator">
              <el-spinner></el-spinner>
            </div>

            <div v-if="displayEthicalSuggestions && !loading">
              <!-- Display generated suggestions -->
              <div
                v-for="(group, index) in ethicalEatingSuggestions"
                :key="index"
              >
                <div>
                  <strong>Ingredients:</strong>
                  {{ group["Group of Items"].join(", ") }}
                </div>
                <p>
                  <strong>Ethical Eating Suggestions:</strong>
                  {{ group["Ethical Eating Suggestions"] }}
                </p>
              </div>
              <el-button
                @click="gptEthicalSuggestions()"
                :loading="loading"
                type="info"
                plain
                style="margin-left: 0px !important"
              >
                Generate Prompt
              </el-button>
            </div>
          </div>
        </el-collapse-item>

        <!-- Fun Facts Section -->
        <el-collapse-item title="Fun Facts">
          <div>
            <div v-if="loading" class="loading-indicator">
              <el-spinner></el-spinner>
            </div>
            <div v-if="displayFunFacts && !loading">
              <div
                v-for="(fact, index) in funFacts"
                :key="index"
                :body-style="{ height: 'auto' }"
              >
                <div>
                  <strong>Food Items:</strong>
                  {{ fact["Food Item"] }}
                </div>
                <p><strong>Fun Facts:</strong> {{ fact["Fun Facts"] }}</p>
              </div>
            </div>
            <el-alert v-if="errorMessage" title="Error" type="error">{{
              errorMessage
            }}</el-alert>
          </div>
          <el-button
            @click="gptFunFacts()"
            :loading="loading"
            type="info"
            plain
            style="margin-left: 0px !important"
          >
            Generate Prompt
          </el-button>
        </el-collapse-item>

        <!-- Cooking Tips Section -->
        <el-collapse-item title="Cooking Tips">
          <div>
            <div v-if="loading" class="loading-indicator">
              <el-spinner></el-spinner>
            </div>
            <div v-if="displayCookingTips && !loading">
              <div v-for="(tip, index) in cookingTips" :key="index">
                <p><strong>Cooking Tips: </strong>{{ tip["Cooking Tip"] }}</p>
              </div>
            </div>
            <div v-if="!cookingTips && !loading">
              <el-alert title="No Cooking Tips" type="info" show-icon>
                No cooking tips available.
              </el-alert>
            </div>
            <el-button
              @click="gptCookingTips()"
              :loading="loading"
              type="info"
              plain
            >
              Generate Prompt
            </el-button>
          </div>
        </el-collapse-item>

        <!-- Current Trends Section -->
        <el-collapse-item title="Current Trends">
          <div>
            <div v-if="loading" class="loading-indicator">
              <el-spinner></el-spinner>
            </div>
            <div v-if="displayCurrentTrends && !loading">
              <div v-for="(trend, index) in currentTrends" :key="index">
                <p><strong>Current Trends:</strong>{{ trend["Fun Facts"] }}</p>
              </div>
            </div>
            <div v-if="!currentTrends && !loading">
              <el-alert title="No Fun Facts" type="info" show-icon>
                No current food trends available.
              </el-alert>
            </div>
            <el-button
              @click="gptCurrentTrends()"
              :loading="loading"
              type="info"
              plain
            >
              Generate Prompt
            </el-button>
          </div>
        </el-collapse-item>

        <!-- Food Handling  Section -->
        <el-collapse-item title="Food Handling Advice">
          <div>
            <div v-if="loading" class="loading-indicator">
              <el-spinner></el-spinner>
            </div>
            <div v-if="displayFoodHandling && !loading">
              <div v-for="(item, index) in handlingadvice" :key="index">
                <div><strong>Food Items:</strong> {{ item["Food Item"] }}</div>
                <p>
                  <strong>Handling Advice:</strong>
                  {{ item["Handling Advice"] }}
                </p>
              </div>
            </div>
            <div v-if="!displayFoodHandling">
              <el-alert title="No handling Advice" type="info" show-icon>
                No health handling advice available.
              </el-alert>
            </div>
            <el-button
              @click="gptFoodHandling()"
              :loading="loading"
              type="info"
              plain
            >
              Generate Prompt
            </el-button>
          </div>
        </el-collapse-item>

        <!-- Mood Changer Section -->
        <el-collapse-item title="Mood Changer Suggestion">
          <div>
            <el-input
              placeholder="Enter Mood Changer"
              v-model="user_mood"
              class="input-with-select"
              @change="gptFoodWaste()"
            >
              <el-select
                class="select"
                slot="prepend"
                placeholder="Choose Mood Changer Suggestions"
                v-model="selectedValue"
              >
                <el-option
                  v-for="option in moodChangeOptions"
                  :key="option"
                  :label="option"
                  :value="option"
                ></el-option>
              </el-select>
            </el-input>
            <!-- Loading indicator -->
            <div v-if="loading" class="loading-indicator">
              <el-spinner></el-spinner>
            </div>
            <div v-if="displayMood && !loading">
              <div
                v-for="(suggestion, index) in moodChangerSuggestions"
                :key="index"
              >
                <p>
                  <strong>Food Suggestion: </strong
                  >{{ suggestion["Food Suggestion"] }}
                </p>
              </div>
            </div>
            <div v-if="displayMood.length === 0 && !loading">
              <el-alert
                title="No Mood Changer Suggestion"
                type="info"
                show-icon
              >
                No Mood Changer Suggestion available.
              </el-alert>
            </div>
            <el-button
              @click="gptMoodChanger()"
              :loading="loading"
              type="info"
              plain
              >Generate Prompt
            </el-button>
          </div>
        </el-collapse-item>
      </div>
    </el-collapse>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      foodReductionOptions: [
        "Suggest a recipe that helps reduce food waste.",
        "Provide tips on reducing food waste in the kitchen.",
        "Recommend creative ways to repurpose leftover ingredients.",
        "Share ideas for sustainable meal planning to minimize food waste.",
        "How can I use vegetable scraps to create flavorful broths or stocks?",
        "Give suggestions on preserving fruits and vegetables to extend their shelf life.",
        "What are some zero-waste cooking techniques for a more sustainable kitchen?",
        "Share innovative ways to use overripe fruits in desserts or snacks.",
        "Provide tips on storing fresh herbs to prevent them from going bad.",
        "Suggest ways to use stale bread to avoid food waste.",
        "What are some composting tips for kitchen waste?",
        "Give ideas for reusing glass jars and containers to reduce packaging waste.",
        "How can I repurpose coffee grounds in a sustainable way?",
        "Provide tips on reducing food packaging waste during grocery shopping.",
        "Suggest recipes that incorporate commonly discarded parts of vegetables.",
        "Give ideas for reducing food waste at social events and gatherings.",
        "How can I creatively use leftover pasta or rice?",
        "Provide tips on portion control to minimize food leftovers.",
        "Suggest ways to repurpose citrus peels in cooking or cleaning.",
        "What are some sustainable alternatives for single-use kitchen items?",
      ],
      moodChangeOptions: [
        "Sad, depressed, angry, or upset",
        "Happy, content, relaxed, or calm",
        "Angry, upset, or frustrated",
        "Exuberant, excited, or energetic",
      ],
      funFacts: [],
      cookingTips: [],
      currentTrends: [],
      handlingadvice: [],
      foodSuggestions: [],
      ethicalEatingSuggestions: [],
      foodWasteReductionSuggestions: [],
      moodChangerSuggestions: [],
      displayMood: "false",
      displayEthicalSuggestions: "false",
      displayCookingTips: "false",
      displayCurrentTrends: "false",
      displayWasteReduction: "false",
      displayFunFacts: "false",
      displayFoodHandling: "false",
      loading: false,
      error: false,
      selectedOption: null,
      user_mood: "",
      user_input: "",
      selectedValue: "",
      errorMessage: "",
    };
  },
  async mounted() {
    try {
      await this.jsonEthicalSuggestions();
      await this.jsonFunFacts();
      await this.jsonFoodWaste();
      await this.jsonFoodHandling();
      await this.jsonCurrentTrends();
      await this.jsonCookingTips();
      await this.jsonMoodChanger();
    } catch (error) {
      console.error("Error loading data:", error);
    }
  },

  methods: {
    async jsonEthicalSuggestions() {
      try {
        const response = await fetch(
          "/api/ethical-eating-suggestion-using-json"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        this.ethicalEatingSuggestions = data.ethical_eating_list;
        this.error = null;

        // Debugging: Log the data received
        console.log("Data Received:", data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        this.error = "Error fetching suggestions. Please try again.";
      }
      this.displayEthicalSuggestions = true;
    },
    async gptEthicalSuggestions() {
      try {
        // Set loading to true to display the loading indicator
        this.loading = true;

        // Make the fetch request to generate ethical suggestions
        await fetch("/api/ethical-eating-suggestion-using-gpt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        // Fetch the generated suggestions
        const response = await fetch(
          "/api/ethical-eating-suggestion-using-json"
        );
        const data = await response.json();
        this.ethicalEatingSuggestions = data.ethical_eating_list;

        // Set loading back to false after receiving the response
        this.loading = false;

        console.log("Ethical_Suggestions:", this.ethicalEatingSuggestions);
      } catch (error) {
        // Handle any errors
        this.error = error.message;
      }
    },

    async jsonFunFacts() {
      try {
        const response = await fetch("/api/get-fun-facts-using-json");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Full Response:", data);
        this.funFacts = data.Fun_Facts || [];
      } catch (error) {
        console.error("Error fetching fun facts:", error);
        this.errorMessage = "Error fetching fun facts. Please try again.";
      }
      this.displayFunFacts = true;
    },
    async gptFunFacts() {
      try {
        // Set loading to true to display the loading indicator
        this.loading = true;
        await fetch("/api/get-fun-facts-using-gpt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        const response = await fetch("/api/get-fun-facts-using-gpt");
        const data = await response.json();
        this.funFacts = data.Fun_Facts;
        this.loading = false;

        console.log("Fun_Facts:", this.funFacts);
      } catch (error) {
        this.error = error.message;
      }
    },
    async jsonCookingTips() {
      try {
        const response = await fetch("/api/cooking-tips-using-json");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data", data);

        if (data && data.Cooking_Tips) {
          this.cookingTips = data.Cooking_Tips;
          console.log("Cooking Tips", this.cookingTips);
        } else {
          this.cookingTips = [];
          console.error("Cooking Tips not found in the API response");
        }
      } catch (error) {
        console.error("Error fetching cooking tips:", error);
        this.error = true;
      } finally {
        this.loading = false;
      }
      this.displayCookingTips = true;
    },
    async gptCookingTips() {
      try {
        // Set loading to true to display the loading indicator
        this.loading = true;
        await fetch("/api/cooking-tips-using-gpt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        const response = await fetch("/api/cooking-tips-using-gpt");
        const data = await response.json();
        this.cookingTips = data.Cooking_Tips;
        this.loading = false;

        console.log("Cooking_Tips:", this.cookingTips);
      } catch (error) {
        this.error = error.message;
      }
    },

    async jsonFoodWaste() {
      try {
        const response = await fetch("/api/food-waste-reduction-using-json");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Full Response:", data);
        this.foodWasteReductionSuggestions =
          data.Food_Waste_Reduction_Suggestions || [];
      } catch (error) {
        console.error(
          "Error fetching food waste reduction suggestions:",
          error
        );
        this.errorMessage =
          "Error fetching food waste reduction suggestions. Please try again.";
      }
      this.displayWasteReduction = true;
    },
    async gptFoodWaste() {
      try {
        this.loading = true;

        const user_input =
          this.selectedOption ||
          "Suggest a recipe that helps reduce food waste";
        await fetch("/api/food-waste-reduction-using-gpt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_input }),
        });
        const response = await fetch("/api/food-waste-reduction-using-json");
        const data = await response.json();
        this.foodWasteReductionSuggestions =
          data.Food_Waste_Reduction_Suggestions;
        this.loading = false;

        console.log(
          "Food_Waste_Reduction_Suggestions:",
          this.foodWasteReductionSuggestions
        );
      } catch (error) {
        this.error = error.message;
      }
    },

    async jsonCurrentTrends() {
      try {
        const response = await fetch("/api/current-trends-using-json");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data", data);

        if (data && data.Current_Trends) {
          this.currentTrends = data.Current_Trends;
          console.log("Current Trends", this.currentTrends);
        } else {
          this.currentTrends = [];
          console.error("Current Trends not found in the API response");
        }
      } catch (error) {
        console.error("Error fetching current trends:", error);
        this.error = true;
      } finally {
        this.loading = false;
      }
      this.displayCurrentTrends = true;
    },
    async gptCurrentTrends() {
      try {
        // Set loading to true to display the loading indicator
        this.loading = true;
        await fetch("/api/current-trends-using-gpt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        const response = await fetch("/api/current-trends-using-gpt");
        const data = await response.json();
        this.currentTrends = data.Current_Trends;
        this.loading = false;
        console.log("Current_Trends:", this.currentTrends);
      } catch (error) {
        this.error = error.message;
      }
    },
    async jsonFoodHandling() {
      try {
        // Make the API request
        const response = await fetch("/api/food-handling-advice-using-json");

        // Check if the response is successful (status code 200)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Check if the response contains the expected property
        if (data && data.food_handling_advice) {
          this.handlingadvice = data.food_handling_advice;
        } else {
          this.handlingadvice = [];
          console.error("food_handling_advice not found in the API response");
        }
      } catch (error) {
        console.error("Error fetching food handling advice:", error);
        this.error = true;
      } finally {
        this.loading = false;
      }
      this.displayFoodHandling = true;
    },
    async gptFoodHandling() {
      try {
        // Set loading to true to display the loading indicator
        this.loading = true;
        await fetch("/api/food-handling-advice-using-gpt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        const response = await fetch("/api/food-handling-advice-using-gpt");
        const data = await response.json();
        this.handlingadvice = data.food_handling_advice;
        this.loading = false;
        console.log("food_handling_advice:", this.handlingadvice);
      } catch (error) {
        this.error = error.message;
      }
    },
    async jsonMoodChanger() {
      try {
        // Make the API request
        const response = await fetch("/api/mood-changer-using-json");

        // Check if the response is successful (status code 200)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Parse the JSON response
        const data = await response.json();
        // Check if the response contains the expected property
        if (data && data.Mood_Changer) {
          this.moodChangerSuggestions = data.Mood_Changer;
        } else {
          this.moodChangerSuggestions = [];
          console.error("Mood_Changer not found in the API response");
        }
      } catch (error) {
        console.error("Error fetching Mood_Changer:", error);
        this.error = true;
      } finally {
        this.loading = false;
      }
      this.displayMood = true;
    },
    async gptMoodChanger() {
      try {
        this.loading = true;

        const user_mood =
          this.selectedOption || "Sad, I'm feeling tired, I'm going to bed";
        await fetch("/api/mood-changer-using-gpt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_mood }),
        });
        // Send a GET request to retrieve unique recipes data
        const response = await fetch("/api/mood-changer-using-json");
        const data = await response.json();
        console.log(data);
        this.moodChangerSuggestions = data.Mood_Changer;
        this.loading = false;
        console.log("Mood Changer:", this.moodChangerSuggestions);
      } catch (error) {
        console.error("Error fetching mood changer:", error);
      }
    },
  },
};
</script>

<style scoped></style>
