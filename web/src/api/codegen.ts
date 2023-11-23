/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Activation {
  uid: string;
  token: string;
}

export interface ActivationRequest {
  /** @minLength 1 */
  uid: string;
  /** @minLength 1 */
  token: string;
}

export interface Application {
  name: string;
  /**
   * @format email
   * @maxLength 254
   */
  email: string;
  description?: string | null;
  /** @maxLength 56 */
  format: string;
  /** @format uri */
  attachment?: string | null;
}

export interface ApplicationRequest {
  /** @minLength 1 */
  name: string;
  /**
   * @format email
   * @minLength 1
   * @maxLength 254
   */
  email: string;
  description?: string | null;
  /**
   * @minLength 1
   * @maxLength 56
   */
  format: string;
  /** @format binary */
  attachment?: File | null;
}

export interface CartProducts {
  id: number;
  /**
   * Заголовок веб-страницы
   * @maxLength 100
   */
  title: string;
  /**
   * Слаг
   * @maxLength 50
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug: string;
  /**
   * Цена
   * @min 0
   * @max 32767
   */
  price: number;
}

export interface Category {
  /**
   * Слаг
   * @maxLength 50
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug: string;
  /** Название категории */
  name: string;
  subcategories: string;
}

export interface CategoryId {
  /**
   * Слаг
   * @maxLength 50
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug: string;
  /** Название категории */
  name: string;
}

export interface CategoryInternal {
  /** Название категории */
  name: string;
  /**
   * Слаг
   * @maxLength 50
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug: string;
  parent_category: string;
}

export interface FAQ {
  id: number;
  answer: string;
  question: string;
}

export interface Favorite {
  user_id: number;
  product: Product;
}

export interface FavoriteRequest {
  product: ProductRequest;
}

export interface Grid {
  /**
   * Название преимущества
   * @maxLength 100
   */
  name: string;
  /**
   * Значение
   * @maxLength 100
   */
  value: string;
}

export interface Mark {
  /**
   * Слаг
   * @maxLength 50
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug: string;
  /** Название метки */
  name: string;
}

export interface MarkInternal {
  /** Название метки */
  name: string;
  /**
   * Слаг
   * @maxLength 50
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug: string;
}

export interface Newsletter {
  /**
   * @format email
   * @maxLength 254
   */
  email: string;
}

export interface NewsletterRequest {
  /**
   * @format email
   * @minLength 1
   * @maxLength 254
   */
  email: string;
}

export interface Otp {
  /** @maxLength 6 */
  code: string;
  /** @maxLength 40 */
  token: string;
}

export interface PaginatedFavoriteList {
  /** @example 123 */
  count?: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next?: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous?: string | null;
  results?: Favorite[];
}

export interface PaginatedPostList {
  /** @example 123 */
  count?: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next?: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous?: string | null;
  results?: Post[];
}

export interface PasswordResetConfirm {
  uid: string;
  token: string;
  new_password: string;
}

export interface PasswordResetConfirmRequest {
  /** @minLength 1 */
  uid: string;
  /** @minLength 1 */
  token: string;
  /** @minLength 1 */
  new_password: string;
}

export interface Post {
  id: number;
  /**
   * SEO заголовок
   * @maxLength 60
   */
  title: string;
  /**
   * SEO описание публикации
   * @maxLength 400
   */
  description: string;
  tags: TagPost[];
  /**
   * Заголовок
   * @maxLength 100
   */
  h1: string;
  /** Текст публикации */
  content: string;
  /** @format uri */
  image: string;
  user: number;
  /**
   * Слаг статьи
   * Автоматическое поле, можно заполнить вручную.
   * @maxLength 180
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug?: string;
  /**
   * Дата публикации
   * @format date-time
   */
  pub_date: string | null;
}

export interface Price {
  /**
   * Название тарифа
   * @maxLength 100
   */
  name: string;
  /**
   * Цена
   * @min 0
   * @max 32767
   */
  price: number;
  grid: Grid[];
}

export interface Product {
  /**
   * Заголовок веб-страницы
   * @maxLength 100
   */
  title: string;
  /**
   * Заголовок на странице
   * @maxLength 100
   */
  h1: string;
  /**
   * Изображение
   * @format uri
   */
  img_product?: string | null;
  /**
   * Слаг
   * @maxLength 50
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug: string;
  /**
   * Цена
   * @min 0
   * @max 32767
   */
  price: number;
}

