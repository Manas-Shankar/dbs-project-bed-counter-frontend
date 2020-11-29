import React,{Component} from 'react';
import '../css/branchLogin.css';
import AppBarLogin from '../AppbarLogin';
import RegisterDoctor from '../Layers/RegisterDoctor';
import AddPatient from '../Layers/AddPatient';
import UpdateBed from '../Layers/UpdateBed';

let obj_doctor = {}

export default class BranchLogin extends Component {

    constructor(props)
    {   super(props)
        this.state = {
            mail:'',
            password:'',
            role:0,
            home:null,
            show_doctor_view:false,
            show_patient_view:false,
            show_update_view:false,
            login_data:{},
            table_data:{},
            doctor_data:null,
            patient_data:null,
            all_patients:[],
            history_data:{}
        }
    }

    componentDidMount(props){
            console.log(this.props.location);
        if(this.props.location.login_data)    
      {
            this.setState({
              login_data:this.props.location.login_data
            })
          
            const handleResponse1 = ({ target }) => {
              this.setState({
                  table_data:JSON.parse(JSON.parse(target.responseText))
              })
              console.log(this.state.table_data['data'])
            }
          const handleEvent1=(event)=> {
            if(event.type==='progress')
             { alert(`${event.type}: ${event.loaded} %`)}
             else{
              alert(`${event.type}: ${event.loaded}`)
             }
            }

          const xhr1 = new XMLHttpRequest()
          xhr1.addEventListener('load', handleResponse1)
          xhr1.addEventListener('error', handleEvent1);
          xhr1.open('POST', 'https://dbs-project.herokuapp.com/getdata')
          xhr1.send()

          // DOCTOR DATA 
          const data = new FormData()
          const handleResponse = ({ target }) => {
            obj_doctor = JSON.parse(JSON.parse(target.responseText));
            this.setState({
                doctor_data:JSON.parse(JSON.parse(target.responseText))
            })
            console.log(obj_doctor)
          }

              const handleEvent=(event)=> {
          if(event.type==='progress')
           { alert(`${event.type}: ${event.loaded} %`)}
           else{
            alert(`${event.type}: ${event.loaded}`)
           }
          }
        const xhr = new XMLHttpRequest()
        data.append('b_id',this.props.location.login_data['b_id'])
        // data.append('b_id','5fb4d6f7731517e5dc6dd3ac')
        xhr.addEventListener('load', handleResponse)
        xhr.addEventListener('error', handleEvent);
        xhr.open('POST', 'https://dbs-project.herokuapp.com/getdoctors')
        xhr.send(data)

        window.history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
        window.history.pushState(null, null, document.URL);
        console.log(window.history);
         });

        }
        else{
          //null
          window.history.pushState(null, null, document.URL);
          window.addEventListener('popstate', function () {
          window.history.pushState(null, null, document.URL);
         console.log(window.history);
         });
         window.addEventListener('load', (event) => {
           window.location = '/'
         });
        }
    }


    needUpdate= ()=>{
      if(this.props.location.login_data)    
      {
     console.log(this.props.location);
     this.setState({
       login_data:this.props.location.login_data
     })
    
     const handleResponse1 = ({ target }) => {
       this.setState({
           table_data:JSON.parse(JSON.parse(target.responseText))
       })
       // console.log(this.state.table_data['data'])
     }
    const handleEvent1=(event)=> {
     if(event.type==='progress')
      { alert(`${event.type}: ${event.loaded} %`)}
      else{
       alert(`${event.type}: ${event.loaded}`)
      }
     }
    
    const xhr1 = new XMLHttpRequest()
    xhr1.addEventListener('load', handleResponse1)
    xhr1.addEventListener('error', handleEvent1);
    xhr1.open('POST', 'https://dbs-project.herokuapp.com/getdata')
    xhr1.send()
    
    // DOCTOR DATA 
    const data = new FormData()
    const handleResponse = ({ target }) => {
     obj_doctor = JSON.parse(JSON.parse(target.responseText));
     this.setState({
         doctor_data:JSON.parse(JSON.parse(target.responseText))
      })
      console.log(obj_doctor)
    }

        const handleEvent=(event)=> {
    if(event.type==='progress')
     { alert(`${event.type}: ${event.loaded} %`)}
     else{
      alert(`${event.type}: ${event.loaded}`)
     }
    }
  const xhr = new XMLHttpRequest()
  data.append('b_id',this.props.location.login_data['b_id'])
  // data.append('b_id','5fb4d6f7731517e5dc6dd3ac')
  xhr.addEventListener('load', handleResponse)
  xhr.addEventListener('error', handleEvent);
  xhr.open('POST', 'https://dbs-project.herokuapp.com/getdoctors')
  xhr.send(data)
    
    }
    else{
      window.history.pushState(null, null, document.URL);
      window.addEventListener('popstate', function () {
      window.history.pushState(null, null, document.URL);
     console.log(window.history);
     });
     window.addEventListener('load', (event) => {
       window.location = '/'
     });
    }
    this.list_patients();
    this.get_history();
  }


  get_history =()=>{
    const data4 = new FormData()
          const handleResponse4 = ({ target }) => {
            console.log(target.responseText)
            if(JSON.parse(JSON.parse(target.responseText))['success']===true)
            { 
              this.setState({
                history_data:JSON.parse(JSON.parse(target.responseText))
              })
              console.log(this.state.history_data)
            }
            else{
             alert(target.responseText)
            }
          }

              const handleEvent4=(event)=> {
          if(event.type==='progress')
           { alert(`${event.type}: ${event.loaded} %`)}
           else{
            alert(`${event.type}: ${event.loaded}`)
           }
          }

        const xhr4 = new XMLHttpRequest()
        data4.append('b_id',this.props.location.login_data['b_id'])
        console.log(this.props.location.login_data['b_id'])
        // data.append('b_id','5fb4d6f7731517e5dc6dd3ac')
        xhr4.addEventListener('load', handleResponse4)
        xhr4.addEventListener('error', handleEvent4);
        xhr4.open('POST', 'https://dbs-project.herokuapp.com/gethistory')
        xhr4.send(data4) 
  }


    changeDoctorView = (e)=>{ 
        if (this.state.show_doctor_view === true) {
            this.setState({ show_doctor_view: false })
        } else {
            this.setState({ show_doctor_view: true })
        }
    }

    changePatientView = (e)=>{  
      if (this.state.show_patient_view === true) {
          this.setState({ show_patient_view: false })
      } else {
          this.setState({ show_patient_view: true })
      }
    }

    changeUpdateView = (e)=>{
      if (this.state.show_update_view === true) {
          this.setState({ show_update_view: false })
      } else {
          this.setState({ show_update_view: true })
      }
    }
  


    handleSubmit =(e)=>{
      const handleResponse = ({ target }) => {
        console.log(target.responseText)
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

    redirectHome =()=>{
      this.setState({
        home:'/'
      });
    }
  
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
      console.log(this.state)
    }


    list_patients =()=>{
      let allpatients = []
      const handleResponse2 = ({ target }) => {
        console.log(target.responseText)
        let obj = JSON.parse(JSON.parse(target.responseText))
        console.log(obj['patients'])
        allpatients.push(obj['patients'])
        console.log(allpatients)
        this.setState({
            all_patients:allpatients
          })  
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

      if(this.props.location.login_data)
    {  
            data2.append('b_id',this.state.login_data['b_id'])
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
  }
  
    viewPass = (e)=>{
      if(e.target.id==="eye")
      {
        var pass = document.getElementById("password");
        console.log(pass)
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
    let k=0;
    let l=0;
    let i=0;
    let j=0;
    return (
      <div>
      <AppBarLogin 
        h_name={this.state.login_data['h_name']}
        b_name={this.state.login_data['b_name']}
        beds = {this.state.login_data ? this.state.login_data['beds']:null}
      />
       <div className="modal_content_branch">
       <div className="branch-container">

              <div>
                    <div className="head-section">
                        <h1 className="header-branch">Welcome !</h1>
                        <p className='header-para'>Here, the hospital administration can view and register doctors, patients, and update bed status as well.</p>
                         <ul className='header-details-branch'>
                             <li className='li-elem'>First, doctors need to be registered below. ADMINS MUST CLICK THE REFRESH BUTTON AFTER FIRST DOCTOR REGISTRATION
                                to load relevant data, as well as to gain access to the patient and update bed forms. The update bed form requires at least 2 seconds to update the list of patients.
                              </li>
                             <li className='li-elem'>Directly below, the current number of beds available is displayed in tabular form. Below that, there are tables for registered doctors,
                                patients, as well as the history of bed occupancy.
                             </li>
                             <li className='li-elem'>Finally, the last table lists the beds availability in other registered branches of the same hospital.</li>
                         </ul>
                    </div>
            </div>

          <div className='button-container'>
                <div className='register-doctor'>
                    <span onClick={this.changeDoctorView}>Register Doctors</span>
                    {
                        this.state.show_doctor_view===true ? 
                        (<RegisterDoctor 
                        toggle1={this.changeDoctorView}
                        text='Register'
                        hospital_data={this.state.login_data}                                                                
                         />) : 
                        (null)
                    }
                </div>
                <div className='register-doctor'>
                    <span onClick={this.changePatientView}>Add a new Patient Record</span>
                    {
                        this.state.show_patient_view===true ? 
                        (<AddPatient 
                        toggle1={this.changePatientView}  
                        doctor_data={this.state.doctor_data} 
                        b_id={this.state.login_data['b_id']}
                        beds = {this.state.login_data['beds']}                                                             
                         />) : 
                        (null)
                    }
                </div>
                <div className='register-doctor'>
                    <span onClick={this.changeUpdateView}>Remove a patient record</span>
                    {
                        this.state.show_update_view===true ? 
                        (<UpdateBed 
                        toggle1={this.changeUpdateView}
                        text='Register'
                        hospital_data={this.state.login_data} 
                        doctor_data={this.state.doctor_data} 
                        b_id={this.state.login_data['b_id']}
                        beds = {this.state.login_data['beds']}                                                               
                         />) : 
                        (null)
                    }
                </div>
          </div>

          <div className='table-section-login' style={{marginBottom:'0px'}}>
          <span className='definition'>Table of current bed status :</span>
                    {
                        Object.keys(this.state.table_data).length===0?
                        (
                            <div className='loader-login'>
                                Loading current hospital data ....
                            </div>
                        ):
                        (
                            <div>
                                <table className='info-table-login'>
                                    <thead className='thead-login'>
                                        <th>Serial No</th>
                                        <th>Branch Name</th>
                                        <th>Address</th>
                                        <th>Hospital Name</th>
                                        <th>No of beds</th>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.table_data['data'].map((item,index)=>{
                                                if(item['h_name'] === this.state.login_data['h_name'] && item['b_name'] === this.state.login_data['b_name'])
                                             { i=i+1;
                                               return ( <tr id={i} key={i}>
                                                        <td key={i}>{i}</td>
                                                        <td key={item['b_name']}>{item['b_name']}</td>
                                                        <td key={item['street_name']}>{item['street_name']}, {item['pincode']}</td>
                                                        <td key={item['h_name']}>{item['h_name']}</td>
                                                        <td key={item['nbeds']}>{item['nbeds']}</td>
                                                      </tr>
                                             )
                                             }
                                             else{
                                               return null
                                             }
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
        </div>


        <div className='table-section-login'>
            <div>
               <button onClick={this.needUpdate} className='refresh-button'>Refresh</button>
             </div>
             <span className='definition'>Table of registered doctors :</span>
                    {
                        this.state.doctor_data ?
                        (
                            <div>
                                <table className='info-table-login'>
                                    <thead className='thead-login'>
                                        <th>Serial No</th>
                                        <th>Name</th>
                                        <th>Specialization</th>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.doctor_data['data'].map((item,index)=>{
                                                
                                                j=j+1;
                                               return ( <tr id={j} key={j}>
                                                        <td key={j}>{j}</td>
                                                        <td key={item['d_name']}>{'Dr.'+ item['d_name']}</td>
                                                        <td key={item['d_specilization']}>{item['d_specilization']}</td>
                                                      </tr>
                                             )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        ):
                        (
                            <div className='loader-login'>
                                Loading doctor data...
                            </div>
                        )
                    }
        </div>

        <div className='table-section-login'>
        <span className='definition'>Table of all patients, including currently admitted and previously discharged :</span>
                    {
                        this.state.all_patients ?
                        (
                            <div>
                                <table className='info-table-login'>
                                    <thead className='thead-login'>
                                        <th>Serial No</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.all_patients.map((item,index)=>{  
                                              return item.map((items,index)=>{
                                                  k=k+1;
                                                 return ( <tr id={k} key={k}>
                                                        <td key={k}>{k}</td>
                                                        <td key={items['name']}>{items['name']}</td>
                                                        <td key={items['mail']}>{items['mail']}</td>
                                                      </tr>
                                                )}
                                              )
                                            }) 
                                        }
                                    </tbody>
                                </table>
                            </div>
                        ):
                        (
                            <div className='loader-login'>
                                No Patients have been registered yet
                            </div>
                        )
                    }
        </div>
        <div className='table-section-login'>
            <span className='definition'>Table of occupation history:</span>
                    {
                        this.state.history_data['history'] ?
                        (
                            <div>
                                <table className='info-table-login'>
                                    <thead className='thead-login'>
                                        <th>Serial No.</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Room No.</th>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.history_data['history'].map((item,index)=>{  
                                                  l=l+1;
                                                 return ( <tr id={l} key={l}>
                                                        <td key={l}>{l}</td>
                                                        <td key={item['start_date']}>{item['start_date']}</td>
                                                        <td key={item['end_date']}>{item['end_date']}</td>
                                                        <td key={item['room_no']}>{item['room_no']}</td>
                                                        </tr>
                                                        )
                                            }) 
                                        }
                                    </tbody>
                                </table>
                            </div>
                        ):
                        (
                            <div className='loader-login'>
                                There is no history of occupation yet.
                            </div>
                        )
                    }
        </div>


       <div className='table-section-login'>
       <span className='definition'>Table of bed status in other branches of the same hospital:</span>
                    {
                        Object.keys(this.state.table_data).length===0?
                        (
                            <div className='loader-login'>
                                Loading Hospital data ....
                            </div>
                        ):
                        (
                            <div>
                                <table className='info-table-login'>
                                    <thead className='thead-login'>
                                        <th>Serial No</th>
                                        <th>Branch Name</th>
                                        <th>Address</th>
                                        <th>Hospital Name</th>
                                        <th>No of beds</th>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.table_data['data'].map((item,index)=>{
                                                if(item['h_name'] === this.state.login_data['h_name'] && item['b_name'] !== this.state.login_data['b_name'])
                                             { i=i+1;
                                               return ( <tr id={i} key={i}>
                                                        <td key={i}>{i}</td>
                                                        <td key={item['b_name']}>{item['b_name']}</td>
                                                        <td key={item['street_name']}>{item['street_name']}, {item['pincode']}</td>
                                                        <td key={item['h_name']}>{item['h_name']}</td>
                                                        <td key={item['nbeds']}>{item['nbeds']}</td>
                                                      </tr>
                                             )
                                             }
                                             else{
                                               return null
                                             }
                                            })
                                        }
                                    </tbody>
                                </table>
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


