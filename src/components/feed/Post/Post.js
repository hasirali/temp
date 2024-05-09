import { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import './Post.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import NearMeIcon from '@mui/icons-material/NearMe';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { collection, addDoc, serverTimestamp, doc, deleteDoc, updateDoc, increment, query, where, getDocs, getDoc } from 'firebase/firestore';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { db } from '../../../firebase';
import LikesModal from './Likesmodal';


export default function Post({ id, dp, url, username, timestamp, message, onDelete, likeCount,likedBy, userID, user, img }) {
  const [likeCountState, setLikeCountState] = useState(likeCount || 0);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedMessage, setUpdatedMessage] = useState(message);
  const [hasLiked, setHasLiked] = useState(false);
  const isOwner = user.uid === userID;
  const [showLikesModal, setShowLikesModal] = useState(false);

 

  function handleShowLikesModal() {
    setShowLikesModal(true);
  }

  function handleCloseLikesModal() {
    setShowLikesModal(false);
  }
  

  useEffect(() => {
    const checkLiked = async () => {
      const q = query(collection(db, 'Likes'), where('postId', '==', id), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      setHasLiked(!querySnapshot.empty);
    };
    checkLiked();
  }, [id, user.uid]);



  useEffect(() => {
    setLikeCountState(likeCount || 0);
  }, [id, likeCount]);




  const handleLike = async () => {
    try {
      const likesRef = collection(db, 'Likes');
      const likeQuery = query(likesRef, where('postId', '==', id), where('userId', '==', user.uid));
      const likeQuerySnapshot = await getDocs(likeQuery);
      const likeDoc = likeQuerySnapshot.docs[0];
      const postRef = doc(db, 'Post', id);
      const postDoc = await getDoc(postRef);
      const postData = postDoc.data();


      if (!likeQuerySnapshot.empty) {
        // User has already liked the post before, so dislike it
        await deleteDoc(likeDoc.ref);
        await updateDoc(postRef, {
          likeCount: increment(-1),
          likedBy: postData.likedBy.filter((uid) => uid !== user.uid),
        });
        setLikeCountState(likeCountState - 1);
        setHasLiked(false);
      } else {
        // User has not liked the post before
        await addDoc(collection(db, 'Likes'), {
          postId: id,
          userId: user.uid,
          createdAt: serverTimestamp(),
        });
        await updateDoc(postRef, {
          likeCount: increment(1),
          likedBy: [...(postData.likedBy || []), user.displayName],
        });
        setLikeCountState(likeCountState + 1);
        setHasLiked(true);
      }
    } catch (error) {
      console.error('Error updating like count: ', error);
    }
  };




  const handleEdit = async () => {
    const postRef = doc(db, 'Post', id);
    await updateDoc(postRef, { message: updatedMessage });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdatedMessage(message);
  };

  const handleDelete = async () => {
    await onDelete(id);
  };

  return (
    <div className='post'>
      <div className='post_top'>
        <Avatar src={dp} className='post_avatar' />
        <div className='post_top_info'>
          <h3>{username}</h3>
          <p>{timestamp}</p>
        </div>
      </div>
      {isEditing ? (
        <div className='post_edit'>
          <textarea onChange={(e) => setUpdatedMessage(e.target.value)} />
          <div>
            <button onClick={handleEdit}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className='post_down'>
            <p>{message}</p>
          </div>

          <div className='post_image'>
            <img src={img} alt='' />
          </div>

          <div className='post_image'>
            <img src={url} alt='' />
          </div>
        </>
      )}
      <div className='post_options'>
        <div className='post_option' onClick={handleLike}>
          <ThumbUpIcon style={{ color: hasLiked ? 'darkblue' : 'grey' }} />
          <p>{likeCountState} Like{likeCountState !== 1 && 's'}</p>
        </div>

{/* 
        <div>
      <button onClick={handleShowLikesModal}>Show likes</button>
      {showLikesModal && (
        <div>
          <p>List of likes {likedBy.map(item => (
                    <div>{item}</div>
                ))}
</p>
          <button onClick={handleCloseLikesModal}>Close</button>
        </div>
      )}
    </div> */}

        <div className='post_option'>
          <ChatBubbleOutlineIcon />
          <p>Comment</p>
        </div>
        <div className='post_option'>
          <NearMeIcon />
          <p>Share</p>
        </div>
        {isOwner && (
          <>
            <div className='post_option' onClick={() => setIsEditing(true)}>
              <EditIcon />
              <p>Edit</p>
            </div>

            <IconButton className='delete' onClick={handleDelete}>
              <DeleteIcon />
              <p>Delete</p>
            </IconButton>
          </>
        )}
      </div>
    </div>
  );
}
