import { useState } from "react";
import { useParams, Link } from "react-router-dom";

// Props: onBuyTicket (function từ Người 3), account (string address hoặc null)
export default function EventDetail({ onBuyTicket, account }) {
  const { id } = useParams(); // lấy event id từ URL

  
  const allEvents = {
    1: {
      title: "Concert Anh Trai Say Hi - Đà Nẵng",
      description:
        "Đêm nhạc bùng nổ quy tụ dàn Anh Trai hot nhất năm. Trải nghiệm hệ thống vé NFT độc bản, minh bạch và bảo mật tuyệt đối.",
      location: "Sân vận động Quân khu 5, Đà Nẵng",
      start_date: "20/10/2026 - 19:00",
      banner_url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80",
      categories: [
        {
          id: "cat-vip",
          name: "Vé V.I.P (Fanzone)",
          price_matic: "15.5",
          remaining: 50,
          total_supply: 200,
        },
        {
          id: "cat-ga",
          name: "Vé Tiêu Chuẩn",
          price_matic: "5.0",
          remaining: 450,
          total_supply: 1000,
        },
        {
          id: "cat-eb",
          name: "Vé Sớm (Early Bird)",
          price_matic: "3.5",
          remaining: 0,
          total_supply: 100,
        },
      ],
    },
    2: {
      title: "Chung Kết Đấu Trường Danh Vọng Mùa Đông",
      description:
        "Trận chung kết đỉnh cao của làng esport Việt Nam. Các đội mạnh nhất tranh tài trực tiếp.",
      location: "Nhà thi đấu Quân khu 7",
      start_date: "05/11/2026 - 14:00",
      banner_url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categories: [
        {
          id: "cat-vip",
          name: "Vé VIP Khán Đài A",
          price_matic: "8.0",
          remaining: 30,
          total_supply: 100,
        },
        {
          id: "cat-ga",
          name: "Vé Thường",
          price_matic: "3.0",
          remaining: 200,
          total_supply: 500,
        },
      ],
    },
    3: {
      title: "Giải Đấu Valorant VKU Mở Rộng",
      description:
        "Giải đấu Valorant sinh viên lớn nhất khu vực miền Trung, quy tụ các team từ các trường đại học.",
      location: "Khuôn viên trường VKU",
      start_date: "12/12/2026 - 08:00",
      banner_url:"https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categories: [
        {
          id: "cat-sv",
          name: "Vé Sinh Viên",
          price_matic: "1.0",
          remaining: 300,
          total_supply: 500,
        },
        {
          id: "cat-ga",
          name: "Vé Thường",
          price_matic: "2.5",
          remaining: 150,
          total_supply: 300,
        },
      ],
    },
  };

  // Thay dòng const mockEvent = { ... } cũ bằng:
  const mockEvent = allEvents[id] || allEvents["1"];

  const [selectedCategory, setSelectedCategory] = useState(
    mockEvent.categories[0].id
  );
  const [isLoading, setIsLoading] = useState(false);

  const selected = mockEvent.categories.find((c) => c.id === selectedCategory);

  // Người 3 sẽ inject onBuyTicket — hàm này gọi buyTicket() từ smart contract
  const handleBuy = async () => {
    if (!account) {
      alert("Vui lòng kết nối ví MetaMask trước!");
      return;
    }
    if (!onBuyTicket) return;
    setIsLoading(true);
    try {
      await onBuyTicket({
        eventId: id,
        categoryId: selectedCategory,
        price: selected.price_matic,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline mb-6"
      >
        ← Quay lại danh sách
      </Link>

      {/* Banner */}
      <div className="w-full h-96 rounded-2xl overflow-hidden shadow-lg mb-8">
        <img
          src={mockEvent.banner_url}
          alt={mockEvent.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Thông tin sự kiện */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {mockEvent.title}
          </h1>
          <div className="space-y-2 mb-6 text-gray-600">
            <p>
              📅 <strong>Thời gian:</strong> {mockEvent.start_date}
            </p>
            <p>
              📍 <strong>Địa điểm:</strong> {mockEvent.location}
            </p>
          </div>
          <hr className="my-6" />
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Giới thiệu sự kiện
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {mockEvent.description}
          </p>
        </div>

        {/* Chọn hạng vé & Mua */}
        <div className="bg-white p-6 rounded-2xl shadow-md h-fit border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Chọn hạng vé</h3>

          <div className="space-y-4 mb-6">
            {mockEvent.categories.map((cat) => {
              const isSoldOut = cat.remaining === 0;
              return (
                <div
                  key={cat.id}
                  onClick={() => !isSoldOut && setSelectedCategory(cat.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isSoldOut
                      ? "bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed"
                      : selectedCategory === cat.id
                      ? "border-blue-600 bg-blue-50/50 cursor-pointer"
                      : "border-gray-200 hover:border-gray-300 cursor-pointer"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-gray-800">
                      {cat.name}
                    </span>
                    <span className="font-bold text-blue-600">
                      {cat.price_matic} MATIC
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>
                      Còn lại: {cat.remaining}/{cat.total_supply}
                    </span>
                    {isSoldOut && (
                      <span className="text-red-500 font-semibold">Hết vé</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Nút mua — Người 3 sẽ gắn onBuyTicket vào đây */}
          <button
            onClick={handleBuy}
            disabled={isLoading || !account}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold text-lg transition-colors shadow-md shadow-blue-200"
          >
            {isLoading
              ? "Đang xử lý..."
              : !account
              ? "Kết nối ví để mua"
              : "Mint Vé NFT Ngay"}
          </button>

          {!account && (
            <p className="text-xs text-gray-400 text-center mt-2">
              Cần kết nối MetaMask để thực hiện giao dịch
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
