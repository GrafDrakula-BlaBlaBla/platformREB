export interface IIndustryDivisionOKVEDDTO {
  depth: string;
  items: Array<IIndustryDivisionOKVEDItem>;
  total: number;
}

export interface IIndustryDivisionOKVEDItem {
  amountContracts: number;
  amountDeals: number;
  code: string;
  countContracts: number;
  countDeals: number;
  name: string;
  objectId: string;
}

export const Data: IIndustryDivisionOKVEDItem[] = [
  {
    amountContracts: 123,
    amountDeals: 321,
    code: 'hhh',
    countContracts: 123,
    countDeals: 3253,
    name: 'MMMMMM',
    objectId: '23424123214213',
  },
];

export interface IIndustryDivisionOKKDTO {
  depth: string;
  items: Array<IIndustryDivisionOKKItem>;
  total: 0;
}

export interface IIndustryDivisionOKKItem {
  amountContracts: number;
  amountDeals: number;
  code: string;
  countContracts: number;
  countDeals: number;
  name: string;
  objectId: string;
}
