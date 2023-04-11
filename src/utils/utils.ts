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

export const searchFunction = ({
  searchWord,
  searchTimeout,
  setSearchTimeout,
}: {
  searchWord: string;
  searchTimeout: any;
  setSearchTimeout: any;
}) => {
  clearTimeout(searchTimeout);
  const search = () => {
    if (window.find(searchWord)) {
      (document.getElementById("searchInput") as HTMLInputElement)?.focus();
    }
  };
  setSearchTimeout(setTimeout(() => search(), 500));
};
