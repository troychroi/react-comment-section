import React, { Component } from 'react';
import './App.css';
var axios = require('axios');

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: ""
    }
  }  

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
      .then(res => {
        this.setState({
          title: res.data.title,
          body: res.data.body
        });
      });
  }

  render() {
    return (
      <div className="post">
        <h2 className="title">{this.state.title}</h2>
        <p className="body">{this.state.body}</p>
      </div>
    );
  }
}

class Comment extends Component {
  render() {
    return(
      <div>
        <p><i>Name: </i>{this.props.name}</p>
        <i>Email: {this.props.email}</i>
        <p><i>Comment: </i>{this.props.body}</p>
      </div>      
    );
  }
}

var datarray = [];
var json = axios.get('https://jsonplaceholder.typicode.com/posts/1/comments');
json.then(res => {
  res.data.map(comment => datarray.push(comment));
});

console.log('Data Array:',datarray);

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      email: "",
      body: ""
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    e.preventDefault();
    this.setState({
      email: e.target.value
    });
  }

  handleNameChange(e) {
    e.preventDefault();
    this.setState({
      name: e.target.value
    });
  } 

  handleCommentChange(e) {
    e.preventDefault();
    this.setState({
      body: e.target.value
    });
  }   

  handleSubmit(e) {
    e.preventDefault();
    var i = 6;
    this.setState({
      id: i
    });
    i++;    
    console.log(this.state.name+'('+this.state.id+') with email, '+this.state.email+' posted comment: '+this.state.body);
    datarray.push({
      id: this.state.id, 
      name: this.state.name, 
      email: this.state.email, 
      body: this.state.body      
    });
    console.log('Data:',datarray);
  }

  render() {
    return (
      <form method="post" onSubmit={this.handleSubmit}>
        <input type="email" value={this.state.email} placeholder="email" onChange={this.handleEmailChange} />
        <input type="text" value={this.state.name} placeholder="name" onChange={this.handleNameChange} />
        <textarea value={this.state.comment} placeholder="comment" onChange={this.handleCommentChange}></textarea>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

class Comments extends Component {
  render() {  
    let commentNodes = this.props.data.map(item => {
      return (<Comment key={item.id} id={item.id} name={item.name} email={item.email} body={item.body} />)
    });

    console.log('Props Data: ',this.props.data);
    console.log('commentNodes:',commentNodes);

    return (
      <div id="comments">
        {commentNodes}
        {this.props.data.map(item => <Comment key={item.id} id={item.id} name={item.name} email={item.email} body={item.body} />
        )}
      </div> 
    );
  }
}

class Thread extends Component {
  render() {
    return (
      <div>
        <h1>Post</h1>
        <Post />
        <h3>Comments:</h3>
        <Comments data={datarray}/>
        <h3>Submit Comment:</h3>
        <CommentForm />
      </div>
    );
  }
}

export default Thread;
