import type { CursorBasedResponse } from "./common";

export type Tag = {
    id: number;
    name: string;
};

export type Likes = {
    id: number;
    userId: number;
    lpId: number;
}

export type Author = {
    id: number;
    name: string;
    email: string;
    bio?: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
}

export type Lp = {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    tags: Tag[];
    likes: Likes[];
}

export type ResponseLpListDTO = CursorBasedResponse<Lp[]>;

export type ResponseLPDTO = CursorBasedResponse<{
  data: Lp & { author: Author };
}>;