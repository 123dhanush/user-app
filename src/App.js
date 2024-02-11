import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./components/userlist.component";
import { UserDetails } from "./components/userdetails.component";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<UserList />}></Route>
          <Route path="/userDetails" element={<UserDetails />}>
            {" "}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
