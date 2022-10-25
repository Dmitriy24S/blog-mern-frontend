import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchPopularPosts, fetchPosts, setActiveTagName } from '../redux/slices/postsSlice'
import { RootState, useAppDispatch } from '../redux/store'

const Tabs = () => {
  const dispatch = useAppDispatch()
  const activeTagName = useSelector((state: RootState) => state.posts.posts.activeTagName)
  const [activeTab, setActiveTab] = useState('new')

  return (
    <div className='flex items-center gap-4 mb-6 md:w-2/3'>
      <button
        className={`rounded-md rounded-b-none border-0 border-b-2 hover:text-indigo-400
        focus:outline-none focus-visible:outline-blue-500
        ${
          activeTab === 'new' &&
          activeTagName === null &&
          'border-b-2 border-indigo-500 text-indigo-500'
        }`}
        onClick={() => {
          setActiveTab('new')
          dispatch(fetchPosts())
          // dispatch(setActiveTag(null)) // remove selected tag, show all posts sorted by new
          dispatch(setActiveTagName(null)) // remove selected tag, show all posts sorted by new
        }}
      >
        New
      </button>
      <button
        className={`rounded-md rounded-b-none border-0 border-b-2 hover:text-indigo-400
        focus-visible:outline-blue-500 focus:outline-none
        ${
          activeTab === 'popular' &&
          activeTagName === null &&
          'border-b-2 border-indigo-500 text-indigo-500'
        }`}
        onClick={(e) => {
          // const target = e.target as HTMLElement
          // target.blur()
          setActiveTab('popular')
          dispatch(fetchPopularPosts())
          // dispatch(setActiveTag(null)) // remove selected tag, show all posts sorted by popularity/view count
          dispatch(setActiveTagName(null)) // remove selected tag, show all posts sorted by popularity/view count
        }}
      >
        Popular
      </button>

      {/* {activeTag !== null && ( */}
      {activeTagName !== null && (
        <p className='ml-auto mr-2 border-b-2 border-indigo-500 px-3.5'>
          All posts with tag: <span className='font-bold text-indigo-600'>{activeTagName}</span>
        </p>
      )}
    </div>
  )
}

export default Tabs
