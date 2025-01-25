import axios, { AxiosResponse, AxiosError } from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_LOCAL_BASEURL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Response and Error Interceptors with TypeScript support
api.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error: AxiosError) => {
        if (error.response) {
            // TypeScript infers the status and message types from the response
            const { status, data } = error.response;

            if (status === 401) {
                alert((data as any).message);
                localStorage.clear();
                // .then(() => (window.location.href = "/auth/login"));
            } else if (status === 503) {
                alert((data as any).message);
            } else {
                alert((data as any).message);
                throw new Error((data as any).message);
            }
        } else {
            alert("An unknown error occurred");
            throw error;
        }
    }
);

export const getShipments = () => api.get(`shipments`);

export const getShipmentById = (id: string | number) => api.get(`shipments/${id}`);

