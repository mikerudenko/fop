import difference from 'lodash/difference';
import { Dictionary } from '@reduxjs/toolkit';

export const isArrayInSubArray = <T>(array: T[], subarray: T[]) =>
  difference(array, subarray).length === 0;

export const transformEntityToList = (
  list: Dictionary<{
    name: string;
    id: string;
  }> | null,
) =>
  list
    ? Object.keys(list).map((key) => ({
        value: list[key]!.id,
        label: list[key]!.name,
      }))
    : [];
