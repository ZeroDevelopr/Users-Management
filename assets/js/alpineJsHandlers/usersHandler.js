document.addEventListener("alpine:init", () => {
  Alpine.data("usersData", () => ({
    users: [],
    initUsers() {
      axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
        this.users = res.data;
      });
    },
  }));
});
