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
    class="w-full px-2 py-1 bg-slate-950 rounded border border-slate-800 focus:border-slate-700 focus:outline-none"
    bind:value={searched}
  />
  <div class="flex flex-row gap-2 flex-wrap">
    {#each tags as tag}
      <button
        class={"text-base rounded px-2 py-1 " +
          (selectedTags.includes(tag) ? "bg-slate-600" : "bg-slate-800")}
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
  {#each filteredPosts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()) as post}
    <a
      href={post.url}
      class="p-4 bg-slate-950 rounded border border-slate-800 flex flex-col gap-2"
    >
      <h1 class="font-semibold desktop:text-2xl text-xl">
        {post.frontmatter.title}
      </h1>
      <span class="text-neutral-400 text-base">
        {post.frontmatter.date}
      </span>
      <div class="flex flex-row gap-2 flex-wrap">
        {#each post.frontmatter.tags as tag}
          <span class="bg-slate-800 text-base rounded px-2 py-1">
            {tag}
          </span>
        {/each}
      </div>
      <p class="">
        {post.frontmatter.description}
      </p>
      <a
        href={post.url}
        class="text-blue-400 hover:underline underline-offset-2 w-fit"
      >
        Read more
      </a>
    </a>
  {/each}
</div>
