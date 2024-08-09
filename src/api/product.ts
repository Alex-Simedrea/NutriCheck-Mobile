import api from '@/api/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

export interface ProductProps {
  _id: string;
  product_name: string;
  quantity: string;
  price: string;
  brands: string;
  nutriments: {
    carbohydrates: number;
    carbohydrates_100g: number;
    energy_kcal: number;
    energy_kcal_100g: number;
    fat: number;
    fat_100g: number;
    nova_group: number;
    nova_group_100g: number;
    proteins: number;
    proteins_100g: number;
    salt: number;
    salt_100g: number;
    saturated_fat: number;
    saturated_fat_100g: number;
    sodium: number;
    sodium_100g: number;
    sugars: number;
    sugars_100g: number;
    folates: number;
    niacin: number;
    riboflavin: number;
    thiamin: number;
    vitamin_a: number;
    vitamin_b6: number;
    vitamin_b12: number;
    vitamin_c: number;
    vitamin_d: number;
    vitamin_e: number;
    vitamin_k: number;
    water: number;
  };
  nutriscore_data: {
    energy: number;
    fiber: number;
    fruits_vegetables_nuts_colza_walnut_olive_oils: number;
    is_beverage: number;
    proteins: number;
    saturated_fat: number;
    sodium: number;
    sugars: number;
  };
  nutriscore_grade: string;
  nutriscore_score: number;
  vegetarian: boolean;
  vegan: boolean;
  pescatarian: boolean;
  palmoil: boolean;
  image_url: string;
  ingredients: {
    id: string;
    text: string;
  }[];
  allergens_tags: string[];
}

export interface Product {
  ean: string;
  product?: ProductProps;
  upVotes: number;
  downVotes: number;
  vote: boolean | null;
}

export const fetchProduct = async (ean: string) => {
  return api.get(`/product/` + ean).then((res) => {
    return {
      ...res.data,
      ean,
      product: res.data?.body?.product ?? null,
    } as Product;
  });
};

export const fetchOFFProduct = async (ean: string) => {
  return api
    .get(`https://world.openfoodfacts.org/api/v2/product/` + ean)
    .then((res) => res.data as any);
};

export const createVote = async (ean: string, vote: boolean) => {
  return api.post(`/product/vote/${ean}`, { vote }).then((res) => res.data);
};

export const deleteVote = async (ean: string) => {
  return api.delete(`/product/vote/${ean}`).then((res) => res.data);
};

export const searchProduct = async (query: string) => {
  return api.get(`/product/search/${query}`).then((res) => res.data);
};

export const searchOFFProduct = async (query: string) => {
  return api
    .get(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1`,
    )
    .then((res) => res.data as any);
};

export const searchByProps = async (props: any) => {
  return api.post(`/product/recommend`, props).then((res) => res.data);
}

export const useGetProduct = (ean: string) => {
  return useQuery({
    queryKey: ['product', ean],
    queryFn: () => fetchProduct(ean),
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetOFFProduct = (ean: string) => {
  return useQuery({
    queryKey: ['offProduct', ean],
    queryFn: () => fetchOFFProduct(ean),
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetProducts = (eans: string[]) => {
  return useQuery({
    queryKey: ['products', eans],
    queryFn: () => {
      return Promise.all(eans.map((ean) => fetchProduct(ean)));
    },
  });
};

export const useGetOFFProducts = (eans: string[]) => {
  return useQuery({
    queryKey: ['offProducts', eans],
    queryFn: () => {
      return Promise.all(eans.map((ean) => fetchOFFProduct(ean)));
    },
  });
};

export const useVoteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ean, like }: { ean: string; like: boolean }) =>
      createVote(ean, like),
    onMutate: async ({ ean, like }) => {
      await queryClient.cancelQueries({ queryKey: ['product', ean] });
      const previousProduct = queryClient.getQueryData<Product>([
        'product',
        ean,
      ]);
      queryClient.setQueryData<Product>(['product', ean], (old) => {
        if (old) {
          return {
            ...old,
            upVotes:
              like === true
                ? old.upVotes + 1
                : previousProduct.vote === true
                  ? old.upVotes - 1
                  : old.upVotes,
            downVotes:
              like === false
                ? old.downVotes + 1
                : previousProduct.vote === false
                  ? old.downVotes - 1
                  : old.downVotes,
            vote: like,
          };
        }
        return old;
      });
      return { previousProduct };
    },
    onError: (err, variables, context) => {
      if (context?.previousProduct) {
        queryClient.setQueryData(
          ['product', variables.ean],
          context.previousProduct,
        );
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
      await queryClient.invalidateQueries({
        queryKey: ['product', variables.ean],
      });
    },
  });
};

export const useDeleteVote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ean: string) => deleteVote(ean),
    onMutate: async (ean) => {
      await queryClient.cancelQueries({ queryKey: ['product', ean] });
      const previousProduct = queryClient.getQueryData<Product>([
        'product',
        ean,
      ]);
      queryClient.setQueryData<Product>(['product', ean], (old) => {
        if (old) {
          return {
            ...old,
            upVotes: old.vote === true ? old.upVotes - 1 : old.upVotes,
            downVotes: old.vote === false ? old.downVotes - 1 : old.downVotes,
            liked: null,
          };
        }
        return old;
      });
      return { previousProduct };
    },
    onError: (err, variables, context) => {
      if (context?.previousProduct) {
        queryClient.setQueryData(
          ['product', variables],
          context.previousProduct,
        );
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
      await queryClient.invalidateQueries({
        queryKey: ['product', variables],
      });
    },
  });
};

export const useSearchProduct = (query: string) => {
  return useQuery({
    queryKey: ['search'],
    queryFn: () => searchProduct(query),
  });
};

export const useSearchOFFProduct = (query: string) => {
  return useQuery({
    queryKey: ['offSearch'],
    queryFn: () => searchOFFProduct(query),
    refetchOnMount: 'always',
    staleTime: 0,
  });
};

export const useSearchByProps = (props: any) => {
  return useQuery({
    queryKey: ['searchByProps'],
    queryFn: () => searchByProps(props),
  });
};
