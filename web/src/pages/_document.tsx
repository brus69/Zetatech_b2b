import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
import { APP_CONFIG } from "@/shared/config";

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        {!APP_CONFIG.IS_DEV && (
          <>
            <Script
              id="metrika-counter"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
											(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                      
											ym(9999999999999, "init", {
                        clickmap:true,
														trackLinks:true,
														accurateTrackBounce:true,
														webvisor:true
                          })
            `,
              }}
            />
          </>
        )}
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
