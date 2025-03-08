"use client";

import PostCardContent from "@/app/(home)/post/_components/PostCard/_components/PostCardContent";
import PostCardHeader from "@/app/(home)/post/_components/PostCard/_components/PostCardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { postSchema } from "@/schema/postSchema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PreviewCard from "@/app/(home)/post/_components/PostCard/_components/PreviewCard";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

export default function PostCard() {
  const postCardForm = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      aiSummation: false,
      release: false,
      title: "",
      content: "",
      tags: [],
      reference: "",
    },
    mode: "onSubmit",
  });

  const handleSubmitPost = (data: z.infer<typeof postSchema>) => {
    console.log(data);
  };

  return (
    <FormProvider {...postCardForm}>
      <Dialog>
        <Card className="w-full h-fit min-w-[700px]">
          <form onSubmit={postCardForm.handleSubmit(handleSubmitPost)} className=" flex flex-col gap-10">
            <PostCardHeader control={postCardForm.control} />
            <PostCardContent control={postCardForm.control} />
            <CardFooter>
              <div className="ml-auto flex gap-2">
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    className="border-1 p-5 hover:bg-muted-foreground hover:text-white"
                  >
                    미리보기
                  </Button>
                </DialogTrigger>
                <Button type="submit" variant="default" className="border-1 p-5 bg-primary hover:bg-primary/90">
                  발행하기
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
        <PreviewCard />
      </Dialog>
    </FormProvider>
  );
}
