document.addEventListener("alpine:init", () => {
  Alpine.data("usersData", () => ({
    isConnected: null,
    staticUsers: [],
    users: [],
    staticUserId: 11,
    addressInput: null,
    visibleUsers: [],
    isLoading: true,
    isProcessing: false,
    isShowAddModal: false,
    totalPages: null,
    visibleRows: 4,
    currentPage: 1,
    searchInput: null,
    newUserInfo: {
      name: null,
      username: null,
      email: null,
      address: {
        city: null,
        street: null,
      },
    },
    checkConnection() {
      this.isConnected = navigator.onLine;
      setInterval(() => {
        const isOnline = navigator.onLine;
        if (this.isConnected !== isOnline) {
          this.isConnected = isOnline;
          if (isOnline) {
            window.location.reload();
          }
        }
      }, 3000);
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
    submitUserInfo() {
      if (!this.isConnected) {
        M.toast({
          html: '<i class="fa-duotone fa-wifi-exclamation fa-2xl" style="--fa-primary-color: #ee0000; --fa-secondary-color: #ff7766; --fa-secondary-opacity: 1;"></i><span class="text-center ml-1">Your Device Is Not Connected To The Internet :(</span>',
          classes:
            "amber accent-3 black-text font-bold capitalize text-sm flex justify-center rounded-2xl z-depth-2",
        });
      } else if (
        !this.newUserInfo.name ||
        !this.newUserInfo.username ||
        !this.newUserInfo.email ||
        !this.addressInput
      ) {
        M.toast({
          html: '<i class="fa-duotone fa-file-pen fa-xl" style="--fa-primary-color: #312e81; --fa-secondary-color: #4f46e5; --fa-secondary-opacity: 1;"></i><span class="text-center ml-1">Please fill in all required fields.</span>',
          classes:
            "amber accent-3 black-text font-bold capitalize text-sm flex justify-center rounded-2xl z-depth-2",
        });
      } else if (!this.addressInput || !this.addressInput.includes("-")) {
        M.toast({
          html: '<i class="fa-duotone fa-circle-xmark fa-2xl" style="--fa-primary-color: #ffffff; --fa-secondary-color: #ee0000; --fa-secondary-opacity: 1;"></i><span class="text-center ml-1">Separate the city and street with a "-" in the address.</span>',
          classes:
            "amber accent-3 black-text font-bold capitalize text-sm flex justify-center rounded-2xl z-depth-2",
        });
      } else {
        this.isProcessing = true;
        this.isLoading = true;
        const addressParts = this.addressInput.split("-");
        this.newUserInfo.address.city = addressParts[0].trim();
        this.newUserInfo.address.street = addressParts[1].trim();
        axios
          .post("https://jsonplaceholder.typicode.com/users", this.newUserInfo)
          .then((res) => {
            if (res.status === 201) {
              res.data.id = this.staticUserId;
              this.staticUserId++;
              this.staticUsers.push(res.data);
              this.updatePagination();
              M.toast({
                html: '<i class="fa-duotone fa-circle-check fa-2xl" style="--fa-primary-color: #ffffff; --fa-secondary-color: #00bb00; --fa-secondary-opacity: 1;"></i><span class="text-center ml-1">New user added successfully!</span>',
                classes:
                  "amber accent-3 black-text font-bold capitalize text-sm flex justify-center rounded-2xl z-depth-2",
              });
            }
          })
          .finally(() => {
            this.isProcessing = false;
            this.isLoading = false;
            this.isShowAddModal = false;
            document.querySelector("form").reset();
          });
      }
    },
  }));
});
