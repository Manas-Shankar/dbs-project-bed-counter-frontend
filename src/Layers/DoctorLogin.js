import React,{Component} from 'react';
import '../css/doctorLogin.css';
import AppBarLoginDoctor from '../AppBarLoginDoctor';


export default class DoctorLogin extends Component {

    constructor(props)
    {   super(props)
        this.state = {
            mail:'',
            password:'',
            role:0,
            home:null,
            patients:[],
            doctors_data:null
        }
    }

    componentDidMount(props){
        console.log(this.props.location);
      if(this.props.location.login_doctor_data)
      {
        let patients = []
        const handleResponse2 = ({ target }) => {
          console.log(target.responseText)
          let obj = JSON.parse(JSON.parse(target.responseText))
          console.log(obj['patients'])
          patients.push(obj['patients'])
          
          this.setState({
              patients:patients
            })
            console.log(this.state.patients)  
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
              data2.append('d_id',this.props.location.login_doctor_data['d_id'])
              console.log(this.props.location.login_doctor_data['d_id'])
              // data2.append('d_id','5fc104a5310ee1881d26cbda')
              data2.append('flag',1)
              xhr2.addEventListener('load', handleResponse2)
              xhr2.addEventListener('error', handleEvent2);
              xhr2.open('POST', 'https://dbs-project.herokuapp.com/listpatients')
              xhr2.send(data2)




         // DOCTOR DATA 
    const data = new FormData()
    const handleResponse = ({ target }) => {
     let obj_doctor = JSON.parse(JSON.parse(target.responseText));
     this.setState({
         doctors_data:JSON.parse(JSON.parse(target.responseText))
      })
      console.log(this.state.doctors_data)
    }
        const handleEvent=(event)=> {
    if(event.type==='progress')
     { alert(`${event.type}: ${event.loaded} %`)}
     else{
      alert(`${event.type}: ${event.loaded}`)
     }
    }
  const xhr = new XMLHttpRequest()
  data.append('b_id',this.props.location.login_doctor_data['b_id'])
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

    redirectHome =()=>{
      this.setState({
        home:'/'
      });
    }
  
  render() {
    let k=0;
    let j=0;
    return (
      <div>
          <AppBarLoginDoctor 
              doctor_data={this.props.location.login_doctor_data}
              />

       <div className="modal_content_branch">
       <div className="branch-container">
              <div className='table-section-login'>
                <span className='definition'>Table of assigned patients :</span>
                    {
                        this.state.patients[0] ?
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
                                            this.state.patients.map((item,index)=>{  
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
                                No Patients have been registered yet for this doctor
                            </div>
                        )
                    }
                </div>

                <div className='table-section-login'>
             <span className='definition'>Table of all registered doctors at this hospital and branch:</span>
                    {
                        this.state.doctors_data ?
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
                                            this.state.doctors_data['data'].map((item,index)=>{
                                                
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
                                No other registered doctors...
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

