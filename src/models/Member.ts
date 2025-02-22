export interface Member {
  nodeId: string;
  static: boolean;
  visibility: 'public' | 'private' | 'protected';
  name: string;
  type: string;
}

export class MemberWrap {
  #self: Member;

  private constructor(member: Member) {
    this.#self = member;
  }

  static of(member: Member): MemberWrap {
    return new MemberWrap(member);
  }

  toMemberSignature(): string {
    return `${this.#self.visibility} ${this.#self.static ? 'static' : ''} ${this.#self.name}: ${this.#self.type}`;
  }

  unwrap(): Member {
    return this.#self;
  }
}