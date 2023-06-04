import "./Users.css";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";

const Users = () => {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users/users_list", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setUsersData(data));
  }, []);

  console.log(usersData);

  return (
    <div className="admin_user">
      <div className="admin_user_container">
        <div className="user_header">
          <div className="user_header_left">
            <p className="user_header_left_icons"></p>
            <p className="user_header_left_text">Userlar</p>
          </div>
          <form className="user_search_form">
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
          <p className="user_table_password">Password</p>
        </div>

        <div className="users_data_map"></div>
      </div>
    </div>
  );
};

export default Users;
