import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import "./edit.css"
import axios from "axios"
import toast from 'react-hot-toast'

const Edit = () => {
  const [errors, setErrors] = useState({});

  const users ={
    fname:"",
    lname:"",
    email:"",
    mnumber:"",
    state:"",
    city:""
  }

  const navigate = useNavigate()

  const {id} = useParams();


  const [user,setUser] = useState(users);

  const inputHandler = (e) =>{
    const {name, value } = e.target;
    setUser({...user,[name]:value});
    console.log(user);
  }

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/getone/${id}`)
    .then((response)=>{
     setUser(response.data)

    }).catch((error)=>{
      console.log(error)
    })
  },[id])


  const submitForm = async(e) => {
    e.preventDefault();

    const validationErrors = {};
    const alphaPattern = /^[a-zA-Z]+$/;
    const numPattern = /^\d{10}$/;
  
    if (!user.fname.match(alphaPattern)) {
      validationErrors.fname = 'First name should only contain alphabetic characters.';
    }
  
    if (!user.lname.match(alphaPattern)) {
      validationErrors.lname = 'Last name should only contain alphabetic characters.';
    }
  
    if (!user.city.match(alphaPattern)) {
      validationErrors.city = 'City should only contain alphabetic characters.';
    }
  
    if (!user.state.match(alphaPattern)) {
      validationErrors.state = 'State should only contain alphabetic characters.';
    }
  
 
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
   
    
    await axios.put(`http://localhost:8000/api/update/${id}`, user)
    .then((response)=>{
      toast.success(response.data.message, {position:"top-center"})
      navigate("/")
     
  
    }).catch(error => console.log(error))
  }


  return (
    <div className="addUser">
      <Link to={"/"}>Back</Link>
      <h3>Add new Employee</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            onChange={inputHandler}
            value={user.fname}
            autoComplete="off"
            placeholder="First Name"
          ></input>
          {errors.fname && <span style={{ color: 'red' }}>{errors.fname}</span>}

        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            name="lname"
            value={user.lname}
            onChange={inputHandler}
            autoComplete="off"
            placeholder="Last Name"
          ></input>
         {errors.lname && <span style={{ color: 'red' }}>{errors.lname}</span>}

        </div> <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            autoComplete="off"
            onChange={inputHandler}
            placeholder="email"
          ></input>
        </div> <div className="inputGroup">
          <label htmlFor="mnumber">Contact Detail</label>
          <input
            type="text"
            id="mnumber"
            name="mnumber"
            onChange={inputHandler}
            value={user.mnumber}
            autoComplete="off"
            placeholder="Mobile Number"
          ></input>
          
        </div> <div className="inputGroup">
          <label htmlFor="state">State Name</label>
          <input
            type="text"
            id="state"
            onChange={inputHandler}
            name="state"
            value={user.state}
            autoComplete="off"
            placeholder="State Name"
          ></input>
          {errors.state && <span style={{ color: 'red' }}>{errors.state}</span>}
        </div> <div className="inputGroup">
          <label htmlFor="city">City Name</label>
          <input
            type="text"
            id="city"
            name="city"
            value={user.city}
            onChange={inputHandler}
            autoComplete="off"
            placeholder="City Name"
          ></input>
          {errors.city && <span style={{ color: 'red' }}>{errors.city}</span>}
        </div>
        <div className="inputGroup">
         <button type="submit">UPDATE DETAILS</button>
        </div>
      </form>
    </div>
  );
};

export default Edit