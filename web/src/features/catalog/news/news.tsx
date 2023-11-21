import React from 'react'
import Image from 'next/image'
import news from '../../../../public/assets/catalog/news.svg'

export const NewsCard = () => {
  return (
    <div className="w-[287px] h-[78px] mb-[20px] box-border relative flex items-center">
      <Image src={news} alt="news picture" />
      <div className="ml-[14px]">
        <div className="text-lg font-medium leading-5">
          Массовый перевод сайтов
        </div>
        <div className="text-gray mt-[10px]">02 октября 2023</div>
      </div>
    </div>
  )
}
