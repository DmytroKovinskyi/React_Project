import { useEffect, useState } from "react";
import { UserService } from "../services/users.service";
import "../styles/UsersPage.css"; // Для стилів

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userService = new UserService();

    const fetchUsers = async () => {
      try {
        const usersData = await userService.getUsers();
        setUsers(usersData);
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch users. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
