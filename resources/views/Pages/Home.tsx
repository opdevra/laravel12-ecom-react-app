import Layout from "./Layout";
import { Head } from "@inertiajs/react";

export default function Home() {
  return (
    <Layout>
      <Head title="Home" />
      <h1>Home</h1>
      <p>Hello, welcome to your first Inertia app!</p>
    </Layout>
  );
}