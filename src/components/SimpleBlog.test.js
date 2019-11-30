import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  let component

  const blog = {
    title: 'Hey girl',
    author: 'Chandler',
    likes: 33
  }
  const mockHandler  = jest.fn()

  beforeEach(() => {
    component = render(
      <SimpleBlog blog = {blog} onClick = {mockHandler}>
      </SimpleBlog>
    )
  })

  test('confirms component renders title, author, and amount of likes', () =>  {
    const div = component.container.querySelector('.SimpleBlog')

    expect(div).toHaveTextContent(
      'Hey girl'
    )
    expect(div).toHaveTextContent(
      'Chandler'
    )
    expect(div).toHaveTextContent(
      '33'
    )
  })
})
test('click the button twice, confirm that onClick is fired twice', () => {

  const blog = {
    title: 'Hey girl',
    author: 'Chandler',
    likes: 33
  }
  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog = {blog} onClick = {mockHandler}>
    </SimpleBlog>
  )

  const button = component.container.querySelector('button')

  fireEvent.click(button)
  fireEvent.click(button)

  expect (mockHandler.mock.calls.length).toBe(2)
})