const apiEndPoint = "https://dummyjson.com/";
class APIService {

    static getInstance() {
        if (!APIService.instance) {
            APIService.instance = new APIService();
        }
        return APIService.instance;
    }


    getProducts(payload) {
        let endpoint = apiEndPoint + `products?limit=${payload.pageSize || 0}&skip=${payload.currentPage || 0}`;
        if (payload.productId) {
            endpoint = apiEndPoint + `products/${payload.productId}`;
        }
        return this.makeAPICall(endpoint, 'get');
    }
    makeAPICall(endpoint, method, payload) {
        if (!payload) {
            payload = {}
        }

        let request = {
            method: method,
            mode: "cors",
            headers: {
                "Content-type": "application/json"
            },
        }

        if (method.toLowerCase() === "post") {
            request['body'] = JSON.stringify(payload)
        }
        return this.requestAPI(endpoint, request, payload);
    }

    requestAPI(endpoint, request, options) {
        return fetch(endpoint, request).then((response) => {
            if (response.status === 401 || response.status === 403) {
                return Promise.reject(response.statusText);
            }
            if (response.status !== 200) {
                return response.text().then((errorResponse) => {
                    throw new Error(JSON.parse(errorResponse).message);
                });
            }
            return response.json();
        }).then(res => {
            return res;
        }).catch((err) => {
            return Promise.reject(err);
        });
    }
}

export default APIService;