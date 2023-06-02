import "./Turlari.css";
const Turlari = () => {
  if (!localStorage.getItem("token")) {
    window.location = "/login";
  }
  if (localStorage.getItem("admin_token")) {
    localStorage.removeItem("admin_token");
  }
  return <div>Turlari</div>;
};

export default Turlari;
