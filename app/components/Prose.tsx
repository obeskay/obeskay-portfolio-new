/**
 * Prose — minimal markdown-ish wrapper.
 *
 * This site does not use next-mdx-remote or contentlayer in this phase. Body
 * strings are rendered as paragraphs separated by blank lines. If/when
 * real MDX is introduced, this is the place to plug in a renderer.
 */
export default function Prose({ body }: { body: string }) {
  const blocks = body
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none font-sans text-text-primary">
      {blocks.map((block, i) => (
        <p key={i} className="text-base leading-relaxed text-text-primary mb-5">
          {block}
        </p>
      ))}
    </div>
  );
}
