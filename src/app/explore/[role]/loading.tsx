export default function ExploreSkeleton() {
    return (
        <div className="min-h-screen bg-slate-50 pb-24 animate-pulse">

            {/* Sticky header skeleton */}
            <div className="bg-white border-b border-slate-200 sticky top-16 z-30">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="skeleton w-9 h-9 rounded-lg" />
                        <div>
                            <div className="skeleton w-40 h-5 rounded mb-1" />
                            <div className="skeleton w-24 h-3 rounded" />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="skeleton w-28 h-9 rounded-lg" />
                        <div className="skeleton w-20 h-9 rounded-lg" />
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 pt-8 space-y-10">

                {/* Stats skeleton */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                            <div className="skeleton w-20 h-3 rounded mb-2" />
                            <div className="skeleton w-28 h-6 rounded mb-1" />
                            <div className="skeleton w-16 h-3 rounded" />
                        </div>
                    ))}
                </div>

                {/* Career ladder skeleton */}
                <div>
                    <div className="skeleton w-48 h-6 rounded mb-2" />
                    <div className="skeleton w-72 h-4 rounded mb-6" />
                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="flex flex-col items-center w-12">
                                    <div className="skeleton w-11 h-11 rounded-full" />
                                    {i < 4 && <div className="skeleton w-0.5 h-16 mt-1" />}
                                </div>
                                <div className="flex-1 bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                                    <div className="flex justify-between mb-3">
                                        <div className="skeleton w-40 h-5 rounded" />
                                        <div className="skeleton w-20 h-5 rounded-full" />
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {[...Array(6)].map((_, j) => (
                                            <div key={j} className="skeleton w-24 h-8 rounded-lg" />
                                        ))}
                                    </div>
                                    <div className="skeleton w-28 h-4 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chart skeleton */}
                <div>
                    <div className="skeleton w-44 h-6 rounded mb-2" />
                    <div className="skeleton w-64 h-4 rounded mb-6" />
                    <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                        <div className="skeleton w-full h-48 rounded-lg" />
                    </div>
                </div>

                {/* Timeline skeleton */}
                <div>
                    <div className="skeleton w-44 h-6 rounded mb-2" />
                    <div className="skeleton w-64 h-4 rounded mb-6" />
                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex gap-4 bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                                <div className="skeleton w-8 h-8 rounded-full flex-shrink-0" />
                                <div className="flex-1">
                                    <div className="skeleton w-40 h-4 rounded mb-2" />
                                    <div className="skeleton w-24 h-3 rounded mb-3" />
                                    <div className="flex gap-2">
                                        {[...Array(4)].map((_, j) => (
                                            <div key={j} className="skeleton w-20 h-6 rounded-full" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
