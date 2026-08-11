"use client";
import React, { useEffect, useContext } from "react";
import { usePathname } from "next/navigation";
import { FaQuoteLeft } from "react-icons/fa";
import { GoDot } from "react-icons/go";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { uniqueId } from "lodash";
import CardBox from "@/app/components/shared/CardBox";
import Image from "next/image";
import BlogComment from "./BlogCommnets";
import { BlogContext, BlogContextProps } from "../../../../context/BlogContext/index";
import { BlogType } from "@/app/(DashboardLayout)/types/blog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const BlogDetailData = () => {
  const { posts, setLoading, addComment }: BlogContextProps =
    useContext(BlogContext);
  const pathName = usePathname();
  const getTitle: string | any = pathName.split("/").pop();
  const post = posts.find(
    (p) =>
      p.title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "") === getTitle
  );
  const [replyTxt, setReplyTxt] = React.useState("");

  const onSubmit = () => {
    if (!post || !post.id) return;
    const newComment = {
      id: uniqueId("#comm_"),
      profile: {
        id: uniqueId("#USER_"),
        avatar: post.author?.avatar || "",
        name: post.author?.name || "",
        time: "Now",
      },
      comment: replyTxt,
      replies: [],
      postId: post.id,
    };
    addComment(post.id, newComment);
    setReplyTxt("");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <>
      {post ? (
        <>
          <CardBox className="p-0 overflow-hidden">
            <div className="relative">
              <div className="overflow-hidden max-h-[440px]">
                <Image
                  src={post?.coverImg}
                  alt={post?.title}
                  height={440}
                  width={1500}
                  className="w-full object-cover object-center"
                />
              </div>
              <Badge variant={"gray"} className="absolute bottom-8 end-6">2 min Read</Badge>
            </div>
            <div className="flex justify-between items-center -mt-11 px-6 w-fit">
              <div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Avatar className="h-10 w-10" role="img" aria-label={post?.author.name}>
                        <AvatarImage src={post?.author.avatar} alt={post?.author.name} />
                        <AvatarFallback>
                          {post?.author?.name?.[0] || "?"}
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>{post?.author.name}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className="px-6 pb-6">
              <Badge variant="gray" className="mt-3">
                {post?.category}
              </Badge>
              <h2 className="md:text-4xl text-2xl my-6">{post?.title}</h2>
              <div>
                <div className="flex flex-wrap gap-3 text-muted-foreground">
                  <div className="flex gap-2 items-center text-[15px]">
                    <Icon icon="tabler:eye" height="18" aria-hidden="true" />
                    {post?.view}
                  </div>
                  <div className="flex gap-2 items-center text-[15px]">
                    <Icon
                      icon="tabler:message-2"
                      height="18"
                      aria-hidden="true"
                    />{" "}
                    {post?.comments?.length || 0}
                  </div>
                  <div className="ms-auto flex gap-2 items-center text-[15px] tabular-nums">
                    <GoDot size="16" aria-hidden="true" />
                    <small>
                      {post && post.createdAt
                        ? format(new Date(post.createdAt), "E, MMM d")
                        : ""}
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-0 mb-4 bg-border" />

            <div className="px-6 pb-6">
              <h2 className="md:text-3xl text-2xl pb-5">Title of the paragraph</h2>
              <p className="text-muted-foreground">
                But you cannot figure out what it is or what it can do...
              </p>
              <br />
              <p className="text-muted-foreground">
                Gigure out what it is or what it can do...
              </p>
              <br />
              <p>
                <b className="text-foreground">This is strong text.</b>
              </p>
              <i>This is italic text.</i>

              <Separator className="my-8 h-px border-0 bg-border"/>

              <h3 className="text-xl mb-3">Unorder list</h3>
              <ul className="list-disc pl-6">
                <li>Gigure out what it is or</li>
                <li>The links it currently</li>
                <li>It allows you to start your bid</li>
              </ul>

              <Separator className="my-8 h-px border-0 bg-border"/>

              <h3 className="text-xl mb-3">Order list</h3>
              <ol className="list-decimal pl-6">
                <li>Gigure out what it is or</li>
                <li>The links it currently</li>
                <li>It allows you to start your bid</li>
              </ol>

              <Separator className="my-8 h-px border-0 bg-border"/>

              <h3 className="text-xl mb-3">Quotes</h3>
              <div className="pt-5 pb-4 px-4 rounded-lg border-s-2 border-interactive bg-accent text-accent-foreground flex gap-2 items-start">
                <FaQuoteLeft size={20} className="text-accent-foreground -mt-1" aria-hidden="true" />
                <h2 className="text-base font-bold text-accent-foreground">
                  Life is short, Smile while you still have teeth!
                </h2>
              </div>
            </div>
          </CardBox>

          <CardBox className="mt-6">
            <h5 className="text-xl mb-2">Post Comments</h5>
            <label htmlFor="post-comment" className="sr-only">
              Write your comment
            </label>
            <Textarea
              id="post-comment"
              rows={4}
              value={replyTxt}
              onChange={(e) => setReplyTxt(e.target.value)}
              placeholder="Write your comment..."
            />
            <Button
              variant="default"
              className="w-fit mt-3 rounded-md"
              onClick={onSubmit}
            >
              Post Comment
            </Button>

            <div className="mt-6">
              <div className="flex gap-3 items-center">
                <h5 className="text-xl">Comments</h5>
                <div className="h-8 min-w-8 rounded-full bg-interactive/10 flex items-center justify-center text-interactive font-bold tabular-nums">
                  {post?.comments?.length || 0}
                </div>
              </div>
              <div>
                {post?.comments?.map((comment: BlogType | any) => {
                  return <BlogComment key={comment.id} comment={comment} />;
                })}
              </div>
            </div>
          </CardBox>
        </>
      ) : (
        <p className="text-xl text-center py-6 font-bold">No Post Found</p>
      )}
    </>
  );
};
export default BlogDetailData;
