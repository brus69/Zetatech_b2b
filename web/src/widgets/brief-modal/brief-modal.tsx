import {
  Alert,
  Button,
  FileInput,
  Input,
  Modal,
  Select,
  Textarea,
  Title,
} from "@mantine/core";
import { IconChevronDown, IconPaperclip, IconX } from "@tabler/icons-react";
import { useUnit } from "effector-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  $createApplicationError,
  $createApplicationSuccess,
  $isOpen,
  createApplication,
  createApplicationFx,
  isOpenChanged,
  setForm,
} from "./model";
import { ApplicationRequest } from "@/api/codegen";

export const BriefModal = () => {
  const {
    isOpen,
    loading,
    createApplicationSuccess,
    createApplicationError,
    onIsOpenChanged,
    onCreateApplication,
    onSetForm,
  } = useUnit({
    isOpen: $isOpen,
    onSetForm: setForm,
    onIsOpenChanged: isOpenChanged,
    createApplicationSuccess: $createApplicationSuccess,
    createApplicationError: $createApplicationError,
    onCreateApplication: createApplication,
    loading: createApplicationFx.pending,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ApplicationRequest>({
    values: {
      name: "",
      email: "",
      description: "",
      format: "",
      attachment: null,
    },
  });

  useEffect(() => {
    onSetForm({ reset });
  }, [reset]);

  const onSubmit = async (data: ApplicationRequest) => {
    onCreateApplication(data);
  };

  return (
    <Modal.Root
      opened={isOpen}
      onClose={() => onIsOpenChanged(false)}
      fullScreen
    >
      <Modal.Overlay backgroundOpacity={0}></Modal.Overlay>
      <Modal.Content className="block h-screen px-0 m-0 max-h-min min-w-screen">
        <div className="container relative p-10">
          <Button
            onClick={() => onIsOpenChanged(false)}
            variant="transparent"
            color="black"
            className="absolute right-0"
          >
            <IconX />
          </Button>

          <Title maw={655} className="mb-2 text-3xl md:text-5xl">
            Привет! Расскажите коротко о вашей задаче
          </Title>
          <p className="text-sm text-grey">
            или свяжитесь с нами по эл. почте{" "}
            <Link href="mailto:info@zetatech.ru">info@zetatech.ru</Link>
          </p>

          {createApplicationError && (
            <Alert color="red" className="my-4 w-fit" p={16}>
              {createApplicationError}
            </Alert>
          )}

          {createApplicationSuccess && (
            <Alert className="my-4 w-fit" p={16}>
              Ваша обращение успешно отправлено. Мы скоро с вами свяжемся.
            </Alert>
          )}

          <form
            className="flex flex-col gap-10 max-w-[680px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-10 md:flex-row">
              <Input.Wrapper error={errors.name?.message} className="flex-1">
                <Input
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Данное поле обязательно",
                    },
                  })}
                  placeholder="Имя"
                  error={errors.name?.message}
                ></Input>
              </Input.Wrapper>
              <Input.Wrapper error={errors.email?.message} className="flex-1">
                <Input
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Данное поле обязательно",
                    },
                  })}
                  error={errors.email?.message}
                  placeholder="Электронная почта"
                ></Input>
              </Input.Wrapper>
            </div>
            <Textarea
              {...register("description")}
              rows={6}
              placeholder="Укажите откуда нужно собрать данные (если вам требуется парсер только для определенных разделов вы можете указать ссылки на них, либо наоборот перечислить только те ссылки, которые необходимо исключить)"
            ></Textarea>

            <div className="flex flex-col gap-10 md:flex-row">
              <Controller
                name="format"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Данное поле обязательно",
                  },
                }}
                render={({ field }) => (
                  <Select
                    className="flex-1"
                    key={field.value}
                    allowDeselect
                    placeholder="Формат полученных данных"
                    data={["CSV", "JSON", "EXCEL"]}
                    error={errors.format?.message}
                    rightSection={<IconChevronDown />}
                    {...field}
                  ></Select>
                )}
              />

              <Controller
                control={control}
                name="attachment"
                render={({ field: { onChange, ...field } }) => {
                  return (
                    <FileInput
                      {...field}
                      className="flex-1"
                      onChange={(file) => {
                        onChange(file);
                      }}
                      placeholder="Прикрепить доп. материалы"
                      rightSection={<IconPaperclip width={24} />}
                    />
                  );
                }}
              />
            </div>

            <div className="flex flex-col-reverse items-center gap-10 md:flex-row">
              <Button loading={loading} type="submit">
                Отправить
              </Button>
              <p className="text-sm text-grey">
                Отправляя форму, я соглашаюсь с политикой обработки
                и использования персональных данных
              </p>
            </div>
          </form>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
