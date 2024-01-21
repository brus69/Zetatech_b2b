import { Title } from "@mantine/core";
import React from "react";

const Contacts = () => {
  return (
    <div className="container">
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
        <div style={{position:"relative", overflow:"hidden"}}>
          <a
            href="https://yandex.ru/maps/2/saint-petersburg/?utm_medium=mapframe&utm_source=maps"
            style={{ color:"#eee", fontSize:"12px", position:"absolute", top:"0" }}
          >
            Санкт‑Петербург
          </a>
          <a
            href="https://yandex.ru/maps/2/saint-petersburg/house/varshavskaya_ulitsa_54/Z0kYdQZkTEwFQFtjfXR3c39jZw==/?ll=30.314592%2C59.862303&utm_medium=mapframe&utm_source=maps&z=16.35"
            style={{ color:"#eee", fontSize:"12px", position:"absolute", top:"14px" }}
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
      <div className="flex flex-row gap-60">
      </div>
    </div>
  );
};

export default Contacts;
