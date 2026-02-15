import * as React from "react"

import { cn } from "../../utils/cn"

// Layout
const Table = React.forwardRef<
    HTMLTableElement,
    React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
        <table
            ref={ref}
            className={cn("w-full caption-bottom text-sm text-left", className)}
            {...props}
        />
    </div>
))
Table.displayName = "Table"

/**
 * 테이블의 헤더 섹션 (`<thead>`).
 * `TableRow`와 함께 사용하여 컬럼의 제목들을 정의합니다.
 */
const TableHeader = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

/**
 * 테이블의 본문 섹션 (`<tbody>`).
 * 실제 데이터가 들어가는 `TableRow`들을 감싸는 컨테이너입니다.
 */
const TableBody = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <tbody
        ref={ref}
        className={cn("[&_tr:last-child]:border-0", className)}
        {...props}
    />
))
TableBody.displayName = "TableBody"

/**
 * 테이블의 최하단 섹션 (`<tfoot>`).
 * 합계(Total)나 요약 정보를 표시할 때 사용합니다.
 */
const TableFooter = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <tfoot
        ref={ref}
        className={cn(
            "border-t bg-surfaceHighlight/50 font-medium [&>tr]:last:border-b-0",
            className
        )}
        {...props}
    />
))
TableFooter.displayName = "TableFooter"

/**
 * 테이블의 한 행(Row) (`<tr>`).
 * `Header`나 `Body` 안에서 `TableCell`들을 묶어주는 역할을 합니다.
 * 마우스 오버 시 하이라이트 효과가 적용됩니다.
 */
const TableRow = React.forwardRef<
    HTMLTableRowElement,
    React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
    <tr
        ref={ref}
        className={cn(
            "border-b transition-colors hover:bg-white/5 data-[state=selected]:bg-white/5 border-border",
            className
        )}
        {...props}
    />
))
TableRow.displayName = "TableRow"

/**
 * 헤더 셀 (`<th>`).
 * `TableHeader` 내부의 `TableRow`에서 사용됩니다.
 * 기본적으로 굵은 글씨와 좌측 정렬이 적용되어 있습니다.
 */
const TableHead = React.forwardRef<
    HTMLTableCellElement,
    React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
    <th
        ref={ref}
        className={cn(
            "h-10 px-4 text-left align-middle font-medium text-sub [&:has([role=checkbox])]:pr-0", // Layout
            "text-xs uppercase tracking-widest", // Typography (IDE Monitor Style)
            className
        )}
        {...props}
    />
))
TableHead.displayName = "TableHead"

/**
 * 데이터 셀 (`<td>`).
 * 테이블의 가장 기본이 되는 데이터 표시 단위입니다.
 */
const TableCell = React.forwardRef<
    HTMLTableCellElement,
    React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={cn(
            "p-4 align-middle [&:has([role=checkbox])]:pr-0 font-sans",
            className
        )}
        {...props}
    />
))
TableCell.displayName = "TableCell"

/**
 * 테이블의 설명 또는 제목 (`<caption>`).
 * 접근성을 위해 테이블의 목적을 설명할 때 사용하며, 테이블 하단에 렌더링됩니다.
 */
const TableCaption = React.forwardRef<
    HTMLTableCaptionElement,
    React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
    <caption
        ref={ref}
        className={cn("mt-4 text-sm text-sub", className)}
        {...props}
    />
))
TableCaption.displayName = "TableCaption"

export {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
}
