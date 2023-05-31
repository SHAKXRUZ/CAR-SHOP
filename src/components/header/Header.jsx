import "./Header.css";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";

import userImages from "../../assets/images/Без названия.png";

const Header = () => {
  let carTur =
    window.location.pathname === "/turlari" ||
    window.location.pathname === "/one";

  return (
    <div className="header">
      <div className="header_container">
        <div className="header_content">
          <div className="header_content_left">
            <Link to="/modellar" className="header_pages_name_text1">
              Bosh sahifa
            </Link>
            <Link to="/modellar" className="header_pages_name_text2">
              <IoIosArrowForward />
              Modellari
            </Link>
            {carTur ? (
              <Link to="/turlari" className="header_pages_name_text2">
                <IoIosArrowForward />
                Chevrolet turlari
              </Link>
            ) : null}
          </div>

          <div className="header_content_right">
            <Link to="/admin" className="header_admin_panel_link">
              <AiOutlineUser className="header_admin_panel_link_icons" />
              Admin o'tish
            </Link>
            <Link to="/profel" className="header_user_profel_link">
              <img
                className="header_user_images"
                src={userImages}
                alt="user_images"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
