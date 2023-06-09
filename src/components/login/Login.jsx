import "./Login.css";
const Login = () => {
  if (window.location.pathname === "/login") {
    localStorage.clear();
  }

  const userLogin = async (e) => {
    e.preventDefault();
    const { email, password } = e.target;

    await fetch("https://thoughtful-scrubs-boa.cyclic.app/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        if (data.msg === "Success!" && data.token) {
          email.value = "";
          password.value = "";
          window.location = "/modellar";
          localStorage.setItem("token", data.token);
        }
        if (data.msg === "Email not found!") {
          email.value = "";
          password.value = "";
          window.location = "/";
        }
      });
  };

  return (
    <div className="login">
      <div className="login_container">
        <h2 className="login_title">Login</h2>
        <form onSubmit={(e) => userLogin(e)} className="login_form">
          <input
            type="email"
            className="login_input"
            name="email"
            placeholder="Enter email..."
            required
            minLength={10}
            maxLength={35}
          />
          <input
            type="password"
            className="login_input"
            name="password"
            placeholder="Enter password..."
            required
            minLength={8}
            maxLength={8}
          />
          <button type="submit" className="login_btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
