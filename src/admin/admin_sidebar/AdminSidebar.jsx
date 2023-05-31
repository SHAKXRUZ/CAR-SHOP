import "./AdminSidebar.css";
import { Link } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { FaCarSide } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { TbArrowBack } from "react-icons/tb";
const AdminSidebar = () => {
  // if (!localStorage.getItem("admin_token")) {
  //   window.location = "/admin";
  // } else if (!localStorage.getItem("token")) {
  //   window.location = "/login";
  // }

  return (
    <div className="admin_sidebar">
      <div className="admin_sidebar_container">
        <Link className="admin_sidebar_pages_link" to="/admin/panel">
          <BiCategory className="admin_sidebar_pages_link_icons" />
          <p className="admin_sidebar_pages_name_text"> Categoriy</p>
        </Link>
        <Link className="admin_sidebar_pages_link" to="/admin/panel/cars">
          <FaCarSide className="admin_sidebar_pages_link_icons" />
          <p className="admin_sidebar_pages_name_text">Cars</p>
        </Link>
        <Link className="admin_sidebar_pages_link" to="/admin/panel/users">
          <FiUsers className="admin_sidebar_pages_link_icons" />
          <p className="admin_sidebar_pages_name_text">Users</p>
        </Link>
        <Link className="admin_sidebar_pages_link" to="/admin">
          <TbArrowBack className="admin_sidebar_pages_link_icons" />
          <p className="admin_sidebar_pages_name_text">Chiqish</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
