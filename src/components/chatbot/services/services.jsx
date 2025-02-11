import { reqtsApiForm } from "../../../config/Utils";

export const sendMessageApi = async (data) => {
    return reqtsApiForm('v1/chatboot/sendmesaje', true, 'POST', data, data => data, error => error);
}

export const getChatHistory= async () => {
    return reqtsApiForm('v1/chatboot/history', true, 'POST', {}, data => data, error => error);
}