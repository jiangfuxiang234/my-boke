// 公共的远程获取数据的代码
export default function(defaultDataValue = null){
    return{
        data(){
            return{
                isLoading: true,
                data: defaultDataValue
            }
        },
        async created(){
            this.data = await this.fetchData(); // 使用该混入的组件还要注册一个fetchData方法
            this.isLoading = false;
        }
    }
}