// Helper function to render stars
export default function StarRating({ rating = 5, reviews = 0 }) {
    return (
        <div className="flex items-center gap-2 mt-2">
            <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                    <span key={i}>
                        {i < Math.floor(rating) ? '★' : '☆'}
                    </span>
                ))}
            </div>
            <span className="text-sm text-orange-600 font-semibold">
                {reviews} reviews
            </span>
        </div>
    );
};