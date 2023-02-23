<script lang="ts">
  export let posts: {
    frontmatter: {
      title: string;
      date: string;
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
  $: filteredPosts = posts.filter((post) => {
    return (
      (post.frontmatter.title.toLowerCase().includes(searched.toLowerCase()) &&
        post.frontmatter.tags.some((tag) => selectedTags.includes(tag))) ||
      (post.frontmatter.title.toLowerCase().includes(searched.toLowerCase()) &&
        selectedTags.length === 0) ||
      (post.frontmatter.tags.some((tag) => selectedTags.includes(tag)) &&
        searched === "")
    );
  });
</script>

<div class="flex flex-col gap-4">
  <h1 class="font-semibold desktop:text-4xl text-2xl">All Posts</h1>
  <input
    placeholder="Search all posts..."
    class="w-full px-2 py-1 bg-slate-700 rounded-md"
    bind:value={searched}
  />
  <div class="flex flex-row gap-2 flex-wrap">
    {#each tags as tag}
      <button
        class={"bg-slate-600 text-base font-semibold rounded px-1 py-0.5 " +
          (selectedTags.includes(tag) ? "text-blue-400" : "text-neutral-400")}
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
  {#each filteredPosts as post}
    <div>
      <article class="p-4 bg-slate-700 rounded-md flex flex-col gap-1">
        <h1 class="font-semibold desktop:text-xl text-lg">
          <span>{post.frontmatter.title}</span>
          <span class="text-neutral-400 text-base">
            {" "}
            / {post.frontmatter.date}
          </span>
        </h1>
        <div class="flex flex-row gap-2 flex-wrap">
          {#each post.frontmatter.tags as tag}
            <span
              class="bg-slate-600 text-base font-semibold rounded px-1 py-0.5 "
            >
              {tag}
            </span>
          {/each}
        </div>
        <p class="">
          {post.frontmatter.description}
        </p>
        <a
          href={post.url}
          class="text-blue-400 hover:underline underline-offset-2"
        >
          Read more
        </a>
      </article>
    </div>
  {/each}
</div>
