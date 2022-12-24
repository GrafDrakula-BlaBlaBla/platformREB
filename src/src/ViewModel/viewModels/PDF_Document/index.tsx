import {makeObservable, observable, action} from 'mobx';
import {IPDFDocumentViewModel, IRefItem} from './interfaces';
// import {toPng} from 'html-to-image';

export class PDFDocumentViewModel implements IPDFDocumentViewModel {
  constructor() {
    makeObservable(this, {
      refItems: observable,
      pngItems: observable,
      isLoading: observable,
      count: observable,
      addRef: action,
      deleteRef: action,
    });
  }

  refItems: IRefItem[] = [];
  pngItems: string[] = [];
  isLoading: boolean = false;
  count: number = 0;

  setLoading = (value: boolean) => {
    this.isLoading = value;
  };

  addRef = (item: IRefItem) => {
    this.refItems.push(item);
  };

  deleteRef = (indexItem: string) => {
    this.refItems = this.refItems.filter((el) => el.indexItem !== indexItem);
  };

  increment = () => {
    this.count += 1;
    console.log('count', this.count);
  };

  // convert = async () => {
  //   this.setLoading(true);
  //   const wrapRefItems = this.refItems
  //     .sort((a, b) => a.position - b.position)
  //     .map(
  //       ({ref}) => new Promise<any>((res, rej) => res(toPng(ref.current)))
  //     );
  //   this.pngItems = await Promise.all(wrapRefItems);
  //   this.setLoading(false);
  // };
}
