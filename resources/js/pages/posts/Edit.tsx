import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AppLayout } from '@/layouts/app-layout';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Separator } from '@/components/ui/separator';

interface Post {
    id: number;
    title: string;
    content: string;
    user_id: number;
}

export default function EditPost() {
    const { post } = usePage<SharedData & { post: Post }>().props;
    const { data, setData, patch, processing, errors } = useForm({
        title: post.title,
        content: post.content,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Posts', href: route('posts.index') },
        { title: post.title, href: route('posts.show', post.id) },
        { title: 'Edit', href: '#' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('posts.update', post.id));
    };

    return (
        <>
            <Head title={`Edit - ${post.title}`} />
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="max-w-2xl mx-auto space-y-6">
                    <div>
                        <HeadingSmall>Edit Post</HeadingSmall>
                    </div>

                    <Separator />

                    <Card>
                        <CardHeader>
                            <CardTitle>Post Details</CardTitle>
                            <CardDescription>Update the post information below</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        placeholder="Post title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        disabled={processing}
                                    />
                                    {errors.title && <InputError message={errors.title} />}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="content">Content</Label>
                                    <Textarea
                                        id="content"
                                        placeholder="Post content (minimum 10 characters)"
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        disabled={processing}
                                        rows={8}
                                    />
                                    {errors.content && <InputError message={errors.content} />}
                                </div>

                                <div className="flex gap-3 justify-end">
                                    <Button variant="outline" onClick={() => window.history.back()}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Updating...' : 'Update Post'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </AppLayout>
        </>
    );
}
