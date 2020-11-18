export default class FetchClient {
    url
    type
    params
    headers
    token
    storage = window.localStorage || null;
    constructor(type, params) {
        this.url = 'http://localhost/api/';
        this.type = type;
        this.params = params;
        this.headers = this.getHeader();
        this.token = window.localStorage.getItem('vb5token');
    }

    setToken(newToken) {
        this.token = newToken;
    }

    getHeader() {
        return {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }

    get(endpoint, params) {
        var str = "";
        for (var key in params) {
            if (str != "") {
                str += "&";
            }
            str += key + "=" + params[key];
        }
        this.headers.Authorization = 'Bearer ' + this.token;
        return fetch(this.url + endpoint + '?' + str,{
            headers: this.headers,
        })
            .then(response => {
                return response.json();
            })
            .then( (data) => {
                return data;
            })
            .catch(error => {
                if(error === 'Error: 401'){
                    this.$router.replace('/logout');
                }
                return error;
            });
    }

     post(endpoint, params) {
         return fetch(this.url + endpoint, {
            'method': 'POST',
            headers: this.headers,
            body: JSON.stringify(params),
        })
            .then(response => {
                return response.json();
            })
            .then( (data) => {
                return data;
            })
            .catch(error => {
                if(error === 'Error: 401'){
                    this.$router.replace('/logout');
                }
                return error;
            });
    }

}
