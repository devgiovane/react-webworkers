import { HashRouter, Route, Routes } from "react-router-dom";

import { Home } from "../pages/home";
import {Template} from "./template";

export function Router() {
    return(
        <HashRouter>
            <Routes>
                <Route path='/' element={<Template />}>
                    <Route index element={<Home/>} />
                </Route>
            </Routes>
        </HashRouter>
    )
}
