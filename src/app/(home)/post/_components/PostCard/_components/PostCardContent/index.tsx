"use client";

import Tag from "@/app/(home)/post/_components/PostCard/_components/PostCardContent/_components/Tag";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus } from "lucide-react";
import { useState } from "react";
import { Control, FieldValues, Path, useFormContext } from "react-hook-form";

interface PostCardContentProps<T extends FieldValues> {
  control: Control<T>;
}

export default function PostCardContent<T extends FieldValues>({ control }: PostCardContentProps<T>) {
  const { setValue, watch } = useFormContext();
  const tags = watch("tags") || [];

  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (tags.length < 5) {
        setValue("tags", [...tags, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const handleRemoveTag = (index: number) => {
    const updatedTags = tags.filter((_: any, i: number) => i !== index);
    setValue("tags", updatedTags); // ✅ 일관성 유지
  };

  return (
    <CardContent className="flex flex-col gap-12">
      <FormField
        control={control}
        name={"title" as Path<T>}
        render={({ field }) => {
          return (
            <FormItem className="flex gap-3 flex-col">
              <FormLabel htmlFor="title">제목 *</FormLabel>
              <FormControl>
                <Input
                  id="title"
                  placeholder="제목을 입력하세요 (최대 50자)"
                  className="rounded-md border-1 border-input/30 h-[48px]"
                  {...field}
                />
              </FormControl>
            </FormItem>
          );
        }}
      />
      <FormField
        control={control}
        name={"content" as Path<T>}
        render={({ field }) => {
          return (
            <FormItem className="flex gap-3 flex-col">
              <FormLabel htmlFor="content">내용 *</FormLabel>
              <FormControl>
                <Textarea
                  id="content"
                  placeholder="내용을 입력하세요"
                  className="rounded-md border-1 !border-input/30 h-[186px] resize-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          );
        }}
      />
      <FormField
        control={control}
        name={"tags" as Path<T>}
        render={({ field }) => {
          return (
            <FormItem className="flex gap-3 flex-col">
              <FormLabel htmlFor="tags">해시태그</FormLabel>
              <FormControl>
                <div
                  className={`relative flex items-center gap-2 border border-input/30 bg-muted-foreground rounded-md ${
                    tags.length == 0 ? "" : "px-2"
                  } min-h-[48px]  focus-within:border-ring/50`}
                >
                  {field.value.map((tag: string, index: number) => {
                    return <Tag key={index} tagIndex={index} handleRemoveTag={handleRemoveTag} tag={tag} />;
                  })}
                  {field.value.length < 5 && (
                    <Input
                      id="tags"
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="해시태그 입력 후 Enter (최대 5개)"
                      className="flex-1 bg-transparent border-none outline-none min-w-[100px] focus-visible:ring-[0px]"
                    />
                  )}
                  <p className={`text-sm text-card-foreground/70 ${tags.length == 0 ? "mr-2" : ""}`}>{tags.length}/5</p>
                </div>
              </FormControl>
            </FormItem>
          );
        }}
      />
      <FormField
        control={control}
        name={"reference" as Path<T>}
        render={({ field }) => {
          const handleAddReference = () => {
            const referenceValue = field.value ? `${field.value}` : "";
            field.onChange(referenceValue);
          };

          return (
            <FormItem className="flex gap-3 flex-col mt-[-20px]">
              <FormLabel htmlFor="reference">레퍼런스 주소</FormLabel>
              <FormControl>
                <div className="flex items-center gap-3">
                  <Input
                    id="reference"
                    placeholder="내용을 입력하세요"
                    className="rounded-md flex-1 border-1 !border-input/30 h-[48px] resize-none"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="h-[48px] w-[48px] border-input/40 bg-muted-foreground"
                    onClick={handleAddReference}
                  >
                    <Plus />
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          );
        }}
      />
    </CardContent>
  );
}
