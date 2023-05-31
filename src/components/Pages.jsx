import { Route } from "react-router-dom";
import Registr from "./registr/Registr";
import Login from "./login/Login";
import Header from "./header/Header";
import Modellar from "./modellar/Modellar";
import Turlari from "./turlari/Turlari";
import One from "./one/One";
import Profel from "./profel/Profel";
import Basket from "./basket/Basket";
const Pages = () => {
  return (
    <>
      <Route exact path="/">
        <Registr />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/modellar">
        <Header />
        <Modellar />
      </Route>
      <Route path="/turlari">
        <Header />
        <Turlari />
      </Route>
      <Route path="/one">
        <Header />
        <One />
      </Route>
      <Route path="/profel">
        <Profel />
      </Route>
      <Route path="/basket">
        <Basket />
      </Route>
    </>
  );
};

export default Pages;
