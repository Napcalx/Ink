import { useCallback } from "react";
import { useConnection } from "../context/connection";
import { calculateGasMargin, getInkContract } from "../utils";
import { toast } from "react-toastify";

const useCreatePost = () => {
    const { isActive, provider } = useConnection();
    const createPost = useCallback(
        async (title, content) => {
            if (!title || !content)
                return toast.info("Please provide all values");
            if (!isActive) return toast.info("please, connect");
            const contract = await getInkContract(provider, true);
            const estimatedGas = await contract.createPost.estimateGas(
                title,
                content,
            );

            return contract.createPost(title, content, {
                gasLimit: calculateGasMargin(estimatedGas),
            });
        },
        [isActive, provider]
    );

    return createPost;
};

export default useCreatePost;
