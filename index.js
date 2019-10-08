import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      textEnglish: '',
      textOther: '',
      result: undefined,
    };
  }
  
  executeFuntion = (obj1, obj2) =>{
    const objParse1 = JSON.parse(obj1);
    const objParse2 = JSON.parse(obj2);

    const result = {};

    this.update(objParse1, objParse2, result);
    
    this.setState({result: result});
    return this.state.result;
  };

  update = (objText1, objText2, result = {}) => {
    const keys1 = Object.keys(objText1);
    const keys2 = Object.keys(objText2);
   
    keys2.map(key => {
      if(objText1.hasOwnProperty(key)){
        result[key] = objText2[key];
      }else{
        console.log('deleted key', key)
      }
    })
  };

  resetFunction = () => {
    this.setState({textEnglish: ''});
    this.setState({textOther: ''});
    this.setState({result: undefined});
  }

  render() {
    return (
      <div style={{display:'flex', flexDirection:'column', fontFamily: 'sans-serif'}}>
        <div 
        style={{display:'flex', flexDirection:'row', fontFamily: 'sans-serif'}}
        >
          <div>
            <h3
              style={{margin:'20px 20px 0px'}}
            >English file</h3>
            <textarea
              value={this.state.textEnglish}
              onChange={(e)=> this.setState({textEnglish:e.target.value})}
              style={{height:'500px', width:'250px', margin:'20px'}}
            >
            </textarea>
          </div>
          <button
            onClick = {() => this.executeFuntion(this.state.textEnglish, this.state.textOther)}
            style={{height:'50px', width:'60px', margin:'20px', alignSelf: 'center'}}
          >
            Execute
          </button>
          <button
            onClick = {() => this.resetFunction(this.state.textEnglish, this.state.textOther)}
            style={{height:'50px', width:'60px', margin:'20px', alignSelf: 'center'}}
          >
            Reset
          </button>
          <div>
            <h3
              style={{margin:'20px 20px 0px'}}
            >File to compare</h3>
            <textarea 
              style={{height:'500px', width:'250px', margin:'20px'}}
              onChange={(e)=> this.setState({textOther:e.target.value})}
              value={this.state.textOther}
            >
            </textarea>
          </div>
        </div>
        <h3
            style={{margin:'20px 20px 0px'}}
          >Result</h3>
          <textarea 
            style={{height:'300px', width:'700px', margin:'20px'}}
            value={JSON.stringify(this.state.result)}
          >
          </textarea>
      </div>
      
    );
  }
}

render(<App />, document.getElementById('root'));
