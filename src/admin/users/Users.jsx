import "./Users.css";
import { FiSearch, FiEdit } from "react-icons/fi";
import { MdDeleteOutline, MdAddAPhoto } from "react-icons/md";
import { useState, useEffect } from "react";

const Users = () => {
  const [userUpdateModal, setUserUpdateModal] = useState(false);
  const [userUpdateId, setUserUpdateId] = useState("");

  const [usersData, setUsersData] = useState([]);

  const userUpdateFunc = (u) => {
    if (u.id) {
      setUserUpdateModal(true);
      setUserUpdateId(u.id);
    }
  };

  useEffect(() => {
    fetch("https://thoughtful-scrubs-boa.cyclic.app/users/list", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setUsersData(data));
  }, []);

  const [searchUser, setSearchUser] = useState([]);

  const userSearchFunction = async (e) => {
    e.preventDefault();
    let { user_search } = e.target;
    await fetch("https://thoughtful-scrubs-boa.cyclic.app/users/user_search_api", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
        search: user_search.value,
      },
    })
      .then((res) => res.json())
      .then((data) => setSearchUser(data));
    user_search.value = "";
  };

  const [updateImages, setUpdateImages] = useState("");

  const uploadUpdateImages = async (e) => {
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
      setUpdateImages(data2.secure_url);
    }
  };

  const userUpdateAdmin = async (e) => {
    e.preventDefault();

    const { update_username, update_email, update_password, update_role } =
      e.target;

    await fetch("https://thoughtful-scrubs-boa.cyclic.app/admin/users_update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
        admin_token: localStorage.getItem("admin_token"),
      },
      body: JSON.stringify({
        id: userUpdateId,
        username: update_username.value,
        email: update_email.value,
        password: update_password.value,
        role: update_role.value,
        user_images: updateImages,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        if (
          data.msg === "You can't change user roles?" ||
          data.msg === "Can't you change your role?"
        ) {
          update_role.value = "";
        }
        if (
          data.msg === "You can't change the details of a senior admin?" ||
          data.msg === "You can't change the data of other admins?" || "User updated?"
        ) {
          update_username.value = "";
          update_email.value = "";
          update_password.value = "";
          update_role.value = "";
          setUpdateImages("");
        }

      });
  };

  const adminUserDeleteFunc = async (u) => {
    await fetch("https://thoughtful-scrubs-boa.cyclic.app/admin/users_delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
        admin_token: localStorage.getItem("admin_token"),
      },
      body: JSON.stringify({
        id: u.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
      });
  };

  return (
    <div className="admin_user">
      <div className="admin_user_container">
        <div className="user_header">
          <div className="user_header_left">
            <p className="user_header_left_icons"></p>
            <p className="user_header_left_text">Userlar</p>
          </div>
          <form
            onSubmit={(e) => userSearchFunction(e)}
            className="user_search_form"
          >
            <input
              className="user_search_input"
              type="text"
              name="user_search"
              placeholder="Search..."
              required
              minLength={3}
              maxLength={20}
            />
            <button className="user_form_btn">
              <FiSearch className="user_form_btn_icons" />
            </button>
          </form>
        </div>

        <div className="user_table_text_name">
          <p className="user_table_id">#</p>
          <p className="user_table_username">Username</p>
          <p className="user_table_email">Email</p>
          <p className="user_table_role">Role</p>
        </div>

        <div className="users_data_map">
          {searchUser.length !== 0
            ? searchUser.map((u, idx) => (
                <div className="users_data_card" key={idx}>
                  <p className="users_data_card_id">{idx + 1}.</p>
                  <p className="users_data_card_username">{u.username}</p>
                  <p className="users_data_card_email">{u.email}</p>
                  <p
                    className={
                      u.role === "admin" || u.role === "shakhruz"
                        ? "adminchik"
                        : "users_data_card_role"
                    }
                  >
                    {u.role}
                  </p>

                  <FiEdit
                    onClick={() => userUpdateFunc(u)}
                    className="users_edit_icons"
                  />
                  <MdDeleteOutline className="users_delete_icons" />
                </div>
              ))
            : usersData.map((u, idx) => (
                <div className="users_data_card" key={idx}>
                  <p className="users_data_card_id">{idx + 1}.</p>
                  <p className="users_data_card_username">{u.username}</p>
                  <p className="users_data_card_email">{u.email}</p>
                  <p
                    className={
                      u.role === "admin" || u.role === "shakhruz"
                        ? "adminchik"
                        : "users_data_card_role"
                    }
                  >
                    {u.role}
                  </p>

                  <FiEdit
                    onClick={() => userUpdateFunc(u)}
                    className="users_edit_icons"
                  />
                  <MdDeleteOutline
                    onClick={() => adminUserDeleteFunc(u)}
                    className="users_delete_icons"
                  />
                </div>
              ))}
        </div>

        {userUpdateModal && (
          <div className="admin_users_modal">
            <div
              onClick={() => setUserUpdateModal(false)}
              className="admin_users_modal_owerflow"
            ></div>

            <div className="users_update_content_div">
              <h2 className="users_update_modal_title">User update</h2>

              <form
                onSubmit={(e) => userUpdateAdmin(e)}
                className="users_update_form"
              >
                <input
                  type="text"
                  className="users_update_input"
                  name="update_username"
                  placeholder="Enter username..."
                  minLength={3}
                  maxLength={15}
                />
                <input
                  type="email"
                  name="update_email"
                  className="users_update_input"
                  placeholder="Enter email..."
                  minLength={10}
                  maxLength={35}
                />
                <input
                  type="password"
                  name="update_password"
                  className="users_update_input"
                  placeholder="Enter password..."
                  minLength={8}
                  maxLength={8}
                />
                <input
                  type="text"
                  className="users_update_input"
                  name="update_role"
                  placeholder="Enter role..."
                  minLength={4}
                  maxLength={5}
                />
                <label className="users_update_input_label">
                  <div className="users_update_input_div">
                    <MdAddAPhoto className="users_update_input_div_icons" />
                    <p className="users_update_input_div_text">
                      {updateImages ? "File Upload" : "Yuklash..."}
                    </p>
                  </div>
                  <input
                    onChange={(e) => uploadUpdateImages(e)}
                    className="users_form_none_input"
                    type="file"
                    name="update_images"
                  />
                </label>

                <button type="submit" className="users_update_btn">
                  Update
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
