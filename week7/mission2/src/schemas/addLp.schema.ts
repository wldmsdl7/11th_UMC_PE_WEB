import z from "zod";

export const lpFormSchema = z.object({
  title: z.string()
    .min(1, {
        message: "LP 이름을 입력해주세요."
    }),
  content: z.string()
    .min(1, {
        message: "LP 내용을 입력해주세요."
    }),
});

export type addLPFormFields = z.infer<typeof lpFormSchema>;