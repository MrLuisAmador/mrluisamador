import { createClient, groq } from "next-sanity";
import { Blog }  from "@/Types/blog"

export async function getBlogs(): Promise<Blog[]> {
    const client = createClient({
        projectId: 'kuor2i8g',
        dataset: 'production',
        apiVersion: "2023-03-04",
        useCdn: false
    });

    return client.fetch(
        groq`*[_type == "post"]{
            _id,
            publishedAt,
            title,
            "slug": slug.current,
            body
        }`
    );
}

export async function getBlog( slug: string ): Promise<Blog> {
    const client = createClient({
        projectId: 'kuor2i8g',
        dataset: 'production',
        apiVersion: "2023-03-04",
        useCdn: false
    });

    return client.fetch(
        groq`*[_type == "post" && slug.current == $slug][0]{
            _id,
            publishedAt,
            title,
            "slug": slug.current,
            body
        }`,
        {slug}
    );
}

