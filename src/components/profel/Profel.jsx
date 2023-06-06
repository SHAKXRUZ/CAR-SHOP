import "./Profel.css";
const Profel = () => {
  if (!localStorage.getItem("token")) {
    window.location = "/login";
  }
  if (localStorage.getItem("admin_token")) {
    localStorage.removeItem("admin_token");
  }
  return <div>
    
  </div>;
};

export default Profel;
