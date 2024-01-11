import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  activeUsers,
  lockUser,
  selectUsersList,
  unlockUser,
} from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaLock, FaLockOpen } from "react-icons/fa";
import Swal from "sweetalert2";
import Table from "react-bootstrap/Table";

export default function ActiveUsers() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsersList);
  const [userList, SetUserList] = useState([]);
  const [render, SetRender] = useState(true);

  const getactiveUsers = async () => {
    dispatch(activeUsers());
    SetUserList(users);
  };

  useEffect(() => {
    if (userList?.length === 0 || render) {
      getactiveUsers();
      SetRender(false);
    }
    SetUserList(users);
  }, [users, render]);

  const handleIconClick = async (id, lock) => {
    if (lock) {
      Swal.fire({
        title: "UnBlocked!",
        text: "This account has been unlocked.",
        icon: "success",
      });
      await dispatch(unlockUser(id));
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, block it!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(lockUser(id));
          SetRender(true);
          Swal.fire({
            title: "Blocked!",
            text: "This account has been locked.",
            icon: "success",
          });
        }
      });
    }
    SetRender(true);
  };

  return (
    <div>
      <h1 className="text-center m-3">Active Users</h1>
      <Table striped bordered hover className="w-75 m-auto mb-5 align-middle">
        <thead className="text-center">
          <tr>
            <th>Username</th>
            <th>Fullname</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Avatar</th>
            <th>Lock</th>
          </tr>
        </thead>
        <tbody>
          {userList?.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td className="text-center">
                <img src={user.avatar} alt="avatar"></img>
              </td>
              <td
                onClick={() => handleIconClick(user.id, user.locked)}
                className="text-center"
              >
                {user.locked ? <FaLock size={30} /> 
                : <FaLockOpen size={30} />}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
