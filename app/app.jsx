import React from 'react';
import {render} from 'react-dom';

var Posts = React.createClass({
  getInitialState: function() {
    return {
      posts: []
    };
  },

  componentDidMount: function() {
    this.serverRequest = new XMLHttpRequest();

    this.serverRequest.onreadystatechange = function() {
      if (this.serverRequest.readyState == 4 && this.serverRequest.status == 200) {
        this.setState({
          posts: JSON.parse(this.serverRequest.response)
        });
      }
    }.bind(this);

    this.serverRequest.open("GET", 'http://wp-api.dev/wp-json/wp/v2/posts', true);
    this.serverRequest.send();
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    return (
      <ul class="posts">
        {this.state.posts.map(function(post) {
          return <Post key={post.slug} title={post.title.rendered} slug={post.slug} />;
        })}
      </ul>
    );
  }
});

var Post = React.createClass({
  render: function() {
    return (
      <li className={this.props.slug}>
        {this.props.title}
      </li>
    );
  }
});

render(
  <Posts />,
  document.getElementById('posts')
);
