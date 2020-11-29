import React, { Component } from 'react'
import './css/Appbar.css';
import Login from './Layers/Login';
import Register from './Layers/Register';


export class AppBar extends Component {

    constructor(props)
    {
        super(props)
        this.state={
            show_login_view:false,
            show_register_view:false,
            hospital_data:{},
        }
    }


    componentDidMount(){
        const handleResponse1 = ({ target }) => {
            // Do something useful here...
            // console.log(target.responseText)
            this.setState({
                hospital_data:JSON.parse(JSON.parse(target.responseText))
            })
            console.log(this.state.hospital_data['data'])
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
        xhr1.open('POST', 'https://dbs-project.herokuapp.com/gethospitals')
        xhr1.send()
    }

   

    // changeLoginView = ()=>{
    //     if (this.state.show_login_view === true && this.state.show_register_view===true) {
    //         this.setState({ show_login_view: false })
    //     } else {
    //         this.setState({ show_login_view: true })
    //     }
    // }
    // changeRegisterView = (e)=>{
        
    //     if (this.state.show_register_view === true) {
    //         this.setState({ show_register_view: false })
    //     } else {
    //         this.setState({ show_register_view: true })
    //     }
    // }
    changeView =(e)=>{
        if(e.target.innerText === 'Register'  || e.target.id==='register')
        {
            if (this.state.show_register_view === false && this.state.show_login_view===false) {
                this.setState({ show_register_view: true})
            } 
            else if(this.state.show_register_view === false && this.state.show_login_view===true)
            {
                this.setState({ show_register_view: true, show_login_view:false })
            }
            else if(this.state.show_register_view === true && this.state.show_login_view===false)
            {
                this.setState({ show_register_view: false, show_login_view:false })
            }
        }
        else if(e.target.innerText === 'Login' || e.target.id==='login')
        {
            if (this.state.show_login_view === false && this.state.show_register_view===false) {
                this.setState({ show_login_view: true})
            } 
            else if(this.state.show_login_view === false && this.state.show_register_view===true)
            {
                this.setState({ show_login_view: true, show_register_view:false })
            }
            else if(this.state.show_login_view === true && this.state.show_register_view===false)
            {
                this.setState({ show_register_view: false, show_login_view:false })
            }
        }

      

    }

    render() {
        return (
            <div className="wrap" >
                <div className="app-bar-container" >
                <img src='hospital-bed.svg' className='bed-img' alt='hospital-bed'/>
                <div className='navigation'>
                <div className='login'>
                    <span onClick={this.changeView}>Login</span>
                    {
                        this.state.show_login_view===true ? 
                        (<Login
                        toggle={this.changeView}
                        text='Login'                                                                 
                         />) : 
                        (null)
                    }
                </div>
                <div className='register'>
                    <span onClick={this.changeView}>Register</span>
                    {
                        this.state.show_register_view===true ? 
                        (<Register 
                        toggle1={this.changeView}
                        text='Register'
                        hospital_data={this.state.hospital_data}                                                                
                         />) : 
                        (null)
                    }
                </div>
                </div>
                </div>
            </div>
        )
    }
}

export default AppBar
