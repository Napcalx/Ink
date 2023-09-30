import { useCallback } from "react";
import { useConnection } from "../context/connection";
import { calculateGasMargin, getInkContract } from "../utils";
import usePostCount from "./usePostCount";
import { toast } from "react-toastify";

const useTipPost = () => {
    const { provider, isActive } = useConnection();
    const postLength = usePostCount();
    const tip = useCallback(
        async (id, amount) => {
            console.log({ amount });
            if (!isActive || !provider) return;
            if (!postLength) return;
            if (Number(id) > postLength)
                return toast.error("Post does not exist");
            const contract = await getInkContract(provider, true);

            const estimatedGas = await contract.tipInk.estimateGas(
                Number(id),
                {
                    value: amount,
                }
            );

            return contract.tipInk(Number(id), {
                value: amount,
                gasLimit: calculateGasMargin(estimatedGas),
            });
        },
        [postLength, isActive, provider]
    );

    return tip;
};

export default useTipPost;
