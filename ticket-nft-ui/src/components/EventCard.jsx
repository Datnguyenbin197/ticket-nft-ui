import { Link } from "react-router-dom";

// Props: id (để build URL), image, title, date, location, price
export default function EventCard({ id, image, title, date, location, price }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover" />

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mb-1">📅 {date}</p>
        <p className="text-sm text-gray-500 mb-4">📍 {location}</p>

        <div className="flex justify-between items-center mt-4 border-t pt-4">
          <div>
            <p className="text-xs text-gray-400">Giá từ</p>
            <p className="text-lg font-bold text-blue-600">{price} MATIC</p>
          </div>
          {/* Navigate tới EventDetail với id */}
          <Link
            to={`/event/${id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Xem vé
          </Link>
        </div>
      </div>
    </div>
  );
}
