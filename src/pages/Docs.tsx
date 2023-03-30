import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import css from "../styles/Docs.module.scss";
import { DocsClass } from "../utils/utils";
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

const documentation = [
  new DocsClass(
    "## Introduction",
    `GOPack is a pre written javascript bundler, which was created using webpack. It configures your project to use the already existing webpack loaders and plugins to generate static files.`
  ),
  new DocsClass(
    "## Installation",
    `Inorder to install this package you need to have Node Js running on your system. If you don't have Node Js you can install it from their website [https://nodejs.org](https://nodejs.org). If you have Node Js installed, navigate to your project root folder and run \`npm i @go-pack/gopack\` in your terminal.`
  ),
  new DocsClass("## Usage"),
  new DocsClass(
    "### Initialization",
    `To initialize the project (Set up the project files), run \`npx gopack init\`. This command will create the files you need for webpack to work, and install the \`devDependencies\` into your \`node_modules\` folder.
The files that will be created are:
- package.json (This will merge existing package.json contents into a new package.json file)
- webpack.config.js
- .browserslistrc
- postcss.config.js
- gopack.config.js

When you run \`npx gopack init\`, it will initialize your project and create some files, but if it files any existing file it will ask for permission to overwrite it. It will also ask for permission to run \`npm install -f\` in your project. To skip the permissions you can run \`npx gopack init -y\` 

`
  ),
  new DocsClass(
    "### Start",
    "Inorder to start the development server, you can run `npx gopack start`, the equivalent of this is `npx webpack` + `npx webpack serve`. Your server will run on `http://localhost:8080` by default. Make sure you have the `gopack.config.js` file in your project's root folder and export an object as default, unless this will throw an error."
  ),
  new DocsClass(
    "### Serve",
    "Inorder to start the production server, you can run `npx gopack serve`, the equivalent of this is `npx cross-env MODE=production webpack` + `npx cross-env MODE=production webpack serve`. Your server will run on `http://localhost:8080` by default. Make sure you have the `gopack.config.js` file in your project's root folder and export an object as default, unless this will throw an error."
  ),
  new DocsClass(
    "### Build",
    "Inorder to bundle your project into static files, you can run `npx gopack build`, the equivalent of this is `npx cross-env MODE=production webpack`. Doing this will bundle your project without starting the production server. Make sure you have the `gopack.config.js` file in your project's root folder and export an object as default, unless this will throw an error."
  ),
  new DocsClass(
    "### GopackConfig",
    `The \`gopack.config.js\` file is written to help developers who are not familiar with webpack to customize the build output to their taste.

It comprises of key value pairs that enables flexibility in one's project. Which are:
- [generateCSSFiles][generateCSSFiles]
-  [devtool][devtool]
-  [useCoreJs][useCoreJs]
-  [entry][entry]
- [outputFilenameFormat][outputFilenameFormat] 
- [outputFilename][outputFilename]
- [outputFolder][outputFolder]
-  [pages][pages]
-  [assetsFolder][assetsFolder]

[generateCSSFiles]: #generatecssfiles
[devtool]: #devtool
[useCoreJs]: #usecorejs
[entry]: #entry
[outputFilenameFormat]: #outputfilenameformat
[outputFilename]: #outputfilename
[outputFolder]: #outputfolder
[pages]: #pages
[assetsFolder]: #assetsfolder`
  ),
  new DocsClass(
    "#### generateCSSFiles",
    "This accepts a boolean `true` or `false`. It indicates if webpack should inject CSS styles into the style tags `<style></style>` of every HTML page or if it should generate CSS files and them to various HTML pages."
  ),
  new DocsClass(
    "#### devtool",
    `This accepts the same parameters the webpack devtool does. It must be the same parameter that would be inserted into the webpack \`devtool\` key, unless webpack will throw an error upon build.
\nThe most common used options are either \`false\` which is a \`boolean\` or \`source-map\` which is a \`string\`. If the \`source-map\` is inserted, it generates javascript and CSS map files which will be used to trace code using the browser's \`devtool\`. The \`source-map\` option is best used for \`development\` mode, while the \`false\` option is best used for \`production\` mode.
`
  ),
  new DocsClass(
    "#### useCoreJs",
    "This accepts a boolean. It signifies if `babel.config.js` should generate code to support older browser versions when bundling using the `core-js` npm package. It is `false` by default. <br /><br /> **NB: This feature generates a lot of code for backwards compatibility, which will end up making your bundled javascript code large. use at your own risk**"
  ),
  new DocsClass(
    "#### entry",
    `This accepts either a \`string\` or an \`object\`. It is indicates where webpack should start building our files from. The default value is \`./src/index.js\`. To specify multiple entrypoint, you create an object with key value pairs. the key being the \`chunk\` and the value being the *path to the file*. E.g.

\`\`\`js
entry: {
    chunk: 'path/to/file.js'
}
\`\`\``
  ),
  new DocsClass(
    "### outputFilenameFormat",
    `This is the format in which webpack should name our bundled files - \`chunks\`. It is used if the \`entry\` parameter is an \`object\`. It accepts a string. It is written in this format \`[name].bundle.js\`. The \`[name]\` block is a variable which signifies the name each generated file \`chunk\`. The \`bundle\` extension is optional, but the \`js\` extension is compulsory. Therefore, if you specify the entry file as:
\`\`\`javascript
entry: {
    index: './src/index.js'
}
\`\`\`
The output will be \`index.bundle.js\``
  ),
  new DocsClass(
    "#### outputFilename",
    "This is the name you want to give your bundled javascript file. This is used if the `entry` parameter is a `string` or not specified. This key accepts a `string`, which must end with the `.js` extension. E.g. `index.js`"
  ),
  new DocsClass(
    "#### outputFolder",
    "This specifies the folder where all the webpack generated files should be located. It accepts a `string`. E.g. `public`"
  ),
  new DocsClass(
    "#### pages",
    `This is used if you have more than one HTML file which you want to be bundled alongside other files. It accepts an \`array\` of \`objects\`. E.g.
\`\`\`javascript
public: [
    {
        template: path.resolve(__dirname, "src/index.html"),
        filename: "index.html",
    }
]
\`\`\`
The template key signifies the path to the HTML document, the filename signifies the name it should give the generated HTML document during build.

Each object also accepts a parameter called \`chunk\`, which is an array of generated JavaScript/CSS file links to be inserted into the HTML document. The items passed as values to the \`chunk\` array must be same as the keys passed into the \`entry\` object. E.g
\`\`\`javascript
entry: {
    index: './src/index.js',
    about: './src/about.js',
    contact: './src/contact.js',
},
public: [
    {
        template: path.resolve(__dirname, "src/about.html"),
        chunk:["index","about"],
        filename: "about.html",
    }
]
\`\`\``
  ),
  new DocsClass(
    "#### assetsFolder",
    "This accepts a string which is the name or path to the folder the bundled images and assets will be stored. E.g. `images` or `path/to/images`."
  ),
  new DocsClass(
    "## Libraries",
    "GOPack also supports the use of other libraries which are:"
  ),
  new DocsClass(
    "### React",
    "GOPack has built-in support for react. It uses the `@babel/preset-react` library to transpile JSX to javascript. If you need to use React Js in your project you just have to install both the `react` and `react-dom` libraries. Then create a root node in your HTML file where `react` will inject the transpiled JSX code. To learn more about React Js, visit [https://legacy.reactjs.org/docs/getting-started.html](https://legacy.reactjs.org/docs/getting-started.html)."
  ),
  new DocsClass(
    "### Typescript",
    "GOPack has built-in support for typescript. It uses the `ts-loader` loader to handle both `.ts` and `.tsx` files. If you need to use Typescript in your project you just need to install the `typescript` library and create a `tsconfig.json` file in your project's root folder. To learn more about Typescript, visit [https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)."
  ),
  new DocsClass(
    "### SASS",
    "GOPack has built-in support for SASS. It uses the `sass-loader` loader to handle both `.sass` and `.scss` files. If you need to use SASS in your project you just need to install the `sass` library in your project. To learn more about SASS, visit [https://sass-lang.com/documentation/](https://sass-lang.com/documentation/)."
  ),
];

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

