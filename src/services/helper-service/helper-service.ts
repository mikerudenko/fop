import difference from 'lodash/difference';

export const isArrayInSubArray = <T>(array: T[], subarray: T[]) =>
  difference(array, subarray).length === 0;
