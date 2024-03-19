import api from '@/api/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Account } from '@/api/account';
import Toast from 'react-native-toast-message';

export interface Comment {
  id: number;
  body: string;
  date: string;
  author: Account;
  authorID: number;
  postID: number;
  own: boolean;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  date: string;
  productEAN?: string | null;
  upVotes: number;
  downVotes: number;
  author: Account;
  comments: Comment[];
  vote: boolean | null;
  own: boolean;
}

export const fetchPosts = async () => {
  return api.get('/post/general').then((res) => {
    const arr: Post[] = res.data.map((post: any) => {
      return {
        ...post,
        content: post.body,
      };
    });

    arr.sort((a, b) => {
      return b.id - a.id;
    });
    return arr;
  });
};

export const fetchPostsByEAN = async (ean: string) => {
  return api.get(`/post/product/${ean}`).then((res) => {
    const arr: Post[] = res.data.map((post: any) => {
      return {
        ...post,
        content: post.body,
      };
    });

    arr.sort((a, b) => {
      return b.id - a.id;
    });
    return arr;
  });
};

export const fetchOwnPosts = async () => {
  return api.get('/post').then((res) => {
    const arr: Post[] = res.data.map((post: any) => {
      return {
        ...post,
        content: post.body,
      };
    });

    arr.sort((a, b) => {
      return b.id - a.id;
    });
    return arr;
  });
};

export const fetchPost = async (id: string) => {
  return api.get(`/post/${id}`).then((res) => {
    let comments: Comment[] = res.data.comments;
    comments.reverse();

    return {
      ...res.data,
      content: res.data.body,
      comments,
    } as Post;
  });
};

export const createPost = async (
  title: string,
  content: string,
  ean?: string,
) => {
  return api
    .post('/post', { title, content, ean })
    .then((res) => res.data as Post);
};

export const updatePost = async (
  id: string,
  title: string,
  content: string,
) => {
  return api
    .patch(`/post/${id}`, { title, content })
    .then((res) => res.data as Post);
};

export const deletePost = async (id: string) => {
  return api.delete(`/post/${id}`).then((res) => res.data as Post);
};

export const createVote = async (id: string, vote: boolean) => {
  return api.post(`/post/vote/${id}`, { vote }).then((res) => res.data);
};

export const deleteVote = async (id: string) => {
  return api.delete(`/post/vote/${id}`).then((res) => res.data);
};

export const createComment = async (id: string, body: string) => {
  return api.post(`/comment/${id}`, { body }).then((res) => res.data);
};

export const deleteComment = async (id: string) => {
  return api.delete(`/comment/${id}`).then((res) => res.data);
};

export const useGetPosts = () => {
  return useQuery({ queryKey: ['posts'], queryFn: fetchPosts });
};

export const useGetPostsByEAN = (ean: string) => {
  return useQuery({
    queryKey: ['posts', ean],
    queryFn: () => fetchPostsByEAN(ean),
    enabled: !!ean,
  });
};

export const useGetOwnPosts = () => {
  return useQuery({ queryKey: ['posts', 'own'], queryFn: fetchOwnPosts });
};

export const useGetPost = (id: string) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      title,
      content,
      ean,
    }: {
      title: string;
      content: string;
      ean?: string;
    }) => createPost(title, content, ean),
    onError: (err) => {
      Toast.show({
        type: 'customToast',
        text1: 'Error',
        text2: err.message,
        position: 'bottom',
        visibilityTime: 8000,
      });
    },
    onSettled: async (data, error, variables, context) => {
      if (variables.ean !== null) {
        await queryClient.invalidateQueries({
          queryKey: ['posts', variables.ean],
        });
      } else {
        await queryClient.invalidateQueries({ queryKey: ['posts'] });
      }
    },
  });
};

export const useUpdatePost = () => {
  return useMutation({
    mutationFn: ({
      id,
      title,
      content,
    }: {
      id: string;
      title: string;
      content: string;
    }) => updatePost(id, title, content),
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSettled: async (data, error, id, context) => {
      const ean = queryClient.getQueryData<Post>(['post', id])?.productEAN;
      if (ean) {
        await queryClient.invalidateQueries({
          queryKey: ['posts', ean],
        });
      } else {
        await queryClient.invalidateQueries({ queryKey: ['posts'] });
      }
    },
  });
};

export const useVotePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, like }: { id: string; like: boolean }) =>
      createVote(id, like),
    onMutate: async ({ id, like }: { id: string; like: boolean }) => {
      await queryClient.cancelQueries({ queryKey: ['post', id] });
      const previousData = queryClient.getQueryData<Post>(['post', id]);
      queryClient.setQueryData<Post>(['post', id], (old) => {
        if (old) {
          return {
            ...old,
            upVotes:
              like === true
                ? old.upVotes + 1
                : previousData.vote === true
                  ? old.upVotes - 1
                  : old.upVotes,
            downVotes:
              like === false
                ? old.downVotes + 1
                : previousData.vote === false
                  ? old.downVotes - 1
                  : old.downVotes,
            liked: like,
          };
        }
        return old;
      });
      return { previousData };
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['post', variables.id], context.previousData);
      }
      Toast.show({
        type: 'customToast',
        text1: 'Error',
        text2: err.message,
        position: 'bottom',
        visibilityTime: 8000,
      });
    },
    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: ['post', variables.id] });
      const ean = queryClient.getQueryData<Post>([
        'post',
        variables.id,
      ])?.productEAN;
      if (ean) {
        await queryClient.invalidateQueries({
          queryKey: ['posts'],
        });
      } else {
        await queryClient.invalidateQueries({ queryKey: ['posts'] });
      }
    },
  });
};

export const useDeleteVote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteVote(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['post', id] });
      const previousData = queryClient.getQueryData<Post>(['post', id]);
      queryClient.setQueryData<Post>(['post', id], (old) => {
        if (old) {
          return {
            ...old,
            upVotes: old.vote === true ? old.upVotes - 1 : old.upVotes,
            downVotes: old.vote === false ? old.downVotes - 1 : old.downVotes,
          };
        }
        return old;
      });
      return { previousData };
    },
    onError: (err, id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['post', id], context.previousData);
      }
      Toast.show({
        type: 'customToast',
        text1: 'Error',
        text2: err.message,
        position: 'bottom',
        visibilityTime: 8000,
      });
    },
    onSettled: async (data, error, id, context) => {
      await queryClient.invalidateQueries({ queryKey: ['post', id] });
      const ean = queryClient.getQueryData<Post>(['post', id])?.productEAN;
      if (ean) {
        await queryClient.invalidateQueries({
          queryKey: ['posts'],
        });
      } else {
        await queryClient.invalidateQueries({ queryKey: ['posts'] });
      }
    },
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: string }) =>
      createComment(id, body),
    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: ['post', variables.id] });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteComment(id),
    onSettled: async (data, error, id, context) => {
      const comment = queryClient.getQueryData<Comment>(['comment', id]);
      await queryClient.invalidateQueries({
        queryKey: ['post', comment.postID],
      });
    },
  });
};
