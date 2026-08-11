"use client";
import { format } from "date-fns";
import { GoDot } from "react-icons/go";
import { Icon } from "@iconify/react";
import CardBox from "../../shared/CardBox";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import { BlogPostType } from "@/app/(DashboardLayout)/types/blog";

interface Btype {
  post: BlogPostType;
  index?: number;
}

const BlogCard = ({ post }: Btype) => {
  const { coverImg, title, view, comments, category, author, createdAt }: any =
    post;

  const linkTo = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  return (
    <div className="lg:col-span-4 md:col-span-6 col-span-12">
      <CardBox className="p-0 overflow-hidden group card-hover">
        <div className="relative">
          <Link href={`/apps/blog/detail/${linkTo}`}>
            <div className="overflow-hidden h-[240px]">
              <Image
                src={coverImg}
                alt={title}
                height={240}
                width={500}
                className="h-full w-full object-cover transition-transform duration-300 motion-reduce:transition-none motion-reduce:transform-none"
              />
            </div>
            <Badge className="absolute bottom-8 end-6 rounded-md border border-border bg-card text-card-foreground shadow-sm">
              2 min Read
            </Badge>
          </Link>

          <div className="flex justify-between items-center -mt-6 px-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="cursor-pointer w-10 h-10" role="img" aria-label={author?.name}>
                    <AvatarImage src={author?.avatar} alt={author?.name} />
                    <AvatarFallback>
                      {author?.name ? author.name[0] : "?"}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>{author?.name}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="px-6 pb-6">
          <Badge variant="gray" className="mt-3 rounded-md">
            {category}
          </Badge>

          <h5 className="text-xl py-6 group-hover:text-interactive">
            <Link
              href={`/apps/blog/detail/${linkTo}`}
              className="line-clamp-2"
            >
              {title}
            </Link>
          </h5>

          <div className="flex flex-wrap gap-3 text-muted-foreground">
            <div className="flex gap-2 items-center text-[15px]">
              <Icon icon="tabler:eye" height="18" aria-hidden="true" /> {view}
            </div>
            <div className="flex gap-2 items-center text-[15px]">
              <Icon
                icon="tabler:message-2"
                height="18"
                aria-hidden="true"
              />{" "}
              {comments?.length}
            </div>
            <div className="ms-auto flex gap-2 items-center text-[15px] tabular-nums">
              <GoDot size="16" aria-hidden="true" />
              <small>{format(new Date(createdAt), "E, MMM d")}</small>
            </div>
          </div>
        </div>
      </CardBox>
    </div>
  );
};

export default BlogCard;
