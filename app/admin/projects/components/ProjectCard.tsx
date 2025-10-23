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
    <Card className="flex flex-col justify-between w-full max-w-sm bg-card text-white border shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="flex flex-col gap-4">
        <div className="relative w-full h-44 ">
          <Image
            //  TODO: To add the thumbnail later after the backend setup
            src={"/sample-image.jpg"}
            alt={title}
            width={400}
            height={180}
            className="object-cover w-full h-full rounded-md"
          />
        </div>

        <CardTitle className="text-wrap w-full pt-4">
          <div className="text-sm leading-none text-primary font-light">
            {type}
          </div>
          <div className="flex justify-between items-center text-3xl font-bold text-secondary">
            {title}
          </div>
        </CardTitle>
        <CardDescription className=" line-clamp-2">
          {description}
        </CardDescription>
        <div className="gap-2 line-clamp-2">
          {tags?.map((tag) => (
            <Badge variant="secondary" key={tag} className="m-1">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardFooter className="w-full flex gap-4">
        <Button
          variant="outline"
          className="flex-1 text-primary border-primary"
        >
          Edit Project
        </Button>
        <Button
          className="flex-1 cursor-pointer"
          onClick={handleProjectLink}
          disabled={!url}
        >
          Project Link
        </Button>
      </CardFooter>
    </Card>
  );
};
