import { useCallback } from "react";
import { useConnection } from "../context/connection";
import { calculateGasMargin, getInkContract } from "../utils";
import { toast } from "react-toastify";

const useRegister = () => {
    const { isActive, provider } = useConnection();
    const Register = useCallback(
        async () => {
            if (!isActive) return toast.info("please, connect");
            const contract = await getInkContract(provider, true);
            const estimatedGas = await contract.Register.estimateGas();

            return await contract.register( {
                gasLimit: calculateGasMargin(estimatedGas),
            });
        },
        [isActive, provider]
    );

    return Register;
};

export default useRegister;