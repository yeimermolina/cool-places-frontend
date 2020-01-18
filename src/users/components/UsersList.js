import React from "react";
import "./UsersList.css";
import UserItem from "./UserItem";

export default function UsersList(props) {
  if (props.users.length === 0) {
    return (
      <div className="center">
        <h2>No Users Found</h2>
      </div>
    );
  }
  return (
    <ul className="users-list">
      {props.users.map(user => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            placeCount={user.places}
          />
        );
      })}
    </ul>
  );
}
