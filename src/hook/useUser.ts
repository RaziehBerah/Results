import { useEffect, useState } from "react";
import { User } from "../App";
import UserService from "../Service/UserService";
import { CanceledError } from "axios";


const useUser = () => {
    const [users, setUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [newMember, setNewMember] = useState<User[]>([]);
  useEffect(() => {
    const { request, cancel } = UserService.getAll();
    request
      .then((res) => setUsers(res.data))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setErrors(err.message);
      });
    return cancel;
  }, []);
  return {users,setUsers,errors,setErrors,loading}
}

export default useUser