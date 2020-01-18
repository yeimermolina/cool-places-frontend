import React from "react";
import UsersList from "../components/UsersList";

const USERS = [
  {
    id: "u1",
    name: "Yeimer",
    image:
      "https://uberblogapi.10upcdn.com/wp-content/uploads/2017/12/CHI_Campan%CC%83a-Foto-de-perfil-conductores-Uber_R2_312x312-03.png",
    places: 3
  }
];

const Users = () => {
  return <UsersList users={USERS} />;
};

export default Users;
