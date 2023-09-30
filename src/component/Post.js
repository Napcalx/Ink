import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
    return (
        <div className="bg-white w-[30%] sm:max-w-sm border-2 border-blue-200 shadow-lg rounded-xl overflow-hidden py-8">
            <Link to={`/post/${post.id}`}>
                <div className="px-6 py-4">
                    <h2 className="text-2xl text-blue-400 font-semibold mb-5">
                        Title - {post.title}
                    </h2>
                    <p className="mt-2 font-bold text-gray-500">
                        Content - {post.content}
                    </p>
                </div>
                <div className="flex flex-col gap-3 px-6 pt-2 pb-2">
                </div>
            </Link>
        </div>
    );
};

export default Post;
