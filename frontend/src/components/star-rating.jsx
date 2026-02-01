import { Star } from "lucide-react";

// Helper function to render stars
export default function StarRating({ rating = 5, reviews = 0 }) {
    return (
        <div className="flex items-center gap-2 mt-2">
            <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(rating) ? 'fill-current' : 'text-gray-300'}`}
                    />
                ))}
            </div>
            <span className="text-sm text-orange-600 font-semibold">
                {reviews} reviews
            </span>
        </div>
    );
};
