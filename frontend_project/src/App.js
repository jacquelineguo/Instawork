import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { UserList } from "./UserList";
import { EditUser } from "./EditUser";
import { AddUser } from "./AddUser";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList/>} />
          <Route path="/edit-user/*" element={<EditUser/>} />
          <Route path="/add-user" element={<AddUser/>} />
      </Routes>
    </BrowserRouter>
  );
}
