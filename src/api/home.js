
import service from "@/utils/request.js";
/**
 * 获取信息接口
 */
export function HomeList(data){
    return service.request({
        method:"POST",
        url:"/info",
        data
    })
}

export function Delete(data){
    return service.request({
        method:"POST",
        url:"/delete",
        data
    })
}


export function EditConfirm(data){
    return service.request({
        method:"POST",
        url:"/update",
        data
    })
}

export function AddConfirm(data){
    return service.request({
        method:"POST",
        url:"/insert",
        data
    })
}