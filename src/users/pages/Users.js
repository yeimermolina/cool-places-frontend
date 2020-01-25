import React, { useState, useEffect } from "react";
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
  const [usersList, setUsersList] = useState();

  const { loading, error, clearError, makeRequest } = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await makeRequest("/users");
        setUsersList(response.users);
      } catch (e) {}
    };

    fetchUsers();
  }, [makeRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {loading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!loading && usersList && <UsersList users={usersList} />}
    </React.Fragment>
  );
};

export default Users;
