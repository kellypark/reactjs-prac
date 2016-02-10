var Post = React.createClass({
  removePost: function(e){
  
  },
  render: function() {
    return (
      <div className="post">
        <h2 className="title">{this.props.title}</h2>
        <div className="note">{this.props.note}</div>
        <button type="button" onClick={this.removePost(this)}>Delete</button>
      </div>
    );
  }
});

var PostList = React.createClass({
  render: function() {
    var posts = this.props.data.map(function(post) {
      return (
        <Post key={post.id} title={post.title} note={post.note}/> 
      );
    });
    return (
      <div className="postList">
        {posts}
      </div>
    );
  }
});

var PostForm = React.createClass({
  getInitialState: function() {
    return { title: '', note: ''};
  },
  handleTitleChange: function(e) {
    this.setState({title: e.target.value});
  },
  handleNoteChange: function(e) {
    this.setState( {note: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.onPostSubmit(this.state.title, this.state.note);
  },
  render: function() {
    return (
      <form className="postForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        <input
          type="text"
          value={this.state.note}
          onChange={this.handleNoteChange}
        />
      <input type="submit" value="Post"/>
      </form>
    );
  }
});

var PostApp = React.createClass({
  getInitialState: function() {
    return { data: [{id: 1, title: 'first post', note: "something is here"}, {id: 2, title: 'second post', note: "something else is here"}]};
  },
  handlePostSubmit: function(title, note) {
    var posts = this.state.data;
    var newId = Date.now();
    posts.push({id: newId, title: title, note: note});
    this.setState({data: posts});
  },
  render: function() {
    return (
      <div className="postApp">
      <PostList data={this.state.data} />
      <PostForm onPostSubmit={this.handlePostSubmit}/>
      </div>
    );
  }
});
ReactDOM.render(
  <PostApp />,
  document.getElementById('content')
);
