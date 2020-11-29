import React, { Component } from "react";
import '../css/register.css';
import '../css/addPatient.css';

export default class UpdateBed extends Component {
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
    room_no:10,
    all_patients:[],
    end_date:'',
    p_id:'',
    updated_gdata:{},
    filtered_gdata:[],
    filtered_patients:[]
  }

  componentDidMount(props){
//    console.log(this.props.hospital_data)
    // console.log(this.props.b_id)
    // console.log(this.props.beds.length)
    let allpatients = []
    const handleResponse2 = ({ target }) => {
      console.log(target.responseText)
      let obj = JSON.parse(JSON.parse(target.responseText))
      console.log(obj['patients'])
      allpatients.push(obj['patients'])
      console.log(allpatients)
      if(allpatients[0].length===0)
        {
            alert('Records must be created first before deletion')
            this.props.toggle1();
        }
      else{
       
        this.setState({
            all_patients:allpatients,
            
          })    
            
      }
        
    }
    const handleEvent2=(event)=> {
    if(event.type==='progress')
     { alert(`${event.type}: ${event.loaded} %`)}
     else{
      alert(`${event.type}: ${event.loaded}`)
     }
    }

    const xhr2 = new XMLHttpRequest()
    const data2 = new FormData();

    if(this.props.hospital_data)
  {  
          data2.append('b_id',this.props.hospital_data['b_id'])
          // data2.append('d_id','5fc104a5310ee1881d26cbda')
          data2.append('flag',0)
          xhr2.addEventListener('load', handleResponse2)
          xhr2.addEventListener('error', handleEvent2);
          xhr2.open('POST', 'https://dbs-project.herokuapp.com/listpatients')
          xhr2.send(data2)
  }
  else{
    alert('Please register a doctor, add patients, and then click this button.')
  }


  const handleResponse = ({ target }) => {
    // console.log(target.responseText)
    if(JSON.parse(JSON.parse(target.responseText))['success']===true)
   { 
    //console.log(target.responseText)
     this.setState({
     updated_gdata:JSON.parse(JSON.parse(target.responseText))
       })
     console.log(this.state.updated_gdata)
     if(this.state.updated_gdata['data'])
     {
        this.state.updated_gdata['data'].map((item,index)=>{
      
            if(item['b_id']===this.props.b_id)
            {
                this.setState({
                    filtered_gdata:item['beds']
                })
            }
        })
        // console.log(typeof(this.state.filtered_gdata))
        // this.state.filtered_gdata.map((item,idx)=>{
        //   console.log(item['active'])
        // })
        let filtered_patients = [];
        let filtered_gdata = this.state.filtered_gdata;
        // filtered_gdata.map((item,idx)=>{
        //   console.log(item['active'])
        // })
        setTimeout(function()
        {
               allpatients.map((item,index)=>{
                  item.map((items,idx)=>{
                    filtered_gdata.map((article,ix)=>{
                        if(article['p_id']===items['p_id'] && article['active']===true)
                          {
                            filtered_patients.push(items)
                          }
                  })
              })
            })
            this.setState({
              filtered_patients:filtered_patients,
              
          })
          console.log(this.state.filtered_patients)
          if(this.state.filtered_patients.length==0)
          {
            alert('there are no records to delete')
            this.props.toggle1()
          }
          else{
            this.setState({
              p_id:filtered_patients[0]['p_id']
            })
          }
        }.bind(this),1500)

     }
   }
   else{
    alert(target.responseText)
    this.props.toggle1();
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
    xhr.addEventListener('load', handleResponse)
    xhr.addEventListener('error', handleEvent);
    xhr.open('POST', 'https://dbs-project.herokuapp.com/getdata')
    xhr.send() 

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



handleSubmit =(e)=>{
  e.preventDefault();
const handleResponse = ({ target }) => {
    console.log(target.responseText)
    if(JSON.parse(target.responseText)['success']===true)
   { 
    //    console.log(target.responseText)
    alert(target.responseText)
    this.props.toggle1(e);
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
    data.append('flag',1)
    console.log(this.state)
    console.log(this.props.b_id)
    data.append('end_date',this.state.end_date)
    data.append('b_id',this.props.b_id)
    data.append('p_id',this.state.p_id)
    xhr.addEventListener('load', handleResponse)
    xhr.addEventListener('error', handleEvent);
    xhr.open('POST', 'https://dbs-project.herokuapp.com/updatebed')
    xhr.send(data) 
}

render() {
  return (
     <div className="modal_content_register_doctor">
     <span className="close_register_doctor" onClick={this.handleClick} id="register" >&times; </span>
     <div className="register-doctor-container">
            <div className="form-register-doctor">
                   <div>
                   <h2>Welcome!</h2>
                    
                    <label for="role" className="role-label-register-doctor">To Remove a patient record, Please fill out this form</label>
                    <br />
                    {    
                          <div className='super-branch-patient'>
                                  
                                        <label for="end_date" className="label-beds-1-patient" style={{position:'relative',top:'20px',right:'80px'}}>End date:</label><br />
                                        <input type="date" name="end_date"  id="end_date" className="beds-register-patient" 
                                        value={this.state.end_date}  
                                        onChange = {this.handleChange}
                                            style={{width:'12rem',position:'relative',right:'10px'}}
                                        />
                                        <label for="p_id" className="label-hname-1-patient" >Patient Name:</label><br />
                                       
                                        <select id="p_id" name="p_id" className="beds-register-patient-1" onChange={this.handleChange}>
                                            {
                                                this.state.filtered_patients ? (
                                                 this.state.filtered_patients.map((item,index)=>{
                                                return (
                                                    
                                                      <option value={item['p_id']} id={item['name']}>{item['name']}</option>
                                              )})    
                                                  ):(
                                                
                                                  null 
                                                )
                                                
                                          }
                                        </select>                 
                                       
                                        <button onClick={this.handleSubmit} className="submit-register-patient" >
                                            Update beds
                                        </button>
                            </div>              
                    }
                    
                </div>
            </div>
        </div>
    </div>
  );
 }
}


