"use client";

import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Control, FieldValues, Path } from "react-hook-form";

interface PostCardHeaderProps<T extends FieldValues> {
  control: Control<T>;
}

export default function PostCardHeader<T extends FieldValues>({ control }: PostCardHeaderProps<T>) {
  return (
    <CardHeader className="flex flex-row items-center gap-5">
      <FormField
        control={control}
        name={"aiSummation" as Path<T>}
        render={({ field }) => (
          <FormItem className="flex gap-5 items-center">
            <div className="flex items-center gap-3">
              <FormLabel htmlFor="ai-summation">AI 요약 생성</FormLabel>
              <FormControl>
                <Switch id="ai-summation" checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={"release" as Path<T>}
        render={({ field }) => (
          <FormItem className="flex gap-5 items-center">
            <div className="flex items-center gap-3">
              <FormLabel htmlFor="release">공개 설정</FormLabel>
              <FormControl>
                <Switch id="release" checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </div>
          </FormItem>
        )}
      />
    </CardHeader>
  );
}
