"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Search, X } from "lucide-react";
import PublicLayout from "@/components/PublicLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Post {
  id: number | string;
  slug: string;
  title?: string | { rendered?: string };
  excerpt?: string | { rendered?: string };
  content?: string | { rendered?: string };
  publish_date?: string;
  date?: string;
  blog_category?: string;
  category?: string;
  categories?: { name: string }[];
}

const EXCERPT_LENGTH = 120;

const truncateExcerpt = (text: string): string => {
  if (!text) return "";
  const plain = text
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&hellip;/g, "...")
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z0-9#]+;/gi, " ")
    .trim();
  if (plain.length <= EXCERPT_LENGTH) return plain;
  return plain.slice(0, EXCERPT_LENGTH).trim() + "...";
};

const getPostExcerpt = (post: Post) => {
  const ex = typeof post.excerpt === "string" ? post.excerpt : post.excerpt?.rendered || "";
  const ct = typeof post.content === "string" ? post.content : post.content?.rendered || "";
  return truncateExcerpt(ex || ct);
};

const WORDS_PER_MINUTE = 200;

const getPostReadTime = (post: Post): string => {
  const ex = typeof post.excerpt === "string" ? post.excerpt : post.excerpt?.rendered || "";
  const ct = typeof post.content === "string" ? post.content : post.content?.rendered || "";
  const text = (ex || ct).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(/\s+/).length : 0;
  const mins = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
  return `${mins} min read`;
};

const getPostCategory = (post: Post) =>
  post.blog_category || post.category ||
  (Array.isArray(post.categories) && post.categories[0]?.name) ||
  "";

const getPageNumbers = (page: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | "ellipsis")[] = [];
  if (page <= 3) {
    for (let i = 1; i <= 5; i++) pages.push(i);
    pages.push("ellipsis");
    pages.push(totalPages);
  } else if (page >= totalPages - 2) {
    pages.push(1);
    pages.push("ellipsis");
    for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    pages.push("ellipsis");
    for (let i = page - 1; i <= page + 1; i++) pages.push(i);
    pages.push("ellipsis");
    pages.push(totalPages);
  }
  return pages;
};

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/blogs", {
        params: { page, search: search || undefined },
      });
      const data = res.data;
      const list = Array.isArray(data) ? data : data?.posts ?? data?.data ?? [];
      setPosts(list);
      setTotalPages(data?.totalPages ?? data?.total_pages ?? Math.max(1, Math.ceil((data?.total ?? list.length) / 6)));
      setTotal(data?.total ?? data?.total_posts ?? list.length);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page, search]);

  const handleSearch = () => {
    setSearch(searchInput.trim());
    setPage(1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearch("");
    setPage(1);
  };

  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <PublicLayout>
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Our <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-muted-foreground mb-6">Insights on voice AI, product updates, and industry trends.</p>

            <div className="flex gap-2 max-w-md mx-auto">
              <div className="relative flex-1">
                {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /> */}
                <Input
                  placeholder="Search posts..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pl-9 pr-9"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <Button variant="hero" onClick={handleSearch} className="cursor-pointer">
                Search
              </Button>
            </div>
          </motion.div>

          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-card p-6">
                  <div className="flex gap-3 mb-3">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <p className="text-muted-foreground">No posts found.</p>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {posts.map((post, i) => (
                  <motion.article
                    key={post.id || i}
                    className="glass-card-hover p-6 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link href={`/blog/${post.id}`} className="block">
                      <div className="flex items-center gap-3 mb-3">
                        {getPostCategory(post) && (
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            {getPostCategory(post)}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock size={12} /> {getPostReadTime(post)}
                        </span>
                      </div>
                      <h2 className="text-xl font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                        {typeof post.title === "string" ? post.title : post.title?.rendered || ""}
                      </h2>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {getPostExcerpt(post)}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{post.publish_date || post.date || ""}</span>
                        <span className="text-sm text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          Read more <ArrowRight size={14} />
                        </span>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1 mt-10">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="cursor-pointer"
                  >
                    Prev
                  </Button>
                  <div className="flex items-center gap-1 mx-2">
                    {pageNumbers.map((n, i) =>
                      n === "ellipsis" ? (
                        <span key={`e-${i}`} className="px-2 text-muted-foreground">
                          ...
                        </span>
                      ) : (
                        <Button
                          key={n}
                          variant={page === n ? "default" : "ghost"}
                          size="sm"
                          className="min-w-9 cursor-pointer"
                          onClick={() => setPage(n)}
                        >
                          {n}
                        </Button>
                      )
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="cursor-pointer"
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </PublicLayout>
  );
};

export default Blog;
