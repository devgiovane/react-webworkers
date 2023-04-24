import { HashRouter, Route, Routes } from "react-router-dom";

import { Basic } from "../pages/basic";
import { Template } from "./template";
import { BigData } from "../pages/bigdata";

export function Router() {
    return(
        <HashRouter>
            <Routes>
                <Route path='/' element={<Template />}>
                    <Route index element={<Basic/>} />
                    <Route path='/bigdata' element={<BigData/>} />
                </Route>
            </Routes>
        </HashRouter>
    )
}
