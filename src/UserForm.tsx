import { useState } from "react";
import { useForm } from "react-hook-form";
export interface FormData{
    id:number,
    name:string
}
interface Props{
    kuft:(data:FormData)=>void
}
const UserForm = ({kuft}:Props) => {
    const{register,handleSubmit,reset}=useForm<FormData>()  
  return (
    <form className="form-list" onSubmit={handleSubmit(data=>{
       kuft(data)
       reset()
    
    })}>
      <div className="mb-3">
        <label htmlFor="id" className="form-label">Your Id is:</label>
        <input id="id"  {...register("id",{valueAsNumber:true})}type="number" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Your Name Is:</label>
        <input id="name" {...register("name")} type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <button className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
};
export default UserForm;
