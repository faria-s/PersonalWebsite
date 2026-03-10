"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/github-dark.css";
import type { ComponentPropsWithoutRef } from "react";

interface MarkdownRendererProps {
  content: string;
}

function IframeEmbed(props: ComponentPropsWithoutRef<"iframe">) {
  const src = props.src ?? "";
  const isYouTube =
    src.includes("youtube.com/embed") || src.includes("youtu.be");

  if (isYouTube) {
    return (
      <div className="relative w-full my-6" style={{ paddingBottom: "56.25%" }}>
        <iframe
          {...props}
          src={src}
          className="absolute inset-0 w-full h-full rounded-lg border border-gray-700"
          allowFullScreen
          allow="fullscreen"
          style={undefined}
          width={undefined}
          height={undefined}
        />
      </div>
    );
  }

  return (
    <iframe
      {...props}
      className="w-full rounded-lg border border-gray-700 my-4"
    />
  );
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="w-full min-w-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeSlug]}
        components={{
          h1: ({ children, ...props }: ComponentPropsWithoutRef<"h1">) => (
            <h1
              className="text-3xl font-bold text-white mt-8 mb-4 pb-2 border-b border-gray-700"
              {...props}
            >
              {children}
            </h1>
          ),
          h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
            <h2
              className="text-2xl font-bold text-white mt-7 mb-3 pb-2 border-b border-gray-700"
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => (
            <h3
              className="text-xl font-semibold text-white mt-6 mb-2"
              {...props}
            >
              {children}
            </h3>
          ),
          h4: ({ children, ...props }: ComponentPropsWithoutRef<"h4">) => (
            <h4
              className="text-lg font-semibold text-gray-200 mt-5 mb-2"
              {...props}
            >
              {children}
            </h4>
          ),
          p: ({ children, ...props }: ComponentPropsWithoutRef<"p">) => (
            <p className="text-gray-300 leading-7 mb-4" {...props}>
              {children}
            </p>
          ),
          a: ({ children, href, ...props }: ComponentPropsWithoutRef<"a">) => (
            <a
              href={href}
              className="text-highlight underline underline-offset-2 hover:opacity-80 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            >
              {children}
            </a>
          ),
          ul: ({ children, ...props }: ComponentPropsWithoutRef<"ul">) => (
            <ul
              className="list-disc list-inside text-gray-300 mb-4 space-y-1 pl-4"
              {...props}
            >
              {children}
            </ul>
          ),
          ol: ({ children, ...props }: ComponentPropsWithoutRef<"ol">) => (
            <ol
              className="list-decimal list-inside text-gray-300 mb-4 space-y-1 pl-4"
              {...props}
            >
              {children}
            </ol>
          ),
          li: ({ children, ...props }: ComponentPropsWithoutRef<"li">) => (
            <li className="text-gray-300 leading-7" {...props}>
              {children}
            </li>
          ),
          blockquote: ({
            children,
            ...props
          }: ComponentPropsWithoutRef<"blockquote">) => (
            <blockquote
              className="border-l-4 border-highlight pl-4 py-1 my-4 text-gray-400 italic bg-foreground rounded-r-md"
              {...props}
            >
              {children}
            </blockquote>
          ),
          code: ({
            className,
            children,
            ...props
          }: ComponentPropsWithoutRef<"code">) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code
                  className="bg-foreground text-highlight font-mono text-sm px-1.5 py-0.5 rounded"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children, ...props }: ComponentPropsWithoutRef<"pre">) => (
            <pre
              className="bg-foreground rounded-lg p-3 sm:p-4 overflow-x-auto mb-4 text-xs sm:text-sm border border-gray-700 max-w-full"
              {...props}
            >
              {children}
            </pre>
          ),
          table: ({
            children,
            ...props
          }: ComponentPropsWithoutRef<"table">) => (
            <div className="overflow-x-auto mb-4 max-w-full">
              <table
                className="text-xs sm:text-sm text-gray-300 border-collapse"
                {...props}
              >
                {children}
              </table>
            </div>
          ),
          thead: ({
            children,
            ...props
          }: ComponentPropsWithoutRef<"thead">) => (
            <thead className="bg-foreground text-white" {...props}>
              {children}
            </thead>
          ),
          th: ({ children, ...props }: ComponentPropsWithoutRef<"th">) => (
            <th
              className="border border-gray-700 px-2 sm:px-4 py-2 text-left font-semibold whitespace-nowrap"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }: ComponentPropsWithoutRef<"td">) => (
            <td className="border border-gray-700 px-2 sm:px-4 py-2" {...props}>
              {children}
            </td>
          ),
          hr: ({ ...props }: ComponentPropsWithoutRef<"hr">) => (
            <hr className="border-gray-700 my-6" {...props} />
          ),
          img: ({ src, alt, ...props }: ComponentPropsWithoutRef<"img">) => (
            <span className="block text-center my-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt ?? ""}
                className="rounded-lg border border-gray-700 w-full sm:max-w-[60%] h-auto inline-block"
                {...props}
              />
            </span>
          ),
          strong: ({
            children,
            ...props
          }: ComponentPropsWithoutRef<"strong">) => (
            <strong className="font-bold text-white" {...props}>
              {children}
            </strong>
          ),
          em: ({ children, ...props }: ComponentPropsWithoutRef<"em">) => (
            <em className="italic text-gray-300" {...props}>
              {children}
            </em>
          ),
          iframe: (props: ComponentPropsWithoutRef<"iframe">) => (
            <IframeEmbed {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
