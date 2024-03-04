<template>
  <div>
    <el-card>
      <el-collapse :accordion="true">
        <!-- Allergy Information Section -->
        <el-collapse-item title="Allergy Information">
          <div>
            <div>
              <div v-if="loading" class="loading-indicator">
                <el-spinner></el-spinner>
              </div>
              <div
                v-if="AllergyInformation.length === 0"
                class="health-loading"
              >
                Loading...
              </div>
              <div v-else-if="AllergyInformation.length > 0 && !loading">
                <div v-for="item in AllergyInformation" :key="item.id">
                  <div><strong>Food Item: </strong>{{ item["Food Item"] }}</div>
                  <div>
                    <p>{{ item["Allergy Information"] }}</p>
                  </div>
                </div>
              </div>
              <div v-else class="health-loading">
                No allergy information available.
              </div>
              <el-button
                type="info"
                @click="getNewAllergyInformation()"
                :loading="loading"
                plain
                >Generate Prompt</el-button
              >
            </div>
          </div>
        </el-collapse-item>

        <!-- Healthier Eating Alternatives Section -->
        <el-collapse-item title="Healthier Eating Alternatives">
          <div>
            <div>
              <div>
                <div v-if="loading" class="loading-indicator">
                  <el-spinner></el-spinner>
                </div>
                <div v-if="alternatives.length === 0" class="health-loading">
                  Loading...
                </div>
                <div v-if="alternatives && alternatives.length > 0 && !loading">
                  <div v-for="(item, index) in alternatives" :key="index">
                    <div>
                      <strong>Food Item:</strong> {{ item["Food Item"] }}
                    </div>
                    <p>
                      <strong>Healthy Alternative:</strong>
                      {{ item["Healthy Alternative"] }}
                    </p>
                  </div>
                </div>
                <div v-if="!alternatives">
                  <el-alert title="No Suggestions" type="info" show-icon>
                    No healthy alternatives available.
                  </el-alert>
                </div>
                <el-button
                  type="info"
                  @click="getNewHealthierAlternatives()"
                  :loading="loading"
                  plain
                  >Generate Prompt
                </el-button>
              </div>
            </div>
          </div>
        </el-collapse-item>

        <!-- Healthy Eating Advice Section -->
        <el-collapse-item title="Healthy Eating Advice">
          <div>
            <div>
              <div v-if="loading" class="loading-indicator">
                <el-spinner></el-spinner>
              </div>
              <div v-if="eatingAdviceList.length === 0" class="health-loading">
                Loading...
              </div>
              <div v-if="eatingAdviceList.length > 0 && !loading">
                <div v-for="(item, index) in eatingAdviceList" :key="index">
                  <div>
                    <p>
                      <strong>Response:</strong> {{ item["Health Advice"] }}
                    </p>
                  </div>
                </div>
              </div>
              <div v-if="!eatingAdviceList">
                <el-alert title="No Advice" type="info" show-icon>
                  No healthy eating advice available.
                </el-alert>
              </div>
              <el-button
                type="info"
                @click="getNewHealthyEatingAdvice()"
                :loading="loading"
                plain
              >
                Generate Prompt
              </el-button>
            </div>
          </div>
        </el-collapse-item>

        <!-- Healthy Items Usage Suggestions Section -->
        <el-collapse-item title="Healthy Items Usage">
          <div>
            <div>
              <div v-if="loading" class="loading-indicator">
                <el-spinner></el-spinner>
              </div>
              <div v-if="suggestions.length === 0" class="health-loading">
                Loading...
              </div>
              <div v-if="suggestions && suggestions.length > 0 && !loading">
                <div v-for="(item, index) in suggestions" :key="index">
                  <div>
                    <strong>Food Item: </strong>{{ item["Food Item"] }}
                    <p><strong>Suggestion:</strong> {{ item["Suggestion"] }}</p>
                  </div>
                </div>
              </div>
              <div v-if="!suggestions">
                <el-alert title="No Suggestions" type="info" show-icon>
                  No healthy items usage suggestions available.
                </el-alert>
              </div>
              <el-button
                type="info"
                @click="getNewHealthyItemsUsage()"
                :loading="loading"
                plain
                >Generate Prompt</el-button
              >
            </div>
          </div>
        </el-collapse-item>

        <!-- Health Incompatabilities Section -->
        <el-collapse-item title="Health Incompatibilities">
          <div>
            <div>
              <div v-if="loading" class="loading-indicator">
                <el-spinner></el-spinner>
              </div>
              <div
                v-if="healthIncompatibilities.length === 0"
                class="health-loading"
              >
                Loading...
              </div>
              <div v-else-if="healthIncompatibilities.length > 0 && !loading">
                <div v-for="item in healthIncompatibilities" :key="item.id">
                  <strong>Food Combination: </strong>
                  {{ item["Food Combination"] }}
                  <p>
                    <strong>Health-wise Incompatabilities: </strong
                    >{{ item["Health-wise Incompatibility Information"] }}
                  </p>
                </div>
              </div>
              <div v-if="!healthIncompatibilities">
                <el-alert title="No Suggestions" type="info" show-icon>
                  No health incompatabilities suggestions available.
                </el-alert>
              </div>
              <el-button
                type="info"
                @click="getNewHealthIncompatabilties"
                :loading="loading"
                plain
                >Generate Prompt</el-button
              >
            </div>
          </div>
        </el-collapse-item>

        <!-- Nutritional Analysis Section -->
        <el-collapse-item title="Nutritional Analysis">
          <div>
            <div>
              <div v-if="loading" class="loading-indicator">
                <el-spinner></el-spinner>
              </div>
              <div
                v-if="nutritionalAnalysis.length === 0"
                class="health-loading"
              >
                Loading...
              </div>
              <div v-else-if="nutritionalAnalysis.length > 0">
                <div v-for="item in nutritionalAnalysis" :key="item.id">
                  <strong>Group of Items: </strong>
                  {{ item["Group of Items"].join(", ") }}
                  <p>
                    <strong>Nutritional Analysis: </strong>
                    {{ item["Nutritional Analysis"] }}
                  </p>
                </div>
              </div>
              <div v-if="!nutritionalAnalysis">
                <el-alert title="No Suggestions" type="info" show-icon>
                  No nutritional analysis available.
                </el-alert>
              </div>
            </div>
            <el-button
              type="info"
              @click="getNewNutritionalAnalysis"
              :loading="loading"
              plain
              >Generate Prompt</el-button
            >
          </div>
        </el-collapse-item>

        <!-- Nutritional Value Section -->
        <el-collapse-item title="Nutritional Value">
          <div>
            <div>
              <div v-if="loading" class="loading-indicator">
                <el-spinner></el-spinner>
              </div>
              <div v-if="nutritionalValue.length === 0" class="health-loading">
                Loading...
              </div>
              <div v-else-if="nutritionalValue.length > 0 && !loading">
                <div v-for="item in nutritionalValue" :key="item.id">
                  <strong>Food Item: </strong>
                  {{ item["Food Item"] }}
                  <p>
                    <strong>Nutritional Advice: </strong>
                    {{ item["Nutritional Advice"] }}
                  </p>
                </div>
              </div>
              <div v-if="!nutritionalValue">
                <el-alert title="No Suggestions" type="info" show-icon>
                  No nutritional value available.
                </el-alert>
              </div>
              <el-button
                type="info"
                @click="getNewNutritionalValue"
                :loading="loading"
                plain
                >Generate Prompt</el-button
              >
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      AllergyInformation: [],
      eatingAdviceList: [], // Updated property name
      alternatives: [],
      suggestions: [],
      healthIncompatibilities: [],
      nutritionalAnalysis: [],
      nutritionalValue: [],
      loading: false,
      error: false,
    };
  },
  mounted() {
    // Call the API endpoints to get data
    this.getAllergyInformation();
    this.getHealthierAlternatives();
    this.getHealthyEatingAdvice();
    this.getHealthyItemsUsage();
    this.getHealthIncompatabilties();
    this.getNutritionalAnalysis();
    this.getNutritionalValue();
  },
  methods: {
    async getAllergyInformation() {
      try {
        const response = await fetch("/api/allergy-information-using-json", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("API Response:", response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Data:", data); // Log the received data
        this.AllergyInformation = data.allergy_information_list || [];
        console.log("Allergy_Information", this.AllergyInformation);
      } catch (error) {
        console.error("Error fetching allergy information:", error);
      }
    },

    async getNewAllergyInformation() {
      try {
        this.loading = true;

        // Send a POST request to generate the Fusion_Cuisine_Suggestions.json file
        await fetch("/api/allergy-information-using-gpt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        const response = await fetch("/api/allergy-information-using-gpt", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("API Response:", response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Data:", data); // Log the received data
        this.AllergyInformation = data.allergy_information_list || [];
        this.loading = false;
        console.log("Allergy_Information", this.AllergyInformation);
      } catch (error) {
        console.error("Error fetching allergy information:", error);
      }
    },

    async getHealthierAlternatives() {
      try {
        const response = await fetch("/api/healthier-alternatives-using-json");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data", data);

        // Corrected property name here
        if (data && data.Food_Suggestions_With_Alternatives) {
          this.alternatives = data.Food_Suggestions_With_Alternatives;
          console.log("Food_Suggestions_With_Alternatives", this.alternatives);
        } else {
          this.alternatives = [];
          console.error("Healthy_alternatives not found in the API response");
        }
      } catch (error) {
        console.error("Error fetching healthier alternatives:", error);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },

    async getNewHealthierAlternatives() {
      try {
        this.loading = true;

        // Send a POST request to generate the Fusion_Cuisine_Suggestions.json file
        await fetch("/api/healthier-alternatives-using-gpt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        const response = await fetch("/api/healthier-alternatives-using-gpt", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("API Response:", response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data:", data); // Log the received data

        this.alternatives = data.Food_Suggestions_With_Alternatives || [];
        this.loading = false;

        console.log("Healthy_alternatives", this.alternatives);
      } catch (error) {
        console.error("Error fetching healthy alternative information:", error);
      }
    },

    async getHealthyEatingAdvice() {
      try {
        const response = await fetch("/api/healthy-eating-advice-using-json");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data", data);

        if (data && data.Healthy_Eating_Advice) {
          this.eatingAdviceList = data.Healthy_Eating_Advice;
          console.log("Healthy_Eating_Advice", this.eatingAdviceList);
        } else {
          this.eatingAdviceList = [];
          console.error("Healthy_Eating_Advice not found in the API response");
        }
      } catch (error) {
        console.error("Error fetching healthy eating advice:", error);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },

    async getNewHealthyEatingAdvice() {
      try {
        this.loading = true;

        // Send a POST request to generate the Fusion_Cuisine_Suggestions.json file
        await fetch("/api/healthy-eating-advice-using-gpt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        const response = await fetch("/api/healthy-eating-advice-using-gpt", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("API Response:", response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data:", data); // Log the received data

        this.eatingAdviceList = data.Healthy_Eating_Advice || [];
        this.loading = false;

        console.log("Healthy_Eating_Advice", this.eatingAdviceList);
      } catch (error) {
        console.error(
          "Error fetching Healthy_Eating_Advice information:",
          error
        );
      }
    },

    async getHealthyItemsUsage() {
      try {
        const response = await fetch("/api/healthy-items-usage-using-json");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data", data);

        if (data && data.Healthy_Items_Usage) {
          this.suggestions = data.Healthy_Items_Usage;
          console.log("Healthy_Items_Usage", this.suggestions);
        } else {
          this.suggestions = [];
          console.error("Healthy_Items_Usage not found in the API response");
        }
      } catch (error) {
        console.error("Error fetching healthy items usage suggestions:", error);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },

    async getNewHealthyItemsUsage() {
      try {
        this.loading = true;

        // Send a POST request to generate the Fusion_Cuisine_Suggestions.json file
        await fetch("/api/healthy-items-usage-using-gpt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        const response = await fetch("/api/healthy-items-usage-using-gpt", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("API Response:", response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data:", data); // Log the received data

        this.suggestions = data.Healthy_Items_Usage || [];
        this.loading = false;

        console.log("health_incompatabilities", this.suggestions);
      } catch (error) {
        console.error("Error fetching health advice information:", error);
      }
    },

    async getHealthIncompatabilties() {
      try {
        const response = await fetch(
          "/api/health_incompatibilities_using_json"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data", data);

        if (data && data.Health_Incompatibilities) {
          this.healthIncompatibilities = data.Health_Incompatibilities;
          console.log("health_incompatabilities", this.healthIncompatibilities);
        } else {
          this.healthIncompatibilities = [];
          console.error("Healthy_Items_Usage not found in the API response");
        }
      } catch (error) {
        console.error(
          "Error fetching health incompatabilities information:",
          error
        );
        this.error = true;
      } finally {
        this.loading = false;
      }
    },

    async getNewHealthIncompatabilties() {
      try {
        this.loading = true;

        // Send a POST request to generate the Fusion_Cuisine_Suggestions.json file
        await fetch("/api/health_incompatibilities_using_gpt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        const response = await fetch(
          "/api/health_incompatibilities_using_gpt",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("API Response:", response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data:", data); // Log the received data

        this.healthIncompatibilities = data.Health_Incompatibilities || [];
        this.loading = false;

        console.log("health_incompatabilities", this.healthIncompatibilities);
      } catch (error) {
        console.error(
          "Error fetching health incompatabilities information:",
          error
        );
      }
    },

    async getNutritionalAnalysis() {
      try {
        const response = await fetch("/api/nutritional-analysis-using-json");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data", data);

        if (data && data.Nutritional_Analysis) {
          this.nutritionalAnalysis = data.Nutritional_Analysis;
          console.log("Nutritional_Analysis", this.nutritionalAnalysis);
        } else {
          this.nutritionalAnalysis = [];
          console.error("Nutritional Analysis not found in the API response");
        }
      } catch (error) {
        console.error(
          "Error fetching Nutritional Analysis information:",
          error
        );
        this.error = true;
      } finally {
        this.loading = false;
      }
    },

    async getNewNutritionalAnalysis() {
      try {
        this.loading = true;

        // Send a POST request to generate the Fusion_Cuisine_Suggestions.json file
        await fetch("/api/nutritional-analysis-using-gpt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        const response = await fetch("/api/nutritional-analysis-using-gpt", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("API Response:", response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data:", data); // Log the received data

        this.nutritionalAnalysis = data.Nutritional_Analysis || [];
        this.loading = false;

        console.log("Nutritional_Analysis", this.nutritionalAnalysis);
      } catch (error) {
        console.error("Error Nutritional Analysis information:", error);
      }
    },

    async getNutritionalValue() {
      try {
        const response = await fetch("/api/nutritional-value-using-json");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data", data);

        if (data && data.nutritional_advice) {
          this.nutritionalValue = data.nutritional_advice;
          console.log("Nutritional_Analysis", this.nutritionalValue);
        } else {
          this.nutritionalValue = [];
          console.error("Nutritional Value not found in the API response");
        }
      } catch (error) {
        console.error("Error fetching Nutritional Value information:", error);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },

    async getNewNutritionalValue() {
      try {
        this.loading = true;

        // Send a POST request to generate the Fusion_Cuisine_Suggestions.json file
        await fetch("/api/nutritional-value-using-gpt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        const response = await fetch("/api/nutritional-value-using-gpt", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("API Response:", response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Data:", data); // Log the received data
        this.nutritionalValue = data.nutritional_advice || [];
        this.loading = false;
        console.log("nutritional_advice", this.nutritionalValue);
      } catch (error) {
        console.error("Error Nutritional Value information:", error);
      }
    },
  },
};
</script>
<style scoped></style>
