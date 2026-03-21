/**
 * ISO 형식의 날짜 문자열을 yyyy-mm-dd hh:mm:ss 형식으로 변환합니다.
 * @param dateStr ISO 형식의 날짜 문자열 (예: 2026-03-20T13:43:52.057142)
 * @returns 포맷팅된 날짜 문자열
 */
export const formatDateTime = (dateStr: string | null | undefined): string => {
  if (!dateStr) return '-';
  
  try {
    // 2026-03-20T13:43:52.057142 형식을 처리하기 위해 T가 없는 경우 대비
    const ISOStr = dateStr.includes('T') ? dateStr : dateStr.replace(' ', 'T');
    const date = new Date(ISOStr);
    
    if (isNaN(date.getTime())) return dateStr;

    const pad = (n: number) => n.toString().padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  } catch (error) {
    console.error('Failed to format date:', error);
    return dateStr;
  }
};
