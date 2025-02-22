import { none, Option, some as Some } from 'fp-ts/lib/Option';

export { some as Some } from 'fp-ts/lib/Option';
export type { Option } from 'fp-ts/lib/Option';
export const None = () => none;

export const findFirst = <OptionType, ArrayType> (array: ArrayType[]) => 
  (predicate: (option: OptionType, array: ArrayType) => boolean) => 
    (option: Option<OptionType>): Option<ArrayType> => {
      if (option._tag === 'None') {
        return None();
      }

      const found = array.find(element => predicate(option.value, element));
  
      return found !== undefined ? Some(found) : None();
    };

export const findAll = <OptionType, ArrayType> (array: ArrayType[]) => 
  (predicate: (option: OptionType, array: ArrayType) => boolean) => 
    (option: Option<OptionType>): Option<ArrayType[]> => {
      if (option._tag === 'None') {
        return None();
      }
  
      return Some(
        array.filter(
          element => predicate(
            option.value, 
            element
          )
        )
      );
    };

export const innerJoin = <Left, Right> (left: Left[]) =>
  (predicate: (left: Left, right: Right) => boolean) => 
    (right: Option<Right[]>): Option<(Left & Right)[]> => {
      if (right._tag === 'None') {
        return None();
      }

      function defined(value: { left: Left, right: Right | undefined }): value is { left: Left, right: Right } {
        return value.right !== undefined;
      }

      const found = left
        .map(leftElement => ({
          left: leftElement,
          right: right.value.find(
            rightElement => predicate(leftElement, rightElement)
          )
        }))
        .filter(defined)
        .map(({ left, right }) => ({ ...left, ...right }));

      return Some(found);
    };