class Auth {
  constructor() {
    this.init();
  }

  init() {
    this.name = localStorage.getItem("userName");
    this.email = localStorage.getItem("userEmail");
    this.loggedIn = localStorage.getItem("userLoggedIn");
  }

  /**
   *
   * @param data object
   * @param data.name string
   * @param data.email string
   */
  authenticated(data) {
    console.log("data", data);
    localStorage.setItem("token", data.token);
    localStorage.setItem("userName", data.user.name);
    localStorage.setItem("userEmail", data.user.email);
    localStorage.setItem("userLoggedIn", true);
    localStorage.setItem(
      "userType",
      data.user.type === 1 ? "Admin" : "Default"
    );

    this.init();
  }

  /**
   *
   * @return {boolean}
   */
  isLoggedIn() {
    return Boolean(this.loggedIn) === true;
  }
}

export default new Auth();
