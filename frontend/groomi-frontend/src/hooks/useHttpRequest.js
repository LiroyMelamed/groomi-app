import { useState } from "react";
import { useError } from "../providers/ErrorProvider";

const useHttpRequest = (requestFunction, onSuccess, onFailure) => {
    const [result, setResult] = useState(null);
    const [isPerforming, setIsPerforming] = useState(false);
    const { showError } = useError();

    const defaultOnFailure = (error) => {
        console.log('error', error);
        showError(error.response || "An unexpected error occurred.");
    };

    const performRequest = async (...args) => {
        if (isPerforming) return;
        setIsPerforming(true);
        try {
            const respone = await requestFunction(...args);
            console.log('respone', respone);
            setResult(respone.data);
            if (respone.success === false) {
                if (onFailure) onFailure(respone);
                else defaultOnFailure(respone);
            }
            if (onSuccess) onSuccess(respone.data);
        } catch (err) {
            if (onFailure) onFailure(err);
            else defaultOnFailure(err);
        } finally {
            setIsPerforming(false);
        }
    };

    return { result, isPerforming, performRequest };
};

export default useHttpRequest;
