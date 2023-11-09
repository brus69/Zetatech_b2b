import Link from "next/link";

const items = [
  { url: "/", name: "Закон и парсинг" },
  { url: "/", name: "Глосарий" },
  { url: "/", name: "Реквизиты" },
  { url: "/", name: "Оферта" },
  { url: "/", name: "Пользовательское соглашение" },
];

export const Footer = () => {
  const date = new Date();

  return (
    <footer className=" bg-black text-white flex justify-center">
      <div className="container flex flex-col gap-24">
        <div className="relative box-border p-3 h-36 flex flex-row max-w-[945px] mt-14">
          <img
            src="/assets/footer/line.png"
            alt="Just a line"
            className=" opacity-0 sm:opacity-100 absolute top-0 w-[420px] lg:w-[945px] lg:h-[142px]"
          />
          <p className="absolute text-4xl lg:text-[80px] font-medium top-3 lg:top-12 m-0">
            МЫ ВСЕГДА НА СВЯЗИ
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="flex flex-col gap-7 font-medium text-2xl">
            <Link href="tel:88005005080" target="_blank" className="m-0 p-0">8 800 500 50 80</Link>
            <Link href="mailto:info@zetatech.ru" target="_blank" className="m-0 p-0">info@zetatech.ru</Link>
            <div className="flex flex-row gap-6">
              <Link href="/">
                <img
                  src="/assets/footer/icontg.svg"
                  alt="Иконка Телеграм"
                  className="h-[33px]"
                />
              </Link>
              <Link href="/">
                <img
                  src="/assets/footer/iconyt.svg"
                  alt="Иконка YouTube"
                  className="h-[33px]"
                />
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-7 mb-8 mt-8 sm:mt-0">
            <img src="assets/footer/logo_light.svg" alt="Логотип" className="w-[178px] object-contain" />
            <ul className="flex flex-col gap-1 p-0 m-0">
              {items.map(({ url, name }) => (
                <li key={name}>
                  <Link href={url} className="text-base">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-base text-gray m-0 p-0">
              {" "}
              &copy; {date.getFullYear()} Company, Inc
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
