import "./Modellar.css";
const Modellar = () => {
  if (!localStorage.getItem("token")) {
    window.location = "/login";
  }
  if (localStorage.getItem("admin_token")) {
    localStorage.removeItem("admin_token");
  }
  return <div>Modellar</div>;
};

export default Modellar;
