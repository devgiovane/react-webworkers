import { Outlet } from "react-router-dom";

export function Template() {
    return(
        <>
            <main>
                <Outlet />
            </main>
        </>
    )
}
