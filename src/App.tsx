import { BrowserRouter, Route, Routes } from 'react-router-dom';
import authRoutes from './Router/auth-routes';
// import nonAuthRoutes from './Router/non-auth-routes';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import SuspenseLayout from './Components/SuspenseLayout';
import NavBar from './Components/Header';
function App() {
  return (
    <>
      <BrowserRouter>
       <NavBar />
        <Routes>
          {/* /* <Route  element= {<SuspenseLayout/>}> */}
          {/* <Route element={<NavBar/>}> */}
          <Route>
            <Route>
              {authRoutes.navigationRouts.map((data) => {
                return <Route path={data.path} key={data.name} element={data.component} />;
              })}
            </Route>
            {/* </Route> */}
            {/* <Route>
              {nonAuthRoutes.map((data) => {
                return <Route path={data.path} element={data.component} key={data.name} />;
              })}
            </Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;