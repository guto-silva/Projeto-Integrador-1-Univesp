import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import EmployeePage from './pages/EmployeePage';
import DocumentPage from "./pages/DocumentPage";
import DepartmentPage from "./pages/DepartmentPage";
import LoginPage from "./pages/LoginPage";

function AppRoutes() {

    const token = window.localStorage.getItem("FuncionarioToken");
    
    const Private = ({ Item }) => {
        console.log(token);
        return token !== null ? <Item /> : <LoginPage />;
    };


    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route path="/" element={<LoginPage />}></Route>
                    <Route path="/employees" element={< Private Item={EmployeePage} />}></Route>
                    <Route path="/documents" element={< Private Item={DocumentPage} />}></Route>
                    <Route path="/departments" element={< Private Item={DepartmentPage} />}></Route>
                    <Route path="/documents" element={< Private Item={DocumentPage} />}></Route>
                    <Route path="*" element={<LoginPage />}></Route>
                </Routes>
            </Fragment>
        </BrowserRouter>
    );
}

export default AppRoutes;