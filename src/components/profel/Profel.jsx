import "./Profel.css";
import { useState, useEffect } from "react";
import { MdAddAPhoto } from "react-icons/md";
const Profel = () => {
  if (!localStorage.getItem("token")) {
    window.location = "/login";
  }
  if (localStorage.getItem("admin_token")) {
    localStorage.removeItem("admin_token");
  }

  const [u, setUserData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users/one_user", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, []);

  const [profelEditImages, setProfelEditImages] = useState("");

  const userProfelEditImages = async (e) => {
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
      setProfelEditImages(data2.secure_url);
    }
  };

  const [profelEdit, setProfelEdit] = useState(false);

  const userUpdateProfel = async (e) => {
    e.preventDefault();
    const { profel_username, profel_email, profel_password } = e.target;

    await fetch("http://localhost:5000/users/edit_profel", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        username: profel_username.value,
        email: profel_email.value,
        password: profel_password.value,
        user_images: profelEditImages,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);

        if (data.msg === "Profel edit!") {
          profel_username.value = "";
          profel_email.value = "";
          profel_password.value = "";
          setProfelEditImages("");
          window.location.reload();
        }
      });
  };
  return (
    <div className="profel">
      <div className="profel_container">
        <div className="profel_content">
          <div className="profel_header">
            <img className="user_profel_images" src={u.user_images} alt="" />
            <button
              onClick={() => setProfelEdit(true)}
              className="edit_profel_btn"
            >
              Edit profel
            </button>
            <div className="user_profel_data_map_div">
              <div className="user_profel_text_div">
                <p className="user_profel_text_div_title">Username:</p>
                <p className="user_profel_text_div_text">{u.username}</p>
              </div>
              <div className="user_profel_text_div">
                <p className="user_profel_text_div_title">Email:</p>
                <p className="user_profel_text_div_text">{u.email}</p>
              </div>

              <div className="user_profel_text_div">
                <p className="user_profel_text_div_title">Password:</p>
                <p className="user_profel_text_div_text">********</p>
              </div>
            </div>
          </div>
        </div>

        {profelEdit && (
          <div className="admin_users_modal">
            <div
              onClick={() => setProfelEdit(false)}
              className="admin_users_modal_owerflow"
            ></div>

            <div className="users_update_content_div">
              <h2 className="users_update_modal_title">Profel edit</h2>

              <form
                onSubmit={(e) => userUpdateProfel(e)}
                className="users_update_form"
              >
                <input
                  type="text"
                  className="users_update_input"
                  name="profel_username"
                  placeholder="Enter username..."
                  minLength={3}
                  maxLength={15}
                />
                <input
                  type="email"
                  name="profel_email"
                  className="users_update_input"
                  placeholder="Enter email..."
                  minLength={10}
                  maxLength={35}
                />
                <input
                  type="password"
                  name="profel_password"
                  className="users_update_input"
                  placeholder="Enter password..."
                  minLength={8}
                  maxLength={8}
                />
                <label className="users_update_input_label">
                  <div className="users_update_input_div">
                    <MdAddAPhoto className="users_update_input_div_icons" />
                    <p className="users_update_input_div_text">
                      {profelEditImages ? "File Upload" : "Yuklash..."}
                    </p>
                  </div>
                  <input
                    onChange={(e) => userProfelEditImages(e)}
                    className="users_form_none_input"
                    type="file"
                    name="profel_images"
                  />
                </label>

                <button type="submit" className="users_update_btn">
                  Profel edit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profel;
