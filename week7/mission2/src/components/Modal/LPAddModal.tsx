import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { lpFormSchema, type addLPFormFields } from "../../schemas/addLp.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { newLp } from "../../types/lp";
import { usePostLP } from '../../hooks/mutations/usePostLP';

interface LPCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LPCreateModal({ isOpen, onClose }: LPCreateModalProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [lpTag, setLpTag] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
      register, 
      handleSubmit, 
      reset, // 폼 제출 후 비우는 함수
      formState: {errors, isSubmitting}
  } = useForm <addLPFormFields> ({
        defaultValues: {
            title: "",
            content: ""
        },
        resolver: zodResolver(lpFormSchema),
        mode: "onChange" // 입력할 때 마다 검증
  });

  const handleLPClick = () => {
    fileInputRef.current?.click();
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAddTag = () => {
    if (lpTag.trim() && !tags.includes(lpTag.trim())) {
      setTags([...tags, lpTag.trim()]);
      setLpTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleClose = () => {
    reset();
    setTags([]);
    setImage(null);
    onClose();
  };

  const onFormSubmit = (data: addLPFormFields) => {
  const lpData: newLp = {
    ...data,       // title, content
    tags,          
    thumbnail: image!,
    published: true, //임의의 값        
  };

  handleAddLp(lpData);

  handleClose();
  };

  const handleAddLp = (lpData: newLp) => {
    addLpMutate(lpData);
  }

  const {mutate: addLpMutate} = usePostLP();

  if (!isOpen) return null;

  return (
    <div className="fixed flex items-center justify-center inset-0 z-50"
        onClick={handleClose}
    >  
      {/* 배경 */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* 모달 컨텐츠 */}
      <div
        className="relative bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl z-10"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 이벤트 전파 방지
      >
      <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md relative shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <MdClose size={24} />
        </button>

        <div className="flex flex-col items-center gap-6">
            <div className="relative w-80 h-80 rounded-full bg-gray-800 shadow-2xl flex items-center justify-center cursor-pointer overflow-hidden" onClick={handleLPClick}>
                {/* LP 이미지 */}
                {image && (
                    <img
                    src={image}
                    alt="LP"
                    className="w-full h-full object-cover rounded-full"
                    />
                )}

                {/* CD 중앙 하얀 구멍 */}
                <div className="absolute w-16 h-16 bg-white rounded-full z-10 opacity-80" />

                {/* 숨겨진 파일 input */}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

        {/* 입력 폼 */}
            <form className="flex flex-col items-center gap-6 w-full" 
                    onSubmit={handleSubmit(onFormSubmit)}>
                <input
                    type="text"
                    {...register("title")}
                    placeholder="LP 이름을 입력하세요."
                    className={`w-full bg-gray-700 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600 ${
                    errors.title ? "border-red-500" : "border-gray-600"
                    }`}
                />
                {errors.title && <p className="text-red-500 text-sm w-full">{errors.title.message}</p>}

                <textarea
                    {...register("content")}
                    placeholder="LP Content"
                    rows={3}
                    className={`w-full bg-gray-700 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600 resize-none ${
                    errors.content ? "border-red-500" : "border-gray-600"
                    }`}
                />
                {errors.content && (
                    <p className="text-red-500 text-sm w-full">{errors.content.message}</p>
                )}


                <div className="flex gap-2 w-full">
                    <input
                        type="text"
                        value={lpTag}
                        onChange={(e) => setLpTag(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag();
                            }
                        }}
                        placeholder="LP Tag"
                        className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600"
                        />
                        <button 
                          type='button'
                          onClick={handleAddTag}
                          className="px-6 py-3 bg-gray-600 hover:bg-gray-500 rounded-lg text-white font-medium transition"
                    >
                    Add
                    </button>
                </div>

                {/* 추가된 태그 표시 */}
                {tags.length > 0 && (
                    <div className="w-full flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                        key={tag}
                        className="bg-pink-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                        >
                        {tag}
                        <button
                            onClick={() => handleRemoveTag(tag)}
                            className="hover:text-gray-300"
                        >
                            ×
                        </button>
                        </span>
                    ))}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-gray-600 hover:bg-gray-500 rounded-lg text-white font-semibold transition"
                >
                    Add LP
                </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}