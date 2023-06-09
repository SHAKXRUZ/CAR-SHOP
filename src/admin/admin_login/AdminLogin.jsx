import "./AdminLogin.css";
const AdminLogin = () => {
  if (!localStorage.getItem("token")) {
    window.location = "/login";
  }

  if (
    window.location.pathname === "/admin" &&
    localStorage.getItem("admin_token")
  ) {
    localStorage.removeItem("admin_token");
  }

  let tokens = localStorage.getItem("token");

  const adminLogin = async (e) => {
    e.preventDefault();
    const { admin_email, admin_password } = e.target;

    await fetch("https://thoughtful-scrubs-boa.cyclic.app/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json", token: tokens },
      body: JSON.stringify({
        email: admin_email.value,
        password: admin_password.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        if (data.msg === "You are not an admin?") {
          admin_email.value = "";
          admin_password.value = "";
          window.location = "/modellar";
        }
        if (data.msg === "Success!" && data.admin_token) {
          admin_email.value = "";
          admin_password.value = "";
          window.location = "/admin/panel";
          localStorage.setItem("admin_token", data.admin_token);
        }
      });
  };

  return (
    <div className="admin_login">
      <div className="admin_login_container">
        <h2 className="admin_login_title">Admin login</h2>
        <form onSubmit={(e) => adminLogin(e)} className="admin_login_form">
          <input
            type="email"
            className="admin_login_input"
            name="admin_email"
            placeholder="Enter email..."
            required
            minLength={10}
            maxLength={35}
          />
          <input
            type="password"
            className="admin_login_input"
            name="admin_password"
            placeholder="Enter password..."
            required
            minLength={8}
            maxLength={8}
          />
          <button type="submit" className="admin_login_btn">
            Admin login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
