import React from 'react'
import logo from '../imgs/footer-logo.svg'
const footer = () => {
  return (
    <footer className="bg-coral-pink text-grey w-full mx-auto py-6 px-10 mt-20">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Company Information Section */}
        <div className="space-y-2">
          <h3 className="font-semibold">THÔNG TIN</h3>
          <p>Trường Đại Học Khoa Học Tự Nhiên - DHQG HCM</p>
          <p>Đây là đồ án xây dựng website đọc truyện online của nhóm Marknet cho môn học Thiết kế phần mềm</p>
          <h3 className="font-semibold">LIÊN HỆ</h3>
          <p>Email: masknet1122@gmail.com</p>
          <p>@copyright 2024. Masknet Ltd. All rights reserved</p>
        </div>
    

        {/* Logo Section */}
          <div className="flex flex-col items-center">
            <img src={logo} alt="Masknet Logo" className="h-[200px]" />
            <p className="font-bold text-center text-md">MASKNET MASKNET</p>
          </div>
      </div>
    </footer>
  )
}

export default footer;