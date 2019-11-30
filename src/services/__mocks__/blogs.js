/* eslint-disable react-hooks/rules-of-hooks */
const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'HTML is easy',
    author: 'Mariska Hargitay',
    url: 'www.nbc.com/html',
    important: false,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  },
  {
    id: '5a451e21e0b8b04a45638211',
    title: 'Browser can execute only javascript',
    author: 'Mariska Hargitay',
    url: 'www.nbc.com/html',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  },
  {
    id: '5a451e30b5ffd44a58fa79ab',
    title: 'The most important methods of HTTP are GET and POST',
    author: 'Mariska Hargitay',
    url: 'www.nbc.com/html',    important: true,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  }
]


const getAll = () => {
  return Promise.resolve(blogs)
}

// eslint-disable-next-line no-unused-vars
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}


export default { getAll, setToken }
