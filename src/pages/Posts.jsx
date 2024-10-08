import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Posts = () => {
    const {id} = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(id);

    function onSearch() {
      fetchPost(search)
    }

    async function fetchPost(userId) {
      setLoading(true);
      const {data} = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId || id}`);
      setPosts(data);
      console.log(data);
      setLoading(false)
    }
    
    
    useEffect(() => {
        
      fetchPost();
    }, []);
  return (
    <>
      <div className="post__search">
        <Link to="/">
          <button>← Back</button>        
        </Link>
        <div className="post__search--container">
          <label className="post__search--label">Search by Id</label>
          <input 
            type="number" 
            value={search}
            onKeyDown={(e) => "Enter" ? onSearch(): null}
            onChange={(e) => setSearch(e.target.value)} 
          />
          <button onClick={() => onSearch()}>Enter</button>
        </div>
      </div>
      {loading
        ? new Array(10).fill(0).map((_, index) => (
            <div className="post" key={index}>
              <div className="post__title">
                <div className="post__title--skeleton"></div>
              </div>
              <div className="post__body">
                <p className="post__body--skeleton"></p>
              </div>
            </div>
          ))
        : posts.map((post) => {
            return (
              <div className="post" key={post.id}>
                <div className="post__title">{post.title}</div>
                <p className="post__body">{post.body}</p>
              </div>
            );
          })}
    </>
  );
}

export default Posts;