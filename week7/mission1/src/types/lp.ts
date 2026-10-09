import type { CommonResponse, CursorBasedResponse } from "./common";

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

export type newLp = {
    title: string;
    content: string;
    thumbnail?: string;
    tags: string[];
    published?: boolean;
}

export type RequestLpDTO = {
    lpId: number;
}

export type RequestUpdateLpDTO = {
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
    published: boolean;
}

export type ResponseLpListDTO = CursorBasedResponse<Lp[]>;

export type ResponseLPDTO = CursorBasedResponse<{
  data: Lp & { author: Author };
}>;

export type ResponseAddLpDTO = CommonResponse<{
    data: {
        id: number;
        title: string;
        content: string;
        thumbnail: string;
        published: boolean;
        authorId: number;
        createdAt: Date;
        updatedAt: Date;
    }
}>;

export type ResponseUpdateLpDTO = CommonResponse<{
    data: {
        id: number;
        title: string;
        content: string;
        thumbnail: string;
        published: boolean;
        authorId: number;
        createdAt: Date;
        updatedAt: Date;
        tags: string[];
    }
}>