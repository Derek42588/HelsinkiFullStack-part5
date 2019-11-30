import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe ('<Blog />', () => {
  let component

  const blog = {
    title: 'LO SVU',
    author: 'Hargitay',
    likes: 3,
    url: 'www.nbc.com',
    user: {
      username: 'Mariska'
    }
  }

  const user = {
    username: 'Mariska',
    name: 'Mariska Hargitay',
    id: '121231231232'
  }
  const mockLike = jest.fn()
  const mockDelete = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog
        blog = {blog}
        user = {user}
        addLike = {mockLike}
        deleteBlog = {mockDelete}
      />
    )
  })

  test('at the beginning, only title and author are displayed', () => {
    let div = component.container.querySelector('.expanded')

    expect(div).toHaveStyle('display: none')

    div = component.container.querySelector('.truncated')
    expect(div).toHaveTextContent(
      'LO SVU'
    )
    expect(div).toHaveTextContent(
      'Hargitay'
    )
  })

  test('verify that clicking makes the expanded div visible', () => {
    let div = component.container.querySelector('.expanded')

    expect(div).toHaveStyle('display: none')
    
    fireEvent.click(div)

    expect(div).not.toHaveStyle('display: none')
      
  })
})