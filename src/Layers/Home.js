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
