<script lang="ts">
  import '../app.css';

  let { children } = $props();
</script>

<nav class="flex flex-col gap-2 mb-10">
  <h2 class="text-lg">Navigation(By Kumada)</h2>
  <ul>
    <li>
      <a href="/" class="text-blue-700 underline hover:no-underline">Home</a>
    </li>
    <li>
      <a href="/add-to-cart" class="text-blue-700 underline hover:no-underline">Add cart</a>
    </li>
    <li>
      <a href="/get-to-cart" class="text-blue-700 underline hover:no-underline">Get carts</a>
    </li>
    <li>
      <a href="/get-to-cart/1" class="text-blue-700 underline hover:no-underline">Get cart<span class="pl-2"> /get-to-cart/[id]</span></a>
    </li>
    <li>
      <a href="/delete-from-cart" class="text-blue-700 underline hover:no-underline">Delete carts</a>
    </li>
  </ul>
</nav>

{@render children()}
