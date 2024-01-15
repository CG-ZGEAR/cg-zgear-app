import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoading, selectUserDetails, userDetails } from '../../features/user/adminSilce';
import {useParams} from "react-router-dom";

const UserDetails = () => {
    const loading = useSelector(selectLoading);
    const userDetail = useSelector(selectUserDetails);
    const dispatch = useDispatch();
    const {id} = useParams();
    useEffect(() => {
            dispatch(userDetails(id));
    }, [dispatch, id]);

/*    if (loading) {
        return <p>Loading...</p>;
    }*/

/*    if (userDetail == null) {
        return <p>No user details available.</p>;
    }*/

    return (
        <div>
            <h2>User Details</h2>
            <p>Name: {userDetail?.fullName}</p>
            <p>Email: {userDetail?.email}</p>
        </div>
    );
};

export default UserDetails;
