import { useState, useEffect } from 'react';

export function useSearchFetch(searchQuery) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (searchQuery) {
            setLoading(true);
            setError(null);
            setData(null);

            const apiUrl = `http://localhost:3000/api/search/${(searchQuery)}`;

            fetch(apiUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    setData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error);
                    setLoading(false);
                });
        }
    }, [searchQuery]);

    return { data, loading, error };
}
