<template>
  <div>
    <el-button type="danger" @click="deleteAllItems" plain
      >Delete All Items</el-button
    >
  </div>
</template>

<script>
export default {
  methods: {
    deleteAllItems() {
      // Show a confirmation popup before proceeding
      const userConfirmed = confirm(
        "Are you sure you want to delete all items?"
      );

      if (userConfirmed) {
        // Make an HTTP POST request to your backend
        fetch(
          "https://my-grocery-app-hlai3cv5za-uc.a.run.app/api/deleteAll/purchase-list",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            // Handle the response from the server if needed
            console.log(data);
          })
          .catch((error) => {
            // Handle any errors
            console.error(error);
          });

        // Show a success message to the user
        alert("All items deleted successfully!");

        // Introduce a delay of 2000 milliseconds (2 seconds) before reloading the page
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    },
  },
};
</script>
<style scoped>
.el-button {
  padding: 6px 10px;
  font-size: 12px;
  margin-top: 10px;
}
</style>
