import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AppLayout } from '@/layouts/app-layout';
import HeadingSmall from '@/components/heading-small';
import { Pencil, Trash2, Eye } from 'lucide-react';

interface Post {
    id: number;
    title: string;
    content: string;
    user: { name: string };
    created_at: string;
}

interface PaginatedPosts {
    data: Post[];
    links: any;
}

export default function PostsIndex() {
    const { posts, auth } = usePage<SharedData & { posts: PaginatedPosts }>().props;

    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Posts', href: '#' }];

    return (
        <>
            <Head title="Posts" />
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <HeadingSmall>Posts</HeadingSmall>
                        <Link href={route('posts.create')}>
                            <Button>New Post</Button>
                        </Link>
                    </div>

                    <Separator />

                    <div className="grid gap-4">
                        {posts.data.length === 0 ? (
                            <Card>
                                <CardContent className="pt-6">
                                    <p className="text-center text-gray-500">No posts found. Create your first post!</p>
                                </CardContent>
                            </Card>
                        ) : (
                            posts.data.map((post) => (
                                <Card key={post.id} className="hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <CardTitle className="text-xl">{post.title}</CardTitle>
                                                <CardDescription>
                                                    By {post.user.name} • {new Date(post.created_at).toLocaleDateString()}
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-700 line-clamp-2">{post.content}</p>
                                    </CardContent>
                                    <div className="px-6 py-4 border-t flex gap-2 justify-end">
                                        <Link href={route('posts.show', post.id)}>
                                            <Button variant="outline" size="sm" className="gap-2">
                                                <Eye className="w-4 h-4" />
                                                View
                                            </Button>
                                        </Link>
                                        {auth.user?.id === post.user.id && (
                                            <>
                                                <Link href={route('posts.edit', post.id)}>
                                                    <Button variant="outline" size="sm" className="gap-2">
                                                        <Pencil className="w-4 h-4" />
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Link
                                                    href={route('posts.destroy', post.id)}
                                                    method="delete"
                                                    as="button"
                                                    className="inline-flex"
                                                    onClick={(e) => {
                                                        if (!confirm('Are you sure?')) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                >
                                                    <Button variant="destructive" size="sm" className="gap-2">
                                                        <Trash2 className="w-4 h-4" />
                                                        Delete
                                                    </Button>
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
