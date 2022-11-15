import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  fetchPosts,
  fetchPostsByTag,
  fetchTopTags,
  setActiveTagName
} from '../redux/slices/postsSlice'
import { RootState, useAppDispatch } from '../redux/store'

const TagsBlock = () => {
  const dispatch = useAppDispatch()
  const { items } = useSelector((state: RootState) => state.posts.tags)
  const activeTagName = useSelector((state: RootState) => state.posts.posts.activeTagName)
  console.log({ activeTagName })

  console.log('TagsBlock tags:', items)
  // items: Array(10)
  //   [
  //     {
  //         "_id": "test",
  //         "count": 2
  //     },
  //     {
  //         "_id": "tag 2",
  //         "count": 2
  //     },
  //     {
  //         "_id": "react",
  //         "count": 2
  //     },
  //     {
  //         "_id": "tutorial",
  //         "count": 1
  //     },
  //     {
  //         "_id": "test no img",
  //         "count": 1
  //     },
  //     {
  //         "_id": "test img2",
  //         "count": 1
  //     },
  //     {
  //         "_id": "test img",
  //         "count": 1
  //     },
  //     {
  //         "_id": "tag 3",
  //         "count": 1
  //     },
  //     {
  //         "_id": "tag 1",
  //         "count": 1
  //     },
  //     {
  //         "_id": "node",
  //         "count": 1
  //     }
  // ]

  // Fetch tags
  useEffect(() => {
    dispatch(fetchTopTags())
  }, [])

  const clearFilter = () => {
    dispatch(fetchPosts())
    dispatch(setActiveTagName(null))
  }

  return (
    <div className='bg-white p-4 shadow-sm rounded'>
      <div className='flex items-center justify-between mb-3'>
        <h3 className='font-bold text-xl py-2.5 px-4'>Top Tags</h3>
        {activeTagName !== null && (
          <button className='underline text-indigo-500 hover:text-indigo-400' onClick={clearFilter}>
            Clear filter
          </button>
        )}
      </div>
      {/* overscroll-x contain/none set to body in css? prevent browser back button action on horizontal scroll swipe? */}
      <ul className='flex overflow-x-auto pb-1 snap-mandatory snap-x overscroll-x-contain md:flex-col'>
        {items.length > 0 ? items.map((tag, index) => {
          // console.log('tag', tag)
          return (
            <li className='snap-start'>
              <button
                // ! safari: min-w-max w-full -> overlap mobile long tags?
                className={`hover:bg-gray-100 text-start w-max ${
                  // activeTag === index ?
                  activeTagName === tag._id ? 'bg-indigo-400 text-white hover:bg-indigo-400' : ''
                  }`}
                onClick={() => {
                  // if (activeTag === index) {
                  if (activeTagName === tag._id) {
                    // if clicking on currently active tag -> means unselected it -> show all posts sorted by new and remove active tag:
                    dispatch(fetchPosts())
                    // dispatch(setActiveTag(null))
                    dispatch(setActiveTagName(null))
                  } else {
                    // if new tag clicked -> set it as active tag -> fetch show posts by selected tag:
                    dispatch(fetchPostsByTag(tag._id))
                    // dispatch(setActiveTag(index))
                    dispatch(setActiveTagName(tag._id))
                  }
                }}
              >
                <span className='mr-1'>#</span>
                {tag._id}
              </button>
            </li>
          )
        }) : <p className='px-4'> Loading tags  </p>}

      </ul>
    </div>
  )
}

export default TagsBlock
