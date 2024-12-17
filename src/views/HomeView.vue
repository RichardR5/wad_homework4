<template>
  <div class="header">
    <div class="container">
      <button v-if="authResult" @click="Logout" class="center">Logout</button>

      <div class="posts-container">
        <PostComponent
          v-for="post in posts"
          :key="post.id"
          :post="post"
          class="post"
        />
      </div>

      <div class="button-container">
        <button @click="navigateToAddPost" class="add-button">Add post</button>
        <button @click="deleteAllPosts" class="delete-button">Delete all</button>
      </div>
    </div>
  </div>
</template>

<script>
import auth from "../auth";
import { mapGetters } from 'vuex';
import PostComponent from "@/components/PostComponent.vue";

export default {
  name: "HomeView",
  components: {
    PostComponent,
  },
  computed: {
    ...mapGetters(['allPosts']),
    posts() {
      console.log('Posts:', this.allPosts);
      return this.allPosts;
    }
  },
  data() {
    return {
      authResult: false
    }
  },
  methods: {
    async Logout() {
      try {
        const response = await fetch("http://localhost:3000/auth/logout", {
          credentials: 'include',
        });
        const data = await response.json();
        console.log(data);
        console.log('JWT removed');
        this.$store.dispatch('clearUserId');
        this.$router.push("/login");
      } catch (e) {
        console.log(e);
        console.log("Error during logout");
      }
    },
    navigateToAddPost() {
      this.$router.push("/add-post");
    },
    async deleteAllPosts() {
      if (confirm("Are you sure you want to delete all posts?")) {
        try {
          await this.$store.dispatch('deleteAllPosts');
          alert("All posts have been deleted.");
        } catch (error) {
          console.error("Error deleting all posts:", error);
          alert("Failed to delete all posts.");
        }
      }
    }
  },
  async mounted() {
    this.authResult = await auth.authenticated();
    console.log('Authentication result:', this.authResult);
    if (this.authResult && auth.user.id) {
      this.$store.dispatch('setUserId', auth.user.id);
    }
    this.$store.dispatch('fetchPosts');
  }
};
</script>

<style scoped>
button{
  margin-top: 30px;
  border-radius: 36px;
  background: #FEE996;
  border:0;
  font-weight: 700;
  font-size: 0.8em;
  display: block;
  padding: 10px 16px;
  letter-spacing: 2px;
  cursor: pointer;
}
.center {
  margin: 10px auto;
  width: 30%; 
}
.button-container {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}
</style>