import { Title } from "@mantine/core";
import React from "react";
import { IconBrandTelegram, IconBrandWhatsapp } from "@tabler/icons-react";

const INFO_EMAIL = "info@zetatech.ru";
const PHONE = "8 800 500 50 80";
const API_EMAIL = "api@zetatech.ru";

const points = [
  {
    text: "Пожелания и вопросы можно направлять нам на почту",
    span: INFO_EMAIL,
  },
  {
    text: "Можно позвонить по телефону",
    span: PHONE,
  },
];

const Contacts = () => {
  return (
    <div className="container mb-24">
      <Title
        order={2}
        classNames={{
          root: "mb-4 mt-12",
        }}
      >
        Контакты
      </Title>
      <p className="text-xl mt-1 mb-5">
        г. Санкт-Петербург, ул. Варшавская, д. 54
      </p>
      <div className="w-full h-[465px]">
        <div style={{ position: "relative", overflow: "hidden" }}>
          <a
            href="https://yandex.ru/maps/2/saint-petersburg/?utm_medium=mapframe&utm_source=maps"
            style={{
              color: "#eee",
              fontSize: "12px",
              position: "absolute",
              top: "0",
            }}
          >
            Санкт‑Петербург
          </a>
          <a
            href="https://yandex.ru/maps/2/saint-petersburg/house/varshavskaya_ulitsa_54/Z0kYdQZkTEwFQFtjfXR3c39jZw==/?ll=30.314592%2C59.862303&utm_medium=mapframe&utm_source=maps&z=16.35"
            style={{
              color: "#eee",
              fontSize: "12px",
              position: "absolute",
              top: "14px",
            }}
          >
            Варшавская улица, 54 — Яндекс Карты
          </a>
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=30.314592%2C59.862303&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1NzQ1MTQ1NRJQ0KDQvtGB0YHQuNGPLCDQodCw0L3QutGCLdCf0LXRgtC10YDQsdGD0YDQsywg0JLQsNGA0YjQsNCy0YHQutCw0Y8g0YPQu9C40YbQsCwgNTQiCg1IhPJBFf9yb0I%2C&z=16.35"
            width="100%"
            height="465px"
            frameBorder="1"
            allowFullScreen={true}
            style={{ position: "relative" }}
          ></iframe>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 lg:gap-60 mt-12">
        <div>
          <p className="text-3xl font-medium m-0">Покупателям</p>
          <ul className="flex flex-col gap-8 p-0 mt-8">
            {points.map(({ text, span }, index) => (
              <li key={index}>
                <p className="m-0 p-0">{text}</p>
                <p className="text-lg font-bold mt-3 mb-0">{span}</p>
              </li>
            ))}
            <li>
              <p className="m-0 p-0">Или написать нам в мессенджеры</p>
              <div className="mt-5 flex flex-row gap-5">
                <a href="https://t.me/glav691" className="cursor-pointer">
                  <IconBrandTelegram width="40px" height="40px" />
                </a>
                <a href="#" className="cursor-pointer">
                  <IconBrandWhatsapp width="40px" height="40px" />
                </a>
              </div>
            </li>
            <li className="mt-3">
              <p className="m-0 p-0">
                Во вопросам сотрудничества и интеграции писать
              </p>
              <p className="text-lg font-bold mt-3 mb-0">{API_EMAIL}</p>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-3xl font-medium m-0">Реквизиты</p>
          <p className="text-lg font-bold mt-8 mb-5">ООО «Рога и копыта»</p>
          <p className="max-w-[400px] m-0">
            191014 г. Санкт-Петербург, ул. Варшавская, д. 54
            <br /> ИНН: 7821694682
            <br />
            КПП: 784101001
            <br />
            р/счет: 40702810055040014692 <br />в СЕВЕРО-ЗАПАДНЫЙ БАНК ПАО
            СБЕРБАНК г. Санкт-Петербург <br />
            к/счет: 30101810500000000653 <br />
            БИК: 044030653
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
