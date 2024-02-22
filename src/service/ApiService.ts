import { API_BASE_URL } from "../app-config";

interface CallDTO {
    api: string 
    method: string 
    request: string | null 
}

export const call = ({ api, method, request }: CallDTO) => {
    const url = API_BASE_URL + api
    const headers = {
        'Content-Type': 'application/json',
    } 

    // Request Body 설정 (GET 요청이 아닌 경우에만)
    const options = method === 'GET' ? { method, headers } : { method, headers, body: JSON.stringify(request) } 

    fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json() 
            } else {
                throw new Error(`Failed API call. Status: ${response.status}`) 
            }
        })
        .then(data => {
            console.log('API call successful:', data) 
        })
        .catch(error => {
            console.error('Error during API call:', error) 
        }) 
} 
/*    let options = {
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        url: API_BASE_URL + api,
        method: method,
    } 
    if (request) {
        // GET method
        options.body = JSON.stringify(request) 
    }
    return fetch(options.url, options).then((response) =>
        response.json().then((json) => {
            if (!response.ok) {
                // response.ok가 true이면 정상적인 리스폰스를 받은것, 아니면 에러 리스폰스를 받은것.
                return Promise.reject(json) 
            }
            return json 
        })
    ) */