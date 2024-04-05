<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal">
      <div class="modal-header">
        <h3>{{ title }}</h3>
        <button @click="closeModal">Close</button>
      </div>
      <div class="modal-body">
        <img :src="imageUrl" :alt="imageAlt" />
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  props: {
    title: String,
    imageUrl: String,
    imageAlt: String,
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
  
  <style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.modal-body img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}

.modal button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 16px;
  color: #333;
}
</style>
  