import "./Turlari.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineLike } from "react-icons/ai";
const Turlari = () => {
  if (!localStorage.getItem("token")) {
    window.location = "/login";
  }
  if (localStorage.getItem("admin_token")) {
    localStorage.removeItem("admin_token");
  }

  let modelId = localStorage.getItem("modelId");

  const [carsData, setCarsData] = useState([]);

  useEffect(() => {
    fetch("https://thoughtful-scrubs-boa.cyclic.app/admin/cars_list", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setCarsData(data));
  }, []);

  const turIdFunc = (c) => {
    localStorage.setItem("turId", c.id);
  };

  const carsBasketFunc = async (c) => {
    await fetch("https://thoughtful-scrubs-boa.cyclic.app/users/cars_shop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        id: c.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        if (data.msg === "Cars basket!") {
          window.location.reload();
        }
      });
  };

  return (
    <div className="turlari">
      <div className="turlari_container">
        <h2 className="turlari_pages_title">Modellar turlari</h2>
        <div className="turlari_content">
          {carsData.map((c, idx) =>
            c.categoriy_id === modelId ? (
              <div className="tur_card_content" key={idx}>
                <Link
                  onClick={() => turIdFunc(c)}
                  className="tur_card"
                  to="/one"
                >
                  <img className="tur_card_images" src={c.tur_img} alt="" />
                  <div className="tur_card_text_div">
                    <p className="tur_card_name">{c.name}</p>
                    <p className="tur_card_narxi">Narxi: {c.cost}$</p>
                  </div>
                </Link>
                <div className="cars_like_shop_div">
                  <button
                    onClick={() => carsBasketFunc(c)}
                    className="cars_shop_icons"
                  >
                    <FiShoppingCart />
                  </button>
                  <button className="cars_like_icons">
                    <AiOutlineLike />
                    <p>{0}</p>
                  </button>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default Turlari;
