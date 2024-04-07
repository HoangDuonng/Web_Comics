<template>
  <div class="thietbi">
    <div class="chapter-images">
      <h2>{{ chapterTitle }}</h2>
      <div class="image-gallery">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="image-container"
        >
          <img
            :src="image.url"
            :alt="image.alt"
            @click="openImageModal(image.url, image.alt)"
          />
        </div>
      </div>
      <Modal v-if="isModalOpen" @close="closeImageModal">
        <img :src="selectedImageUrl" :alt="selectedImageAlt" />
      </Modal>
    </div>
  </div>
</template>
  
  <script>
import Modal from "./Modal.vue";

export default {
  props: {
    chapterTitle: String,
    images: Array, // Mảng các đối tượng ảnh
  },
  data() {
    return {
      isModalOpen: false,
      selectedImageUrl: "",
      selectedImageAlt: "",
    };
  },
  components: {
    Modal,
  },
  methods: {
    openImageModal(url, alt) {
      this.selectedImageUrl = url;
      this.selectedImageAlt = alt;
      this.isModalOpen = true;
    },
    closeImageModal() {
      this.isModalOpen = false;
    },
  },
};
</script>
  
  <style scoped>
.thietbi {
  margin-left: 250px;
}
.chapter-images {
  padding: 20px;
}

.image-gallery {
  display: flex;
  flex-wrap: wrap;
}

.image-container {
  margin: 10px;
  cursor: pointer;
}

.image-container img {
  max-width: 200px;
  max-height: 200px;
}
@media only screen and (max-width: 768px) {
  .thietbi {
    margin: 0 auto;
  }
}
</style>
  