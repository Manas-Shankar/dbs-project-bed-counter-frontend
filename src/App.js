import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Layers/Home'
import BranchLogin from "./Layers/BranchLogin";
import DoctorLogin from './Layers/DoctorLogin';
import Register from './Layers/Register';
import UpdateBed from './Layers/UpdateBed';
import Appbar from './Appbar';


function App() {
  
  return (
    // <div className="App">
    //   <header className="App-header">
    //   </header>
    // </div>
     <div>
      <Router>
        {/* <div>
          <Appbar/>
        </div> */}
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/branchLogin" render={(props) => <BranchLogin {...props}/>}/>
          <Route exact path="/doctorLogin" render={(props) => <DoctorLogin {...props}/>}/>
          {/* <Route exact path='/register' component={Register} />
          <Route exact path='/addhospital' component={AddHospital} />  
          <Route exact path='/getdata' component={GetData} /> 
          <Route exact path='/gethospitals' component={ListHospitals} />  
          <Route exact path='/getdoctors' component={GetDoctors} />
          <Route exact path='/updatebed' component={UpdateBed} />
          <Route exact path='/addpatient' component={AddPatient} />
          <Route exact path='/listpatients' component={ListPatients} /> 
          */
         <Route exact path='*' component={Home} />
          }
        </Switch>
      </Router>
    </div> 
  );
}

export default App;

