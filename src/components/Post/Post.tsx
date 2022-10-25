/* eslint-disable multiline-ternary */
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import remarkGfm from 'remark-gfm'
import {
  fetchPostsByTag,
  fetchRemovePost,
  PostType,
  setActiveTagName
} from '../../redux/slices/postsSlice'
import { RootState, useAppDispatch } from '../../redux/store'

const Post = ({
  _id,
  title,
  body,
  imageUrl,
  user,
  createdAt,
  viewsCount,
  tags,
  isFullPost,
  isEditable
}: PostType) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const activeTagName = useSelector((state: RootState) => state.posts.posts.activeTagName)

  const handlePostTagClick = (tagName: string) => {
    navigate(`/`)
    dispatch(fetchPostsByTag(tagName))
    dispatch(setActiveTagName(tagName))
  }

  return (
    <article className={`relative bg-white rounded shadow-sm ${isFullPost ? 'mt-12' : ''}`}>
      {isEditable && (
        <div className='edit-controls absolute right-4 top-3 flex gap-3'>
          {/* <button className='bg-white shadow' onClick={()=> {}}>Edit</button> */}
          <Link
            to={`/posts/${_id}/edit`}
            className=' hover:text-indigo-600 bg-white shadow rounded-md text-center px-4 py-3'
          >
            Edit
          </Link>
          <button
            className='bg-white shadow rounded-md text-center px-4 py-3 hover:text-red-600'
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this post?')) {
                dispatch(fetchRemovePost(_id))
                console.log('deleting post:', _id)
              }
            }}
          >
            Delete
          </button>
        </div>
      )}
      {/* if blog post preview - use post image as link to full post page / on full page -> remove link for blog image */}
      {isFullPost ? (
        imageUrl ? (
          <img
            // className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
            className='w-full h-full min-h-[190px] sm:min-h-[275px] max-h-[324px] object-cover'
            src={imageUrl}
            alt={title}
          />
        ) : (
          // placholder div instead of img?
          <div className='w-full h-full min-h-[190px] sm:min-h-[275px] max-h-[324px] bg-pink-300'></div>
        )
      ) : (
        <Link to={`/posts/${_id}`}>
          {/* {imageUrl && (
            <img
              // className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
              className='w-full h-full min-h-[175px] max-h-[324px] object-cover'
              src={imageUrl}
              alt={title}
            />
          )} */}
          {imageUrl ? (
            <img
              // className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
              className='w-full h-full min-h-[190px] sm:min-h-[275px] max-h-[324px] object-cover'
              src={imageUrl}
              alt={title}
            />
          ) : (
            // placholder div instead of img?
            <div className='w-full h-full min-h-[190px] sm:min-h-[275px] max-h-[324px] bg-pink-300'></div>
          )}
        </Link>
      )}

      <div className='post-content p-6 flex items-start'>
        {/* <img src={user.avatarUrl} alt='' className='mt-1.5 mr-3.5' /> */}
        <div className='bg-slate-600 text-white font-extrabold rounded-full min-h-[2rem] min-w-[2rem] mt-1.5 mr-3.5 text-center leading-8'>
          {/* D */}
          {user.fullName ? user.fullName[0] : 'A'}
        </div>
        {/* <div className='flex flex-col gap-3 overflow-auto break-words'> */}
        {/* overflow-auto - focus cuts off sides of outline */}
        <div className='flex flex-col gap-3 break-words'>
          <div className='blog-top mb-1'>
            <div className='name font-bold'>{user.fullName}</div>
            <div className='time text-gray-500 text-sm'>{createdAt}</div>
          </div>
          <h2 className='text-3xl font-black'>
            {!isFullPost ? (
              <Link to={`/posts/${_id}`} className='text-3xl font-black hover:text-indigo-600'>
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          {!isFullPost ? (
            <p>
              {body}
              {/* Read more link on post preview  */}
              {body.length > 149 && (
                <Link
                  to={`/posts/${_id}`}
                  className='font-bold hover:text-indigo-600 inline-block ml-1 mt-1'
                >
                  ...Read more
                </Link>
              )}
            </p>
          ) : (
            // ! markdown transforms '...' text -> not markdown preview text?
            <ReactMarkdown className='prose' remarkPlugins={[remarkGfm]}>
              {body}
            </ReactMarkdown>
          )}

          {/* Read more link on post preview  */}
          {/* {!isFullPost && body.length > 50 && ( */}
          {/* <Link to={`/posts/${_id}`} className='font-bold hover:text-indigo-600 text-end'> */}
          {/* ...Read more */}
          {/* </Link> */}
          {/* )} */}

          <div className='tags relative -left-4'>
            <ul className='flex gap-4 flex-wrap text-gray-500'>
              {tags.map((tag, idx) => (
                <li key={idx}>
                  <button
                    className={`hover:bg-gray-100 ${
                      activeTagName === tag ? 'bg-indigo-400 text-white hover:bg-indigo-400' : ''
                    }`}
                    onClick={() => handlePostTagClick(tag)}
                  >
                    # {tag}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className='blog-bottom flex gap-4'>
            {/* views count: */}
            <div className='flex items-center gap-1 text-gray-500 fill-gray-500'>
              <svg
                className='w-4 h-4'
                focusable='false'
                aria-hidden='true'
                viewBox='0 0 24 24'
                data-testid='RemoveRedEyeOutlinedIcon'
              >
                <path d='M12 6.5c3.79 0 7.17 2.13 8.82 5.5-1.65 3.37-5.02 5.5-8.82 5.5S4.83 15.37 3.18 12C4.83 8.63 8.21 6.5 12 6.5m0-2C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5m0-2c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5z'></path>
              </svg>
              {viewsCount}
            </div>
            {/* comments amount: */}
            <button className='hover:bg-gray-100 flex items-center gap-1 text-gray-500 fill-gray-500'>
              <svg
                className='w-4 h-4'
                focusable='false'
                aria-hidden='true'
                viewBox='0 0 24 24'
                data-testid='ChatBubbleOutlineOutlinedIcon'
              >
                <path d='M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z'></path>
              </svg>
              0
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Post
