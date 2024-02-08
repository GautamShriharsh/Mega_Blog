import React, { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config';
import { PostCard, Container } from '../components'


function AllPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
        setLoading(false)
      }
    })
  }, [])

  if (loading) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold text-black hover:text-white">
                Loading...
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className='w-full py-8'>
      <Container>
        <div className="flex flex-wrap text-black">
          {posts.map((post) => (
            <div key={post.$id} className='p-2 w-1/4'>
              <PostCard
                {...post}
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
