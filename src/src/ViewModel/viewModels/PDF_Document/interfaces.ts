export interface IPDFDocumentViewModel {
  isLoading: boolean;
  refItems: IRefItem[];
  pngItems: string[];
  count: number;
  addRef: (item: IRefItem) => void;
  deleteRef: (widgetIndex: string) => void;
  // convert: () => Promise<void>;
  increment: () => void;
}

export interface IRefItem {
  indexItem: string;
  position: number;
  ref: any;
  options?: {
    [key: string]: any;
  };
}
