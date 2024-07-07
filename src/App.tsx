import UserForm from "./UserForm";
import UserService from "./Service/UserService";
import useUser from "./hook/useUser";
export interface User {
  id: number;
  name: string;
}
const App = () => {
  const { users, setUsers, errors, setErrors, loading } = useUser();
  const handleSubmition = (data: User) => {
    const orginal = [...users];
    const newMember = { id: data.id, name: data.name };
    setUsers([newMember, ...users]);
    UserService.handleSubmition(newMember)
      .then((res) => setUsers([res.data, ...users]))
      .catch((err) => {
        setErrors(err.message);
        setUsers(orginal);
      });
  };

  const handleUpdate = (user: User) => {
    const orginal = [...users];
    const updated = { ...user, name: user.name + "Good Job" };
    setUsers(users.map((u) => (u.id == user.id ? updated : u)));
    UserService.handleUpdate(updated).catch((err) => {
      setErrors(err.message);
      setUsers(orginal);
    });
  };

  const handleDelete = (id: number) => {
    const orginal = [...users];
    setUsers(users.filter((u) => u.id !== id));
    UserService.handleDelete(id).catch((err) => {
      setErrors(err.message);
      setUsers(orginal);
    });
  };
  return (
    <>
      <UserForm kuft={handleSubmition} />
      <ul className="list-group">
        {users.map((user) => (
          <li
            className="list-group-item d-flex justify-content-between"
            key={user.id}
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-primary mx-1"
                onClick={() => handleUpdate(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
