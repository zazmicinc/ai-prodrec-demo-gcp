import { BACKEND_URL } from "./serverData"

export const getChatResponse = async (message, sessionId) => {
    const response = await fetch(`${BACKEND_URL}`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, sessionId }),
    });

    const data = await response.json();

    return data;
}