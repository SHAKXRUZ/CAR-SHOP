import "./Cars.css";
import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdAddAPhoto, MdDeleteOutline } from "react-icons/md";
import { FiSearch, FiX, FiEdit } from "react-icons/fi";
const Cars = () => {
  const [carsModal, setCarsModal] = useState(false);

  const [categoriyData, setCategoriyData] = useState([]);
  const [carsData, setCarsData] = useState([]);
  const [carsSearchData, setCarsSearchData] = useState([]);

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

  const carsSearchFunction = async (e) => {
    e.preventDefault();
    let { cars_search } = e.target;
    await fetch("https://thoughtful-scrubs-boa.cyclic.app/admin/cars_search_api", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
        search: cars_search.value,
      },
    })
      .then((res) => res.json())
      .then((data) => setCarsSearchData(data));
    cars_search.value = "";
  };

  const [carsIchkiMakon, setCarsIchkiMakon] = useState("");
  const [carsTashqiMakon, setCarsTashqiMakon] = useState("");
  const [carsTuriMakon, setCarsTuriMakon] = useState("");

  const carsIchkiMakonFunction = async (e) => {
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
      setCarsIchkiMakon(data2.secure_url);
    }
  };

  const setCarsTashqiMakonFunction = async (e) => {
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
      setCarsTashqiMakon(data2.secure_url);
    }
  };

  const setCarsTuriMakonFunction = async (e) => {
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
      setCarsTuriMakon(data2.secure_url);
    }
  };

  const createCarsFunc = async (e) => {
    e.preventDefault();

    const {
      markasi,
      tanirovkasi,
      matori,
      yili,
      rangi,
      yurgani,
      gearbooki,
      narxi,
      name,
      deseriptioni,
    } = e.target;

    if (carsIchkiMakon && carsTashqiMakon && carsTuriMakon) {
      await fetch("https://thoughtful-scrubs-boa.cyclic.app/admin/create_cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
          admin_token: localStorage.getItem("admin_token"),
        },
        body: JSON.stringify({
          markasi: markasi.value,
          tanirovkasi: tanirovkasi.value,
          matori: matori.value,
          yili: yili.value,
          rangi: rangi.value,
          yurgani: yurgani.value,
          gearbooki: gearbooki.value,
          narxi: narxi.value,
          name: name.value,
          deseriptioni: deseriptioni.value,
          ichki_makon: carsIchkiMakon,
          tashqi_makon: carsTashqiMakon,
          cars_turi: carsTuriMakon,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.msg);
          if (
            data.msg === "Create cars!" ||
            data.msg === "Is there a car with that name?"
          ) {
            matori.value = "";
            yili.value = "";
            rangi.value = "";
            yurgani.value = "";
            gearbooki.value = "";
            narxi.value = "";
            name.value = "";
            deseriptioni.value = "";
            setCarsIchkiMakon("");
            setCarsTashqiMakon("");
            setCarsTuriMakon("");
          }
        });
    } else {
      alert("Images required?");
    }
  };

  const deleteCarsFunc = async (c) => {
    await fetch("https://thoughtful-scrubs-boa.cyclic.app/admin/cars_delete", {
      method: "DELETE",
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
        if (data.msg === "Cars deleted!") {
          window.location.reload();
        }
      });
  };

  const [carsEditModal, setCarsEditModal] = useState(false);
  const [carsId, setCarsId] = useState("");

  const editCarsFunc = (c) => {
    if (c.id) {
      setCarsEditModal(true);
      setCarsId(c.id);
    }
  };

  const [carsIchkiMakonUpdate, setCarsIchkiMakonUpdate] = useState("");
  const [carsTashqiMakonUpdate, setCarsTashqiMakonUpdate] = useState("");
  const [carsTuriMakonUpdate, setCarsTuriMakonUpdate] = useState("");

  const carsIchkiMakonFunctionUpdate = async (e) => {
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
      setCarsIchkiMakonUpdate(data2.secure_url);
    }
  };

  const setCarsTashqiMakonFunctionUpdate = async (e) => {
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
      setCarsTashqiMakonUpdate(data2.secure_url);
    }
  };

  const setCarsTuriMakonFunctionUpdate = async (e) => {
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
      setCarsTuriMakonUpdate(data2.secure_url);
    }
  };

  const updateCarsFunc = async (e) => {
    e.preventDefault();

    const {
      update_markasi,
      update_tanirovkasi,
      update_matori,
      update_yili,
      update_rangi,
      update_yurgani,
      update_gearbooki,
      update_narxi,
      update_name,
      update_deseriptioni,
    } = e.target;

    await fetch("https://thoughtful-scrubs-boa.cyclic.app/admin/update_cars", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        id: carsId,
        markasi: update_markasi.value,
        tanirovkasi: update_tanirovkasi.value,
        matori: update_matori.value,
        yili: update_yili.value,
        rangi: update_rangi.value,
        yurgani: update_yurgani.value,
        gearbooki: update_gearbooki.value,
        narxi: update_narxi.value,
        name: update_name.value,
        deseriptioni: update_deseriptioni.value,
        ichki_makon: carsIchkiMakonUpdate,
        tashqi_makon: carsTashqiMakonUpdate,
        cars_turi: carsTuriMakonUpdate,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        if (data.msg === "Cars update!") {
          update_matori.value = "";
          update_yili.value = "";
          update_rangi.value = "";
          update_yurgani.value = "";
          update_gearbooki.value = "";
          update_narxi.value = "";
          update_name.value = "";
          update_deseriptioni.value = "";
          setCarsIchkiMakonUpdate("");
          setCarsTashqiMakonUpdate("");
          setCarsTuriMakonUpdate("");
        }
      });
  };

  return (
    <div className="admin_cars">
      <div className="admin_cars_container">
        <div className="cars_header">
          <div className="cars_header_left">
            <p className="cars_header_left_icons"></p>
            <p className="cars_header_left_text">Carslar</p>
          </div>

          <form
            onSubmit={(e) => carsSearchFunction(e)}
            className="cars_search_form"
          >
            <input
              className="cars_search_form_input"
              type="text"
              name="cars_search"
              placeholder="Search..."
              required
              minLength={3}
              maxLength={20}
            />

            <button type="submit" className="cars_search_form_btn">
              <FiSearch className="cars_search_form_btn_icons" />
            </button>
          </form>

          <button
            onClick={() => setCarsModal(true)}
            className="cars_header_right"
          >
            <AiOutlinePlus className="cars_header_right_icons" />
            <p className="admin_panel_cars_qushish_text_none">
              Mashina qo'shish
            </p>
          </button>
        </div>

        <form className="cars_search_form_media">
          <input
            className="cars_search_form_input"
            type="text"
            name="cars_search"
            placeholder="Search..."
            required
            minLength={3}
            maxLength={20}
          />

          <button className="cars_search_form_btn">
            <FiSearch className="cars_search_form_btn_icons" />
          </button>
        </form>

        <div className="cars_data_content">
          <div className="admin_cars_data_table">
            <p className="admin_cars_data_table_id">#</p>
            <p className="admin_cars_data_table_marka">Markasi</p>
            <p className="admin_cars_data_table_gearbook">Gearbook</p>
            <p className="admin_cars_data_table_tanirovkasi">Tanirovkasi</p>
            <p className="admin_cars_data_table_motor">Motor</p>
            <p className="admin_cars_data_table_year">Year</p>
            <p className="admin_cars_data_table_color">Color</p>
            <p className="admin_cars_data_table_distance">Distance</p>
          </div>

          <div className="admin_cars_data_map">
            {carsSearchData.length !== 0
              ? carsSearchData.map((c, idx) => (
                  <div key={idx} className="cars_table_div">
                    <p className="cars_data_map_id">{idx + 1}.</p>
                    <p className="cars_data_map_name">{c.name}</p>
                    <p className="cars_data_map_gearbook">{c.gearbook}</p>
                    <p className="cars_data_map_tanning">{c.tanning}</p>
                    <p className="cars_data_map_motor">{c.motor}</p>
                    <p className="cars_data_map_year">{c.year}</p>
                    <p className="cars_data_map_color">{c.color}</p>
                    <p className="cars_data_map_walking">{c.walking}km</p>
                    <FiEdit
                      onClick={() => editCarsFunc(c)}
                      className="cars_edit_icons"
                    />
                    <MdDeleteOutline
                      onClick={() => deleteCarsFunc(c)}
                      className="cars_delete_icons"
                    />
                  </div>
                ))
              : carsData.map((c, idx) => (
                  <div key={idx} className="cars_table_div">
                    <p className="cars_data_map_id">{idx + 1}.</p>
                    <p className="cars_data_map_name">{c.name}</p>
                    <p className="cars_data_map_gearbook">{c.gearbook}</p>
                    <p className="cars_data_map_tanning">{c.tanning}</p>
                    <p className="cars_data_map_motor">{c.motor}</p>
                    <p className="cars_data_map_year">{c.year}</p>
                    <p className="cars_data_map_color">{c.color}</p>
                    <p className="cars_data_map_walking">{c.walking}km</p>
                    <FiEdit
                      onClick={() => editCarsFunc(c)}
                      className="cars_edit_icons"
                    />
                    <MdDeleteOutline
                      onClick={() => deleteCarsFunc(c)}
                      className="cars_delete_icons"
                    />
                  </div>
                ))}
          </div>
        </div>

        {carsModal && (
          <div className="admin_cars_modal">
            <div
              onClick={() => setCarsModal(false)}
              className="admin_cars_modal_owerflow"
            ></div>

            <div className="admin_cars_modal_content">
              <div className="admin_cars_modal_header">
                <div className="admin_cars_modal_header_left">
                  <p className="admin_cars_modal_header_left_icons"></p>
                  <p className="admin_cars_modal_header_left_text">
                    Cars qo'shish
                  </p>
                </div>

                <p
                  onClick={() => setCarsModal(false)}
                  className="admin_cars_modal_header_right"
                >
                  <FiX />
                </p>
              </div>

              <form
                onSubmit={(e) => createCarsFunc(e)}
                className="admin_cars_modal_form"
              >
                <div className="admin_cars_modal_input_div">
                  <label className="admin_cars_modal_label">
                    Markasi
                    <select className="admin_cars_modal_select" name="markasi">
                      {categoriyData.map((c, idx) => (
                        <option key={idx} value={c.title}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="admin_cars_modal_label">
                    Tanirovkasi
                    <select
                      className="admin_cars_modal_select"
                      name="tanirovkasi"
                    >
                      <option value="yuq">YUQ</option>
                      <option value="bor">BOR</option>
                    </select>
                  </label>
                </div>

                <div className="admin_cars_modal_input_div">
                  <label className="admin_cars_modal_label">
                    Motor
                    <input
                      className="admin_cars_modal_input"
                      type="text"
                      name="matori"
                      placeholder="Kiriting..."
                      required
                      maxLength={3}
                      minLength={3}
                    />
                  </label>
                  <label className="admin_cars_modal_label">
                    Year
                    <input
                      className="admin_cars_modal_input"
                      type="number"
                      name="yili"
                      placeholder="Kiriting..."
                      required
                    />
                  </label>
                </div>

                <div className="admin_cars_modal_input_div">
                  <label className="admin_cars_modal_label">
                    Color
                    <input
                      className="admin_cars_modal_input"
                      type="text"
                      name="rangi"
                      placeholder="Kiriting..."
                      required
                      maxLength={10}
                      minLength={2}
                    />
                  </label>
                  <label className="admin_cars_modal_label">
                    Distance
                    <input
                      className="admin_cars_modal_input"
                      type="number"
                      name="yurgani"
                      placeholder="Kiriting..."
                      required
                    />
                  </label>
                </div>

                <div className="admin_cars_modal_input_div">
                  <label className="admin_cars_modal_label">
                    Gearbook
                    <input
                      className="admin_cars_modal_input"
                      type="text"
                      name="gearbooki"
                      placeholder="Kiriting..."
                      required
                      maxLength={15}
                      minLength={8}
                    />
                  </label>
                  <label className="admin_cars_modal_label">
                    Narxi
                    <input
                      className="admin_cars_modal_input"
                      type="number"
                      name="narxi"
                      placeholder="Kiriting..."
                      required
                    />
                  </label>
                </div>

                <div className="admin_cars_modal_input_div">
                  <label className="admin_cars_modal_images_label">
                    Rasm 360 ichki makon
                    <div className="admin_cars_modal_images_div">
                      <MdAddAPhoto className="admin_cars_modal_images_icons" />
                      <p className="admin_cars_modal_images_text">
                        {carsIchkiMakon ? "File Upload" : "Yuklash..."}
                      </p>
                    </div>
                    <input
                      onChange={(e) => carsIchkiMakonFunction(e)}
                      className="admin_cars_modal_images_input_none"
                      type="file"
                      name="cars_images"
                      required
                    />
                  </label>

                  <label className="admin_cars_modal_images_label">
                    Rasm 360 tashqi makon
                    <div className="admin_cars_modal_images_div">
                      <MdAddAPhoto className="admin_cars_modal_images_icons" />
                      <p className="admin_cars_modal_images_text">
                        {carsTashqiMakon ? "File Upload" : "Yuklash..."}
                      </p>
                    </div>
                    <input
                      onChange={(e) => setCarsTashqiMakonFunction(e)}
                      className="admin_cars_modal_images_input_none"
                      type="file"
                      name="cars_images"
                      required
                    />
                  </label>
                </div>

                <div className="admin_cars_modal_input_div">
                  <label className="admin_cars_modal_images_label">
                    Modeli turi uchun rasm
                    <div className="admin_cars_modal_images_div">
                      <MdAddAPhoto className="admin_cars_modal_images_icons" />
                      <p className="admin_cars_modal_images_text">
                        {carsTuriMakon ? "File Upload" : "Yuklash..."}
                      </p>
                    </div>
                    <input
                      onChange={(e) => setCarsTuriMakonFunction(e)}
                      className="admin_cars_modal_images_input_none"
                      type="file"
                      name="cars_images"
                      required
                    />
                  </label>

                  <label className="admin_cars_modal_label">
                    Name
                    <input
                      className="admin_cars_modal_input"
                      type="text"
                      name="name"
                      placeholder="Kiriting..."
                      required
                      minLength={2}
                      maxLength={15}
                    />
                  </label>
                </div>

                <div className="admin_cars_modal_input_div">
                  <label className="admin_cars_modal_label">
                    Deseription
                    <input
                      className="admin_cars_modal_input"
                      type="text"
                      name="deseriptioni"
                      placeholder="Mazmuni kiriting..."
                      required
                      maxLength={100}
                      minLength={10}
                    />
                  </label>
                </div>

                <div className="admin_cars_modal_input_div">
                  <p></p>
                  <button type="submit" className="admin_cars_form_btn">
                    Saqlash
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {carsEditModal && (
          <div className="admin_cars_modal">
            <div
              onClick={() => setCarsEditModal(false)}
              className="admin_cars_modal_owerflow"
            ></div>

            <div className="admin_cars_modal_content">
              <div className="admin_cars_modal_header">
                <div className="admin_cars_modal_header_left">
                  <p className="admin_cars_modal_header_left_icons"></p>
                  <p className="admin_cars_modal_header_left_text">
                    Cars qo'shish
                  </p>
                </div>

                <p
                  onClick={() => setCarsEditModal(false)}
                  className="admin_cars_modal_header_right"
                >
                  <FiX />
                </p>
              </div>

              <form
                onSubmit={(e) => updateCarsFunc(e)}
                className="admin_cars_modal_form"
              >
                <div className="admin_cars_modal_input_div">
                  <label className="admin_cars_modal_label">
                    Markasi
                    <select
                      className="admin_cars_modal_select"
                      name="update_markasi"
                    >
                      {categoriyData.map((c, idx) => (
                        <option key={idx} value={c.title}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="admin_cars_modal_label">
                    Tanirovkasi
                    <select
                      className="admin_cars_modal_select"
                      name="update_tanirovkasi"
                    >
                      <option value="yuq">YUQ</option>
                      <option value="bor">BOR</option>
                    </select>
                  </label>
                </div>

                <div className="admin_cars_modal_input_div">
                  <label className="admin_cars_modal_label">
                    Motor
                    <input
                      className="admin_cars_modal_input"
                      type="text"
                      name="update_matori"
                      placeholder="Kiriting..."
                      maxLength={3}
                      minLength={3}
                    />
                  </label>
                  <label className="admin_cars_modal_label">
                    Year
                    <input
                      className="admin_cars_modal_input"
                      type="number"
                      name="update_yili"
                      placeholder="Kiriting..."
                    />
                  </label>
                </div>

                <div className="admin_cars_modal_input_div">
                  <label className="admin_cars_modal_label">
                    Color
                    <input
                      className="admin_cars_modal_input"
                      type="text"
                      name="update_rangi"
                      placeholder="Kiriting..."
                      maxLength={10}
                      minLength={2}
                    />
                  </label>
                  <label className="admin_cars_modal_label">
                    Distance
                    <input
                      className="admin_cars_modal_input"
                      type="number"
                      name="update_yurgani"
                      placeholder="Kiriting..."
                    />
                  </label>
                </div>

                <div className="admin_cars_modal_input_div">
                  <label className="admin_cars_modal_label">
                    Gearbook
                    <input
                      className="admin_cars_modal_input"
                      type="text"
                      name="update_gearbooki"
                      placeholder="Kiriting..."
                      maxLength={15}
                      minLength={8}
                    />
                  </label>
                  <label className="admin_cars_modal_label">
                    Narxi
                    <input
                      className="admin_cars_modal_input"
                      type="number"
                      name="update_narxi"
                      placeholder="Kiriting..."
                    />
                  </label>
                </div>

                <div className="admin_cars_modal_input_div">
                  <label className="admin_cars_modal_images_label">
                    Rasm 360 ichki makon
                    <div className="admin_cars_modal_images_div">
                      <MdAddAPhoto className="admin_cars_modal_images_icons" />
                      <p className="admin_cars_modal_images_text">
                        {carsIchkiMakonUpdate ? "File Upload" : "Yuklash..."}
                      </p>
                    </div>
                    <input
                      onChange={(e) => carsIchkiMakonFunctionUpdate(e)}
                      className="admin_cars_modal_images_input_none"
                      type="file"
                      name="update_cars_images"
                    />
                  </label>

                  <label className="admin_cars_modal_images_label">
                    Rasm 360 tashqi makon
                    <div className="admin_cars_modal_images_div">
                      <MdAddAPhoto className="admin_cars_modal_images_icons" />
                      <p className="admin_cars_modal_images_text">
                        {carsTashqiMakonUpdate ? "File Upload" : "Yuklash..."}
                      </p>
                    </div>
                    <input
                      onChange={(e) => setCarsTashqiMakonFunctionUpdate(e)}
                      className="admin_cars_modal_images_input_none"
                      type="file"
                      name="update_cars_images"
                    />
                  </label>
                </div>

                <div className="admin_cars_modal_input_div">
                  <label className="admin_cars_modal_images_label">
                    Modeli turi uchun rasm
                    <div className="admin_cars_modal_images_div">
                      <MdAddAPhoto className="admin_cars_modal_images_icons" />
                      <p className="admin_cars_modal_images_text">
                        {carsTuriMakonUpdate ? "File Upload" : "Yuklash..."}
                      </p>
                    </div>
                    <input
                      onChange={(e) => setCarsTuriMakonFunctionUpdate(e)}
                      className="admin_cars_modal_images_input_none"
                      type="file"
                      name="update_cars_images"
                    />
                  </label>

                  <label className="admin_cars_modal_label">
                    Name
                    <input
                      className="admin_cars_modal_input"
                      type="text"
                      name="update_name"
                      placeholder="Kiriting..."
                      minLength={2}
                      maxLength={15}
                    />
                  </label>
                </div>

                <div className="admin_cars_modal_input_div">
                  <label className="admin_cars_modal_label">
                    Deseription
                    <input
                      className="admin_cars_modal_input"
                      type="text"
                      name="update_deseriptioni"
                      placeholder="Mazmuni kiriting..."
                      maxLength={100}
                      minLength={10}
                    />
                  </label>
                </div>

                <div className="admin_cars_modal_input_div">
                  <p></p>
                  <button type="submit" className="admin_cars_form_btn">
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

export default Cars;
