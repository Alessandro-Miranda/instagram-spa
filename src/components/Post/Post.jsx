import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Post.scss';

const Post = ({ postInfo, userInfo }) => {
  const {comments, imageUrl} = postInfo;
  const [follower, setFollower] = useState(false);
  const [like, setLike] = useState(false);
  return (
    <article className="post" data-testid="post">
      {userInfo && (
        <header className="post__header">
          <div className="user">
            <Link className="user__thumb" to={`/users/${userInfo.username}`}>
              <img src={userInfo.avatar} alt={userInfo.name} />
            </Link>

            <Link className="user__name" to={`/users/${userInfo.username}`}>{userInfo.name}</Link>
          </div>
          <button className="post__context" onClick={() => {
            setFollower(!follower);
          }}>
            {follower ?
              <span className="follow-btn is-following">Seguindo</span> :
              <span className="follow-btn">Seguir</span>
            }
          </button>
        </header>
      )}
      
      <div className="post__figure">
        <img src={imageUrl} alt="foto"></img>
      </div>

      {userInfo && (
        <div className="post__controls">
          <button className="post__control" onClick={() => setLike(!like)}>
            {like ? 
              <i className="fas fa-heart"></i> :
              <i className="far fa-heart"></i>
            }
          </button>

          {userInfo && comments.length>0 && (
            <div className="post__status">
              <div className="user">
                <span>
                  Curtido por <Link to="/">{comments[0].name} </Link>
                  e outra{((comments.length - 1) + like) > 1 && 's'} 
                  <Link to="/"> {(comments.length - 1) + like} pessoa{((comments.length - 1) + like) > 1 && 's'}
                  </Link>
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
};

export default Post;