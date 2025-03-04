const parser = new DOMParser();

export async function fetchParse(url: string): Promise<Document> {
    const res = await fetch(url);
    const html = await res.text();
    return parser.parseFromString(html, "text/html");
}
