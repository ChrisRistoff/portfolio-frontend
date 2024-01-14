import './App.css'
import {Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Header} from "./Components/Header.tsx";
import {Home} from "./Components/MainPage.tsx";
import {ProjectsPage } from "./Components/ProjectsPage.tsx"

function App() {
    
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />}/>:
                <Route path={"/projects"} element={<ProjectsPage />}/>
            </Routes>
        </>
    )

}

export default App