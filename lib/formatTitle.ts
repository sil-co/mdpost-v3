
export const formatTitle = (which: string) => {
    // If first word is p or P, return "My Portfolio"; 
    if (which[0].toLowerCase() === "p") { return "My Portfolio"; }

    return which // eg: "tech-blog"
        .split("-") // ["tech", "blog"]
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // "Tech", "Blog" 
        .join(" ");  // "Tech Blog"
}
