import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./component/Header";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Profile from "./pages/Profile"

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/",
            element: <Profile />,
        },
        {
            path: "/post/:id",
            element: <Post />,
        },
    ]);
    return (
        <div className="App">
            <Header />
            <main className="mt-10">
                <RouterProvider router={router} />
            </main>
            <ToastContainer />
        </div>
    );
}

export default App;
