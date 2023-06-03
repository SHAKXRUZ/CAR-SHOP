import "./AdminHeader.css";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { BiBell } from "react-icons/bi";
import { useEffect, useState } from "react";
const AdminHeader = () => {
  if (!localStorage.getItem("admin_token")) {
    window.location = "/admin";
  } else if (!localStorage.getItem("token")) {
    window.location = "/login";
  }

  const [user_images, setUser_images] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/users/profel_images", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setUser_images(data.userImagesUrl));
  }, []);

  return (
    <div className="admin_header">
      <div className="admin_header_container">
        <Link className="admin_header_modellar_pages_link" to="/modellar">
          <AiOutlineUser className="admin_header_modellar_pages_link_icons" />
          <p className="admin_header_modellar_pages_link_text">
            Asosiyga qaytish
          </p>
        </Link>
        <div className="admin_header_right_content">
          <BiBell className="admin_header_bell_icons" />
          <Link className="admin_panel_user_profel_link" to="/profel">
            <img
              className="admin_panel_user_profel_images"
              src={user_images}
              alt="user_images"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
