export function getYouTubeEmbedUrl(videoUrl: string, startSeconds = 0): string | null {
  try {
    const url = new URL(videoUrl);
    let videoId: string | null = null;
    if (url.hostname === 'youtu.be') videoId = url.pathname.slice(1);
    else if (url.hostname.endsWith('youtube.com')) videoId = url.searchParams.get('v');
    if (!videoId || !/^[\w-]{11}$/.test(videoId)) return null;
    const start = Math.max(0, Math.floor(startSeconds));
    return `https://www.youtube-nocookie.com/embed/${videoId}?start=${start}`;
  } catch {
    return null;
  }
}
