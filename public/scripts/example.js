var Post = React.createClass({
  removeWithKey: function(){
    this.props.removePost(this.props.refKey);
  },
  render: function() {
    return (
      <div className="panel panel-default">
          <div className="panel-heading">
            {this.props.title}
            <button className="btn btn-danger pull-right" type="button" onClick={this.removeWithKey}>Delete</button>
          </div>
          <div className="panel-body">
            {this.props.note}
          </div>
      </div>
    );
  }
});

var PostList = React.createClass({
  removePost: function(key){
    this.props.onPostDelete(key);
  },
  render: function() {
    var posts = this.props.data.map((post) => {
      return (
        <div className="post-list" key= {post.id}> 
          <Post key={post.id} title={post.title} note={post.note} refKey={post.id} removePost={this.removePost}/> 
        </div>
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
      <div className='post-form'>
      <h2>Add a post here</h2>
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            type="text"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
        </div>
        <div className="form-group">
          <label>Note</label>
          <textarea
            className="form-control"
            rows="3"
            value={this.state.note}
            onChange={this.handleNoteChange}
          >
          </textarea>
        </div>
      <input className="btn btn-success" type="submit" value="Post"/>
      </form>
      </div>
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
  handlePostDelete: function(key){
    var posts = this.state.data;
    var foundPost = posts.find(post => {
      return post.id === key;
    });
    var index = posts.indexOf(foundPost);
    posts.splice(index, 1);
    this.setState({data: posts});
  },
  render: function() {
    return (
      <div className="postApp">
      <PostForm onPostSubmit={this.handlePostSubmit}/>
      <PostList data={this.state.data} onPostDelete={this.handlePostDelete}/>
      </div>
    );
  }
});
ReactDOM.render(
  <PostApp />,
  document.getElementById('content')
);
