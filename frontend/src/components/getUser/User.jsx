import React, { useEffect ,useState} from "react";
import "./user.css";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast'

const User = () => {
  const [users, setUsers] = useState([ ]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api/get");
      setUsers(response.data);
    };
    fetchData();
  }, []);


  const deleteUser = async(userId) =>{
    await axios.delete(`http://localhost:8000/api/delete/${userId}`)
    .then((response)=>{
      setUsers((prevUser)=> prevUser.filter((user)=>user._id !== userId))

      console.log(response)
      toast.success(response.data.message, {position:"top-center"})
    })

    .catch((error)=>{
      console.log(error)
    })
  }
  return (
    <div className="userTable">
      <Link to={"/add"} className="addbtn">
        New Employee
      </Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>Sr.No.</th>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index +1}</td>
                <td>{user.fname} {user.lname}</td>
                <td>{user.email}</td>
                <td className="actionbtn">
                  <button onClick={()=> deleteUser(user._id)}>
                    <i className="fa-solid fa-user-minus"></i>
                  </button>
                  <Link to={`/edit/`+ user._id}>
                    <i className="fa-solid fa-user-pen"></i>
                    
                  </Link>
                </td>
              </tr>
            );
          })}
          
        </tbody>
      </table>
    </div>
  );
};

export default User;
