import React from 'react'

const PostDetail = ({params}: {params:{postId:String}}) => {
  return (
    <div>PostDetail :  {params.postId}</div>
  )
}

export default PostDetail