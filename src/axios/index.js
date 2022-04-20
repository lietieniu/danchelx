import axios from "axios";
import { Modal } from "antd";

export default {
    ajax(options) {
        let baseURL = 'https://mock.mengxuegu.com/mock/6260234066abf914b1f1c436/dc'
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                baseURL: baseURL,
                method: "GET",
                dataType: "json",
                timeout: 5000,
                params: (options.data && options.data.params) || ''
            }).then((response) => {
                if (response.status == '200') {
                    if (response.data.code == '0') {
                        resolve(response.data)
                    } else {
                        Modal.error({
                            title: "提示",
                            content: response.data.message
                        })
                    }
                } else {
                    reject(response.data)
                }
            })
        })
    }
}