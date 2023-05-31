import { Route } from "react-router-dom";
import Pages from "../components/Pages";
import Admin from "../admin/Admin";
const Routes = () => {
  return (
    <>
      <Pages />
      <Route path="/admin">
        <Admin />
      </Route>
    </>
  );
};
export default Routes;
