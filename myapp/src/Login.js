
import { useCallback,useEffect,useState} from "react";

const Login=()=>{
    
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignupForm, setShowSignupForm] = useState(false);
    const handleLoginClick=useCallback((e)=>{
        e.preventDefault();
        const email=document.querySelector("#lemail").value 
        const password=document.querySelector("#lpassword").value
        console.log(email)
      setError(null)
        console.log('handleclick')
        fetch('/login',{method:'POST',headers:{ Authorization: 'Bearer abcdxyz','Content-Type':'application/json'},body:JSON.stringify({
            email,
            password})}).then(res=>res.json()).then(json=>{
                if(json.error)
                setError(json.error)
                else
                setUser(json.user)})},[])

                const handleSignupClick=useCallback((e)=>{


                    e.preventDefault();
                    setError(null)
                    const email=document.querySelector('#email').value;
                    const password=document.querySelector('#password').value;
                    const username=document.querySelector("#username").value;
                    console.log(email)
                      fetch('/signup',{method:'POST',headers:{ Authorization: 'Bearer abcdxyz','Content-Type':'application/json'},body:JSON.stringify({
                          email,
                          password,username
                      })}).then(res=>res.json()).then(json=>{
                        if(json.error!=null)
                          setError(json.error)
                        else
                        setUser(json.email)})
                       
                    },[])
    const ToggleDropDown=useCallback(()=>{
        document.querySelector('.dropdown-menu').classList.toggle('open')

    })
 
    if(user) return(
    <li className="logged-in-user">
        <button onClick={()=>ToggleDropDown()}>{user}</button>
        <div className="dropdown-menu">
            <button onClick={()=>{setUser(null);setShowLoginForm(false)}}>LogOut <i class="bi bi-box-arrow-right"></i> </button>
      
      </div>
     </li> )
   return( <>
        <button id="login" onClick={()=>setShowLoginForm(true)}>Login</button>
      
        <h1>{error}</h1>
       
       {showLoginForm &&<div className="login-form"> 
      
       <div>
          <p>Welcome to MMDB!</p>
       <button id="close-form" onClick={()=>setShowLoginForm(false)}>X</button>
       <div className="input-block">
            <label  className="input-label" htmlFor ="email">Email</label>
            <input type="email" name="email" id="lemail" placeholder="E-mail" required/>
            </div>
         <div className="input-block">    
        <label className="input-label" htmlFor="password">Password </label>
            <input type="text" name="password" id="lpassword" placeholder="Password" required/>
        </div>
        <button type="submit" id="Lsubmit" onClick={(e)=>handleLoginClick(e)}>Submit</button>
       <p> Don't have an account? <a onClick={()=>{setShowLoginForm(false);setShowSignupForm(true)}}>Signup now</a></p>
    </div>
    </div>}
    
     {error && <h2>{error}</h2>}  
     {user&&<h1>Hello {user}</h1>}
   
  {showSignupForm && <div className="login-form">
    <div>
    <p>Welcome to MMDB!</p>
    <button id="close-form" onClick={()=>setShowSignupForm(false)}>X</button>
    <div className="input-block">
     <label className="input-label" htmlFor="email" ></label>
         <input type="email" name="email" id="email" placeholder="E-mail" required/>
     </div> 
     <div className="input-block">
     <label htmlFor="username" className="input-label"> </label>
         <input type="text" name="username" id="username" placeholder="Username" required/>
    
     </div>
     <div className="input-block">
     <label htmlFor="password" className="input-label"> </label>
         <input type="text" name="password" id="password" placeholder="password" required/>
    
     </div>
    
 
     <button type="submit" id="Ssubmit" onClick={()=>handleSignupClick}>Submit</button>
     </div></div>}</> )
  
}
export default Login