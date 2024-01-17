document.addEventListener("alpine:init", () => {
  Alpine.data("usersData", () => ({
    isConnected: navigator.onLine,
    users: [],
    isLoading: true,
    showAddModal: false,
    checkConnection() {
      window.addEventListener("online", () => {
        window.location.reload();
      });
    },
    initUsers() {
      axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
        this.users = res.data;
        this.isLoading = false;
      });
    },
  }));
});
