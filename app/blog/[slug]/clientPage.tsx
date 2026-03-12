"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import PublicLayout from "@/components/PublicLayout";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/api";
import { useEffect, useState } from "react";

interface PostDetail {
  title?: string | { rendered?: string };
  content?: string | string[] | { rendered?: string };
  date?: string;
  publish_date?: string;
}

const decodeHTML = (html: string) => {
  if (typeof window === "undefined") return html;
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const BlogPost = () => {
  const params = useParams();
  
  const id = typeof params.slug === "string" ? params.slug : undefined;
  console.log("BlogPost id:", id);
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/blog/${id}`);
        const data = res.data;
        setPost(data.data);
        console.log("Fetched post data:", data);
        setNotFound(!data);
      } catch {
        setPost(null);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (!id) {
    return (
      <PublicLayout>
        <div className="section-padding text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Post not found</h1>
          <Link href="/blog" className="text-primary hover:underline">Back to blog</Link>
        </div>
      </PublicLayout>
    );
  }

  if (loading) {
    return (
      <PublicLayout>
        <section className="section-padding">
          <div className="container mx-auto max-w-3xl">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
              <ArrowLeft size={16} /> Back to blog
            </Link>
            <Skeleton className="h-4 w-24 mb-4" />
            <Skeleton className="h-10 w-full mb-6" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </section>
      </PublicLayout>
    );
  }

  if (notFound || !post) {
    return (
      <PublicLayout>
        <div className="section-padding text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Post not found</h1>
          <Link href="/blog" className="text-primary hover:underline">Back to blog</Link>
        </div>
      </PublicLayout>
    );
  }

  const title = typeof post.title === "string" ? post.title : post.title?.rendered || "";
  const rawContent =
  typeof post.content === "string"
    ? post.content
    : Array.isArray(post.content)
    ? post.content.join("\n")
    : post.content?.rendered || "";

const decodedContent = decodeHTML(rawContent);


  const date = post.publish_date || post.date || "";

  return (
    <PublicLayout>
      <section className="section-padding">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
              <ArrowLeft size={16} /> Back to blog
            </Link>
            <p className="text-sm text-muted-foreground mb-4">{date}</p>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">{title}</h1>
          <div
  className="prose prose-invert max-w-none text-muted-foreground"
  dangerouslySetInnerHTML={{ __html: decodedContent }}
/>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default BlogPost;
