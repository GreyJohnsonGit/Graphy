export interface Method {
  nodeId: string;
  visibility: 'public' | 'private' | 'protected';
  static: boolean;
  name: string;
  returnType: string;
  parameters: string[];
}

export class MethodWrap {
  #self: Method;

  private constructor(method: Method) {
    this.#self = method;
  }

  static of(method: Method): MethodWrap {
    return new MethodWrap(method);
  }

  toMethodSignature(): string {
    const params = this.#self.parameters.join(', ');
    return `${this.#self.visibility} ${this.#self.static ? 'static' : ''} ${this.#self.name}(${params}): ${this.#self.returnType}`;
  }

  unwrap(): Method {
    return this.#self;
  }
}