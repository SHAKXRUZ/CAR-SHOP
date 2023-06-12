import "./Registr.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdAddAPhoto } from "react-icons/md";
const Registr = () => {
  if (window.location.pathname === "/") {
    localStorage.clear();
  }

  const [registrImages, setRegistrImages] = useState("");

  const uploadRegistrImages = async (e) => {
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
      setRegistrImages(data2.secure_url);
    }
  };

  const userRegistr = async (e) => {
    e.preventDefault();

    const { username, email, password } = e.target;

    if (registrImages) {
      await fetch("https://thoughtful-scrubs-boa.cyclic.app/users/registr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.value,
          email: email.value,
          password: password.value,
          registrImages,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.msg);
          if (
            data.msg === "You have registered!" ||
            data.msg === "You are registered!"
          ) {
            username.value = "";
            email.value = "";
            password.value = "";
            setRegistrImages("");
            window.location = "/login";
          }
        });
    } else {
      alert("Images required?");
    }
  };

  return (
    <div className="registr">
      <div className="registr_container">
        <h2 className="registr_title">Registr</h2>
        <form onSubmit={(e) => userRegistr(e)} className="registr_form">
          <input
            type="text"
            className="registr_input"
            name="username"
            placeholder="Enter username..."
            required
            minLength={3}
            maxLength={15}
          />
          <input
            type="email"
            className="registr_input"
            name="email"
            placeholder="Enter email..."
            required
            minLength={10}
            maxLength={35}
          />
          <input
            type="password"
            className="registr_input"
            name="password"
            placeholder="Enter password..."
            required
            minLength={8}
            maxLength={8}
          />
          <label className="registr_input">
            <div className="registr_input_file_div">
              <MdAddAPhoto className="registr_input_file_div_icons" />
              <p className="registr_input_file_div_text">
                {registrImages ? "File Upload" : "Yuklash..."}
              </p>
            </div>
            <input
              onChange={(e) => uploadRegistrImages(e)}
              className="registr_file_input"
              type="file"
              name="registr_images"
              required
            />
          </label>
          <Link className="login_pages_link" to="/login">
            Log into Account
          </Link>
          <button type="submit" className="registr_btn">
            Registr
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registr;
