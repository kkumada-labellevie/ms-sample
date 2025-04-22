import type { Actions } from './$types';

export const actions: Actions = {
  default: async (event) => {
    const formData = await event.request.formData();

    const response = await event.fetch('/api/delete-from-cart', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: formData.get('id'),
      }),
    });

    return await response.json();
  },
};
