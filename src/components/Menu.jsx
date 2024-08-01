import React, { useEffect, useState } from 'react'
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { CiBank } from "react-icons/ci";
import { GoHistory } from "react-icons/go";
import { IoExitOutline } from "react-icons/io5";
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaListCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { checkeduserloggedin, logout } from '../redux/auth/action';
import { FaPowerOff } from "react-icons/fa6";
import Nestedtable from './Nestedtable';
import { setLoggedIn } from '../redux/auth/userSlice';

const Menu = ({ menu, func }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isLoading, isLoggedIn } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const { postionleft } = useSelector((state) => state.nav)
  const [id, setId] = useState(null)
  const tabs = [
    {
      id: 1,
      icon: <MdOutlineDashboard className=' text-xl' />,
      sname: "DASH",
      lname: "Dashboard",
      path: "/"
    },
    {
      id: 2,
      icon: <MdOutlinePendingActions className=' text-xl' />,
      sname: "PT",
      lname: "Pending Transactions",
      path: ["/pending-transaction", `/pending-transaction/details`]
    },
    {
      id: 3,
      icon: <CiBank className=' text-xl' />,
      sname: "AT",
      lname: "All Transactions",
      path: "/all-transaction"
    },
    {
      id: 4,
      icon: <GoHistory className=' text-xl' />,
      sname: "TPR",
      lname: "Transactions Pending for Reco",
      path: "/transactions-reco"
    },
    {
      id: 5,
      icon: <FaListCheck className=' text-xl' />,
      sname: "TH",
      lname: "Transactions History",
      path: "/transaction-history"
    },
  ]

  // Method to handle logout
  const handleLogout = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        });
        if (response.ok) {
            dispatch(setLoggedIn(false));
            navigate('/login', { replace: true });
        } else {
            console.error("Logout failed: Server responded with status", response.status);
        }
    } catch (error) {
        console.error("Logout error:", error);
    }
}

  return (
    <>
      {isLoading ? <h1>loading...</h1> : isLoggedIn && <div style={{ transition: "0.5s", left: postionleft }} className='fixed md:sticky  h-[100vh] top-0 md:left-0 z-50 flex flex-col justify-between items-center py-4  bg-[#2879F3] px-2'>
        <div className="logo text-[#F9FBFD] break-words invisible">
          mnivesh
        </div>
        <ul className=' listoftabs whitespace-nowrap flex flex-col gap-3 items-center text-xs w-full'>
          {
            tabs.map((tab, index) => <Link key={tab.id} className='w-full' to={Array.isArray(tab.path) ? tab.path[0] : tab.path}><motion.li style={Array.isArray(tab.path) ? tab.path.find((item) => item === location.pathname) ? { backgroundColor: "#6AA0F3" } : {} : location.pathname === tab.path ? { backgroundColor: "#6AA0F3" } : {}} key={index} onMouseOver={() => setId(tab.id)} onMouseOut={() => setId(null)} className=' hover:bg-[#6AA0F3] cursor-pointer relative  text-[#F1F6FF] font-medium rounded py-2  flex flex-col items-center gap-1'>{tab.icon}{tab.sname}
              <AnimatePresence>
                {id === tab.id && <motion.div
                  animate={{
                    opacity: 1,
                    scale: 1
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0
                  }}
                  transition={{
                    duration: 0.8,
                    type: "spring"
                  }}
                  className="slide absolute left-20 top-3 py-2 px-3 text-sm bg-[#6AA0F3] text-[#F1F6FF] rounded">
                  {tab.lname}
                </motion.div>}
              </AnimatePresence>
            </motion.li>
            </Link>)
          }
        </ul>

        <button title='Logout' onClick={handleLogout} >
          <FaPowerOff className=' text-[#F1F6FF] text-2xl' />
        </button>

        <button className='md:hidden absolute left-full rounded-md bg-gray-100 top-0 p-2 border' onClick={() => dispatch({
          type: "togglenavtab",
          payload: "-100%"
        })}>
          <IoCloseSharp />
        </button>
      </div>}
    </>
  )
}

export default Menu