import { useEffect, useState } from "react";
import { useConnection } from "../context/connection";
import { getInkContract } from "../utils";

const usePostCount = () => {
    const [postCount, setPostCount] = useState(0);
    const { provider } = useConnection();

    useEffect(() => {
        const fetchPostCount = async () => {
            try {
                const contract = await getInkContract(provider, false);
                let { id } = await contract.getPost();
                const count = await contract.postIndex(id);
                setPostCount(Number(count));
            } catch (error) {
                console.error("Error fetching post count:", error);
            }
        };

        fetchPostCount();
    }, [provider]);
    return postCount;
};

export default usePostCount;
