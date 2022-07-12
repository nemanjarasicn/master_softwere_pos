
import  {LoginPage}    from   './Pages/loginPage'
import { Route, Routes ,  BrowserRouter as Router} from "react-router-dom";

function App() {
  const styles = {
    contentDiv: {
      display: "flex",
    },
    contentMargin: {
      marginLeft: "10px",
      width: "100%",
    },
  };
  return (
    <>
    <Router>
        <Routes >
          <Route exact path='/' element={<LoginPage/>} />
        </Routes>
    </Router>
    </>
  );
}

export default App;