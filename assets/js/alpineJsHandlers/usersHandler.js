document.addEventListener("alpine:init", () => {
  Alpine.data("usersData", () => ({
    isConnected: navigator.onLine,
    staticUsers: [],
    users: [],
    visibleUsers: [],
    isLoading: true,
    showAddModal: false,
    totalPages: null,
    visibleRows: 4,
    currentPage: 1,
    searchInput: null,
    checkConnection() {
      window.addEventListener("online", () => {
        window.location.reload();
      });
    },
    initUsers() {
      axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
        this.staticUsers = res.data;
        this.users = res.data;
        this.updatePagination();
        this.isLoading = false;
      });
    },
    updatePagination() {
      this.totalPages = Math.ceil(this.users.length / this.visibleRows);
      const startIndex = this.currentPage * this.visibleRows - this.visibleRows;
      const endIndex = this.currentPage * this.visibleRows;
      this.visibleUsers = this.users.slice(startIndex, endIndex);
    },
    nextPage() {
      this.currentPage++;
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
      this.updatePagination();
    },
    previousPage() {
      this.currentPage--;
      if (this.currentPage < 1) {
        this.currentPage = 1;
      }
      this.updatePagination();
    },
    updateVisibleRows(element) {
      this.visibleRows = element.value;
      if (this.visibleRows < 1) {
        this.visibleRows = 1;
      } else if (this.visibleRows > this.users.length) {
        this.visibleRows = this.users.length;
      }
      this.currentPage = 1;
      this.updatePagination();
    },
    searchUser(value) {
      const lowerCaseValue = value.toLowerCase();
      this.users = this.staticUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(lowerCaseValue) ||
          user.username.toLowerCase().includes(lowerCaseValue) ||
          user.email.toLowerCase().includes(lowerCaseValue)
      );
      this.currentPage = 1;
      this.updatePagination();
    },
  }));
});
