import { fork, allSettled, serialize } from 'effector'
import { useUnit } from 'effector-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { $marks, $products, pageStarted } from './model'
import { requestFx } from '@/shared/api'
import { Breadcrumbs, Anchor, Pagination, Text, Select } from '@mantine/core'
import {
  IconChevronRight,
  IconPointFilled,
  IconChevronDown,
} from '@tabler/icons-react'
import { GetServerSideProps } from 'next'
import { ProductCard } from './card/card'
import { NewsCard } from './news/news'
import { $page, $totalPages, pageChanged } from '../blog/model'

const items = [
  { title: 'Главная', href: '/' },
  { title: 'Каталог компаний', href: '/catalog' },
  { title: 'Популярные базы', href: '#' },
].map((item, index) => (
  <Anchor className="text-gray text-base" href={item.href} key={index}>
    {item.title}
  </Anchor>
))

export const getServerSidePropsCatalog: GetServerSideProps = async ({
  query,
}) => {
  const scope = fork()
  const { category, mark } = query

  await allSettled(pageStarted, { scope, params: { category, mark } })

  return {
    props: {
      values: serialize(scope),
      revalidate: 60 * 5, // 5 minutes
    },
  }
}

export const CatalogPage = () => {
  const { products, marks, page, totalPages, onPageChanged } = useUnit({
    products: $products,
    marks: $marks,
    page: $page,
    totalPages: $totalPages,
    onPageChanged: pageChanged,
  })

  function NextButton() {
    return <p className="text-gray text-xs cursor-pointer pl-5">Следующая</p>
  }

  function PrevButton() {
    return <div style={{ display: 'none' }}></div>
  }

  return (
    <>
      <div className="container flex flex-no-wrap">
        <div className="flex flex-col mr-14 w-[399px]">
          <h3 className="font-medium mt-5">Популярные базы</h3>
          {products.slice(-15).map((product) => (
            <Link key={product.slug} href={`/product/$product.slug`}>
              <li className="mb-2 w-[399px] flex text-base hover:bg-light">
                <IconPointFilled className="w-4" />
                &thinsp;
                {product.h1}
              </li>
            </Link>
          ))}

          <Link href="/catalog/">
            <h3 className="font-medium mt-4">Все категории</h3>
          </Link>

          <div className="flex flex-col">
            <h1 className="font-medium">Популярные новости</h1>
            <NewsCard />
            <NewsCard />
            <NewsCard />
            <NewsCard />
          </div>

          <Link href="/blog">
            <Text td="underline">Перейти в блог</Text>
          </Link>
        </div>

        <div className="flex flex-col w-max">
          <h1 className="text-center font-medium">
            Исследуйте данные по меткам
          </h1>
          <div className="flex flex-wrap gap-x-7 gap-y-2 mb-28">
            {marks.slice(-9).map((mark) => (
              <Link
                className="p-1 px-2 text-black rounded bg-lilac"
                key={mark.slug}
                href={`/catalog/mark/${mark.slug}`}
              >
                {mark.name}
              </Link>
            ))}
          </div>

          <Breadcrumbs
            classNames={{
              root: 'text-gray',
              separator: 'text-gray',
            }}
            separator={<IconChevronRight />}
          >
            {items}
          </Breadcrumbs>

          <div className="text-justify w-fit font-normal mt-4 relative inline-block">
            <h1 className="text-center font-medium">Популярные базы</h1>
            <p className="text-xl w-6/7">
              Мы собственноручно подготовили базы компаний по различным
              отраслям: интернет-магазины, строительные компании, поставщики и
              оптовики и т.д., которые вы можете использовать для своего отдела
              продаж.
              <br />
              Все базы созданы и отобраны на основе анализа общедоступной
              информации на сайтах компаний (заголовок, описание сайта). Наши
              подготовленные базы содержат почту, телефоны, ИНН, ОГРН и
              налоговые данные.
            </p>
            <div className="absolute right-0 block z-1">
              <Select
                rightSection=<IconChevronDown />
                color="bg-light"
                radius="xs"
                withCheckIcon={false}
                placeholder="По популярности"
                data={[
                  'Цена: по убыванию',
                  'Цена: по возрастанию',
                  'По новизне',
                  'По рейтингу',
                ]}
                classNames={{
                  option: 'hover:bg-light rounded-none',
                  dropdown: 'p-0 rounded-none -mt-[10px]',
                  input: 'border-light border-2 placeholder-black',
                }}
              />
            </div>
            <div className="flex flex-row flex-wrap mt-24">
              <ProductCard product={product} />
            </div>
            <Pagination
              gap="0"
              withControls={true}
              classNames={{
                control: 'border-none text-base mr-2',
              }}
              nextIcon={NextButton}
              previousIcon={PrevButton}
              value={page}
              total={totalPages}
              onChange={onPageChanged}
            />
          </div>
          <h1 className="text-center font-medium">Больше всего скачивают</h1>
          <div className="flex flex-row flex-wrap"></div>
        </div>
      </div>
    </>
  )
}
