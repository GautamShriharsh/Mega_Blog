import React, {useCallback} from 'react'
import {useForm} from 'react-hook-form'
import {Button, Input, Select, RTE} from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

function PostForm() {
   const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
    defaultValues: {
        title: post?.title || '',
        slug: post?.slug || '',
        content: post?.content || '',
        status: post?.status || 'active',
    },
   })

   const navigate = useNavigate()
   const userData = useSelector((state) => state.userData)

   const submit = async (data) => {
    if (post) {
        const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null

        if (file) {
            appwriteService.deleteFile(post.featuredImage)
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
            ...data,
            featuredImage: file ? file.$id : undefined,
        })
        
        if (dbPost) {
            navigate(`/post/${dbPost.$id}`)
        } 
      }

    else {
         const file = await appwriteService.uploadFile(data.image[0])

           if (file) {
            const fileId = file.$id
            data.featuredImage = fileId
            const dbPost = await appwriteService.createPost({
                ...data,
                userId: userData.$id,
            })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
           } 
        }
    }
   

     const slugTransform = useCallback((value) => {
      if (value && typeof value === 'string') {
        return value
           .trim()
           .toLowerCase()
           .replace(/[^\w\s-]/g, '') // Remove non-word characters except whitespace and dash
            .replace(/[\s]+/g, '-') // Replace whitespace sequences with a single dash
            .replace(/^-+/g, '') // Remove leading dashes
            .replace(/-+$/g, ''); // Remove trailing dashes
      }
     }, [])

  
    return (
    <div>
      PostForm
    </div>
  )
}

export default PostForm