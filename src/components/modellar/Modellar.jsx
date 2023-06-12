import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Modellar.css";
const Modellar = () => {
  if (!localStorage.getItem("token")) {
    window.location = "/login";
  }
  if (localStorage.getItem("admin_token")) {
    localStorage.removeItem("admin_token");
  }

  const [categoriyData, setCategoriyData] = useState([]);

  useEffect(() => {
    fetch("https://thoughtful-scrubs-boa.cyclic.app/admin/categoriy_list", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setCategoriyData(data));
  }, []);

  const modelIdFunc = (c) => {
    localStorage.setItem("modelId", c.id);
  };

  return (
    <div className="modellar">
      <div className="modellar_container">
        <h2 className="modellar_pages_title">Modellari</h2>
        <div className="modellar_content">
          {categoriyData.length !== 0 && categoriyData ? (
            categoriyData.map((c, idx) => (
              <Link
                onClick={() => modelIdFunc(c)}
                to="/turlari"
                key={idx}
                className="modellar_card"
              >
                <img
                  className="modellar_card_images"
                  src={c.img_url}
                  alt="modellar_images"
                />
                <p className="modellar_card_title">{c.title}</p>
              </Link>
            ))
          ) : (
            <p className="modellar_pages_warning_text">Modellar mavjud emas!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modellar;
