import "../styles/UsersPage.css";
import { useUsers } from "../hooks/useUsers";

const UsersPage = () => {
  const { users, isLoading, error } = useUsers();

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="users-page">
      <h1>Users Page</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{`${user.name.firstname} ${user.name.lastname}`}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                {`${user.address.city}, ${user.address.street}, ${user.address.number}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
