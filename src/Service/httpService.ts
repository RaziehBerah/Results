
import ApiClient from "./ApiClient";

interface Entity{
    id:number
}
class httpService{
    endpoint:string
    constructor(endpoint:string){
        this.endpoint=endpoint
    }
    getAll(){
        const controller = new AbortController();
   const request= ApiClient.get(this.endpoint, { signal: controller.signal })
   return{request,cancel:()=>controller.abort()}
    }

    handleSubmition<T>(entity:T){
        return  ApiClient.post(this.endpoint, entity)
    }

    handleUpdate<T extends Entity>(entity:T){
        return  ApiClient.patch(this.endpoint+"/" + entity.id, entity)
    }

    handleDelete<T>(entity:T){
        return  ApiClient.delete(this.endpoint+"/" + entity)
    }

}
const create=(endpoint:string)=>new httpService(endpoint)
export default create