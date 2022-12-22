let routerTitle = "";
let siteTitle = "";

function setTitle(){ // 设置网站标题
    if(!routerTitle && !siteTitle){ // 路由标题和网站标题都没有
        document.title = "loading..." // 这种情况也不会出现，因为进入网页或刷新网页瞬间routerTitle就加载出来了，siteTitle还会迟一点加载
    }else if(routerTitle && !siteTitle){ // 有路由标题，没有网站标题
        document.title = routerTitle
    }else if(!routerTitle && siteTitle){ // 没有路由标题，有网站标题
        document.title = siteTitle
    }else{ // 路由标题和网站标题都有
        document.title = `${siteTitle}-${routerTitle}`
    }
}

// 刚进入网页或刷新网页的瞬间先出现路由标题(routerTitle)，后出现网站标题(siteTItle)的原因可能是：
// 猜测在Vue实例被创建并注入以后，路由的触发比js执行触发更快，
// 所以刚进入网页或刷新网页的瞬间是先触发路由切换的方法，也就是在router/index.js里的router.afterEach方法，
// 这个时候就先设置路由标题，然后再在main.js文件里面执行store.dispatch("setting/fetchSetting")，加载全局设置，进而设置网站标题; 
// 所以刚进入网页或刷新网页的瞬间是先显示路由标题，然后再显示出网站标题。
export default {
    setRouterTitle(title){
        routerTitle = title;
        setTitle()
    },
    setSiteTitle(title){
        siteTitle = title;
        setTitle()
    }
}