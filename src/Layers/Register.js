import React, { Component } from "react";
import '../css/register.css'

export default class Register extends Component {

  state={
    mail:'',
    password:'',
    role:0,
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
    moveAhead:false
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

  addHospital =()=>{
         
           const handleResponse = ({ target }) => {
             // Do something useful here...
             console.log(target.responseText)
             alert(target.responseText)
             const xhr1 = new XMLHttpRequest()
             xhr1.addEventListener('load', handleResponse1)
            xhr1.addEventListener('error', handleEvent1);
            xhr1.open('POST', 'https://dbs-project.herokuapp.com/gethospitals')
            xhr1.send()
           }
         const handleEvent=(event)=> {
           if(event.type==='progress')
            { alert(`${event.type}: ${event.loaded} %`)}
            else{
             alert(`${event.type}: ${event.loaded}`)
            }
           }
           const xhr = new XMLHttpRequest()
             const data = new FormData()
             data.append('h_name',this.state.choice1)
             xhr.addEventListener('load', handleResponse)
             xhr.addEventListener('error', handleEvent);
             xhr.open('POST', 'https://dbs-project.herokuapp.com/addhospital')
             xhr.send(data)

            //get updated hospital list

             const handleResponse1 = ({ target }) => {
              this.setState({
                  hospital_data_updated:JSON.parse(JSON.parse(target.responseText))
              })
              console.log(this.state.hospital_data_updated['data'])
            }
          const handleEvent1=(event)=> {
            if(event.type==='progress')
             { alert(`${event.type}: ${event.loaded} %`)}
             else{
              alert(`${event.type}: ${event.loaded}`)
             }
            }      
  }



  movesAhead =(e)=>{
    
    let choice = this.state.choice;
    if(choice===0)
    { 
      var selected = document.getElementById( "choice0" );
      console.log(this.state.choice, selected.options[ selected.selectedIndex ].id )
      this.setState({
        h_name: selected.options[ selected.selectedIndex ].id,
        h_id: selected.options[ selected.selectedIndex ].value,
        moveAhead:true
      })
    }

    else if(choice===1)
    {
      let updated_data = this.state.hospital_data_updated['data']
      let last_item = updated_data[updated_data.length-1]
      console.log(last_item)
      this.setState({
        h_name: last_item['h_name'],
        h_id:last_item['h_id'],
        moveAhead:true
      })  
    }
    // this.setState({
    //   moveAhead:true
    // })
    console.log(this.state)
  }



  handleSubmit =(e)=>{
      e.preventDefault();
    const handleResponse = ({ target }) => {
      // alert(target.responseText)
      if(JSON.parse(target.responseText)['success']===true)
       { console.log(target.responseText)
        alert(target.responseText + '\nPlease log in to continue.')
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
      if(this.state.role===0)
      { 
  // const xhr1 = new XMLHttpRequest()
  // const data1 = new FormData()
  // data1.append('h_name',this.state.h_name)
  // xhr1.addEventListener('load', handleResponse1)
  // xhr1.addEventListener('error', handleEvent);
  // xhr1.open('POST', 'https://dbs-project.herokuapp.com/addhospital')
  // xhr1.send(data1)

        const xhr = new XMLHttpRequest()
        const data = new FormData()
        data.append('mail',this.state.mail)
        data.append('beds',this.state.beds)
        data.append('b_name',this.state.b_name)
        data.append('city',this.state.city)
        data.append('h_id',this.state.h_id)
        data.append('h_name',this.state.h_name)
        data.append('password',this.state.password)
        data.append('pincode',this.state.pincode)
        data.append('role',this.state.role)
        data.append('street_name',this.state.street_name)
        xhr.addEventListener('load', handleResponse)
        xhr.addEventListener('error', handleEvent);
        xhr.open('POST', 'https://dbs-project.herokuapp.com/register')
        xhr.send(data)
      }
}

render() {
  return (
     <div className="modal_content_register">
        <span className="close_register" onClick={this.handleClick} id="register" >&times; </span>
     <div className="register-container">
            <div className="form-register">
                   <div>
                   <h2>Welcome!</h2>
                    
                    <label for="role" className="role-label-register">To begin, Please fill out this form</label>
                    <br />
                    {    
                        ( this.state.moveAhead ===false ?
                          ( <div> 
                                <label for="choice" className="choice-label">You can either :</label>
                              <select id="choice" name="choice" className="choice-register" onChange={this.setChoice}>
                                <option value={0}>Create a new branch for existing hospital (Click below to see available options)</option>
                                <option value={1}>Add a new hospital to the database</option>
                              </select>
                              {
                                this.state.choice===0?
                                ( <div>
                                  <label for="choice0" className="choice-label-1" style={{position:'relative',top:'10px'}}>Select existing Hospital:</label>
                              <select id="choice0" name="choice0" className="choice0-register" onChange={this.handleChange} style={{position:'relative',top:'40px'}}>
                                {
                                  this.props.hospital_data['data'].map((item,index)=>{
                                   return (<option value={item['h_id']} id={item['h_name']}>{item['h_name']}</option>)
                                  })
                                }
                              </select>
                              <input type='submit' value='Next' className="next-register-1" onClick={this.movesAhead} />
                                  </div>
                                ):(
                                  <div>
                                  <label for="choice1" className="choice-label-2">Enter name of new Hospital entry:<br/>(Next button disabled until hospital is added)</label>
                                   <input type='text' id="choice1" name="choice1" className="choice1-register" onChange={this.handleChange} style={{position:'relative',top:'40px',right:'90px'}} required/>
                                   <input type='submit' value='Add' className="add-register" onClick={this.addHospital}/> 
                                   <input type='submit' value='Next' className="next-register" onClick={this.movesAhead} disabled={Object.keys(this.state.hospital_data_updated).length===0 ? 'disabled' : null}/>
                                </div>
                                )

                              }
                                
  
                          
                          </div>
                          ):
                          (
                            <div className='super-branch'>
                                    <label for="mail" className="label-register-3" >Email ID</label><br />
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
                                <label for="beds" className="label-beds-1" >No of beds:</label><br />
                                <input type="number" name="beds"  id="beds" className="beds-register" 
                                value={this.state.beds}  
                                onChange = {this.handleChange}/>
                                
                                <label for="hname" className="label-hname-1" >Hospital Name:</label><br />
                                <input type="text" name="h_name"  id="hname" className="beds-register" 
                                value={this.state.h_name}  
                                readonly="readOnly"
                                />
                                
                            </div>
                            <div className='branch-register-1'>
                            <label for="bname" className="label-bname-1" >Branch Name:</label><br />
                                <input type="text" name="b_name"  id="bname" className="beds1-register" 
                                value={this.state.b_name}  
                                onChange = {this.handleChange}/>
                                <label for="streetname" className="label-streetname-1" >Street Name:</label><br />
                                <input type="text" name="street_name"  id="streetname" className="beds1-register" 
                                value={this.state.street_name}  
                                onChange = {this.handleChange}/>
                            </div>
                            <div className='branch-register-2'>
                            <label for="city" className="label-city-1" >City:</label><br />
                                <input type="text" name="city"  id="city" className="beds2-register" 
                                value={this.state.city}  
                                onChange = {this.handleChange}/>
                                <label for="pincode" className="label-pincode-1" >Pincode:</label><br />
                                <input type="text" name="pincode"  id="pincode" className="beds3-register" 
                                value={this.state.pincode}  
                                onChange = {this.handleChange}/>
                            </div>
                            <input type="submit" value="Register" className="submit-register" id='register'onClick={this.handleSubmit}/>
                            </div> 
                          )
                        )
                    }
                    
                </div>
            </div>
        </div>
    </div>
  );
 }
}


