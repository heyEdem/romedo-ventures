export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <main>
      <h1>Product Detail</h1>
      <p>Viewing product: {params.slug}</p>
    </main>
  );
}
