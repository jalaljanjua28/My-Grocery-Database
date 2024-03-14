<template>
  <div>
    <router-link to="/" style="text-decoration: none">
      <el-page-header content="Barcode Scan"> </el-page-header>
    </router-link>

    <el-card
      style="
        margin-top: 20px;
        font-family: 'Inter', sans-serif;
        border-radius: 20px;
        background-color: #ffffffc9;
      "
    >
      <el-upload
        class="upload-demo"
        action="https://my-grocery-app-hlai3cv5za-uc.a.run.app/api/image-process-upload-create"
        ref="fileInput"
        :auto-upload="false"
        :on-change="onFileChange"
        accept="image/*"
      >
        <el-button slot="trigger" size="small" type="primary" plain
          >Select File</el-button
        >
        <el-button
          style="margin-left: 10px"
          size="small"
          type="success"
          plain
          @click="uploadImageProcess"
          >Upload to Server</el-button
        >
        <div class="el-upload__tip" slot="tip">
          JPG/PNG files with a size less than 500kb
        </div>
      </el-upload>
      <div v-if="showStatus" class="status">Image Upload Processing...</div>
      <div v-if="completionStatus" class="status">
        Image Upload/Process Successful
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

// Create a custom Axios instance with a progress event
const axiosInstance = axios.create();
axiosInstance.defaults.baseURL =
  "https://my-grocery-app-hlai3cv5za-uc.a.run.app/api"; // Set your API base URL

export default {
  data() {
    return {
      selectedFile: null,
      showStatus: false,
      completionStatus: false,
      uploadProgress: 0,
    };
  },

  methods: {
    onFileChange(file) {
      // Verify the structure of the 'file' object
      console.log("File object:", file);

      // Access the file name and store it in 'selectedFile'
      if (file && file.raw && file.raw.name) {
        this.selectedFile = file.raw;
        console.log("File name:", this.selectedFile.name);
      } else {
        console.error("Invalid file object:", file);
      }
    },

    uploadImageProcess() {
      if (this.selectedFile) {
        this.showStatus = true;
        this.completionStatus = false;
        this.uploadProgress = 0;

        const formData = new FormData();
        formData.append("file", this.selectedFile);

        // Use the custom Axios instance with a progress event
        axiosInstance
          .post("/image-process-upload-create", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              this.uploadProgress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
            },
          })
          .then((response) => {
            console.log(response.data);
            this.showStatus = false;
            this.completionStatus = true;
          })
          .catch((error) => {
            console.log(error);
            this.showStatus = false;
            this.completionStatus = false;
            if (error.response) {
              console.log("Response Status:", error.response.status);
              console.log("Response Data:", error.response.data);
            } else {
              console.log("Error Message:", error.message);
            }
          });
      } else {
        this.$message.error("Please select a file to upload.");
      }
    },
  },
};
// Export the axiosInstance so that it can be used elsewhere
</script>

<style scoped></style>
