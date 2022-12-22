// 对函数进行防抖处理，返回一个防抖函数
export default function(fn, duration = 100){
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(()=>{
            fn(...args)
        },duration)
    }
}