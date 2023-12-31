import { fork, allSettled, serialize } from 'effector'
import { useUnit } from 'effector-react'
import Link from 'next/link'
import { Breadcrumbs, Anchor, Pagination, Text, Select } from '@mantine/core'
import {
  IconChevronRight,
  IconPointFilled,
  IconChevronDown,
} from '@tabler/icons-react'
import { GetServerSideProps } from 'next'
import { $page, $totalPages, pageChanged } from '../blog/model'
import { $blogPosts, $marks, $products, pageStarted } from './model'
import { ProductCard } from './card/card'
import { NewsCard } from './news/news'
import { $categories } from '@/api/categories'
import { $posts } from '../home/model'

const items = [
  { title: 'Главная', href: '/' },
  { title: 'Каталог компаний', href: '/catalog' },
  { title: 'Популярные базы', href: '#' },
].map((item, index) => (
  <Anchor className="text-base text-gray" href={item.href} key={index}>
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
  const {
    products,
    marks,
    page,
    totalPages,
    onPageChanged,
    categories,
    posts,
  } = useUnit({
    products: $products,
    marks: $marks,
    page: $page,
    totalPages: $totalPages,
    onPageChanged: pageChanged,
    categories: $categories,
    posts: $blogPosts,
  })

  function NextButton() {
    return <p className="pl-5 text-xs cursor-pointer text-gray">Следующая</p>
  }

  function PrevButton() {
    return <div style={{ display: 'none' }}></div>
  }

  return (
    <>
      <div className="container flex flex-no-wrap">
        <div className="flex flex-col mr-14 w-[399px]">
          <h3 className="mt-5 font-medium">Популярные базы</h3>
          {categories.slice(-15).map((categorie) => (
            <Link key={categorie.slug} href={`/product/$product.slug`}>
              <li className="mb-2 w-[399px] flex text-base hover:bg-light">
                <IconPointFilled className="w-4" />
                &thinsp;
                {categorie.name}
              </li>
            </Link>
          ))}

          <Link href="/catalog/">
            <h3 className="mt-4 font-medium">Все категории</h3>
          </Link>

          <div className="flex flex-col">
            <h1 className="font-medium">Популярные новости</h1>
            {posts.slice(-3).map((post) => (
              <div className="mb-[20px]">
                <Link href={`/blog/${post.slug}`}>
                  <NewsCard key={post.title} post={post} />
                </Link>
              </div>
            ))}
          </div>

          <Link href="/blog">
            <Text td="underline">Перейти в блог</Text>
          </Link>
        </div>

        <div className="flex flex-col w-max">
          <h1 className="font-medium text-center">
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

          <div className="relative inline-block mt-4 font-normal text-justify w-fit">
            <h1 className="font-medium text-center">Популярные базы</h1>
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
            <div className="flex flex-row flex-wrap mt-24 grid grid-cols-4 grid-rows-2 gap-4 mb-[30px]">
              {products.map((product) => (
                <ProductCard key={product.title} product={product} />
              ))}
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
          <h1 className="font-medium text-center">Больше всего скачивают</h1>
          <div className="flex flex-row flex-wrap grid grid-cols-4 grid-rows-1 gap-4">
            {products.slice(-4).map((product) => (
              <ProductCard key={product.title} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
