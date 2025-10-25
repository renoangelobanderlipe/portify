import { IconCircleArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

type AppHeaderProps = {
  title: string;
  description?: string;
  url?: string;
};

export const AppHeader = ({ title, description, url }: AppHeaderProps) => {
  const router = useRouter();

  return (
    <div className="flex items-start gap-4">
      {url && (
        <IconCircleArrowLeft
          size={50}
          className="cursor-pointer hover:text-primary"
          onClick={() => router.push(url)}
        />
      )}
      <div className="flex flex-col gap-2  justify-center  align-middle pb-6">
        <div className="text-4xl font-bold">{title}</div>
        <div className="text-md font-medium">{description}</div>
      </div>
    </div>
  );
};
