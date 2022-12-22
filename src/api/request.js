import axios from "axios"

import showMessage from "@/utils/showMessage"

const ins = axios.create(); // 创建一个axios实例，这个实例可以进行拦截

ins.interceptors.response.use(function(resp){ // 对响应数据进行拦截，当数据响应过来之后，会先执行下面的函数
    if(resp.data.code!==0){
        showMessage({
            content: resp.data.msg,
            type: "error",
            duration: 1500
        })
        return null
    }
    return resp.data.data
})

export default ins;