import { json } from '@sveltejs/kit';

export async function DELETE({ request }) {
  const body = await request.json();

  // クエリパラメータをURLに追加
  const url = new URL(`http://ms1-app:3000/delete-from-cart/${body.params.id}`);

  const response = await fetch(url.toString(), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return json({
    success: true,
  });
}