type EnumType = { [s: number]: string };

function mapEnum (enumerable: EnumType, fn: Function): any[] {
  let enumMembers: any[] = Object.keys(enumerable).map((key: any) => enumerable[key]);

  let enumValues: number[] = enumMembers.filter(v => typeof v === "number");

  return enumValues.map(m => fn(m));
}

export default mapEnum;
