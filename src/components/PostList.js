import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostsAndUsers } from '../actions';
import './App.css';
import UserHeader from './UserHeader';

class PostList extends Component {

	componentDidMount() {
		this.props.fetchPostsAndUsers();
	}

	renderList() {
		return this.props.posts.map((post) => {
			return (
				<div className="item posts" key={post.id}>
					<i className="large middle aligned icon user" />
					<div className="content">
						<div className="description">
							<h2>{post.title}</h2>
							<p>{post.body}</p>
						</div>
						<strong><UserHeader userId={post.userId} /></strong>
					</div>
				</div>
			)
		})
	}

	render() {
		// console.log(this.props.posts)
		return (
			<div>{this.renderList()}</div>
		);
	}
}

const mapStateToProps = state => {
	return { posts: state.posts }
}

export default connect(mapStateToProps, { fetchPostsAndUsers })(PostList);
