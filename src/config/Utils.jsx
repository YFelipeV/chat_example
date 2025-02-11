import { API } from "./enviroment";


// Función para realizar peticiones a la API
export async function reqtsApiForm(
    urlApi,
    method,
    params = {},
    withToken = false,
) {
    // Configurar headers iniciales
    const headers = {
        "Content-Type": "application/json", // Tipo de contenido JSON
    };

    if (withToken) {
        const tokenQuery = localStorage.getItem('token')
        const token = decryptXOR(tokenQuery || "")
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    try {
        const response = await axios({
            method: method,
            url: `${API}${urlApi}`,
            headers: headers,
            data: params
        });
        /*
        const distrustArray = Array.isArray(response?.data?.DISTRUST);

        if (!response?.data?.STATUS && !distrustArray) {
            localStorage.removeItem('SESSION');
            location.reload();
            return { error: true, message: 'Sesión expirada' };
        }
            */

        return response.data;


    } catch (error) {
        if (error.response?.status === 401) {
            return { error: true, message: 'No autorizado' };
        }
        return { error: true, message: "Error inesperado" };
    }
}



