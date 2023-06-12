import "./One.css";
import { useState, useEffect } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

// import required modules
import { EffectCube, Pagination } from "swiper";

const One = () => {
  if (!localStorage.getItem("token")) {
    window.location = "/login";
  }
  if (localStorage.getItem("admin_token")) {
    localStorage.removeItem("admin_token");
  }

  let turId = localStorage.getItem("turId");

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

  return (
    <div className="one">
      <div className="one_container">
        <h2 className="one_pages_title">Modellari</h2>
        {carsData.map((c, idx) =>
          c.id === turId ? (
            <div key={idx} className="one_content">
              <div className="one_cars_card_left">
                <p className="one_cars_card_left_name">
                  <span>{c.name}</span>
                </p>
                <p className="one_cars_card_left_text_data">{c.cost}$ dan</p>
                <img
                  className="one_cars_card_left_img"
                  src={c.tur_img}
                  alt=""
                />
                {categoriyData.map((u, idx) =>
                  u.id === c.categoriy_id ? (
                    <p className="one_cars_card_left_text">
                      Marka:
                      <span className="one_cars_card_left_text_data_name">
                        {u.title}
                      </span>
                    </p>
                  ) : null
                )}
                <p className="one_cars_card_left_text">
                  Tanirovkasi:
                  <span className="one_cars_card_left_text_data">
                    {c.tanning}
                  </span>
                </p>
                <p className="one_cars_card_left_text">
                  Motor:
                  <span className="one_cars_card_left_text_data">
                    {c.motor}
                  </span>
                </p>
                <p className="one_cars_card_left_text">
                  Year:
                  <span className="one_cars_card_left_text_data">{c.year}</span>
                </p>
                <p className="one_cars_card_left_text">
                  Color:
                  <span className="one_cars_card_left_text_data">
                    {c.color}
                  </span>
                </p>
                <p className="one_cars_card_left_text">
                  Distance:
                  <span className="one_cars_card_left_text_data">
                    {c.walking}km
                  </span>
                </p>
                <p className="one_cars_card_left_text">
                  Gearbook:
                  <span className="one_cars_card_left_text_data">
                    {c.gearbook}
                  </span>
                </p>
                <p className="one_cars_card_left_text">
                  Description:
                  <span className="one_cars_card_left_text_data">
                    {c.description}
                  </span>
                </p>
                <p className="one_cars_card_left_text">
                  Umumiy xarajat:
                  <span className="one_cars_card_left_text_data">
                    {c.cost}$
                  </span>
                </p>
              </div>
              <div className="one_cars_card_right">
                <p className="cars_card_right_name">{c.name}</p>

                <Swiper
                  effect={"cube"}
                  grabCursor={true}
                  cubeEffect={{
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94,
                  }}
                  pagination={true}
                  modules={[EffectCube, Pagination]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <img
                      className="cars_card_right_images"
                      src={c.tashqi_makon}
                      alt="#"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      className="cars_card_right_images"
                      src={c.ichki_makon}
                      alt="#"
                    />
                  </SwiperSlide>
                </Swiper>

                <p className="cars_card_right_warning">
                  Tasvir tanlangan konfiguratsiyaga mos kelmasligi mumkin.
                  Mashinaning rangi ushbu saytda taqdim etilganidan farq qilishi
                  mumkin.
                </p>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default One;
