import { useState } from "react";
import validation from "./Validation";
const Form=({ login })=>{
    const [userData,setUserData]=useState({email:'',password:''})
    const[errors,setErrors]=useState({});
    const handleChange=(event)=>{
        setUserData({
            ...userData,
            [event.target.name]:event.target.value })

        setErrors(validation({...userData,[event.target.name]:event.target.value}))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        login(userData);
    }
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" value={userData.email} onChange={handleChange}/>
            {errors.email && <p style={{ color: "red"}}>{errors.email}</p>}
            <hr />
            <label htmlFor="password">Password</label>
            <input type="text" name="password" value={userData.password} onChange={handleChange}/>
            {errors.password && <p style={{ color: "red"}}>{errors.password}</p>}

            <hr />
            <button>Submit</button>

        </form>
    )
}
export default Form;