import { useEffect, useState } from "react";
import usePostCount from "./usePostCount";
import { useConnection } from "../context/connection";
import {
    getInkInterface,
    getInkContractWithProvider,
    getMulticall2ContractWithProvider,
} from "../utils";
import { inkContractAddress } from "../constants/addresses";

const useAllPosts = () => {
    const [posts, setPosts] = useState([]);
    const { provider } = useConnection();
    const postNo = usePostCount();

    useEffect(() => {
        const fetchAllPosts = async () => {
            if (!postNo) return;
            try {
                const multicall2Contract =
                    getMulticall2ContractWithProvider(provider);

                const postsKeys = Array.from(
                    { length: Number(postNo) },
                    (_, i) => i + 1
                );

                const inkInterface = getInkInterface();

                const postCalls = postsKeys.map((id) => ({
                    target: inkContractAddress,
                    callData: inkInterface.encodeFunctionData("posts", [
                        id,
                    ]),posts
                }));

                const tipsCall = postsKeys.map((id) => ({
                    target: inkContractAddress,
                    callData: inkInterface.encodeFunctionData(
                        "getTips",
                        [id]
                    ),
                }));

                const calls = postCalls.concat(tipsCall);
                const multicallResults = (
                    await multicall2Contract.aggregate.staticCall(calls)
                )[1].toArray();

                const postMulticallResult = multicallResults.slice(
                    0,
                    multicallResults.length / 2
                );
                const tipsMulticallResult = multicallResults.slice(
                    multicallResults.length / 2
                );

                const decodedPostResults = postMulticallResult.map(
                    (result) =>
                        inkInterface
                            .decodeFunctionResult("posts", result)
                            .toArray()
                );

                const decodedTipsResults =
                    tipsMulticallResult.map((result) =>
                        inkInterface
                            .decodeFunctionResult("getTips", result)
                            .toArray()
                    );

                const postDetails = decodedPostResults.map(
                    (details, index) => ({
                        postId: postsKeys[index],
                        title: details[0],
                        content: details[1],
                        poster: details[2],
                        isActive: details[3],
                        tips:
                            decodedTipsResults[index][0].toArray(),
                    })
                );

                setPosts(postDetails.reverse());
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchAllPosts();
    }, [postNo, provider]);

    // useEffect(() => {
    //     // Listen for event
    //     const handleCreatePostEvent = (postId, title, content) => {
    //         setPosts([
    //             {
    //                 postId,
    //                 title,
    //                 content,
    //                 isActive: true,
    //                 tips: [],
    //             },
    //             ...posts,
    //         ]);
    //     };
    //     const contract = getInkContractWithProvider(provider);
    //     contract.on("CreatePost", handleCreatePostEvent);

    //     return () => {
    //         contract.off("CreatePost", handleCreatePostEvent);
    //     };
    // }, [posts, provider]);

    return posts;
};

export default useAllPosts;
