export function Image({ src, alt, width, height, className }: { src: string, alt: string, width?: number, height?: number, className?: string }) {
  return <img src={src} alt={alt} width={width} height={height} loading="lazy" onError={(e) => (e.target as HTMLImageElement).src = '/placeholder.png'} className={className} />;
}