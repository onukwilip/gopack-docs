export class NavClass {
  constructor(
    public name: string,
    public link: string,
    public icon?: string,
    public subMenu?: NavClass[]
  ) {}
}

export class DocsClass {
  constructor(public title: string, public body?: string) {}
}
