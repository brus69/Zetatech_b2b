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

export interface Category {
  id: number;
  /**
   * URL
   * @maxLength 50
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug: string;
  /** Название категории */
  name: string;
}

export interface FAQ {
  id: number;
  answer: string;
  question: string;
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
  id: number;
  /**
   * URL
   * @maxLength 50
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug: string;
  /** Название метки */
  name: string;
}

export interface Otp {
  /** @maxLength 6 */
  code: string;
  /** @maxLength 40 */
  token: string;
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

export interface PatchedUserRequest {
  /**
   * Адрес электронной почты
   * @format email
   * @minLength 1
   * @maxLength 254
   */
  email?: string;
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
  author: number;
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
   * URL
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
  mark: number[];
  category: number[];
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
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  new_username: string;
}

export interface SetUsernameRequest {
  /** @minLength 1 */
  current_password: string;
  /**
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  new_username: string;
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
  username: string;
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
  /**
   * Адрес электронной почты
   * @format email
   * @maxLength 254
   */
  email: string;
  id: number;
  /**
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   */
  username: string;
}

export interface UserCreate {
  /**
   * Адрес электронной почты
   * @format email
   * @maxLength 254
   */
  email: string;
  /**
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
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
  /**
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /** @minLength 1 */
  password: string;
}

export interface UserRequest {
  /**
   * Адрес электронной почты
   * @format email
   * @minLength 1
   * @maxLength 254
   */
  email: string;
}

export interface UsernameResetConfirm {
  /**
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  new_username: string;
}

export interface UsernameResetConfirmRequest {
  /**
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  new_username: string;
}
