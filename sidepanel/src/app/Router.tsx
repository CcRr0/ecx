import { MemoryRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Current from "@/pages/current";
import Settings from "@/pages/settings";
import Updates from "@/pages/updates";

function Router() {
    return (
        <MemoryRouter initialEntries={["/current"]}>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="current" element={<Current />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="updates" element={<Updates />} />
                </Route>
            </Routes>
        </MemoryRouter>
    );
}

export default Router;
