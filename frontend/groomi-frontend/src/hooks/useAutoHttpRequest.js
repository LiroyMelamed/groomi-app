import { useEffect } from "react";
import useHttpRequest from "./useHttpRequest";

const useAutoHttpRequest = (requestFunction, { body = null, onSuccess = null, onFailure = null } = {}) => {
    const { result, isPerforming, error, performRequest } = useHttpRequest(requestFunction, onSuccess, onFailure);

    useEffect(() => {
        performRequest(body); // Execute request on mount
    }, []); // Empty dependency array to ensure it runs only once

    return { result, isPerforming, error, performRequest };
};

export default useAutoHttpRequest;
