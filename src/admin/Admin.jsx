import { Route } from "react-router-dom";
import "./Admin.css";
import AdminLogin from "./admin_login/AdminLogin";
import AdminSidebar from "./admin_sidebar/AdminSidebar";
import AdminHeader from "./admin_header/AdminHeader";
import Categoriy from "./categoriy/Categoriy";
import Cars from "./cars/Cars";
import Users from "./users/Users";
const Admin = () => {
  return (
    <>
      <Route exact path="/admin">
        <AdminLogin />
      </Route>

      <div className="admin">
        <div className="admin_container">
          <Route path="/admin/panel">
            <div className="admin_panel_flex">
              <AdminSidebar />
              <div className="admin_panel_routerlar">
                <AdminHeader />
               <div className="admin_panel_pages">
               <Route exact path="/admin/panel">
                  <Categoriy />
                </Route>
                <Route path="/admin/panel/cars">
                  <Cars />
                </Route>
                <Route path="/admin/panel/users">
                  <Users />
                </Route>
               </div>
              </div>
            </div>
          </Route>
        </div>
      </div>
    </>
  );
};

export default Admin;
