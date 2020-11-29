import React, { Component } from 'react'
import './css/AppbarLogin.css';


export class AppBarLoginDoctor extends Component {

    constructor(props)
    {
        super(props)
        this.state={
            hospital_data:{},
            home:null
        }
    }

    redirectHome =()=>{
        this.setState({
          home:'/',
          doctor_data:null
        });
      }

       componentDidMount(props){
        console.log(this.props.doctor_data)
        this.setState({
            doctor_data:this.props.doctor_data
        })
        }

    render() {
        return (
            <div className="wrap" >
                <div className="app-bar-login-container" >
                <img src='hospital-bed.svg' className='bed-img-login' alt='hospital-bed'/>
                <div className='navigation-login'>
                    <button onClick={this.redirectHome} className='buttonHome'>
                      Go Back   
                    </button>
                    {
                      this.state.home ? 
                       (
                         window.location.replace('/')
                       ):
                       (
                         null
                       )
                    }
                </div>
                <div className='navigation-login-2'>
                    <span className='intro-data' style={{position:'relative',left:'150px'}}>Dr. { this.state.doctor_data ? this.state.doctor_data['d_name'] : ''} , { this.state.doctor_data ?  this.state.doctor_data['h_name']: ' ' }</span>
                    <span className='intro-data-2' style={{position:'relative',right:'120px'}}> { this.state.doctor_data ? this.state.doctor_data['specilization']: ''} </span>
                </div>
                </div>
            </div>
        )
    }
}

export default AppBarLoginDoctor
