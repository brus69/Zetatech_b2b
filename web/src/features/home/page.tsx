import { Promo } from "./ui/promo";
import { Preview } from './ui/preview';
import { Prices } from './ui/prices';
import { Form } from './ui/form';

const HomePage = () => {
  return (
    <>
      <Promo />
      <Preview/>
      <Prices/>
      <Form/>
    </>
  );
};

export { HomePage };
