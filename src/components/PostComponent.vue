<template>
  <section class="post" @click="goToEditPage">
    <h3>{{ post.title }}</h3>
    <div v-if="post.image" class="image-container">
      <img :src="post.imgURL" :alt="post.caption" />
    </div>
    <p>{{ post.content }}</p>
  </section>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    goToEditPage() {
      this.$router.push(`/edit-post/${this.post.id}`);
    }
  }
};
</script>

  
  <style scoped>
  .post {
    border: 1px solid #ccc;
    padding: 16px;
    margin-bottom: 16px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);
  }
  
  .post h3 {
    margin-bottom: 8px;
  }
  
  .image-container {
    margin-bottom: 10px;
  }
  
  .image-container img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
  }
  
  .like-section {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  
  .like-button {
    background-color: #42b983;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
  }
  
  .like-button:hover {
    background-color: #369870;
  }
  </style>
  