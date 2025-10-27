"use client";

import { useRouter } from "next/navigation";
import { Fragment } from "react";
import projects from "@/_mock/projectsMock.json";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { PROJECT_URL } from "@/utils/constants/urls";
import { EmptyProject } from "./components/EmptyProject";
import { ProjectCard } from "./components/ProjectCard";

export default function Page() {
  const router = useRouter();

  if (projects.length < 1) return <EmptyProject />;
  return (
    <>
      <div className="flex items-center justify-end pb-12">
        <InteractiveHoverButton
          onClick={() => router.push(PROJECT_URL.projects.new)}
        >
          Add New Project
        </InteractiveHoverButton>
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
              thumbnail={project.thumbnail}
            />
          </Fragment>
        ))}
      </div>
    </>
  );
}
