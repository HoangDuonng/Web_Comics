<template>
    <Footer :class="{ 'show-footer': isContentLongEnough }">
      <p>TruyenVui | <a href="#">Facebook</a> | Email: info@truyenvui.com | Phone: 0396868799</p>
    </Footer>
  </template>
  
  <script>
  export default {
    name: 'comp-footer',
    data() {
      return {
        isContentLongEnough: false
      };
    },
    mounted() {
      this.checkContentHeight();
      this.setupMutationObserver();
    },
    methods: {
      checkContentHeight() {
        const contentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        this.isContentLongEnough = contentHeight > windowHeight;
      },
      setupMutationObserver() {
        const observer = new MutationObserver(() => {
          this.checkContentHeight();
        });
  
        observer.observe(document.documentElement, { childList: true, subtree: true });
      }
    }
  }
  </script>
  
  <style scoped>
  footer {
    background-color: rgb(0, 0, 0);
    color: #fff;
    padding: 20px 0;
    text-align: center;
    width: 100%;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
    display: none;
    height: 60px;
  }
  
  @media (min-width: 768px) {
    .show-footer {
      display: block;
    }
  }
  
  @media (max-width: 767px) {
    footer {
      padding: 10px 0;
    }
  }
  </style>
  
  