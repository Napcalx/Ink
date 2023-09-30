import { useCallback, useEffect, useState } from "react";
import usePostCount from "./usePostCount";
import { useConnection } from "../context/connection";
import {
    getInkInterface,
    getInkContractWithProvider,
    getMulticall2ContractWithProvider,
} from "../utils";
import { inkContractAddress } from "../constants/addresses";

const usePost = (id) => {
    const [post, setPost] = useState(null);
    const [state, setState] = useState("LOADING");
    const { provider } = useConnection();
    const postLength = usePostCount();

    const fetchPost = useCallback(async () => {
        const postId = Number(id);
        if (!postLength) return;
        if (!postId || postId > postLength)
            return setState("NOT_FOUND");
        try {
            const multicall2Contract =
                getMulticall2ContractWithProvider(provider);

            const inkInterface = getInkInterface();

            const calls = [
                {
                    target: inkContractAddress,
                    callData: inkInterface.encodeFunctionData("posts", [
                        postId,
                    ]),
                },
                {
                    target: inkContractAddress,
                    callData: inkInterface.encodeFunctionData(
                        "getTips",
                        [postId]
                    ),
                },
            ];

            const callsResult = (
                await multicall2Contract.aggregate.staticCall(calls)
            )[1].toArray();

            const post = inkInterface
                .decodeFunctionResult("posts", callsResult[0])
                .toArray();
            const postTips = inkInterface
                .decodeFunctionResult("getTips", callsResult[1])
                .toArray();

            const postDetails = {
                id: postId,
                title: post[0],
                content: post[1],
                owner: post[2],
                isActive: post[4],
                tips: postTips[0].toArray(),
            };

            setPost(postDetails);
            setState("LOADED");
        } catch (error) {
            console.error("Error fetching posts:", error);
            setState("NOT_FOUND");
        }
    }, [postLength, id, provider]);

    useEffect(() => {
        fetchPost();
    }, [postLength, fetchPost, id, provider]);

    useEffect(() => {
        // Listen for event
        const handleTipEvent = (_ID) => {
            fetchPost();
        };

        const contract = getInkContractWithProvider(provider);
        contract.on("Tipping", handleTipEvent);

        return () => {
            contract.off("Tipping", handleTipEvent);
        };
    }, [fetchPost, provider]);
    return { post, state };
};

export default usePost;
