import { Skeleton } from "@/components/ui/skeleton"

const TableSkeleton = ({ rows = 6 }) => {
    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Tiêu đề  Nút bấm */}
            <div className="flex justify-between items-end">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-10 w-64" />
                </div>
                <Skeleton className="h-12 w-48" />
            </div>

            {/* Bảng sản phẩm */}
            <div className="border border-gray-100 rounded-sm overflow-hidden">
                <div className="bg-gray-50 p-4 border-b border-gray-100">
                    <Skeleton className="h-4 w-full" />
                </div>

                <div className="divide-y divide-gray-50">
                    {[...Array(rows)].map((_, i) => (
                        <div key={i} className="p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                                <Skeleton className="h-16 w-16" />
                                <div className="space-y-3">
                                    <Skeleton className="h-4 w-48" />
                                    <Skeleton className="h-3 w-32" />
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <Skeleton className="h-8 w-16" />
                                <Skeleton className="h-8 w-16" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TableSkeleton
