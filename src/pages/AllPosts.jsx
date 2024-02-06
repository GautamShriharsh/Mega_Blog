import React, {useState, useEffect} from 'react'
import appwriteService from '../appwrite/config';
import {PostCard, Container} from '../components'


function AllPosts() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
   appwriteService.getPosts([]).then((posts) => {
    if (posts) {
    setPosts(posts.documents)
    }
    })
  },[])
  
    return (
    <div className='w-full py-8'>
      <Container>
        <div className="flex flex-wrap">
            {posts.map((post) => (
             <div key={post.$id} className='p-2 w-1/4'>
                <PostCard 
                $id={post.$id}
                title={post.title}
                featuredImage={post.featuredImage}
                // {...post} --> we can also pass the post into postcard by spreading its properties
                />
             </div>   
            ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts
