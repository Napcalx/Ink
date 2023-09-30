import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProfile from "../hooks/useProfile";
// import { shortenAccount } from "../utils";
// import { useConnection } from "../context/connection";
// import { toast } from "react-toastify";

const Profile = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const { profile, state } = useProfile(id);
    if (state === "NOT_FOUND") return navigate("/");
    if (state === "LOADING") return <p>Loading...</p>;

    return (
        <div className="flex flex-col items-center justify-center px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:pt-32 md:px-0">
            <div className="flex flex-col items-center max-w-2xl md:px-8">
                <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                    <div className="mb-4">
                        <span
                            className={`${
                                profile.isActive
                                    ? "bg-green-400 text-white"
                                    : "bg-red-400 text-white"
                            } w-fit text-sm px-4 py-2 rounded-full`}
                        >
                            {profile.isActive ? "Active" : "Inactive"}
                        </span>
                    </div>
                    <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                        {/* <span className="relative inline-block">
                            <svg
                                viewBox="0 0 52 24"
                                fill="currentColor"
                                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                            >
                                <defs>
                                    <pattern
                                        id="192913ce-1f29-4abd-b545-0fbccfd2b0ec"
                                        x="0"
                                        y="0"
                                        width=".135"
                                        height=".30"
                                    >
                                        <circle cx="1" cy="1" r=".7" />
                                    </pattern>
                                </defs>
                                <rect
                                    fill="url(#192913ce-1f29-4abd-b545-0fbccfd2b0ec)"
                                    width="52"
                                    height="24"
                                />
                            </svg>
                            <span className="relative">The</span>
                        </span>{" "}
                        Profile '{profile?.name}' */}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Profile;
