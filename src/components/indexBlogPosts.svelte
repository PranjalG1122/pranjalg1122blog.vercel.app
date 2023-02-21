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
  export let IndexTitle: string;
</script>

<div class="flex flex-col gap-4">
  <h1 class="font-semibold desktop:text-4xl text-2xl">{IndexTitle}</h1>
  {#each posts as post}
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
            <span class="bg-slate-600 font-semibold rounded px-1 py-0.5 ">
              {tag}
            </span>
          {/each}
        </div>
        <p class="">{post.frontmatter.description}</p>
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
