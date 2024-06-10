import React, { useLayoutEffect } from "react";
import AdminRouter from '../Router/AdminRouter';
import { useSelector,useDispatch } from "react-redux";
import EmployeeRouter from "../Router/EmployeeRouter";
import { setIsAdmin, setToken, setUsername } from '../redux/UserInfo/action.js'
function Layout() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const isAdmin = useSelector(state => state.user.isAdmin)
  useLayoutEffect(() => {  // Fetch user data to get companyId
    // Dispatch the setToken action to save the token in the Redux store
    dispatch(setToken(token));
    fetch('http://localhost:5000/api/users/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(userData => {
        dispatch(setIsAdmin(userData.isAdmin));
        dispatch(setUsername(userData.name))
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

  }, []);
  return (
    <>
      {isAdmin ? <AdminRouter /> : <EmployeeRouter />}
    </>
  );
}

export default Layout;
