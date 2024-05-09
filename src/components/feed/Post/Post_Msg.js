import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import './Post_Msg.css'
import VideocamIcon from '@mui/icons-material/Videocam';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'; // added import statement
import db from '../../../firebase';

import { collection, addDoc, serverTimestamp, doc, deleteDoc, updateDoc, arrayUnion, arrayRemove ,increment } from 'firebase/firestore';


export default function Post_Msg({ user }) {

    const [input, setInput] = useState('')
    const [imgurl, setImgurl] = useState('')
    const [img, setImg] = useState('')
    const firstName = user.displayName.split(" ")[0];

    const handlesubmit = async (e) => {
        e.preventDefault();
        const postRef = collection(db, 'Post');
        const newPost = {
            message: input,
            timestamp: serverTimestamp(),
            url: imgurl,
            img:img,
            username: user.displayName,
            profilePic: user.photoURL,
            likeCount: 0,
            likedBy:[],
            userid: user.uid
        };
        await addDoc(postRef, newPost);

        setInput('');
        setImgurl('');
    };

    const handleDelete = async (postId) => {
        const postRef = doc(collection(firebase.firestore(), 'Post'), postId);
        await deleteDoc(postRef);
    };

    const handleLike = async (postId) => {
        const postRef = doc(collection(firebase.firestore(), 'Post'), postId);
        await updateDoc(postRef, {
            likeCount: increment(1),
            likedBy: arrayUnion(user.uid)
        });
    };

    const handleUnlike = async (postId) => {
        const postRef = doc(collection(firebase.firestore(), 'Post'), postId);
        await updateDoc(postRef, {
            likeCount: increment(-1),
            likedBy: arrayRemove(user.uid)
        });
    };

    return (
        <div className='Post_Msg'>
            <div className='Post_Msg_top'>
                <Avatar src={user.photoURL} />
                <form>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type='text'
                        className='Post_Msg_input'
                        placeholder={`What's on your mind ${firstName}?`}
                    />
                    <input
                        value={imgurl}
                        onChange={(e) => setImgurl(e.target.value)}
                        type='text'
                        placeholder='Photo/Video URL (optional)'
                    />

                    <br />
                    <button onClick={handlesubmit} type='submit'>Post</button>
                </form>

            </div>
            <div className='Post_Msg_down'>
                <div className='Post_Msg_options'>
                    <VideocamIcon style={{ color: 'red' }} />
                    <h3>Live Video</h3>
                </div>
                <div className='Post_Msg_options'>
                    <input
                        type='file'
                        accept='image/*'
                        id='fileInput'
                        style={{ display: 'none' }}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            const storageRef = firebase.storage().ref();
                            const fileRef = storageRef.child(`images/${file.name}`);
                            fileRef.put(file).then(() => {
                                fileRef.getDownloadURL().then((url) => {
                                    setImg(url);
                                });
                            });
                        }}
                    />
                    <label htmlFor='fileInput'>
                        <IconButton component='span' className='Post_Msg_options'>
                            <PhotoLibraryIcon style={{ color: 'green' }} />
                            <h3>Photo/Video</h3>
                        </IconButton>
                    </label>

                </div>
                <div className='Post_Msg_options'>
                    <InsertEmoticonIcon style={{ color: 'orange' }} />
                    <h3>Feeling/Activity</h3>
                </div>

            </div>
        </div>
    )
}
