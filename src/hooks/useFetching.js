import { useState } from "react";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false)

    const fetching = async () => {
        try {
            setIsLoading(false)
            setTimeout( async ()=> {
                 await callback()
                setIsLoading(true)
            },1500)
        } finally {
        }
    }
    return [fetching, isLoading]
}