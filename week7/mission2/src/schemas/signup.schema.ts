import z from "zod";

export const schema = z.object({
  name: z.string()
    .min(1, {
      message: "이름을 입력해주세요."
    }),
  email: z.string().email({message: "올바른 이메일 형식이 아닙니다."}),
  password: z.string()
    .min(8, {
      message: "비밀번호는 8자 이상이어야 합니다."
    })
    .max(20,{
      message: "비밀번호는 20자 이하여야 합니다."
    }),
  passwordCheck: z.string()
    .min(8, {
      message: "비밀번호는 8자 이상이어야 합니다."
    })
    .max(20,{
      message: "비밀번호는 20자 이하여야 합니다."
    })
})
.refine ((data)=> data.password === data.passwordCheck,{ // 반대 조건 적어주기
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordCheck"],
});

export type FormFields = z.infer<typeof schema>;
