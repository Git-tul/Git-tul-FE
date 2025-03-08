import { z } from "zod";

const aiSummationSchema = z.boolean().default(false);

const releaseSchema = z.boolean().default(false);

const titleSchema = z
  .string()
  .min(1, {
    message: "최소 하나의 단어는 입력해야 합니다.",
  })
  .max(50, {
    message: "제목은 최대 50자를 넘을 수 없습니다.",
  });

const contentSchema = z.string().min(1, {
  message: "최소 하나의 단어는 입력해야 합니다.",
});

const tagsSchema = z.array(z.string().max(5)).optional();

const referenceSchema = z.string().optional();

export const postSchema = z.object({
  aiSummation: aiSummationSchema,
  release: releaseSchema,
  title: titleSchema,
  content: contentSchema,
  tags: tagsSchema,
  reference: referenceSchema,
});
