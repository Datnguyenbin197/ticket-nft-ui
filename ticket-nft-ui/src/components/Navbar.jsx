// Props: onConnect (function từ Người 3), account (string address hoặc null)
export default function Navbar({ onConnect, account }) {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <a href="/" className="text-2xl font-bold text-blue-600">
        TicketNFT 🎟️
      </a>

      {account ? (
        // Khi đã kết nối ví — Người 3 truyền account vào
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
          <span className="text-sm font-mono text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
            {/* Hiển thị địa chỉ rút gọn: 0x1234...abcd */}
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>
        </div>
      ) : (
        // Chưa kết nối — bấm gọi onConnect từ Người 3
        <button
          onClick={onConnect}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Kết nối ví 🦊
        </button>
      )}
    </nav>
  );
}