const Docs = ({
  searchWord,
  setSearchWord,
}: {
  searchWord: string;
  setSearchWord: Function;
}) => {
  const [filteredDocs, setFilteredDocs] =
    useState<typeof documentation>(documentation);
  const displayState = useSelector(
    (state: SelectorType) => state?.display?.display
  );

  useEffect(() => {
    setFilteredDocs(
      documentation?.filter(
        (docs) =>
          docs?.title?.toLowerCase()?.includes(searchWord?.toLowerCase()) ||
          docs?.body?.toLowerCase()?.includes(searchWord?.toLowerCase())
      )
    );
  }, [searchWord]);

  return (
    <section
      className={`${css.docs} ${displayState === "dark" ? "dark" : null}`}
    >
      <div className={css.left}>
        <Menu height="89.2vh" setSearchWord={setSearchWord} />
      </div>
      <div className={css.right}>
        {filteredDocs?.map((docs, i) => (
          <>
            <ReactMarkdown
              children={docs?.title}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{ ...titleHeaders }}
              key={docs?.title}
            />
            {docs?.body && (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                children={docs?.body}
                key={i}
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
                }}
              />
            )}
          </>
        ))}

        <a
          href="https://www.producthunt.com/posts/gopack?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-gopack"
          target="_blank"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=385947&theme=dark"
            alt="GOPack - Javascript&#0032;bundler&#0032;and&#0032;transpiler&#0032;using&#0032;webpack&#0032;and&#0032;babel | Product Hunt"
            style={{ width: "250px", height: "54px" }}
            width="250"
            height="54"
          />
        </a>
      </div>
    </section>
  );
};

export default Docs;
