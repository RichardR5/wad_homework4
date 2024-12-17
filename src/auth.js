export default {
    user: { authenticated: false, id: null },
    authenticated: async function() {
      try {
        const response = await fetch("http://localhost:3000/auth/authenticate", {
          credentials: 'include',
        });
        const data = await response.json();
        this.user.authenticated = data.authenticated;
        if (data.authenticated && data.user_id) {
          this.user.id = data.user_id;
        }
        console.log('Authentication data:', data);
      } catch (e) {
        console.log('Error during authentication:', e);
      }
      return this.user.authenticated;
    }
  }