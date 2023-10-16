import { Promo } from "./ui/promo";
import { Preview } from './ui/preview';
import { Prices } from './ui/prices';

const HomePage = () => {
  return (
    <>
      <Promo />
      <Preview/>
      <Prices/>
      {/* rest sections here */}
    </>
  );
};

export { HomePage };
