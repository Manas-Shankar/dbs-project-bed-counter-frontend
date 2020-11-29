import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import '../css/register.css';
import '../css/Registerdoctor.css';

export default class RegisterDoctor extends Component {

  state={
    mail:'',
    password:'',
    role:1,
    beds:0,
    h_id:'',
    b_id:'',
    h_name:'',
    b_name:'',
    street_name:'',
    city:'',
    pincode:'',
    name:'',
    specilization:'',
    hospital_data:{},
    hospital_data_updated:{},
    b_data:{},
    choice:0,
    choice0:0,
    choice1:'',
    moveAhead:false,
  }

  componentDidMount(){
    console.log(this.props.hospital_data)
  }

  handleClick = (e) => {
   this.props.toggle1(e);
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

  setChoice = (e)=>{
    let value = Number(e.target.value);
    // console.log(e.target.value)
    this.setState({
        choice:value
    })
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

  handleSubmit =(e)=>{
      e.preventDefault();
      console.log(this.state)
    const handleResponse = ({ target }) => {
        if(JSON.parse(target.responseText)['success']===true)
       { console.log(target.responseText)
        alert(target.responseText + '\nThe registered doctor may now log in from the homepage.')
       }
       else{
        alert(target.responseText)
       }
        this.props.toggle1(e);
      }
    const handleEvent=(event)=> {
      if(event.type==='progress')
       { alert(`${event.type}: ${event.loaded} %`)}
       else{
        alert(`${event.type}: ${event.loaded}`)
       }
      }
      if(this.state.role===1)
      {     
        const xhr = new XMLHttpRequest()
        const data = new FormData()
        data.append('role',this.state.role)
        data.append('mail',this.state.mail)
        data.append('password',this.state.password)
        data.append('b_name',this.props.hospital_data['b_name'])
        data.append('h_name',this.props.hospital_data['h_name'])
        data.append('h_id',this.props.hospital_data['h_id'])
        data.append('b_id',this.props.hospital_data['b_id'])
        data.append('name',this.state.name)
        data.append('specilization',this.state.specilization)
        xhr.addEventListener('load', handleResponse)
        xhr.addEventListener('error', handleEvent);
        xhr.open('POST', 'https://dbs-project.herokuapp.com/register')
        console.log(data)
        xhr.send(data)
      }
}

render() {
  return (
     <div className="modal_content_register_doctor">
        <span className="close_register_doctor" onClick={this.handleClick} id="register" >&times; </span>
     <div className="register-doctor-container">
            <div className="form-register-doctor">
                   <div>
                   <h2>Welcome!</h2>
                    
                    <label for="role" className="role-label-register-doctor">To register a doctor, Please fill out this form</label>
                    <br />
                    {    
                            <div className='super-branch-doctor'>
                                    <label for="mail" className="label-register-3-doctor" >Email ID</label><br />
                                  <input type="email" name="mail"  id="mail" className="email-register-2" 
                                  value={this.state.mail}  
                                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                  onChange = {this.handleChange}/>

                                  <label for="password" className="label-register-password">Password</label>  <br />
                                  <input type="password" 
                                  name="password" 
                                  id="password" 
                                  required 
                                  className="password-register-1"  
                                  value={this.state.password}  
                                  onChange = {this.handleChange} 
                                  // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                  />
                                    <img src="https://firebasestorage.googleapis.com/v0/b/mirrage-3c65e.appspot.com/o/icons8-eye-24.png?alt=media&token=f5966808-503f-4cbc-ae6d-23b8d9ded4e3"
                                  alt="view-pass" className="eye-register-1 hide" onClick={this.viewPass} id="eye"/>
                            
                                    <div className='branch-register'>
                                        <label for="name" className="label-beds-1" >Name:</label><br />
                                        <input type="text" name="name"  id="name" className="beds-register" 
                                        value={this.state.name}  
                                        onChange = {this.handleChange}/>
                                        <label for="hname" className="label-hname-1" >Hospital Name:</label><br />
                                        <input type="text" name="h_name"  id="hname" className="beds-register" 
                                        value={this.props.hospital_data['h_name']}  
                                        readonly="readOnly"
                                        />

                                    </div>

                                    <div className='branch-register-1'>
                                    <label for="bname" className="label-bname-1" >Branch Name:</label><br />
                                        <input type="text" name="b_name"  id="bname" className="beds1-register-doctor" 
                                        value={this.props.hospital_data['b_name']}  
                                        readonly="readOnly"
                                        onChange = {this.handleChange}/>
                                        <label for="specilization" className="label-specilization-1" >Specialization:</label><br />
                                        <input type="text" name="specilization"  id="specilization" className="beds2-register-doctor" 
                                        value={this.state.specilization}  
                                        onChange = {this.handleChange}/>
                                    </div>

                                    <input type="submit" value="Register" className="submit-register" id='register'onClick={this.handleSubmit}/>
                                    
                            </div> 
                    }
                    
                </div>
            </div>
        </div>
    </div>
  );
 }
}


