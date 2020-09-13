import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinnner';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import { Link } from 'react-router-dom';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/posts' className='btn btn-light'>
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <div className='comments'>
        <div class='bg-primary p'>
          <h3>Comments</h3>
        </div>
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
      <CommentForm postId={post._id} />
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
