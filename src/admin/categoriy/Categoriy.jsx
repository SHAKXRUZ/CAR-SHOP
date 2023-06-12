import "./Categoriy.css";
import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdAddAPhoto, MdDeleteOutline } from "react-icons/md";
import { FiX, FiSearch, FiEdit } from "react-icons/fi";

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
      await fetch("https://thoughtful-scrubs-boa.cyclic.app/admin/create_categoriy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: title.value,
          categoriy_images,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.msg);
          if (
            data.msg === "You are categoriy!" ||
            data.msg === "Create categoriy!"
          ) {
            title.value = "";
            setCategoriy_images("");
          }
        });
    } else {
      alert("Images required?");
    }
  };

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

  const [searchData, setSearchData] = useState([]);

  const searchFunction = async (e) => {
    e.preventDefault();
    let { categoriy_search } = e.target;
    await fetch("https://thoughtful-scrubs-boa.cyclic.app/admin/categoriy_search_api", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
        search: categoriy_search.value,
      },
    })
      .then((res) => res.json())
      .then((data) => setSearchData(data));
    categoriy_search.value = "";
  };

  const [categoriyEditModal, setCategoriyEditModal] = useState(false);
  const [categoriyId, setCategoriyId] = useState("");
  const [categoriyUpdateImages, setCategoriyUpdateImages] = useState("");

  const editCategoriyFunc = (c) => {
    if (c.id) {
      setCategoriyEditModal(true);
      setCategoriyId(c.id);
    }
  };

  const categoriyEditUploadImages = async (e) => {
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
      setCategoriyUpdateImages(data2.secure_url);
    }
  };

  const updateCategoriy = async (e) => {
    e.preventDefault();

    const { update_title } = e.target;

    await fetch("https://thoughtful-scrubs-boa.cyclic.app/admin/update_categoriy", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: update_title.value,
        img_url: categoriyUpdateImages,
        id: categoriyId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        if (data.msg === "Categoriy update!") {
          update_title.value = "";
          setCategoriyUpdateImages("");
        }
      });
  };

  const deleteCategoriyFunc = async (c) => {
    await fetch("https://thoughtful-scrubs-boa.cyclic.app/admin/categoriy_delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
        admin_token: localStorage.getItem("admin_token"),
      },
      body: JSON.stringify({
        id: c.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        if (data.msg === "Categoriy deleted!") {
          window.location.reload();
        }
      });
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

        <div className="categoriy_data_content">
          <form
            onSubmit={(e) => searchFunction(e)}
            className="categoriy_search_form"
          >
            <input
              className="categoriy_search_input"
              type="text"
              name="categoriy_search"
              placeholder="Search..."
              required
              minLength={3}
              maxLength={25}
              list="categoriyData"
            />
            <datalist id="categoriyData">
              {categoriyData.map((c, idx) => (
                <option key={idx} value={c.title}>
                  {c.title}
                </option>
              ))}
            </datalist>
            <button className="categoriy_form_btn">
              <FiSearch className="categoriy_form_btn_icons" />
            </button>
          </form>

          <div className="categoriy_data_map">
            {searchData.length !== 0
              ? searchData.map((c, idx) => (
                  <div className="categoriy_data_card" key={idx}>
                    <div className="categoriy_data_card_text_div">
                      <p className="categoriy_data_card_text_div_id">
                        {idx + 1}.
                      </p>
                      <p className="categoriy_data_card_text_div_title">
                        {c.title}
                      </p>
                    </div>
                    <div className="categoriy_data_card_icons_div">
                      <FiEdit
                        onClick={() => editCategoriyFunc(c)}
                        className="categoriy_edit_icons"
                      />
                      <MdDeleteOutline
                        onClick={() => deleteCategoriyFunc(c)}
                        className="categoriy_delete_icons"
                      />
                    </div>
                  </div>
                ))
              : categoriyData.map((c, idx) => (
                  <div className="categoriy_data_card" key={idx}>
                    <div className="categoriy_data_card_text_div">
                      <p className="categoriy_data_card_text_div_id">
                        {idx + 1}.
                      </p>
                      <p className="categoriy_data_card_text_div_title">
                        {c.title}
                      </p>
                    </div>
                    <div className="categoriy_data_card_icons_div">
                      <FiEdit
                        onClick={() => editCategoriyFunc(c)}
                        className="categoriy_edit_icons"
                      />
                      <MdDeleteOutline
                        onClick={() => deleteCategoriyFunc(c)}
                        className="categoriy_delete_icons"
                      />
                    </div>
                  </div>
                ))}
          </div>
        </div>

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
                      maxLength={20}
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

        {categoriyEditModal && (
          <div className="admin_categoriy_modal">
            <div
              onClick={() => setCategoriyEditModal(false)}
              className="admin_categoriy_modal_owerflow"
            ></div>

            <div className="admin_categoriy_modal_content">
              <div className="admin_categoriy_modal_header">
                <div className="admin_categoriy_modal_header_left">
                  <p className="admin_categoriy_modal_header_left_icons"></p>
                  <p className="admin_categoriy_modal_header_left_text">
                    Categoriya update
                  </p>
                </div>

                <p
                  onClick={() => setCategoriyEditModal(false)}
                  className="admin_categoriy_modal_header_right"
                >
                  <FiX />
                </p>
              </div>

              <form
                onSubmit={(e) => updateCategoriy(e)}
                className="admin_panel_categoriy_form"
              >
                <div className="admin_panel_categoriy_form_input_div">
                  <label className="admin_panel_categoriy_form_label">
                    Markasi
                    <input
                      className="admin_panel_categoriy_form_input"
                      type="text"
                      name="update_title"
                      placeholder="Kiriting..."
                      minLength={3}
                      maxLength={20}
                    />
                  </label>
                  <label className="admin_panel_categoriy_form_label">
                    Rasm 360 ichki makon
                    <div className="admin_panel_categoriy_images_input_div">
                      <MdAddAPhoto className="admin_panel_categoriy_images_input_div_icons" />
                      <p className="admin_panel_categoriy_images_input_div_text">
                        {categoriyUpdateImages ? "File Upload" : "Yuklash"}
                      </p>
                    </div>
                    <input
                      onChange={(e) => categoriyEditUploadImages(e)}
                      className="admin_panel_categoriy_input_none"
                      type="file"
                      name="categoriy_img"
                    />
                  </label>
                </div>

                <div className="admin_panel_categoriy_btn_div">
                  <p></p>
                  <button type="submit" className="admin_panel_categoriy_btn">
                    Update
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
