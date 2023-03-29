export class NavClass {
  constructor(
    public name: string,
    public link: string,
    public icon?: string,
    public subMenu?: NavClass[]
  ) {}
}
