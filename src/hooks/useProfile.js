import { useCallback, useEffect, useState } from "react";
import useProfileCount from "./useProfileCount";
import { useConnection } from "../context/connection";
import {
    getInkInterface,
    getMulticall2ContractWithProvider,
} from "../utils";
import { inkContractAddress } from "../constants/addresses";

const useProfile = (id) => {
    const [profile, setProfile] = useState(null);
    const [state, setState] = useState("LOADING");
    const { provider } = useConnection();
    const profileLength = useProfileCount();

    const fetchProfile = useCallback(async () => {
        const profileId = Number(id);
        if (!profileLength) return;
        if (!profileId || profileId > profileLength)
            return setState("NOT_FOUND");
        try {
            const multicall2Contract =
                getMulticall2ContractWithProvider(provider);

            const inkInterface = getInkInterface();

            const calls = [
                {
                    target: inkContractAddress,
                    callData: inkInterface.encodeFunctionData("profiles", [
                        profileId,
                    ]),
                },
            ];

            const callsResult = (
                await multicall2Contract.aggregate.staticCall(calls)
            )[1].toArray();

            const profile = inkInterface
                .decodeFunctionResult("profiles", callsResult[0])
                .toArray();

            const profileDetails = {
                id: profileId,
                title: profile[0],
                content: profile[1],
                owner: profile[2],
                isActive: profile[4],
            };

            setProfile(profileDetails);
            setState("LOADED");
        } catch (error) {
            console.error("Error fetching profiles:", error);
            setState("NOT_FOUND");
        }
    }, [profileLength, id, provider]);

    useEffect(() => {
        fetchProfile();
    }, [profileLength, fetchProfile, id, provider]);
    return { profile, state };
};

export default useProfile;
