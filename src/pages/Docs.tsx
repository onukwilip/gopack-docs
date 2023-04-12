import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import css from "../styles/Docs.module.scss";
import { DocsClass, backupReadme } from "../utils/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  coldarkCold,
  duotoneSea,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { SelectorType } from "../utils/types";
import { useSelector } from "react-redux";
import useAjaxHook from "use-ajax-request";
import axios from "axios";
import Loader from "../components/Loader";
import { Message } from "semantic-ui-react";

const titleHeaders = {
  h1: ({ children, className }: any) => {
    return (
      <h1 className={className} id={children?.toString()?.toLowerCase()}>
        {children}
      </h1>
    );
  },
  h2: ({ children, className }: any) => {
    return (
      <h2 className={className} id={children?.toString()?.toLowerCase()}>
        {children}
      </h2>
    );
  },
  h3: ({ children, className }: any) => {
    return (
      <h3 className={className} id={children?.toString()?.toLowerCase()}>
        {children}
      </h3>
    );
  },
  h4: ({ children, className }: any) => {
    return (
      <h4 className={className} id={children?.toString()?.toLowerCase()}>
        {children}
      </h4>
    );
  },
  h5: ({ children, className }: any) => {
    return (
      <h5 className={className} id={children?.toString()?.toLowerCase()}>
        {children}
      </h5>
    );
  },
  h6: ({ children, className }: any) => {
    return (
      <h6 className={className} id={children?.toString()?.toLowerCase()}>
        {children}
      </h6>
    );
  },
};

const CodeBlock = ({
  children,
  match,
  props,
}: {
  children: React.ReactNode & React.ReactNode[];
  match: RegExpExecArray | [];
  props: Record<string, any>;
}) => {
  const [copied, setCopied] = useState(false);

  const displayState = useSelector(
    (state: SelectorType) => state?.display?.display
  );

  const onCopySuccess = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000 * 2);
  };

  const copyToClipBoard = async () => {
    await navigator.clipboard.writeText(children?.toString());
    onCopySuccess();
  };

  return (
    <div className="my-code-block">
      <SyntaxHighlighter
        children={String(children).replace(/\n$/, "")}
        style={(displayState === "dark" ? duotoneSea : coldarkCold) as any}
        language={match[1]}
        PreTag="div"
        {...props}
      />
      <i
        className={`${
          copied ? "fa-solid fa-check" : "fa-regular fa-clone"
        } my-copy`}
        onClick={copyToClipBoard}
      ></i>
    </div>
  );
};

const Docs = () => {
  const [documentation, setDocumentation] = useState("");
  const displayState = useSelector(
    (state: SelectorType) => state?.display?.display
  );
  const {
    sendRequest: getReadme,
    data: readmeContents,
    error: errorGettingReadme,
    loading: gettingReadme,
  } = useAjaxHook({
    instance: axios,
    options: {
      url: `${process.env.REACT_APP_API_DOMAIN}/readme` as string,
      method: "GET",
    },
  });

  const getReadMeFileAndSaveToLocalStorage = async () => {
    const onSuccess = ({ data }: { data: any }) => {
      localStorage.setItem("readme", data);
      setDocumentation(data);
    };
    const onError = (error: any) => {
      setDocumentation(backupReadme);
      console.log(error);
    };
    await getReadme(onSuccess, onError);
  };

  const checkIfReadmeExists = async () => {
    const readme = localStorage.getItem("readme");
    if (!readme) return await getReadMeFileAndSaveToLocalStorage();
    setDocumentation(readme);
  };

  useEffect(() => {
    checkIfReadmeExists();
  }, []);

  return (
    <section className={`${css.docs}`}>
      <div className={css.left}>
        <Menu height="89.2vh" />
      </div>
      <div className={css.right}>
        {gettingReadme ? (
          <div style={{ width: "100%", height: "100%" }}>
            <Loader />
          </div>
        ) : (
          <>
            {errorGettingReadme && (
              <>
                <Message
                  header={
                    errorGettingReadme?.response?.status ||
                    errorGettingReadme?.status ||
                    "An error occured"
                  }
                  error
                  content="There was an error getting the latest documentation please visit the GitHub repository to view the latest documentation `https://github.com/onukwilip/gopack`"
                />
              </>
            )}
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              children={documentation as string}
              components={{
                code: ({ node, inline, className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <CodeBlock
                      children={children}
                      match={match}
                      props={props}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                ...titleHeaders,
              }}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default Docs;
