import { useParams, Link, Navigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { blogPosts } from "@/data/blog-posts";
import { Calendar, Clock, ArrowLeft, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedSection } from "@/components/ui/animated-section";
import { type ReactNode } from "react";

/** Parse inline markdown: **bold**, [text](url) */
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  // Match **bold**, [link](url)
  const regex = /(\*\*(.*?)\*\*)|(\[(.*?)\]\((.*?)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (match[1]) {
      // Bold
      nodes.push(<strong key={match.index} className="text-foreground">{match[2]}</strong>);
    } else if (match[3]) {
      // Link
      const href = match[5];
      const label = match[4];
      if (href.startsWith("/")) {
        nodes.push(
          <Link key={match.index} to={href} className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">
            {label}
          </Link>
        );
      } else {
        nodes.push(
          <a key={match.index} href={href} className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors" target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        );
      }
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

/** Render a single line with inline formatting */
function InlineText({ text }: { text: string }) {
  return <>{renderInline(text)}</>;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = blogPosts
    .filter(p => p.slug !== post.slug && p.tags.some(t => post.tags.includes(t)))
    .slice(0, 2);

  // Generate table of contents from h2 headings
  const headings = post.content
    .split('\n\n')
    .filter(p => p.startsWith('## '))
    .map(p => p.replace('## ', ''));

  const renderContent = () => {
    const blocks = post.content.split('\n\n');
    const elements: ReactNode[] = [];

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];

      // H2 heading
      if (block.startsWith('## ')) {
        const text = block.replace('## ', '');
        const id = text.toLowerCase().replace(/[^a-zà-ÿ0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
        elements.push(
          <h2 key={i} id={id} className="text-2xl font-bold mt-12 mb-5 text-foreground scroll-mt-24">
            {text}
          </h2>
        );
        continue;
      }

      // Unordered list
      if (block.startsWith('- ')) {
        const items = block.split('\n').filter(l => l.startsWith('- '));
        elements.push(
          <ul key={i} className="my-5 space-y-2.5 pl-1">
            {items.map((item, j) => {
              const text = item.replace(/^- /, '');
              return (
                <li key={j} className="flex gap-3 text-muted-foreground leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2.5 flex-shrink-0" />
                  <span><InlineText text={text} /></span>
                </li>
              );
            })}
          </ul>
        );
        continue;
      }

      // Ordered list
      if (block.match(/^\d+\. /)) {
        const items = block.split('\n').filter(l => l.match(/^\d+\. /));
        elements.push(
          <ol key={i} className="my-5 space-y-2.5 pl-1 counter-reset-list">
            {items.map((item, j) => {
              const text = item.replace(/^\d+\. /, '');
              return (
                <li key={j} className="flex gap-3 text-muted-foreground leading-relaxed">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {j + 1}
                  </span>
                  <span><InlineText text={text} /></span>
                </li>
              );
            })}
          </ol>
        );
        continue;
      }

      // Bold paragraph (subtitle style)
      if (block.startsWith('**') && block.includes('**')) {
        const lines = block.split('\n');
        elements.push(
          <div key={i} className="my-5">
            {lines.map((line, j) => {
              if (line.trim() === '') return null;
              return <p key={j} className="text-muted-foreground leading-relaxed mb-2 last:mb-0"><InlineText text={line} /></p>;
            })}
          </div>
        );
        continue;
      }

      // Regular paragraph
      elements.push(
        <p key={i} className="text-muted-foreground leading-relaxed mb-5">
          <InlineText text={block} />
        </p>
      );
    }

    return elements;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={`${post.title} | Blog Skillcruit`}
        description={post.excerpt}
        canonical={`https://skillcruit.fr/blog/${post.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "datePublished": post.date,
              "dateModified": post.date,
              "wordCount": post.content.split(/\s+/).length,
              "inLanguage": "fr-FR",
              "author": {
                "@type": "Organization",
                "name": post.author,
                "url": "https://skillcruit.fr",
              },
              "publisher": {
                "@type": "Organization",
                "name": "Skillcruit",
                "url": "https://skillcruit.fr",
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://skillcruit.fr/blog/${post.slug}`,
              },
              "keywords": post.tags.join(", "),
              "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": [".prose-content h2", ".prose-content p:first-of-type"],
              },
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://skillcruit.fr" },
                { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://skillcruit.fr/blog" },
                { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://skillcruit.fr/blog/${post.slug}` },
              ],
            },
            ...(post.faq && post.faq.length > 0 ? [{
              "@type": "FAQPage",
              "mainEntity": post.faq.map(f => ({
                "@type": "Question",
                "name": f.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": f.answer,
                },
              })),
            }] : []),
          ],
        }}
      />

      <Navbar />

      <article className="pt-28 pb-24">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <AnimatedSection>
              <Button variant="ghost" size="sm" asChild className="mb-8">
                <Link to="/blog">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour au blog
                </Link>
              </Button>
            </AnimatedSection>

            {/* Header */}
            <AnimatedSection delay={0.1}>
              <header className="mb-10">
                <div className="flex flex-wrap gap-2 mb-5">
                  {post.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/5 text-primary text-sm font-medium">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-5 leading-tight text-balance">
                  {post.title}
                </h1>

                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-6 text-sm text-muted-foreground pb-6 border-b border-border/60">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {post.readTime} de lecture
                  </span>
                  <span>Par {post.author}</span>
                </div>
              </header>
            </AnimatedSection>

            {/* Table of contents */}
            {headings.length > 2 && (
              <AnimatedSection delay={0.15}>
                <nav className="mb-10 p-6 rounded-xl bg-slate-50 border border-border/60">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Sommaire</h2>
                  <ul className="space-y-2">
                    {headings.map((heading, i) => {
                      const id = heading.toLowerCase().replace(/[^a-zà-ÿ0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
                      return (
                        <li key={i}>
                          <a
                            href={`#${id}`}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                          >
                            <span className="w-1 h-1 rounded-full bg-primary/40" />
                            {heading}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </AnimatedSection>
            )}

            {/* Content */}
            <AnimatedSection delay={0.2}>
              <div className="prose-content">
                {renderContent()}
              </div>
            </AnimatedSection>

            {/* FAQ Section */}
            {post.faq && post.faq.length > 0 && (
              <AnimatedSection delay={0.25}>
                <section className="mt-14" aria-labelledby="faq-section">
                  <h2 id="faq-section" className="text-2xl font-bold mb-6 text-foreground">Questions fréquentes</h2>
                  <div className="space-y-4">
                    {post.faq.map((item, idx) => (
                      <details key={idx} className="group rounded-xl border border-border/60 bg-white overflow-hidden">
                        <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-foreground hover:text-primary transition-colors">
                          {item.question}
                          <span className="ml-2 text-muted-foreground group-open:rotate-180 transition-transform" aria-hidden="true">▾</span>
                        </summary>
                        <div className="px-5 pb-5 text-muted-foreground leading-relaxed border-t border-border/40 pt-4">
                          {item.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              </AnimatedSection>
            )}

            {/* CTA */}
            <AnimatedSection delay={0.3}>
              <div className="mt-14 p-8 rounded-2xl bg-primary/5 border border-primary/15 text-center">
                <h3 className="text-xl font-bold mb-2">Envie d'en savoir plus ?</h3>
                <p className="text-muted-foreground mb-6">Testez Skillcruit gratuitement pendant 14 jours, sans engagement.</p>
                <Button asChild size="lg" className="group">
                  <Link to="/#contact">
                    Demander une démo
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </AnimatedSection>

            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <AnimatedSection delay={0.4}>
                <div className="mt-16">
                  <h3 className="text-xl font-bold mb-6">Articles similaires</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {relatedPosts.map(related => (
                      <Link
                        key={related.slug}
                        to={`/blog/${related.slug}`}
                        className="p-6 rounded-xl bg-white border border-border/60 shadow-sm hover:shadow-md transition-all duration-300 group"
                      >
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {related.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded-full bg-primary/5 text-primary text-xs font-medium">{tag}</span>
                          ))}
                        </div>
                        <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors leading-snug">{related.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{related.excerpt}</p>
                        <span className="inline-flex items-center gap-1 text-sm text-primary font-medium mt-3 group-hover:gap-2 transition-all">
                          Lire <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
