import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='pt-8  text-2xl text-center border-t' >
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row justify-center gap-10 mb-28' >
        <img className='w-full md:w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6' >
          <p className='text-xl font-semibold text-gray-600'>Our Store</p>
          <p className='text-gray-500' >54709 Willms Station<br/>Suite 350, Washington, USA</p>
          <p>Tel: (415) 555-0132 <br/> Email: admin@forever.com</p>
          <p  className='text-xl font-semibold text-gray-600'>Careers at Forever</p>
          <p>Learn more about our teams and job openings.</p>
          <button className='border-black border px-8 py-4 text-sm cursor-pointer hover:bg-black hover:text-white transition-all duration-300' >Explore Jobs</button>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Contact