import difference from 'lodash/difference';
import { Dictionary } from '@reduxjs/toolkit';
import { AppSelectOptionType } from '../../components/controls/app-select';

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

export const getSelectOptionById = (
  options: AppSelectOptionType[],
  id: string,
) => options.find(({ value }) => value === id);

export const getArrayIntersection = (arr1: any[], arr2: any[]) =>
  arr1.filter((x) => arr2.includes(x));
