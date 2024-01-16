document.addEventListener("alpine:init", () => {
  Alpine.data("usersData", () => ({
    isConnected: navigator.onLine,
    users: [],
    isLoading: true,
    initUsers() {
      axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
        this.users = res.data;
        this.isLoading = false;
      });
    },
  }));
});
