import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUserDetail, setUsers, userDetail} from "../../features/user/userSlice";

const UserProfile = () => {
    //const {user} = props.location.state;
    const userData = useSelector(selectUserDetail);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userDetail());
    }, []);

    return (
        <div>
            {userData ? (
                <div>
                    <p>Name: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                </div>
            ) : (
                <p>User information not available</p>
            )}
        </div>
    );
};

export default UserProfile;