declare module "use-ajax-request" {
  const useAjaxHook: <T>(a: {
    instance: Function;
    options: {
      url: string;
      method: string;
      data?: any;
      [key: string]: any;
    };
  }) => {
    sendRequest: (
      onSuccess?: ({ data: T }) => void,
      onError?: ({ response: { data: any } }) => void
    ) => any;
    error: any;
    loading: boolean;
    data: T;
  };
  export = useAjaxHook;
}
