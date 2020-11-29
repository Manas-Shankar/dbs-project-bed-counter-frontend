import React, { Component } from "react";
import '../css/register.css';
import '../css/addPatient.css';

export default class AddPatient extends Component {

  state={
    mail:'',
    b_id:'',
    name:'',
    hospital_data:{},
    hospital_data_updated:{},
    b_data:{},
    d_id:'',
    moveAhead:false,
    start_date:'',
    room_no:10
  }

  componentDidMount(props){
    console.log(this.props.doctor_data)
    console.log(this.props.b_id)
    console.log(this.props.beds.length)
    if(this.props.doctor_data['data'].length!==0)
    { this.setState({
        d_id:this.props.doctor_data['data'][0]['d_id']
      })
    }
    else{
      alert('Please register a doctor first.')
      this.handleClick()
    }
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

  next =()=>{
    this.setState({
      moveAhead:true
    })
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

  addPatient =(e)=>{
      e.preventDefault();
      console.log(this.state)
    const handleResponse = ({ target }) => {
        if(JSON.parse(target.responseText)['success']===true)
       { console.log(target.responseText)
        alert('Patient Record added !');
        const xhr1 = new XMLHttpRequest()
        const data1 = new FormData()
        data1.append('flag',0)
        data1.append('b_id',this.props.b_id)
        xhr1.addEventListener('load', handleResponse1)
        xhr1.addEventListener('error', handleEvent1);
        xhr1.open('POST', 'https://dbs-project.herokuapp.com/listpatients')
        xhr1.send(data1);
      
       }
       else{
        alert(target.responseText)
       }
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
        data.append('mail',this.state.mail)
        data.append('d_id',this.state.d_id)
        data.append('b_id',this.props.b_id)
        data.append('name',this.state.name)
        xhr.addEventListener('load', handleResponse)
        xhr.addEventListener('error', handleEvent);
        xhr.open('POST', 'https://dbs-project.herokuapp.com/addpatient')
        xhr.send(data)

        const handleResponse1 = ({ target }) => {
          console.log(target.responseText)
          this.setState({
              hospital_data_updated:JSON.parse(JSON.parse(target.responseText))
          })
          console.log(this.state.hospital_data_updated)
        }
      const handleEvent1=(event)=> {
        if(event.type==='progress')
         { alert(`${event.type}: ${event.loaded} %`)}
         else{
          alert(`${event.type}: ${event.loaded}`)
         }
        }  
      
}

handleSubmit =(e)=>{
  e.preventDefault();
  console.log(this.state)
const handleResponse = ({ target }) => {
    if(JSON.parse(target.responseText)['success']===true)
   { console.log(target.responseText)
    alert(target.responseText)
    this.props.toggle1(e);
   }
   else{
    alert(target.responseText)
    this.props.toggle1(e);
   }
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
    data.append('flag',0)
    data.append('start_date',this.state.start_date)
    data.append('b_id',this.props.b_id)
    data.append('p_id',this.state.hospital_data_updated['patients'][this.state.hospital_data_updated['patients'].length-1]['p_id'])
    data.append('room_no',this.state.room_no)
    xhr.addEventListener('load', handleResponse)
    xhr.addEventListener('error', handleEvent);
    xhr.open('POST', 'https://dbs-project.herokuapp.com/updatebed')
    xhr.send(data)

  //   const handleResponse1 = ({ target }) => {
  //     console.log(target.responseText)
  //     this.setState({
  //         hospital_data_updated:JSON.parse(JSON.parse(target.responseText))
  //     })
  //     console.log(this.state.hospital_data_updated)
  //   }
  // const handleEvent1=(event)=> {
  //   if(event.type==='progress')
  //    { alert(`${event.type}: ${event.loaded} %`)}
  //    else{
  //     alert(`${event.type}: ${event.loaded}`)
  //    }
  //   }  
  
}

render() {
  return (
     <div className="modal_content_register_doctor">
     { this.state.moveAhead ===false ?
        (<span className="close_register_doctor" onClick={this.handleClick} id="register" >&times; </span>):
        (
          //nothing
          <span></span>
        )
     }
     <div className="register-doctor-container">
            <div className="form-register-doctor">
                   <div>
                   <h2>Welcome!</h2>
                    
                    <label for="role" className="role-label-register-doctor">To Add a patient record, Please fill out this form</label>
                    <br />
                    {    this.state.moveAhead ===false ? 
                          (  <div className='super-branch-patient'>
                                  <label for="mail" className="label-register-3-patient" >Email ID</label><br />
                                  <input type="email" name="mail"  id="mail" className="email-register-2-patient" 
                                  value={this.state.mail}  
                                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                  onChange = {this.handleChange}/>
                                        <label for="name" className="label-beds-1-patient" >Name:</label><br />
                                        <input type="text" name="name"  id="name" className="beds-register-patient" 
                                        value={this.state.name}  
                                        onChange = {this.handleChange}/>
                                        <label for="d_id" className="label-hname-1-patient">Assigned Doctor:</label><br />
                                        {/* <input type="text" name="h_name"  id="hname" className="beds-register-patient-1"  
                                        readonly="readOnly"
                                        /> */}
                                        <select id="d_id" name="d_id" className="beds-register-patient-1" onChange={this.handleChange}  style={{position:'relative',left:'90px'}}>
                                            {
                                                this.props.doctor_data['data'].map((item,index)=>{
                                                return (<option value={item['d_id']} id={item['d_name']}>{item['d_name']}</option>)   
                                            })
                                        }
                                        </select>
                                    <input type="submit" value="Add Patient" className="submit-register-patient" id='register' onClick={this.addPatient} style={{marginRight:'30px'}}/>
                                    <button onClick={this.next} className="submit-register-patient" disabled={Object.keys(this.state.hospital_data_updated).length===0 ? 'disabled' : null}>
                                    Next
                                    </button>
                            </div>  ):
                            
                            (
                              <div className='super-branch-patient'>
                                  <label for="start_date" className="label-register-3-patient" >Admit Date:</label><br />
                                  <input type="date" name="start_date"  id="start_date" className="email-register-2-patient" 
                                  value={this.state.start_date}  
                                  onChange = {this.handleChange}/>
                                    <label for="room_no" className="label-beds-1-patient" >Room No:</label><br />
                                    <input type="number" name="room_no"  id="room_no" className="beds-register-patient" 
                                    value={this.state.room_no}  
                                    onChange = {this.handleChange}
                                     max={this.props.beds.length} 
                                     min='0'
                                    />
                                    <label for="p_name" className="label-hname-1-patient" style={{position:'relative',right:'80px'}}>Patient Name:</label><br />
                                    <input type="text" name="p_name"  id="pname" className="beds-register-patient-1"  
                                    readonly="readOnly"
                                    value={this.state.hospital_data_updated['patients'][this.state.hospital_data_updated['patients'].length-1]['name']}
                                    />
  
                                    <button onClick={this.handleSubmit} className="submit-register-patient" >
                                    Update beds
                                    </button>
                            </div> 
                            )    
                    }
                    
                </div>
            </div>
        </div>
    </div>
  );
 }
}


