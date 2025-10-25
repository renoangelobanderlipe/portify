"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ProjectCardProps = {
  title: string;
  description?: string;
  tags?: string[];
  type?: string;
  url?: string;
};

export const ProjectCard = (props: ProjectCardProps) => {
  const { title, description, tags, type, url } = props;
  console.log("test", url === "");

  const router = useRouter();

  const handleProjectLink = () => {
    if (!url) return;

    const isExternal = /^https?:\/\//.test(url);

    if (isExternal) {
      window.open(url, "_blank");
    } else {
      router.push(url);
    }
  };

  return (
    <Card className="bg-card flex w-full max-w-sm flex-col justify-between overflow-hidden rounded-xl border text-white shadow-lg">
      <CardHeader className="flex flex-col gap-4">
        <div className="relative h-44 w-full">
          <Image
            //  TODO: To add the thumbnail later after the backend setup
            src={"/sample-image.jpg"}
            alt={title}
            width={400}
            height={180}
            className="h-full w-full rounded-md object-cover"
          />
        </div>

        <CardTitle className="w-full pt-4 text-wrap">
          <div className="text-primary text-sm leading-none font-light">
            {type}
          </div>
          <div className="text-secondary flex items-center justify-between text-3xl font-bold">
            {title}
          </div>
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
        <div className="line-clamp-2 gap-2">
          {tags?.map((tag) => (
            <Badge
              variant="secondary"
              key={crypto.randomUUID()}
              className="m-1"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardFooter className="grid gap-4 sm:grid-cols-2">
        <Button variant="outline" className="border-primary text-primary">
          Edit Project
        </Button>

        <Button
          variant="default"
          onClick={handleProjectLink}
          disabled={!url}
          className={!url ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
        >
          Project Link
        </Button>
      </CardFooter>
    </Card>
  );
};
