import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchTopTags } from '../redux/slices/postsSlice'
import { RootState, useAppDispatch } from '../redux/store'

const TagsBlock = () => {
  const dispatch = useAppDispatch()
  const { items } = useSelector((state: RootState) => state.posts.tags)
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

  return (
    <div className='bg-white p-4 shadow-sm rounded'>
      <h3 className='font-bold text-xl mb-5 px-4'>Tags</h3>
      {/* overscroll-x contain/none set to body in css? prevent browser back button action on horizontal scroll swipe? */}
      <ul className='flex overflow-x-scroll pb-1 snap-mandatory snap-x overscroll-x-contain md:flex-col'>
        {items.map((tag) => {
          console.log('tag', tag)

          return (
            <li className='snap-start'>
              {
                <button className='hover:bg-gray-100 text-start min-w-max w-full'>
                  <span className='mr-1'>#</span>
                  {tag._id}
                </button>
              }
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TagsBlock
