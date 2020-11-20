import React, { useState, useEffect } from 'react';

import Stories from '../../containers/Stories';
import Loading from '../../components/Loading';

import Posts from '../../containers/Posts';

import './FeedRoute.scss';

const FeedRoute = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [count, setCount] = useState(0);
  let ids=[];
  let getPost = (postId) => users.find(user => postId === user.id);

  const url='https://5e7d0266a917d70016684219.mockapi.io/api/v1/users';
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json()).then(response => setUsers(response));
  }, []);
  
  ids = users.map((elem) => {
    return elem.id;
  })

  useEffect(() => {
    if(count === users.length)
    {
      return;
    }
    fetch(`${url}/${ids[count]}/posts`).then(res=>res.json()).then(response=>{
      setPosts([...posts, ...response]);
      setCount(count+1);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, count]);
  
  useEffect(() => {
    fetch('https://5e7d0266a917d70016684219.mockapi.io/api/v1/stories')
      .then(res => res.json()).then(response => {
        setStories(response);
      });
  }, [users]);
  
  return (
    <div data-testid="feed-route">
      {(users.length > 0 && stories.length > 0) ?
        <Stories stories={stories} getUserHandler={getPost}/> :
        <Loading />
      }
      {users.length !== count ?
        <Loading /> :
        <Posts posts={posts} getUserHandler={getPost}/>
      }
    </div>
  );
};

export default FeedRoute;
