<template>
    <div class="add-post-container">
      <h2>Edit Post</h2>
      <form @submit.prevent="handleEditPost">
        <div class="form-group">
          <label for="title">Title:</label>
          <input
            type="text"
            id="title"
            v-model="title"
            required
            maxlength="20"
            placeholder="Edit the title"
          />
        </div>
        <div class="form-group">
          <label for="body">Body:</label>
          <textarea
            id="body"
            v-model="body"
            required
            placeholder="Edit the content"
          ></textarea>
        </div>
        <button type="submit" class="add-button">Update</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "EditPost",
    data() {
      return {
        title: "",
        body: "",
        postId: null
      };
    },
    async mounted() {
      this.postId = this.$route.params.id;
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${this.postId}`, {
          method: "GET",
          credentials: 'include'
        });
        if (!response.ok) throw new Error("Failed to fetch post");
  
        const post = await response.json();
        this.title = post.title;
        this.body = post.content;
      } catch (error) {
        console.error("Error fetching post:", error);
        alert("Could not load post data.");
        this.$router.push('/');
      }
    },
    methods: {
      async handleEditPost() {
        if (!this.title.trim() || !this.body.trim()) {
          alert("Title and Body cannot be empty.");
          return;
        }
  
        const updatedPost = {
          title: this.title,
          content: this.body
        };
  
        try {
          const response = await fetch(`http://localhost:3000/api/posts/${this.postId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(updatedPost)
          });
          if (!response.ok) {
            throw new Error('Failed to update post');
          }
          alert("Post updated successfully!");
          this.$router.push("/");
        } catch (error) {
          console.error("Error updating post:", error);
          alert("Failed to update post. Please try again.");
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
  