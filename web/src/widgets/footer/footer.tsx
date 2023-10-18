import Link from "next/link";

const items = [
    { url: "/", name: "О нас" },
    { url: "/", name: "Контакты" },
    { url: "/", name: "Отзывы" },
    { url: "/", name: "Блог" },
    { url: "/", name: "API" },
];

const details = [
    { url: "/", name: "Пользовательское соглашение" },
    { url: "/", name: "Оферта" },
    { url: "/", name: "Закон и парсинг" },
    { url: "/", name: "Глосарий" },
    { url: "/", name: "Реквизиты" },
]

export const Footer = () => {
  const date = new Date();

  return (
    <footer className=" bg-[#140B27] text-white pt-[35px] pb-[91px] pl-[5px]">
        <div className=" xl:max-w-[1180px] container flex flex-col md:flex-row gap-[60px] xl:gap-[198px] p-x-[30px] sm:p-0 md:justify-center xl:justify-start">
            <div className="flex flex-col justify-between">
                <div className="flex flex-col gap-[2px]">
                    <img src='/assets/logo_footer_light.svg' alt="Footer logo" className="w-[206px] h-[42px]"/>
                    <p className="text-[#574F6D] text-base m-0">&copy; {date.getFullYear()} Company, Inc</p>
                </div>
                <div className="flex flex-col gap-[15px] xl:gap-[30px] font-medium text-[25px]">
                    <p className="m-0 p-0">8 800 500 50 80</p>
                    <p className="m-0 p-0">info@zetatech.ru</p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-[60px] xl:gap-[137px] md:mt-[116px]">
                <ul className="flex flex-col gap-[6px] p-0 m-0">
                    {items.map(({ url, name }) => (
                        <li key={name}>
                        <Link href={url}>{name}</Link>
                        </li>
                    ))}
                </ul>
                <ul className="flex flex-col gap-[6px] p-0 m-0">
                    {details.map(({ url, name }) => (
                        <li key={name}>
                        <Link href={url}>{name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </footer>
  );
};
