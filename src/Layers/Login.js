import React,{Component} from "react";
import { Redirect } from "react-router-dom";
import '../css/login.css'

export default class Login extends Component {

  state={
    mail:'',
    password:'',
    role:0,
    redirect:null,
    branch_data:{},
    doctor_data:{}
  }

  handleSubmit =(e)=>{
    const handleResponse = ({ target }) => {
      console.log(target.responseText)
      let obj = JSON.parse(target.responseText)
      console.log(obj)
      let obj1 = JSON.parse(obj)
      // console.log(obj1)
      if(obj['success']===false || obj1['success']===false){
        alert('Login failed. Please check your credentials and try again.')
      }
      else if(JSON.parse(obj)['success']===true)
      { alert('Login success !');
        if(e.target.value==='Log in' && this.state.role===0)
        {
          this.setState({
              branch_data:JSON.parse(JSON.parse(target.responseText))
          })
          this.setState({
            redirect:'/branchLogin'
          })
          this.props.toggle(e)
        }

        else if(e.target.value==='Log in' && this.state.role===1)
        {
          this.setState({
              doctor_data:JSON.parse(JSON.parse(target.responseText))
          })
          this.setState({
            redirect:'/doctorLogin'
          })
          this.props.toggle(e)
        }
      }
      
      
    }

    const handleEvent=(event)=> {
    if(event.type==='progress')
     { alert(`${event.type}: ${event.loaded} %`)}
     else{
      alert(`${event.type}: ${event.loaded}`)
     }
    }


    if(this.state.role===0)
    { 
      const xhr = new XMLHttpRequest()
      const data = new FormData()
      
      data.append('mail',this.state.mail)
      data.append('password',this.state.password)
      data.append('role',this.state.role)
      
      xhr.addEventListener('load', handleResponse)
      xhr.addEventListener('error', handleEvent);
      // xhr.addEventListener('progress', handleEvent);
      xhr.open('POST', 'https://dbs-project.herokuapp.com/login')
      xhr.send(data)
    }
     else if(this.state.role===1)
      {
        // console.log('inside doctor login')
      //   console.log(this.state)
        const xhr = new XMLHttpRequest()
        const data = new FormData()
        
        data.append('mail',this.state.mail)
        data.append('password',this.state.password)
        data.append('role',this.state.role)
        
        xhr.addEventListener('error', handleEvent);
        // xhr.addEventListener('progress', handleEvent);
        xhr.addEventListener('abort', handleEvent);
        xhr.addEventListener('load', handleResponse)
        xhr.open('POST', 'https://dbs-project.herokuapp.com/login')
        xhr.send(data)
      }
  }

  handleClick = (e) => {
    console.log(e.target.id)
   this.props.toggle(e);
  };

  handleChange = (e)=>{
    let value = e.target.value;
    this.setState({
     [e.target.name]: value
    });
    // console.log(this.state);
  }

  setRole = (e)=>{
    let value = Number(e.target.value);
    console.log(e.target.value)
    this.setState({
        role:value
    })
    // console.log(this.state)
  }

  viewPass = (e)=>{
    if(e.target.id==="eye")
    {
      var pass = document.getElementById("password");
      // console.log(pass)
      if(pass.type === "password")
      {
        pass.type="text"
      }
      else{
        pass.type="password"
      }
    }
    else if(e.target.id==="eye2")
    {
      var confpass = document.getElementById("confirm-pass");
      console.log(confpass)
      if(confpass.type === "password")
      {
        confpass.type="text"
      }
      else{
        confpass.type="password"
      }
    }
  }


render() {
  
  return (
     <div className="modal_content_login">
        <span className="close_login" onClick={this.handleClick} id="login" >&times; </span>
     <div className="login-container">
            <div className="form-login">
                   <div>
                    <h2>Welcome!</h2>
                    
                    <label for="role" className="role-label-login">Pick a role</label>
                        <select id="role" name="role" className="role-login" onChange={this.setRole}>
                          <option value={0}>Hospital</option>
                          <option value={1}>Doctor</option>
                        </select> 
                    <div>
                    <label for="mail" className="label-login-1" >Email ID</label><br />
                    <input type="email" name="mail"  id="mail" className="email-login" 
                    value={this.state.mail}  
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    onChange = {this.handleChange}/>

                    <label for="password" className="label-login-2">Password</label>  <br />
                    <input type="password" 
                    name="password" 
                    id="password" 
                    required 
                    className="password-login"  
                    value={this.state.password}  
                    onChange = {this.handleChange} 
                    />

                      <img src="https://firebasestorage.googleapis.com/v0/b/mirrage-3c65e.appspot.com/o/icons8-eye-24.png?alt=media&token=f5966808-503f-4cbc-ae6d-23b8d9ded4e3"
                    alt="view-pass" className="eye-login hide" onClick={this.viewPass} id="eye"/> 
                    </div>
                    <br />
                    <input type="submit" value="Log in" id='login' onClick={this.handleSubmit} className="submit-login"/>
                </div>
            </div>
        </div>
        {
          this.state.redirect ? (
            <Redirect
            to={{
            pathname: this.state.redirect,
            login_data: this.state.branch_data,
            login_doctor_data:this.state.doctor_data
          }}
        />
          ):
          (
            null
          )
        }
    </div>
  );
 }
}


