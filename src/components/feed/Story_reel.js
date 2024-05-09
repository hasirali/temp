import React from 'react'
import Story from './Story'
import './Feed.css'

export default function Story_reel({ user }) {
  return (
    <div className='story_reel'>
        <Story profile='https://nettv4u.com/imagine/Mohit-Chauhan.jpg'
            Image='https://i.pinimg.com/originals/51/e9/79/51e979ee2974c356e34889626610bd2e.jpg'
            title='Mohit Chauhan'
        />
        <Story profile='https://economictimes.indiatimes.com/thumb/msid-91915573,width-1200,height-900,resizemode-4,imgsize-67996/kgf-2-poster.jpg?from=mdr'
            Image='https://images.cinemaexpress.com/uploads/user/imagelibrary/2022/5/14/original/KGF_2.jpg?w=400&dpr=2.6'
            title='Rocky Bhai'
        />
        <Story profile='https://i.ibb.co/K9q5WPB/desktop-wallpaper-ranbir-kapoor-bollywood-movie-rockstar.jpg'
            Image='https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/202001/86-865272_5-films-that-shahid--x768.jpg?EGTNoxlBHC7QUlKzlTe2mbsqx0p3ZOhl'
            title='Jordan'
        />
        <Story profile='https://lastfm.freetls.fastly.net/i/u/ar0/f1df7c3eb64df572d647ba70e5dfa795.jpg'
            Image='https://www.pinkvilla.com/english/images/2022/10/125546497_hm105281_1600*900.jpg'
            title='Darshan Raval'
        />
        <Story profile='https://feeds.abplive.com/onecms/images/uploaded-images/2023/01/23/7d2c77d69308075b4d7114ffc64852391674495966235462_original.jpg?impolicy=abp_cdn&imwidth=650'
            Image='https://static.toiimg.com/thumb/resizemode-4,width-1200,height-900,msid-87801615/87801615.jpg'
            title='Bhuvan Bam'
        />
    </div>
  )
}
