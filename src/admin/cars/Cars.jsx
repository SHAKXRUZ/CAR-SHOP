import "./Cars.css";
// import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
// import { MdAddAPhoto } from "react-icons/md";
// import { FiX } from "react-icons/fi";
const Cars = () => {
  // const [carsModal, setCarsModal] = useState(false);

  return (
    <div className="admin_cars">
      <div className="admin_cars_container">
        <div className="cars_header">
          <div className="cars_header_left">
            <p className="cars_header_left_icons"></p>
            <p className="cars_header_left_text">Carslar</p>
          </div>

          <button
            // onClick={() => setCarsModal(true)}
            className="cars_header_right"
          >
            <AiOutlinePlus className="cars_header_right_icons" />
            <p className="admin_panel_cars_qushish_text_none">
              Mashina qo'shish
            </p>
          </button>
        </div>

        <div className="cars_data_content"></div>

      </div>
    </div>
  );
};

export default Cars;
