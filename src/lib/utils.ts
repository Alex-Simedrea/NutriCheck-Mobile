import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Product } from '@/api/product';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}, ${day}.${month}.${year}`;
}

type obj = any;

export const merge = (A: obj, B: obj) => {
  if (!A) return B;
  if (!B) return A;
  const keys = [...new Set([...Object.keys(A), ...Object.keys(B)])];

  const result: obj = {};

  for (const key of keys) {
    if (A[key] && B[key]) {
      if (
        ['string', 'number', 'bool'].includes(typeof B[key]) ||
        B[key] === null
      ) {
        result[key] = B[key];
      } else {
        result[key] = merge(A[key] as obj, B[key] as obj);
      }
    } else if (A[key]) {
      result[key] = JSON.parse(JSON.stringify(A[key]));
    } else if (B[key]) {
      result[key] = JSON.parse(JSON.stringify(B[key]));
    }
  }

  return result;
};

export const mergeLists = (
  A: {
    products: any[];
  },
  B: any[],
) => {
  const eans = [
    ...new Set([...B.map((el) => el.ean), ...A.products.map((el) => el._id)]),
  ];
  const result: any[] = [];

  for (const ean of eans) {
    const a = A.products.find((el) => el._id === ean);
    const b = B.find((el) => el.ean === ean)?.data?.product;

    if (a && b) {
      result.push(merge(a, b));
    } else if (a) {
      result.push(a);
    } else if (b) {
      b._id = ean;
      result.push(b);
    }
  }

  return result;
};

export const mergeEachItemInLists = (A: any[], B: Product[]) => {
  const result: any[] = [];

  for (let i = 0; i < A.length; i++) {
    result.push(merge(A[i]?.product, B[i]?.product));
  }
  return result;
};
