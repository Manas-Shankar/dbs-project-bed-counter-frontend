import React,{Component} from 'react'
import '../css/home.css';
import { DateTime } from "luxon";
import Appbar from '../Appbar';


export class Home extends Component 
{
    constructor(props)
    {   super(props)
        this.state = {
            table_data : {},
            hospital_data:{}
        }
    }

    componentDidMount()
    {   
        const handleResponse = ({ target }) => {
            this.setState({
                table_data:JSON.parse(JSON.parse(target.responseText))
            })
            // console.log(this.state.table_data['data'])
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


    needUpdate =()=>{
        const handleResponse = ({ target }) => {
            this.setState({
                table_data:JSON.parse(JSON.parse(target.responseText))
            })
            console.log(this.state.table_data['data'])
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

    setName = (e) => {
       
    }

    render() {

        return (
            <div>
            <div>
          <Appbar/>
            </div>
            <div className="wrap" style={{ height: "70vh", flexDirection: "column"}} >
                <div>
                    <div className='date'>
                        {DateTime.fromJSDate(new Date()).toLocaleString(DateTime.DATE_HUGE)}
                    </div>
                    <div className="head-section">
                        <h1 className="header">COVID-19 Bed Tracker</h1>
                        <p className='header-para'>This website was made to better serve the needs of COVID afflicted individuals,as well as hospitals and doctors,
                         by helping them keep track of, and quickly locate hospitals with available beds.</p>
                         <ul className='header-details'>
                             <li>Patients can view the table below, which lists the most recent state of bed availability in various registered hospitals.</li>
                             <li>Hospitals can register themselves above with their name, branch name and address, and declare occupancy status, availability status,as well as the list of patients and doctors</li>
                             <li>Doctors can login with their associated hospital email ID and password, and view their assigned patients.</li>
                         </ul>
                    </div>
                </div>

                <div className='table-section'>
                <div>
                    <button onClick={this.needUpdate} className='refresh-button-home'>Refresh</button>
                  </div>
                    {
                        Object.keys(this.state.table_data).length===0?
                        (
                            <div className='loader'>
                                Loading Hospital data ....
                            </div>
                        ):
                        (
                            <div>
                                <table className='info-table'>
                                    <thead className='thead'>
                                        <th>Serial No</th>
                                        <th>Branch Name</th>
                                        <th>Address</th>
                                        <th>Hospital Name</th>
                                        <th>No of beds</th>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.table_data['data'].map((item,index)=>{
                                              return (  <tr id={index} key={index}>
                                                        <td key={index}>{index+1}</td>
                                                        <td key={item['b_name']}>{item['b_name']}</td>
                                                        <td key={item['street_name']}>{item['street_name']}, {item['pincode']}</td>
                                                        <td key={item['h_name']}>{item['h_name']}</td>
                                                        <td key={item['nbeds']}>{item['nbeds']}</td>
                                                    
                                                </tr>)
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                </div>
               <footer>
               {/* <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
               </footer>
            </div>
            </div>
        )
            
    }
        
    }

export default Home









// needUpdate= ()=>{
//     if(this.props.location.login_data)    
//     {
//    console.log(this.props.location);
//    this.setState({
//      login_data:this.props.location.login_data
//    })
  
//    const handleResponse1 = ({ target }) => {
//      this.setState({
//          table_data:JSON.parse(JSON.parse(target.responseText))
//      })
//      // console.log(this.state.table_data['data'])
//    }
//   const handleEvent1=(event)=> {
//    if(event.type==='progress')
//     { alert(`${event.type}: ${event.loaded} %`)}
//     else{
//      alert(`${event.type}: ${event.loaded}`)
//     }
//    }
  
//   const xhr1 = new XMLHttpRequest()
//   xhr1.addEventListener('load', handleResponse1)
//   xhr1.addEventListener('error', handleEvent1);
//   xhr1.open('POST', 'https://dbs-project.herokuapp.com/getdata')
//   xhr1.send()
  
//   // DOCTOR DATA 
//   const data = new FormData()
//   const handleResponse = ({ target }) => {
//    obj_doctor = JSON.parse(JSON.parse(target.responseText));
//    this.setState({
//        doctor_data:JSON.parse(JSON.parse(target.responseText))
//     })
//     console.log(obj_doctor)
//   }

//       const handleEvent=(event)=> {
//   if(event.type==='progress')
//    { alert(`${event.type}: ${event.loaded} %`)}
//    else{
//     alert(`${event.type}: ${event.loaded}`)
//    }
//   }
// const xhr = new XMLHttpRequest()
// data.append('b_id',this.props.location.login_data['b_id'])
// // data.append('b_id','5fb4d6f7731517e5dc6dd3ac')
// xhr.addEventListener('load', handleResponse)
// xhr.addEventListener('error', handleEvent);
// xhr.open('POST', 'https://dbs-project.herokuapp.com/getdoctors')
// xhr.send(data)
  
//   }
//   else{
//     window.history.pushState(null, null, document.URL);
//     window.addEventListener('popstate', function () {
//     window.history.pushState(null, null, document.URL);
//    console.log(window.history);
//    });
//    window.addEventListener('load', (event) => {
//      window.location = '/'
//    });
//   }
//   this.list_patients();
//   this.get_history();
// }

