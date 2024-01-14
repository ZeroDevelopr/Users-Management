document.addEventListener("alpine:init", () => {
  Alpine.data("usersData", () => ({
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
