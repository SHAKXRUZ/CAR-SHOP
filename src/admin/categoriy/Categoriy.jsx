import "./Categoriy.css";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdAddAPhoto } from "react-icons/md";
import { FiX } from "react-icons/fi";
const Categoriy = () => {
  if (!localStorage.getItem("admin_token")) {
    window.location = "/admin";
  } else if (!localStorage.getItem("token")) {
    window.location = "/login";
  }
  const [categoriyModal, setCategoriyModal] = useState(false);

  const [categoriy_images, setCategoriy_images] = useState("");

  const uploadCategoriyImages = async (e) => {
    const files = e.target.files;
    if (!["image/png", "image/jpg", "image/jpeg"].includes(files[0].type)) {
      alert("Enter an image with Type png jpg jpeg?");
    } else if (files[0].size > 5 * 1024 * 1024) {
      alert("File is too large!");
    } else {
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", "images");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dtiuszgwz/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const data2 = await res.json();
      setCategoriy_images(data2.secure_url);
    }
  };

  const categoriyCreate = async (e) => {
    e.preventDefault();

    const { title } = e.target;

    if (categoriy_images) {
      console.log(title.value);
      console.log(categoriy_images);

      // await fetch("http://localhost:5000/admin/categoriy", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     title,
      //     categoriy_images,
      //   }),
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     alert(data.msg);
      //   });
    } else {
      alert("Images required?");
    }
  };

  return (
    <div className="admin_categoriy">
      <div className="admin_categoriy_container">
        <div className="categoriy_header">
          <div className="categoriy_header_left">
            <p className="categoriy_header_left_icons"></p>
            <p className="categoriy_header_left_text">Categoriyalar</p>
          </div>

          <button
            onClick={() => setCategoriyModal(true)}
            className="categoriy_header_right"
          >
            <AiOutlinePlus className="categoriy_header_right_icons" />
            <p className="admin_panel_categoriy_qushish_text_none">
              Kategoriya qo'shish
            </p>
          </button>
        </div>

        <div className="categoriy_data_content"></div>

        {categoriyModal && (
          <div className="admin_categoriy_modal">
            <div
              onClick={() => setCategoriyModal(false)}
              className="admin_categoriy_modal_owerflow"
            ></div>

            <div className="admin_categoriy_modal_content">
              <div className="admin_categoriy_modal_header">
                <div className="admin_categoriy_modal_header_left">
                  <p className="admin_categoriy_modal_header_left_icons"></p>
                  <p className="admin_categoriy_modal_header_left_text">
                    Categoriya qo'shish
                  </p>
                </div>

                <p
                  onClick={() => setCategoriyModal(false)}
                  className="admin_categoriy_modal_header_right"
                >
                  <FiX />
                </p>
              </div>

              <form
                onSubmit={(e) => categoriyCreate(e)}
                className="admin_panel_categoriy_form"
              >
                <div className="admin_panel_categoriy_form_input_div">
                  <label className="admin_panel_categoriy_form_label">
                    Markasi
                    <input
                      className="admin_panel_categoriy_form_input"
                      type="text"
                      name="title"
                      placeholder="Kiriting..."
                      required
                      minLength={3}
                      maxLength={25}
                    />
                  </label>
                  <label className="admin_panel_categoriy_form_label">
                    Rasm 360 ichki makon
                    <div className="admin_panel_categoriy_images_input_div">
                      <MdAddAPhoto className="admin_panel_categoriy_images_input_div_icons" />
                      <p className="admin_panel_categoriy_images_input_div_text">
                        {categoriy_images ? "File Upload" : "Yuklash"}
                      </p>
                    </div>
                    <input
                      onChange={(e) => uploadCategoriyImages(e)}
                      className="admin_panel_categoriy_input_none"
                      type="file"
                      name="categoriy_img"
                      required
                    />
                  </label>
                </div>

                <div className="admin_panel_categoriy_btn_div">
                  <p></p>
                  <button type="submit" className="admin_panel_categoriy_btn">
                    Saqlash
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categoriy;
