var Post = React.createClass({
  getInitialState: function(){
    return {editMode: false, title: this.props.title, note: this.props.note};
  },
  removeWithKey: function(){
    this.props.removePost(this.props.refKey);
  },
  editPost: function(){
    this.setState({editMode: true});
  },
  cancelEditPost: function() {
    this.setState({editMode: false});
  },
  updateTitle: function(e) {
    this.setState({title: e.target.value});
  },
  updateNote: function(e) {
    this.setState({note: e.target.value});
  },
  updatePost: function(e) {
    this.props.updatePost(this.props.refKey, this.state.title, this.state.note);
    this.setState({editMode: false});
  },
  render: function() {
    if (this.state.editMode) {
      return (
        <div className="panel panel-default">
            <div className="panel-heading">
              <input className="form-control" type="text" value={this.state.title} onChange={this.updateTitle}/>
              <button className="btn btn-default" type="button" onClick={this.cancelEditPost}>Cancel</button>
              <button className="btn btn-danger" type="button" onClick={this.updatePost}>Save</button>
            </div>
            <div className="panel-body">
              <textarea
                className="form-control"
                rows="3"
                value={this.state.note}
                onChange={this.updateNote}>
              </textarea>
            </div>
        </div>
      );
    }
    else { 
      return (
        <div className="panel panel-default">
            <div className="panel-heading">
              {this.state.title}
              <button className="btn btn-default" type="button" onClick={this.editPost}>Edit</button>
              <button className="btn btn-danger" type="button" onClick={this.removeWithKey}>Delete</button>
            </div>
            <div className="panel-body">
              {this.state.note}
            </div>
        </div>
      );
    }
  }
});

var PostList = React.createClass({
  removePost: function(key){
    this.props.onPostDelete(key);
  },
  updatePost: function(key, title, note){
    this.props.onPostUpdate(key, title, note);
  },
  render: function() {
    var posts = this.props.data.map((post) => {
      return (
        <div className="post-wrapper" key= {post.id}> 
          <Post key={post.id} title={post.title} note={post.note} refKey={post.id} removePost={this.removePost} updatePost={this.updatePost}/> 
        </div>
      );
    });
    return (
      <div className="post-list">
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
    this.setState({title: '', note: ''});
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
  handlePostUpdate: function(key, title, note){
    var posts = this.state.data;
    var foundPost = posts.find(post => {
      return post.id === key;
    });
    foundPost.title = title;
    foundPost.note = note;
  },
  render: function() {
    return (
      <div className="post-app">
      <PostForm onPostSubmit={this.handlePostSubmit}/>
      <PostList data={this.state.data} onPostDelete={this.handlePostDelete} onPostUpdate={this.handlePostUpdate}/>
      </div>
    );
  }
});
ReactDOM.render(
  <PostApp />,
  document.getElementById('content')
);
