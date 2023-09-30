import { useEffect, useState } from "react";
import { useConnection } from "../context/connection";
import { getInkContract } from "../utils";

const useProfileCount = () => {
    const [profileCount, setProfileCount] = useState(0);
    const { provider } = useConnection();

    useEffect(() => {
        const fetchProfileCount = async () => {
            try {
                const contract = await getInkContract(provider, false);
                let { id } = await contract.getUser();
                const count = await contract.userIndex(id);
                setProfileCount(Number(count));
            } catch (error) {
                console.error("Error fetching profile count:", error);
            }
        };

        fetchProfileCount();
    }, [provider]);
    return profileCount;
};

export default useProfileCount;
