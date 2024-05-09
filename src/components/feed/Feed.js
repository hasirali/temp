import React, { useState, useEffect } from 'react';
import Story_reel from './Story_reel';
import Post_Msg from './Post/Post_Msg';
import Post from './Post/Post';
import './Feed.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { addDoc, serverTimestamp, doc, deleteDoc } from 'firebase/firestore';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';

import { db } from '../../firebase';

export default function Feed({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'Post'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        data: {
          ...doc.data(),
          timestamp: doc.data().timestamp instanceof firebase.firestore.Timestamp ? doc.data().timestamp.toDate().toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
          }) : doc.data().timestamp,
        },
      })));
    });
  
    return () => {
      unsubscribe();
    };
  }, []);

  const handleDelete = async postId => {
    try {
      await deleteDoc(doc(db, 'Post', postId));
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='feed'>
      <Story_reel user={user} />
      <Post_Msg user={user} />
      {posts.map(post => (
        <Post
          user={user}
          id={post.id}
          dp={post.data.profilePic}
          userID={post.data.userid}
          url={post.data.url}
          img={post.data.img}
          comment={post.data.comment}
          username={post.data.username}
          timestamp={post.data.timestamp instanceof Date ? post.data.timestamp.toUTCString() : post.data.timestamp}
          message={post.data.message}
          onDelete={() => handleDelete(post.id)}
          likeCount={post.data.likeCount}
        />

      ))}
    </div>
  );
}
