import { getAbout } from "@/api/about";

export default {
    namespaced: true,
    state:{
        loading:false,
        data:""
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
       async fetchAbout(ctx){
        if(ctx.state.data){ // 这里虽然进行了是否有数据的判断，但在第二次进入个人中心页时还是会有正在加载中的效果
            return          // 因为这个是还未加载完ifram的src所产生的，而不是重复加载data数据产生的
        }
            ctx.commit("setLoading",true);
            const resp = await getAbout();
            ctx.commit("setData", resp);
            ctx.commit("setLoading",false)
        }
    }
}