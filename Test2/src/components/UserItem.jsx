import React from "react";

const UserItem = React.memo(({ user, onDelete }) => {
  return (
    <li style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
      <img
        src={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
        style={{ width: "50px", borderRadius: "50%", marginRight: "10px" }}
      />
      {user.first_name} {user.last_name}
      <button
        onClick={() => onDelete(user.id)}
        style={{
          marginLeft: "10px",
          padding: "5px 10px",
          fontSize: "0.9em",
          cursor: "pointer",
          backgroundColor: "#e74c3c",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Delete
      </button>
    </li>
  );
});

export default UserItem;
