"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, MessageSquare, CheckCircle, Clock } from "lucide-react";

type Stats = {
  bookings: { total: number; pending: number; confirmed: number; rejected: number };
  enquiries: { total: number; new: number; contacted: number; closed: number };
  recentBookings: Array<{
    id: number;
    type: string;
    status: string;
    name: string;
    phone: string;
    bookingDate: string;
    createdAt: string;
  }>;
};

const statusColor: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-3.5 shadow-sm sm:p-5">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 sm:h-10 sm:w-10">
            <BookOpen className="size-4 text-blue-600 sm:size-5" />
          </div>
          <p className="text-xl font-bold text-primary sm:text-2xl">{stats.bookings.total}</p>
          <p className="text-[11px] text-gray-500 sm:text-xs">Total Bookings</p>
        </div>

        <div className="rounded-xl bg-white p-3.5 shadow-sm sm:p-5">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-50 sm:h-10 sm:w-10">
            <Clock className="size-4 text-yellow-600 sm:size-5" />
          </div>
          <p className="text-xl font-bold text-primary sm:text-2xl">{stats.bookings.pending}</p>
          <p className="text-[11px] text-gray-500 sm:text-xs">Pending</p>
        </div>

        <div className="rounded-xl bg-white p-3.5 shadow-sm sm:p-5">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 sm:h-10 sm:w-10">
            <CheckCircle className="size-4 text-green-600 sm:size-5" />
          </div>
          <p className="text-xl font-bold text-primary sm:text-2xl">{stats.bookings.confirmed}</p>
          <p className="text-[11px] text-gray-500 sm:text-xs">Confirmed</p>
        </div>

        <div className="rounded-xl bg-white p-3.5 shadow-sm sm:p-5">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 sm:h-10 sm:w-10">
            <MessageSquare className="size-4 text-purple-600 sm:size-5" />
          </div>
          <p className="text-xl font-bold text-primary sm:text-2xl">{stats.enquiries.total}</p>
          <p className="text-[11px] text-gray-500 sm:text-xs">Enquiries</p>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="rounded-xl bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3.5 sm:px-5 sm:py-4">
          <h2 className="text-sm font-semibold text-primary sm:text-base">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-xs text-accent hover:underline sm:text-sm">
            View All
          </Link>
        </div>

        {/* Mobile: Card layout */}
        <div className="divide-y divide-gray-50 sm:hidden">
          {stats.recentBookings.map((b) => (
            <Link key={b.id} href={`/admin/bookings/${b.id}`} className="flex items-center justify-between px-4 py-3 active:bg-gray-50">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-primary">#{b.id}</span>
                  <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColor[b.status]}`}>
                    {b.status}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-sm text-gray-700">{b.name}</p>
                <p className="text-xs text-gray-400">{b.bookingDate}</p>
              </div>
              <svg className="size-4 shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
          {stats.recentBookings.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-gray-400">No bookings yet</p>
          )}
        </div>

        {/* Desktop: Table layout */}
        <div className="hidden overflow-x-auto sm:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-500">
                <th className="px-5 py-3 font-medium">ID</th>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {stats.recentBookings.map((b) => (
                <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium">#{b.id}</td>
                  <td className="px-5 py-3">{b.name}</td>
                  <td className="px-5 py-3 capitalize">{b.type.replace("_", " ")}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[b.status]}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">{b.bookingDate}</td>
                  <td className="px-5 py-3">
                    <Link href={`/admin/bookings/${b.id}`} className="text-accent hover:underline">View</Link>
                  </td>
                </tr>
              ))}
              {stats.recentBookings.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-8 text-center text-gray-400">No bookings yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
