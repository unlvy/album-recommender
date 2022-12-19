export function parseNumber(n4jn: any): number {
  var retVal: number;
  if (n4jn.low) {
    retVal = n4jn.low;
  } else {
    retVal = n4jn;
  }
  return retVal;
}