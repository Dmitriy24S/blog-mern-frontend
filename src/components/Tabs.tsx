import React, { useState } from 'react'
import { fetchPopularPosts, fetchPosts, setActiveTag } from '../redux/slices/postsSlice'
import { useAppDispatch } from '../redux/store'

const Tabs = () => {
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = useState('new')

  return (
    <div className='flex gap-4 mb-6'>
      <button
        className={`rounded-md rounded-b-none border-0 hover:text-indigo-400
        focus:outline-none focus-visible:outline-blue-500
        ${activeTab === 'new' && 'border-b-2 border-indigo-500 text-indigo-500'}`}
        onClick={() => {
          setActiveTab('new')
          dispatch(fetchPosts())
          dispatch(setActiveTag(null)) // remove selected tag, show all posts sorted by new
        }}
      >
        New
      </button>
      <button
        className={`rounded-md rounded-b-none border-0 hover:text-indigo-400
        focus-visible:outline-blue-500 focus:outline-none
        ${activeTab === 'popular' && 'border-b-2 border-indigo-500 text-indigo-500'}`}
        onClick={(e) => {
          // const target = e.target as HTMLElement
          // target.blur()
          setActiveTab('popular')
          dispatch(fetchPopularPosts())
          dispatch(setActiveTag(null)) // remove selected tag, show all posts sorted by popularity/view count
        }}
      >
        Popular
      </button>
    </div>
  )
}

export default Tabs
