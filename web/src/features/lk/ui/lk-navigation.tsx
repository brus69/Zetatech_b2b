import { useUnit } from "effector-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IconDoorExit } from "@tabler/icons-react";
import { cn } from "@/shared/lib";

type Props = {} & DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const ITEMS = [
  {
    path: "/lk/orders",
    name: "Мои заказы",
  },
  {
    path: "/lk/favorites",
    name: "Избранное",
  },
  {
    path: "/lk/plan",
    name: "Тарифный план",
  },
  {
    path: "/lk/account",
    name: "Личный данные",
  },
];

export const LkNavigation = (props: Props) => {
  const router = useRouter();

  return (
    <div
      {...props}
      className={cn(
        "py-2 rounded-lg w-full max-w-[200px] flex-1 sticky top-8 self-start hidden sm:block",
        props.className
      )}
    >
      <div className="bg-orange-500 h-[1px] my-2" />

      <div className="flex flex-col gap-2 font-medium">
        {ITEMS.map(({ path, name }) => (
          <Link
            key={path}
            href={path}
            className={cn(
              "flex items-center gap-2 my-1 rounded-lg  hover:text-orange-700",
              path === router.pathname && "text-orange-500"
            )}
          >
            {name}
          </Link>
        ))}
      </div>

      <div className="bg-orange-500 h-[1px] my-2" />

      <button
        type="button"
        className={cn(
          "flex items-center gap-2 rounded-lg  hover:text-gray-700 w-full font-normal"
        )}
        onClick={() => {
          router.push("/").then(() => {});
        }}
      >
        <IconDoorExit />
        Выйти
      </button>
    </div>
  );
};
