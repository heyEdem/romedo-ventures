export default function CategoryDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <main>
      <h1>Category</h1>
      <p>Viewing category: {params.slug}</p>
    </main>
  );
}
