import "./AdminLogin.css";
const AdminLogin = () => {
  // if (!localStorage.getItem("token")) {
  //   window.location = "/login";
  // }

  const adminLogin = async (e) => {
    e.preventDefault();
    const { admin_email, admin_password } = e.target;
    console.log(admin_email.value);
    console.log(admin_password.value);

    //   await fetch("http://localhost:5000/admin/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       email: admin_email.value,
    //       password: admin_password.value,
    //     }),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       alert(data.msg);
    //     });
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
            type="text"
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
