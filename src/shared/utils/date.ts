export const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  // Convert standard SQL/ISO format with space to 'T' for better browser compatibility (Safari)
  const d = new Date(dateStr.replace(' ', 'T'));
  if (isNaN(d.getTime())) return dateStr;
  
  const pad = (n: number) => n.toString().padStart(2, '0');
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  const seconds = pad(d.getSeconds());
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export function timeAgo(dateStr: string): string {
  if (!dateStr) return '';
  const past = new Date(dateStr.replace(' ', 'T'));
  if (isNaN(past.getTime())) return dateStr;
  
  const now = new Date();
  const diff = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diff < 60) return `${diff}초 전`;
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}
