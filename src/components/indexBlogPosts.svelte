<script lang="ts">
  export let posts: {
    frontmatter: {
      title: string;
      pubDate: string;
      tags: string[];
      description: string;
    };
    url: string;
  }[];

  let tags: string[] = [
    ...new Set(
      posts
        .map((post) => post.frontmatter.tags)
        .flat()
        .map((tag) => tag)
    ),
  ];

  let selectedTags: string[] = [];
  let searched: string = "";

  $: filteredPosts = posts
    .filter((post) => {
      return (
        (post.frontmatter.title
          .toLowerCase()
          .includes(searched.toLowerCase()) &&
          post.frontmatter.tags.some((tag) => selectedTags.includes(tag))) ||
        (post.frontmatter.title
          .toLowerCase()
          .includes(searched.toLowerCase()) &&
          selectedTags.length === 0) ||
        (post.frontmatter.tags.some((tag) => selectedTags.includes(tag)) &&
          searched === "")
      );
    })
    .sort((a, b) => {
      return (
        Date.parse(b.frontmatter.pubDate) - Date.parse(a.frontmatter.pubDate)
      );
    });
</script>

<div class="flex flex-col gap-4">
  <h1 class="font-medium md:text-4xl text-2xl">All Posts</h1>
  <input
    placeholder="Search all posts..."
    class="w-full px-2 py-1 bg-neutral-800 focus:outline-neutral-700 focus:outline"
    bind:value={searched}
  />
  <div class="flex flex-row gap-2 items-center flex-wrap">
    {#each tags as tag}
      <button
        class={"text-base px-2 py-1 " +
          (selectedTags.includes(tag) ? "bg-neutral-700" : "bg-neutral-800")}
        on:click={() => {
          selectedTags.includes(tag)
            ? (selectedTags = selectedTags.filter((t) => t !== tag))
            : (selectedTags = [...selectedTags, tag]);
        }}
      >
        {tag}
      </button>
    {/each}
  </div>
  {#if filteredPosts.length !== 0}
    {#each filteredPosts as post}
      <a
        href={post.url}
        class="py-4 bg-neutral-900 flex flex-col gap-2 border-b border-neutral-500"
      >
        <h1 class="font-semibold md:text-2xl text-xl">
          {post.frontmatter.title}
        </h1>
        <span class="text-neutral-500 text-base">
          {post.frontmatter.pubDate}
        </span>
        <div class="flex flex-row gap-2 flex-wrap">
          {#each post.frontmatter.tags as tag}
            <span class="bg-neutral-800 text-base px-2 py-1">
              {tag}
            </span>
          {/each}
        </div>
        <p class="">
          {post.frontmatter.description}
        </p>
        <a
          href={post.url}
          class="text-blue-500 hover:underline underline-offset-2 w-fit"
        >
          Read more
        </a>
      </a>
    {/each}{:else}
    <div class="text-neutral-500 w-full text-center py-8">
      No posts found ¯\_(ツ)_/¯
    </div>
  {/if}
</div>
