import React, { useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationProps } from '../../../types/ui';
import { Button } from '../Button';
import { cn } from '../../../utils/cn';

function range(start: number, end: number) {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
}

const PAGES_PER_BLOCK = 5;

export const Pagination: React.FC<PaginationProps> = ({
    total,
    currentPage,
    pageSize = 10,
    pageSizeOptions = [10, 20, 50],
    onPageChange,
    onPageSizeChange,
    className = '',
}) => {

    const safePageSize = Math.max(1, pageSize);

    const totalPageCount = Math.ceil(Math.max(0, total) / safePageSize);

    if (totalPageCount <= 1) return null;

    const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPageCount);

    useEffect(() => {
        if (currentPage < 1) onPageChange(1);
        else if (currentPage > totalPageCount) onPageChange(totalPageCount);
    }, [currentPage, totalPageCount, onPageChange]);


    const currentBlock = Math.floor((safeCurrentPage - 1) / PAGES_PER_BLOCK);
    const blockStart = currentBlock * PAGES_PER_BLOCK + 1;
    const blockEnd = Math.min((currentBlock + 1) * PAGES_PER_BLOCK, totalPageCount);


    const paginationRange = useMemo(() => range(blockStart, blockEnd), [blockStart, blockEnd]);

    const canGoPrevBlock = blockStart > 1;
    const canGoNextBlock = blockEnd < totalPageCount;


    const onPreviousBlock = () => {
        const prevBlockEnd = blockStart - 1;
        onPageChange(Math.max(1, prevBlockEnd));
    };

    const onNextBlock = () => {
        const nextBlockStart = blockEnd + 1;
        onPageChange(Math.min(totalPageCount, nextBlockStart));
    };

    const handlePageSizeChange = (nextSize: number) => {
        onPageSizeChange?.(Math.max(1, nextSize));

    };

    return (
        <div className={cn('flex items-center justify-between gap-4', className)}>
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onPreviousBlock}
                    disabled={!canGoPrevBlock}
                    aria-label="Previous block"
                    leftIcon={<ChevronLeft />}
                />

                <nav aria-label="Pagination" className="flex items-center gap-1">
                    {paginationRange.map((page) => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            aria-label={`Page ${page}`}
                            aria-current={page === safeCurrentPage ? 'page' : undefined}
                            className={cn(
                                'min-w-[36px] flex items-center justify-center px-3 py-1 rounded-md text-sm transition-colors',
                                page === safeCurrentPage
                                    ? 'bg-primary text-white'
                                    : 'hover:bg-surfaceHighlight text-sub'
                            )}
                        >
                            {page}
                        </button>
                    ))}
                </nav>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onNextBlock}
                    disabled={!canGoNextBlock}
                    aria-label="Next block"
                    rightIcon={<ChevronRight />}
                />
            </div>

            {onPageSizeChange && (
                <div className="flex items-center gap-2">
                    <label className="text-tiny text-muted">페이지당</label>
                    <select
                        className="bg-transparent border border-white/10 rounded-md px-2 py-1 text-sm"
                        value={safePageSize}
                        onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                        aria-label="Items per page"
                    >
                        {pageSizeOptions.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default Pagination;
