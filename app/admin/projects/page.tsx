"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import projects from "@/_mock/projectsMock.json";
import { AppHeader } from "@/components/ui/app-header";
import { Button } from "@/components/ui/button";
import { EmptyProject } from "./components/EmptyProject";
import { ProjectCard } from "./components/ProjectCard";

export default function Page() {
  const router = useRouter();

  if (projects.length < 1) return <EmptyProject />;
  return (
    <>
      <div className="flex items-center justify-between">
        <AppHeader title="Projects" description="lorem ipsum" />
        <div>
          <Button onClick={() => router.push("/admin/projects/new")}>
            Add New Project <Plus />
          </Button>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {projects.map((project) => (
          <Fragment key={project.id}>
            <ProjectCard
              title={project.title}
              description={project.description}
              tags={project.tags}
              type={project.project_type}
              url={project.url}
            />
          </Fragment>
        ))}
      </div>
    </>
  );
}
