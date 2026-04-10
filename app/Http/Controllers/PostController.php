<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('user')->latest()->paginate(10);
        return Inertia::render('posts/Index', [
            'posts' => $posts,
        ]);
    }

    public function create()
    {
        return Inertia::render('posts/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string|min:10',
        ]);

        $post = Post::create([
            ...$validated,
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('posts.show', $post)->with('success', 'Post created successfully');
    }

    public function show(Post $post)
    {
        $post->load('user');
        return Inertia::render('posts/Show', [
            'post' => $post,
        ]);
    }

    public function edit(Post $post)
    {
        $this->authorize('update', $post);
        return Inertia::render('posts/Edit', [
            'post' => $post,
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $this->authorize('update', $post);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string|min:10',
        ]);

        $post->update($validated);

        return redirect()->route('posts.show', $post)->with('success', 'Post updated successfully');
    }

    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);
        $post->delete();
        return redirect()->route('posts.index')->with('success', 'Post deleted successfully');
    }
}
