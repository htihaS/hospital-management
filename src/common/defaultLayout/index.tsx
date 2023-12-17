import React from 'react'
import Navbar from './navbar'

function DefaultLayout(Component: any) {
    const Layout = () => {
        return (
            <>
                <Navbar />
                <div className='relative left-[85px] h-screen w-[calc(100vw-85px)]  overflow-y-auto scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-400 scrollbar-thumb-rounded-m'><Component /></div>
            </>
        )
    }
    return Layout
}

export default DefaultLayout