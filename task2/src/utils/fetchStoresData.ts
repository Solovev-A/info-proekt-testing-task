const DATA_URL = 'DNS.csv';

export const fetchStoresData = async (): Promise<string> => {
    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) {
            handleError(new Error(`Код ошибки ${response.status}. Ошибка при загрузке исходных данных. Повторите попытку позже.`))
        }
        const csv = await response.text();
        return csv;
    } catch (error) {
        handleError(error);
    }
}

function handleError(error: Error) {
    alert(error.message);
}