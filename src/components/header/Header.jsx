import "./Header.css";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { useEffect, useState } from "react";

const Header = () => {
  if (localStorage.getItem("admin_token")) {
    localStorage.removeItem("admin_token");
  }
  let carTur =
    window.location.pathname === "/turlari" ||
    window.location.pathname === "/one";
  const [user_images, setUser_images] = useState("");

  useEffect(() => {
    fetch("https://thoughtful-scrubs-boa.cyclic.app/users/profel_images", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setUser_images(data.userImagesUrl));
  }, []);

  const [basketData, setBasketData] = useState([]);

  useEffect(() => {
    fetch("https://thoughtful-scrubs-boa.cyclic.app/users/shop_list", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setBasketData(data));
  }, []);

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
            <Link className="header_basket" to="/basket">
              <FiShoppingCart />
              <p className="header_basket_length">{basketData.length}</p>
            </Link>
            <Link to="/profel" className="header_user_profel_link">
              <img
                className="header_user_images"
                src={user_images}
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
