
import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Container: React.FC<ContainerProps> = ({ className, ...props }) => {
  return (
    <div className={cn("container px-4 mx-auto", className)} {...props} />
  );
};
