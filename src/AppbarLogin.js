import React, { Component } from 'react'
import './css/AppbarLogin.css';


export class AppBarLogin extends Component {

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
          home:'/'
        });
      }

       componentDidMount(props){
        console.log(this.props.beds)
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
                    <span className='intro-data'>{this.props.h_name} , {this.props.b_name}</span>
                    <span className='intro-data-2'>Total Beds : { this.props.beds ? this.props.beds.length : 0} </span>
                </div>
                </div>
            </div>
        )
    }
}

export default AppBarLogin
