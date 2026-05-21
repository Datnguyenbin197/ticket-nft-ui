import EventCard from "../components/EventCard";

export default function Home() {
  // Dữ liệu giả (Mock data) để test UI trong lúc chờ Blockchain Dev
  const mockEvents = [
    {
      id: "1",
      title: "Concert Anh Trai Say Hi - Đà Nẵng",
      date: "20/10/2026 - 19:00",
      location: "Sân vận động Quân khu 5, Đà Nẵng",
      price: "15.5",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "2",
      title: "Chung Kết Đấu Trường Danh Vọng Mùa Đông",
      date: "05/11/2026 - 14:00",
      location: "Nhà thi đấu Quân khu 7",
      price: "5.0",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "3",
      title: "Giải Đấu Valorant VKU Mở Rộng",
      date: "12/12/2026 - 08:00",
      location: "Khuôn viên trường VKU",
      price: "2.5",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Sự kiện nổi bật 🔥
          </h1>
          <p className="text-gray-500 mt-2">
            Khám phá và sở hữu ngay vé NFT độc quyền
          </p>
        </div>
      </div>

      {/* Grid hiển thị danh sách thẻ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockEvents.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            date={event.date}
            location={event.location}
            price={event.price}
            image={event.image}
          />
        ))}
      </div>
    </div>
  );
}
