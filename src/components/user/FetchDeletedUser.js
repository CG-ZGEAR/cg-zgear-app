import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  fetchDeletedUsers,
  lockUser,
  selectSuccess,
  selectUsersList,
  selectDeletedUsersList,
  unlockUser,
} from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaLock, FaLockOpen } from "react-icons/fa";
import Swal from "sweetalert2";
import Table from "react-bootstrap/Table";
import Pagination from '@mui/material/Pagination';
import {useNavigate} from 'react-router-dom';
import UserDetails from "./UserDetails";

export default function FetchDeletedUsers() {
  const dispatch = useDispatch();
  const users = useSelector(selectDeletedUsersList);


  const { totalPages } = 5;
  const [userList, setUserList] = useState([]);
  const [render, setRender] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const size = 5;
  const navigate = useNavigate();


  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    setRender(true);

  };
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setRender(true);
    }
  };

  const handlePageChange = (event, value) => {
    console.log("Page changed", value);
    setCurrentPage(value - 1);
    setRender(true);
  };

  const handleUserClick = (userId) => {
    console.log(userId);
    navigate(`/admin/user-detail/${userId}`);
  };

  const getfetchDeletedUsers  = async ({ currentPage }) => {
    dispatch(fetchDeletedUsers({ currentPage }));
  };

  useEffect(() => {
    if (render) {
      getfetchDeletedUsers({ currentPage });
      //dispatch(activeUsers({ currentPage, size }));
      setRender(false);
    }
    setUserList(users);

  }, [users, render, currentPage, dispatch]);

  const handleIconClick = async (id, activated) => {
    if (activated) {
      dispatch(unlockUser(id));
      setRender(true);
      Swal.fire({
        title: "UnBlocked!",
        text: "This account has been unlocked.",
        icon: "success",
      });

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
          setRender(true);
          Swal.fire({
            title: "Blocked!",
            text: "This account has been locked.",
            icon: "success",
          });
        }
      });
    }
  };

  return (
      <div>
        <h1 className="text-center m-3">Fetch Delete Users</h1>
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
          {userList !== undefined && userList !== null ?(
              userList.map((user) => (
                  <tr key={user.id} onClick={() => handleUserClick(user.id)}>
                    <td>{user.username}</td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td className="text-center">
                      <img src={user.avatar} alt="avatar"></img>
                    </td>
                    <td
                        onClick={() => handleIconClick(user.id, user.activated)}
                        className="text-center"
                    >
                      {user.activated ? (
                          <FaLock size={30} />
                      ) : (
                          <FaLockOpen size={30} />
                      )}
                    </td>
                  </tr>
              ))
          ) : (
              <tr>Loading...</tr>
          )}
          </tbody>
        </Table>
        <button
            onClick={handlePreviousPage}
            disabled={currentPage <= 0}
            className={`py-2 px-4 mr-2 bg-primeColor text-white font-semibold rounded hover:bg-opacity-90 transition duration-300 ${
                currentPage <= 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          Previous Page
        </button>

        <Pagination
            count={totalPages}
            page={currentPage + 1}
            onChange={handlePageChange}
            hidePrevButton
            hideNextButton
        />


        <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages - 1}
            className={`py-2 px-4 bg-primeColor text-white font-semibold rounded hover:bg-opacity-90 transition duration-300 ${
                currentPage >= totalPages - 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          Next Page
        </button>

        <p className="text-base font-normal text-lightText">
          Showing page {currentPage + 1} of {totalPages}
        </p>
      </div>
  );
}
