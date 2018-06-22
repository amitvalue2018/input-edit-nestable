import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {connect} from 'react-redux';
import Nestable from 'react-nestable';

class App extends Component {

  constructor(props){
    super(props);
    this.state = { inputValue: '', select:[], addAfter:"" };
  }

  renderItem = ({ item }) => {
    // console.log("renderItem");
    if(item.elemt === 'div'){
      return (
        <div>
          <div id={item.id} onDoubleClick={e => this.getContent(e, item)}>
            {item.content}
          </div>
        </div>
      )
    }
    if(item.elemt === 'input'){
      return (<div>
        <input type="text" id={item.id} defaultValue={item.content} />
      </div>)
    }
  }

  getContent = (e,item) => {
    console.log("direct click!",e.target, item);
    // console.log(this.props.content);

    this.props.content.map((ii,i)=>{
      if(ii.id === parseInt(e.target.id)){
        console.log("found in parent",ii,e.target);
        this.props.content[i].elemt = "input";


      }
      if(ii.children.length > 0){
        console.log("has child");
        ii.children.map((ch,j)=>{
          if(ch.id === parseInt(e.target.id)){
            console.log("found in child",ch,e.target);
            this.props.content[i].children[j].elemt = "input";



          }
        })
      }

      this.props.dispatch({
        type:'GET_CONTENT',
        data:this.props.content
      });


    })


  }




  getData = (items, item) => {
    console.log("getData",{ items, item })

    let arr = [];
    items.map((item,i)=>{
      arr.push(item)
      if(item.children.length>0){
        item.children.map((ii) => {
          arr.push(ii)
        })
      }
    })
    this.setState({
      select:arr
    });



    this.props.dispatch({
      type:'GET_CONTENT',
      data:items
    });
  }

  sendUrl(){
    
    let urlResponse = {"content":[{"id":1,"content":"Getting Started with Redux: An Intro","heading":1,"elemt":"input","children":[{"id":2,"content":"Table of Contents","heading":2,"elemt":"input"}]},{"id":3,"content":"The Core Concepts","heading":1,"elemt":"input","children":[{"id":4,"content":"1. Single source of truth","heading":2,"elemt":"input"},{"id":5,"content":"2. State is read-only","heading":2,"elemt":"input"},{"id":6,"content":"3. Changes are made with pure functions","heading":2,"elemt":"input"}]},{"id":7,"content":"Best Practices","heading":1,"elemt":"input","children":[{"id":8,"content":"State Shape","heading":2,"elemt":"input"},{"id":9,"content":"Flat Objects","heading":3,"elemt":"input"},{"id":10,"content":"Actions","heading":2,"elemt":"input"},{"id":11,"content":"Reducers","heading":2,"elemt":"input"}]},{"id":12,"content":"Testing","heading":1,"elemt":"input","children":[{"id":13,"content":"Action creators","heading":2,"elemt":"input"},{"id":14,"content":"Reducers","heading":2,"elemt":"input"}]},{"id":15,"content":"Wrapping it up","heading":1,"elemt":"input","children":[{"id":16,"content":"Free eBook","heading":2,"elemt":"input"},{"id":17,"content":"Learn Node","heading":2,"elemt":"input"},{"id":18,"content":"Carly Kubacak","heading":2,"elemt":"input"},{"id":19,"content":"Carly Kubacak","heading":2,"elemt":"input"},{"id":20,"content":"💖 A side project brought to you from Las Vegas and DC by...","heading":3,"elemt":"input"},{"id":21,"content":"Easiest Local Dev Environment","heading":2,"elemt":"input"},{"id":22,"content":"Get Started with Vue.js","heading":2,"elemt":"input"},{"id":23,"content":"Scotch","heading":2,"elemt":"input"}]},{"id":24,"content":"Get Access","heading":1,"elemt":"input","children":[]}]};
    // console.log("arr",this.state);
    this.props.dispatch({
      type:'GET_CONTENT',
      data:urlResponse.content
    });
    

  }



  render() {
    return (
      <div className="App">

        <div className="col-md-6">
          <div>Enter Url:<input type="text" defaultValue="https://scotch.io/bar-talk/getting-started-with-redux-an-intro" ref={(input)=>this.getUrl = input} /><input type="button" value="submit" onClick={this.sendUrl.bind(this)}/></div>
          <Nestable
              items={this.props.content?this.props.content:null}
              renderItem={this.renderItem}
              onChange={this.getData}
          />
        </div>

    </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps",state);
    return {
        content: state.testReducer
    }
}


export default connect(mapStateToProps)(App);
