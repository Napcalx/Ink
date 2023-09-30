import React from "react";
import CreateProfile from "../component/Register"
import CreatePost from "../component/CreatePost";
import AllPosts from "../component/AllPosts";

const Home = () => {
    return (
        <>
            <CreatePost />
            <AllPosts />
            <CreateProfile />

        </>
    );
};

export default Home;
