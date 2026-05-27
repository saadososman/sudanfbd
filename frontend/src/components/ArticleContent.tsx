import type { StrapiBlock } from "@/lib/articles";

function renderInline(nodes: StrapiBlock[] | undefined) {
  if (!nodes?.length) return null;

  return nodes.map((node, index) => {
    if (typeof node.text !== "string") return null;

    if (node.format === "bold") {
      return <strong key={index}>{node.text}</strong>;
    }

    if (node.format === "italic") {
      return <em key={index}>{node.text}</em>;
    }

    return <span key={index}>{node.text}</span>;
  });
}

function renderBlock(block: StrapiBlock, index: number) {
  switch (block.type) {
    case "heading": {
      const content = renderInline(block.children);
      if (block.level === 1) {
        return <h2 key={index}>{content}</h2>;
      }
      if (block.level === 3) {
        return <h4 key={index}>{content}</h4>;
      }
      return <h3 key={index}>{content}</h3>;
    }
    case "paragraph":
      return <p key={index}>{renderInline(block.children)}</p>;
    case "quote":
      return <blockquote key={index}>{renderInline(block.children)}</blockquote>;
    case "code":
      return (
        <pre key={index}>
          <code>{renderInline(block.children)}</code>
        </pre>
      );
    case "list": {
      const items = (block.children ?? []).filter((child) => child.type === "list-item");

      return (
        <ul key={index}>
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>{renderInline(item.children)}</li>
          ))}
        </ul>
      );
    }
    default:
      return block.children?.length ? (
        <p key={index}>{renderInline(block.children)}</p>
      ) : null;
  }
}

export function ArticleContent({ content }: { content: StrapiBlock[] }) {
  if (!content.length) {
    return null;
  }

  return <div className="article-body">{content.map(renderBlock)}</div>;
}
