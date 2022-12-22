import { getBanners } from "@/api/banner";

export default {
    namespaced:true,
    state:{
        loading:false,
        data:[]
    },
    mutations:{
        setLoading(state,payload){
            state.loading = payload
        },
        setData(state,payload){
            state.data = payload
        }
    },
    actions:{
        async fetchBanner(ctx){
            if(ctx.state.data.length){ // 如果已经有数据，则在其他页面切换回首页时就不用重新获取
                return
            }
            ctx.commit("setLoading",true)
            const resp = await getBanners();
            ctx.commit("setData",resp)
            ctx.commit("setLoading",false)
        }
    }
}