export interface ProductDetail {
  id: number;
  /**
   * Заголовок веб-страницы
   * @maxLength 100
   */
  title: string;
  /**
   * Описание
   * @maxLength 200
   */
  description: string;
  /**
   * Заголовок на странице
   * @maxLength 100
   */
  h1: string;
  /**
   * Изображение
   * @format uri
   */
  img_product?: string | null;
  /**
   * Слаг
   * @maxLength 50
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug: string;
  /**
   * БД Парсинга
   * @format uri
   */
  datafield: string;
  /**
   * Цена
   * @min 0
   * @max 32767
   */
  price: number;
  /**
   * Кол-во загрузок
   * @min 0
   * @max 32767
   */
  downloaded: number;
  /** Краткое описание */
  annotation: string;
  /** Подробное описание */
  content: string;
  mark: MarkInternal[];
  category: CategoryInternal[];
  is_favorite: boolean;
}

export interface ProductRequest {
  /**
   * Заголовок веб-страницы
   * @minLength 1
   * @maxLength 100
   */
  title: string;
  /**
   * Заголовок на странице
   * @minLength 1
   * @maxLength 100
   */
  h1: string;
  /**
   * Изображение
   * @format binary
   */
  img_product?: File | null;
  /**
   * Слаг
   * @minLength 1
   * @maxLength 50
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug: string;
  /**
   * Цена
   * @min 0
   * @max 32767
   */
  price: number;
}

export interface Review {
  id: number;
  /**
   * @min 1
   * @max 5
   */
  rating: number;
  /** @maxLength 1024 */
  text: string;
  /** @maxLength 256 */
  author: string;
}

export interface SendEmailReset {
  /** @format email */
  email: string;
}

export interface SendEmailResetRequest {
  /**
   * @format email
   * @minLength 1
   */
  email: string;
}

export interface SetPassword {
  new_password: string;
  current_password: string;
}

export interface SetPasswordRequest {
  /** @minLength 1 */
  new_password: string;
  /** @minLength 1 */
  current_password: string;
}

export interface SetUsername {
  current_password: string;
  /**
   * Адрес электронной почты
   * @format email
   * @maxLength 254
   */
  new_email: string;
}

export interface SetUsernameRequest {
  /** @minLength 1 */
  current_password: string;
  /**
   * Адрес электронной почты
   * @format email
   * @minLength 1
   * @maxLength 254
   */
  new_email: string;
}

export interface ShortApplication {
  name: string;
  /** @maxLength 26 */
  phone: string;
}

export interface ShortApplicationRequest {
  /** @minLength 1 */
  name: string;
  /**
   * @minLength 1
   * @maxLength 26
   */
  phone: string;
}

export interface TagPost {
  id: number;
  /**
   * Название тега
   * @maxLength 50
   */
  name: string;
  /**
   * Слаг тега
   * Автоматическое поле, можно заполнить вручную.
   * @maxLength 80
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug?: string;
}

export interface Team {
  name: string;
  description: string;
  /**
   * Картинка
   * @format uri
   */
  image: string;
}

export interface TokenObtainPair {
  access: string;
  refresh: string;
}

export interface TokenObtainPairRequest {
  /** @minLength 1 */
  email: string;
  /** @minLength 1 */
  password: string;
}

export interface TokenRefresh {
  access: string;
}

export interface TokenRefreshRequest {
  /** @minLength 1 */
  refresh: string;
}

export interface TokenVerifyRequest {
  /** @minLength 1 */
  token: string;
}

export interface User {
  id: number;
  /**
   * Адрес электронной почты
   * @format email
   */
  email: string;
}

export interface UserCreate {
  /**
   * Адрес электронной почты
   * @format email
   * @maxLength 254
   */
  email: string;
  id: number;
}

export interface UserCreateRequest {
  /**
   * Адрес электронной почты
   * @format email
   * @minLength 1
   * @maxLength 254
   */
  email: string;
  /** @minLength 1 */
  password: string;
}

export interface UsernameResetConfirm {
  /**
   * Адрес электронной почты
   * @format email
   * @maxLength 254
   */
  new_email: string;
}

export interface UsernameResetConfirmRequest {
  /**
   * Адрес электронной почты
   * @format email
   * @minLength 1
   * @maxLength 254
   */
  new_email: string;
}
