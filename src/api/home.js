
import service from "@/utils/request.js";
/**
 * 获取信息接口
 */
export function HomeList(){
    return service.request({
        method:"GET",
        url:"/info",
        data:{}
    })
    // .then(res =>{
    //     let name = res.data.data[0].name;
    //     console.log(name)
    // })
}
