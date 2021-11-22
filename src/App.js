import SigninPage from "./pages/SigninPage";
// import FirebaseTesting from "./pages/FirebaseTesting";
import MyCirclesPage from "./pages/MyCirclesPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import CircleHomePage from "./pages/CircleHomePage";
import CircleHomePage2 from "./pages/CircleHomePage2";
import PaymentsPage from "./pages/PaymentsPage";
import ContributeMoney from "./pages/ContributeMoney";
import CardsInfoPage from "./pages/CardsInfoPage";
import CreateCirclePage from "./pages/CreateCirclePage";
import DonateMoneyPage from "./pages/DonateMoneyPage";
import RequestPage from "./pages/RequestPage";
import SignupPage from "./pages/SignupPage";
import UpdateUserProfilePage from "./pages/UpdateUserProfilePage";
import UserProfilePage from "./pages/UserProfilePage";
import ManageCircle from "./pages/ManageCircle";
import VerifyPage from "./pages/VerifyPage";
import AdminRequestsView from "./pages/AdminRequestsView";
import AdminJoinRequestsView from "./pages/AdminJoinRequestsView";
import RequestDetails from "./pages/RequestDetails";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import AuthProvider from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route
              component={AdminJoinRequestsView}
              path="/AdminJoinRequestsView"
            />
            <Route component={AdminRequestsView} path="/AdminRequestsView" />
            <Route component={RequestDetails} path="/RequestDetails" />
            <Route component={MyCirclesPage} path="/MyCirclesPage" />
            <Route component={SearchPage} path="/Search" />
            <Route component={CircleHomePage} path="/CircleHomePage" />
            <Route component={CircleHomePage2} path="/CircleHomePage2" />
            <Route component={ContributeMoney} path="/ContributeMoney" />
            <Route component={CardsInfoPage} path="/CardsInfoPage" />
            <Route component={CreateCirclePage} path="/createcircle" />
            <Route component={DonateMoneyPage} path="/DonateMoneyPage" />
            <Route component={PaymentsPage} path="/PaymentsPage" />
            <Route component={CardsInfoPage} path="/CardsInfoPage" />
            <Route component={RequestPage} path="/RequestPage" />
            <Route component={UserProfilePage} path="/UserProfilePage" />
            <Route component={ManageCircle} path="/ManageCircle" />
            <Route
              component={UpdateUserProfilePage}
              path="/UpdateUserProfilePage"
            />
            <Route component={HomePage} exact path="/" />
            <Route component={SigninPage} path="/signin" />
            <Route component={SignupPage} path="/signup" />
            <Route component={VerifyPage} path="/verify" />
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
