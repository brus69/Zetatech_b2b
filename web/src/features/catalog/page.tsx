import { fork, allSettled, serialize } from 'effector'
import { useUnit } from 'effector-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { $marks, $products, pageStarted } from './model'
import { requestFx } from '@/shared/api'
import { Breadcrumbs, Anchor, NavLink } from '@mantine/core'
import { IconChevronRight, IconPointFilled } from '@tabler/icons-react'
import { BlogCard } from '@/widgets/blog-card'
import { $posts } from '../home/model'

const items = [
  { title: 'Главная', href: '/' },
  { title: 'Каталог компаний', href: '/catalog' },
  { title: 'Популярные базы', href: '#' },
].map((item, index) => (
  <Anchor className="text-base" href={item.href} key={index}>
    {item.title}
  </Anchor>
))

export const getServerSidePropsCatalog = async () => {
  const scope = fork()

  await allSettled(pageStarted, { scope })

  return {
    props: {
      values: serialize(scope),
      revalidate: 60 * 5, // 5 minutes
    },
  }
}

export const CatalogPage = () => {
  const { products, marks, posts } = useUnit({
    products: $products,
    marks: $marks,
    posts: $posts,
  })

  useEffect(() => {
    requestFx({
      path: '/cart/',
    })
  }, [])

  return (
    <>
      {posts.slice(-3).map((post) => (
        <BlogCard post={post} key={post.title}></BlogCard>
      ))}
      {console.log(posts)}
      <div className="grid grid-cols-10 grid-rows-6 gap-4">
        <div className="col-span-2 row-span-3 col-start-2 ml-2">
          <h3 className="font-medium mt-10">Популярные базы</h3>
          <div>
            {products.map((product) => (
              <Link key={product.slug} href={`/product/$product.slug`}>
                <li className="mb-2 flex items-center text-base">
                  <IconPointFilled className="w-4" />
                  &thinsp;
                  {product.h1}
                </li>
              </Link>
            ))}
            <h3 className="font-medium mt-10">Все категории</h3>
          </div>
        </div>
        <div className="col-span-2 row-span-3 col-start-2 row-start-4">
          <h1 className="font-normal">Популярные новости</h1>
        </div>
        <div className="col-span-6 col-start-4 row-start-1 ml-6 relative">
          <h1 className="text-center font-normal">
            Исследуйте данные по меткам
          </h1>
          <div className="flex flex-wrap gap-x-7 gap-y-2 mb-8">
            {marks.map((mark) => (
              <Link
                className="p-1 px-2 text-black rounded bg-lilac"
                key={mark.slug}
                href={`/catalog/mark/${mark.slug}`}
              >
                {mark.name}
              </Link>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 text-center">
            <Breadcrumbs separator=<IconChevronRight />>{items}</Breadcrumbs>
          </div>
        </div>
        <div className="col-span-6 col-start-4 row-start-2 relative">
          <h1 className="text-center font-normal">Популярные базы</h1>
          <div className="ml-6 absolute text-justify text-xl w-fit font-normal">
            Мы собственноручно подготовили базы компаний по различным отраслям:
            интернет-магазины, строительные компании, поставщики и оптовики и
            т.д., которые вы можете использовать для своего отдела продаж.
            <br /> <p /> Все базы созданы и отобраны на основе анализа
            общедоступной информации на сайтах компаний (заголовок, описание
            сайта). Наши подготовленные базы содержат почту, телефоны, ИНН, ОГРН
            и налоговые данные.
          </div>
        </div>
        <div className="col-span-6 row-span-3 col-start-4 row-start-3">
          <div className="absolute">
            <NavLink label="First parent link" childrenOffset={0}>
              <NavLink label="First child link" />
              <NavLink label="Second child link" />
            </NavLink>
          </div>
          замапанные карточки
        </div>
        <div className="col-span-6 col-start-4 row-start-6">
          Больше всего скачивают
        </div>
      </div>
    </>
  )
}
