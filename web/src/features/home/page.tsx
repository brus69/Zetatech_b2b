import { Promo } from "./ui/promo";
import { Preview } from './ui/preview';
import { Prices } from './ui/prices';
import { Form } from './ui/form';
import { Questions } from './ui/questions';
import { Blog } from './ui/blog';
import { Newsletter } from './ui/newsletter';

const HomePage = () => {
  return (
    <>
      <Promo />
      <Preview/>
      <Prices/>
      <Form/>
      <Questions/>
      <Blog/>
      <Newsletter/>
    </>
  );
};

export { HomePage };
