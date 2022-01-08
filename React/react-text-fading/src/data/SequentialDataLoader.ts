import { IDataItem, IDataLoader } from "../components/Quote";
import DataItems from "./Bukowski";

export class SequentialDataLoader implements IDataLoader {
  first = (): IDataItem => {
    return {
      id: 0,
      text: DataItems[0],
    };
  };

  next = (lastItemId: number): IDataItem => {
    const nextItem = lastItemId < DataItems.length - 1 ? lastItemId + 1 : 0;
    return {
      id: nextItem,
      text: DataItems[nextItem],
    };
  };
}
