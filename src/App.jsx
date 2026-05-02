import Register from './components/Register'
import SideBar from './components/Sidebar'
import Login from './components/Login'
import AdminDashboard from './components/AdminDashboard'
import UserDashboard from './components/UserDashboard'
import AddStation from './components/AddStation'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './components/css/App.css'
import AddRoute from './components/AddRoute'
import AddTrain from './components/AddTrain'
import AllTrain from './components/AllTrain'
import TrainRoutes from './components/TrainRoutes'
import TrainSchedule from './components/TrainSchedule'
import BookingTicket from './components/BookingTicket'
import ViewTickets from './components/ViewTickets'

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <BrowserRouter>
      <div className="app-container">
        <SideBar />
        <div className="main-content">
          <Routes>
            {/* <Route path='/' element={<Login />} /> */}

            <Route
              path='/'
              element={
                user
                  ? (user.role === 'admin'
                    ? <AdminDashboard />
                    : <UserDashboard />)
                  : <Login />
              }
            />
            <Route path='/register' element={<Register />} />


            <Route path='/admin/dashboard' element={<AdminDashboard />} />
            <Route path='/admin/add-station' element={<AddStation />} />
            <Route path='/admin/add-route' element={<AddRoute />} />
            <Route path='/admin/add-train' element={<AddTrain />} />
            <Route path='/admin/all-train' element={<AllTrain />} />


            <Route path='/user/dashboard' element={<UserDashboard />} />
            <Route path='/trainRoutes/:id' element={<TrainRoutes />} />
            <Route path='/trainSchedule/:id' element={<TrainSchedule />} />
            <Route path='/user/book-ticket' element={<BookingTicket />} />
            <Route path='/user/viewTicket' element={<ViewTickets />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
