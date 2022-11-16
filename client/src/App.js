import { Route, Routes, Navigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import AdminMain from './pages/AdminMain'
import Login from './pages/Login'
import Register from './pages/Register'
import Worker from './pages/Worker/worker'
import Manager from './pages/Manager/manager'

function App () {
  // const token = localStorage.getItem('token')
  // let user = ''
  // token ? (user = jwt_decode(token)) : (user = null)

  // const userRole = () => {
  //   let role = ''
  //   if (user && user.accountType === 'admin') role = 'admin'

  //   if (user && user.accountType === 'worker') role = 'worker'

  //   if (user && user.accountType === 'manager') role = 'manager'

  //   return role
  // }

  return (
    <Routes>
      {/* {userRole() === 'admin' && (
        <Route path='/' exact element={<AdminMain />} />
      )}

      {userRole() === 'worker' && (
        <Route
          path='/'
          exact
          element={user.status ? <Worker /> : <Register />}
        />
      )}
      {userRole() === 'manager' && (
        <Route
          path='/'
          exact
          element={user.status ? <Manager /> : <Register />}
        />
      )}
      <Route
        path='/login'
        exact
        element={user ? <Navigate replace to='/' /> : <Login />}
      />
      <Route path='/' element={<Navigate replace to='/login' />} /> */}

      {/* <Route path='/login' exact element={<Login />} />
      <Route path='/register' exact element={<Register />} />
      <Route path='/admin' exact element={<AdminMain />} /> */}

      <Route path='/' exact element={<Worker />} />
      <Route path='/manager' exact element={<Manager />} />
    </Routes>
  )
}

export default App
