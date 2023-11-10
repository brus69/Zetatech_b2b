import Link from "next/link";
import { useRouter } from "next/router";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IconDoorExit } from "@tabler/icons-react";
import { Button } from "@mantine/core";
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
        "md:min-w-[290px] border-r-light border-solid border-0 border-r",
        props.className
      )}
    >
      <div className="flex flex-col gap-2 mb-8">
        {ITEMS.map(({ path, name }) => (
          <Link
            key={path}
            href={path}
            className={cn(
              "flex items-center gap-2 py-2 px-4 hover:text-orange-700",
              path === router.pathname && "bg-light"
            )}
          >
            {name}
          </Link>
        ))}
      </div>

      <Button
        variant="transparent"
        color="gray"
        type="button"
        className={cn("px-4")}
        onClick={() => {
          router.push("/").then(() => {});
        }}
      >
        <IconDoorExit className="mr-3" />
        Выйти
      </Button>
    </div>
  );
};
