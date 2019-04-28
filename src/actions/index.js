import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

// Solving Overfetching Issue
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
	await dispatch(fetchPosts());

	const userIds = _.uniq(_.map(getState().posts, 'userId'));
	userIds.forEach(id => dispatch(fetchUser(id)));
}

export const fetchPosts = () => async dispatch => {
	const response = await jsonPlaceholder.get('/posts');

	dispatch({ type: 'FETCH_POSTS', payload: response.data })
}

export const fetchUser = id => async dispatch => {
	const response = await jsonPlaceholder.get(`/users/${id}`);

	dispatch({ type: 'FETCH_USER', payload: response.data })
};


// Lodash will not do the same fetch request again and again, it will memorize it.
// Ex. Fetch one user one time only (Removes Overfetching Issue)
/*
const _fetchUser = _.memoize(async (id, dispatch) => {
	const response = await jsonPlaceholder.get(`/users/${id}`);

	dispatch({ type: 'FETCH_USER', payload: response.data })
})
*/
