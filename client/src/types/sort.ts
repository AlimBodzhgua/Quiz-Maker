import { sortDirection, sortField } from '@/constants/sort';

export type SortFieldType = keyof typeof sortField;
export type SortDirectionType = keyof typeof sortDirection;