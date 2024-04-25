import { IPv4CidrRange, IPv6CidrRange } from "ip-num";


export class CidrWrap {
  range = null;
  version = null;
  constructor(input2) {
    const hasColumn = /:/.test(input2);
    const hasDot = /\./.test(input2);
    let input1 = input2;
    let version  = hasColumn ? 6 : 4;
    if(hasColumn && hasDot) {
      input1 = input2.split(':').slice(-1)[0];
      version = 4;
    }
    this.version = version;
    const maskR = /.*\/(\d+)$/.exec(input1)
    const mask = maskR?.length === 2 ? +maskR[1] : null;
    const input = !mask ? `${input1}/${version === 6 ? 64 : 24}` : input1;
    try {
      this.range = (version === 6 ? 
        IPv6CidrRange.fromCidr(input) 
        : IPv4CidrRange.fromCidr(input.replace(/\.\*$/, '.0/24')));
    } catch(ex) {
      throw new Error(`Invalid Cidr notation: ${input}`)
    }
  }

  contains(other) {
    return this.version === other.version && this.range.contains(other.range);
  }

  inside(other) {
    return this.version === other.version && this.range.inside(other.range);
  }

  isOverlapping(other) {
    return this.version === other.version && this.range.isOverlapping(other.range);
  }

  toCidrString() {
    return this.range.toCidrString();
  }

  toString() {
    return this.range.toCidrString();
  }
}