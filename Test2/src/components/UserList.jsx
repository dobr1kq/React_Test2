import React, { useState } from "react";
import { fetchUsers } from "../services/userService";
import UserItem from "./UserItem";
import apiClient from "../services/apiClient";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      console.log("Fetched data:", data);
      setUsers(data.data);
      setFilteredUsers(data.data);
    } catch (err) {
      setError("Unable to upload users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await apiClient.delete(`/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      setFilteredUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );
    } catch (err) {
      setError("Unable to delete a user");
      console.error(err);
    }
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);

    const filtered = users.filter((user) =>
      `${user.first_name} ${user.last_name}`
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    setFilteredUsers(filtered);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {users.length === 0 && !loading && !error && (
        <button
          onClick={loadUsers}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Download users
        </button>
      )}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Search for users..."
        value={filter}
        onChange={handleFilterChange}
        style={{
          padding: "10px",
          marginBottom: "20px",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <ul style={{ marginTop: "20px" }}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserItem key={user.id} user={user} onDelete={handleDeleteUser} />
          ))
        ) : (
          <p>No users were found for your request.</p>
        )}
      </ul>
    </div>
  );
};

export default UserList;
