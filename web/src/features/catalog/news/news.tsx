import React from 'react'
import Image from 'next/image'
import news from '../../../../public/assets/catalog/news.svg'
import { fork, allSettled, serialize } from 'effector'
import { GetServerSideProps } from 'next'
import { pageStarted } from '../model'
import { $post } from './model'
import { useUnit } from 'effector-react'

export const getServerSidePropsPost: GetServerSideProps = async ({ query }) => {
  const scope = fork()

  await allSettled(pageStarted, { scope, params: { slug: query.slug } })

  if (scope.getState($post) === null) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      values: serialize(scope),
    },
  }
}

export const NewsCard = () => {
  const { post } = useUnit({
    post: $post,
  })
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
