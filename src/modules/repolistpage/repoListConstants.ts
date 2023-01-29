import { RepoSortOptionsType } from './repolistgql/repolist.types';

export const repoSortOptions: RepoSortOptionsType[] = [
  {
    label: 'Name',
    value: 'NAME',
  },
  {
    label: 'Pushed At',
    value: 'PUSHED_AT',
  },
  {
    label: 'Created At',
    value: 'CREATED_AT',
  },
];
