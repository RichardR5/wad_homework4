<template>
  <div class="add-post-container">
    <h2>Add Post</h2>
    <form @submit.prevent="handleAddPost">
      <div class="form-group">
        <label for="title">Title:</label>
        <input
          type="text"
          id="title"
          v-model="title"
          required
          maxlength="20"
          placeholder="Enter the title of your post"
        />
      </div>
      <div class="form-group">
        <label for="body">Body:</label>
        <textarea
          id="body"
          v-model="body"
          required
          placeholder="Enter the content of your post"
        ></textarea>
      </div>
      <button type="submit" class="add-button">Add</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddPost",
  data() {
    return {
      title: "",
      body: ""
    };
  },
  methods: {
    async handleAddPost() {
      if (!this.title.trim() || !this.body.trim()) {
        alert("Title and Body cannot be empty.");
        return;
      }

      // Retrieve user_id from Vuex store
      const userId = this.$store.state.userId;
      if (!userId) {
        alert("User not authenticated.");
        this.$router.push("/login");
        return;
      }

      const newPost = {
        user_id: userId,
        title: this.title,
        content: this.body
      };

      try {
        await this.$store.dispatch("addPost", newPost);
        alert("Post added successfully!");
        this.$router.push("/");
      } catch (error) {
        console.error("Error adding post:", error);
        alert("Failed to add post. Please try again.");
      }
    }
  }
};
</script>

<style scoped>
.add-post-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fafafa;
}

.add-post-container h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.add-button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
}

.add-button:hover {
  background-color: #369870;
}
</style>