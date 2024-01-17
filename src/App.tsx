import './App.css'
import {Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Header} from "./Components/Header.tsx";
import {Home} from "./Components/MainPage.tsx";
import {ProjectsPage } from "./Components/ProjectsPage.tsx"
import Login from "./Components/Login.tsx";
import {TestAuthPage} from "./Components/TestAuthPage.tsx";
import AdminPage from "./Components/AdminPage.tsx";
import {EditPersonalInfo} from "./Components/EditPersonalInfoPage.tsx";
import EditProjectsPage from "./Components/EditProjectsPage.tsx";
import EditSingleProjectPage from "./Components/EditSingleProjectPage.tsx";
import {CreateNewProjectPage} from "./Components/CreateNewProjectPage.tsx";

function App() {
    
    return (
        <>
            <Header/>
            <Routes>
                <Route path={"/test-auth"} element={<TestAuthPage />}/>
                <Route path={"/login"} element={<Login />}/>
                <Route path="/" element={<Home />}/>:
                <Route path={"/projects"} element={<ProjectsPage />}/>
                <Route path={"/admin"} element={<AdminPage />}/>
                <Route path={"/edit-personal-info"} element={<EditPersonalInfo/>}/>
                <Route path={"/edit-projects"} element={<EditProjectsPage />}/>
                <Route path={"/edit-project/:projectId"} element={<EditSingleProjectPage />}/>
                <Route path={"/create-project"} element={<CreateNewProjectPage />}/>
            </Routes>
        </>
    )

}

export default App