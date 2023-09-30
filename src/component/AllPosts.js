import useAllPosts from "../hooks/useAllPosts";
import Post from "./Post";

const AllPosts = () => {
    const posts = useAllPosts();

    return (
        <div className="flex flex-wrap justify-center gap-10 px-5 py-10">
            {!!posts &&
                posts.map((post, index) => (
                    <Post key={index} Post={post} />
                ))}
        </div>
    );
};

export default AllPosts;
