<template>
  <div class="form">
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" name="email" required v-model="email" placeholder="Email">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" name="password" required v-model="password" placeholder="Password">
    </div>
    <div class="container">
      <button @click="LogIn" class="center">Log in</button>
      <button @click='this.$router.push("/signup")' class="center">Sign up</button>
    </div>
  </div>
</template>

<script>
export default {
name: "LogIn", 

data: function() {
    return {
   email: '',
   password: '',
  }
  },
  methods: {


    LogIn() {
  var data = {
    email: this.email,
    password: this.password,
  };

  fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(() => {
          throw new Error();
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      location.assign("/"); //redirect on successful login
    })
    .catch((error) => {
      console.error(error.message);
      alert("Login failed"); //show alert on login failure
      location.reload();
    });
}}};

</script>

<style scoped>
.form {
  padding: 20px;
  background-color: rgb(214, 236, 214);
  border-radius: 10px;
  max-width: 300px;
  margin: 20px auto;
  text-align: center;
}

h3 {
  text-align: center;
  color: rgb(8, 110, 110);
}

.form-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

label {
  flex-basis: 40%;
  text-align: right;
  margin-right: 10px;
  color: rgb(8, 110, 110);
  font-size: 0.9em;
  letter-spacing: 1px;
  font-weight: bold;
}

input {
  flex-basis: 60%;
  padding: 10px;
  border: 0;
  border-radius: 10px;
  box-sizing: border-box;
}

.container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  background-color: rgb(117, 165, 194);
  color: black;
  padding: 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 45%;
  max-width: 120px;
}

button:hover {
  background-color: #45a049;
}

.center {
  text-align: center;
}
</style>