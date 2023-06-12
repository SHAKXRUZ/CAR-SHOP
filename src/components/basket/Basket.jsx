import "./Basket.css";
import { useState, useEffect } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
const Basket = () => {
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

  const carsShopDelete = async (b) => {
    await fetch("https://thoughtful-scrubs-boa.cyclic.app/users/shop_delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        id: b.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        if (data.msg === "Cars shop deleted!") {
          window.location.reload();
        }
      });
  };

  return (
    <div className="basket">
      <div className="basket_container">
        <div className="basket_content">
          {basketData.length !== 0 ? (
            basketData.map((b, idx) => (
              <div className="basket_card" key={idx}>
                <img src={b.img_url} alt="" className="basket_card_images" />
                <p className="basket_card_cars_name">{b.name}</p>
                <p className="basket_card_cars_narxi">{b.narxi}$</p>
                <AiTwotoneDelete
                  onClick={() => carsShopDelete(b)}
                  className="basket_card_cars_delete"
                />
              </div>
            ))
          ) : (
            <p className="basket_warning_text">Siz mashina sotib olmagansiz?</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Basket;
