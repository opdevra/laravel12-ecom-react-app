import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AppLayout } from '@/layouts/app-layout';
import HeadingSmall from '@/components/heading-small';
import { Pencil, Trash2, ArrowLeft } from 'lucide-react';

interface Post {
    id: number;
    title: string;
    content: string;
    user: { id: number; name: string };
    created_at: string;
    updated_at: string;
}

export default function ShowPost() {
    const { post, auth } = usePage<SharedData & { post: Post }>().props;
    const isOwner = auth.user?.id === post.user.id;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Posts', href: route('posts.index') },
        { title: post.title, href: '#' },
    ];

    return (
        <>
            <Head title={post.title} />
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <HeadingSmall>{post.title}</HeadingSmall>
                            <p className="text-sm text-gray-500 mt-1">
                                By {post.user.name} • Published{' '}
                                {new Date(post.created_at).toLocaleDateString()}
                            </p>
                        </div>
                        <Link href={route('posts.index')}>
                            <Button variant="outline" className="gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </Button>
                        </Link>
                    </div>

                    <Separator />

                    <Card>
                        <CardContent className="pt-6">
                            <div className="prose prose-sm max-w-none">
                                <p className="whitespace-pre-wrap text-gray-700">{post.content}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {isOwner && (
                        <div className="flex gap-3 justify-end pt-4">
                            <Link href={route('posts.edit', post.id)}>
                                <Button variant="outline" className="gap-2">
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
                                    if (!confirm('Are you sure? This action cannot be undone.')) {
                                        e.preventDefault();
                                    }
                                }}
                            >
                                <Button variant="destructive" className="gap-2">
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </AppLayout>
        </>
    );
}
