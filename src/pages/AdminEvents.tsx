import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Calendar, Users, Trash2, Edit, Plus, X, Lock } from "lucide-react";
import { toast } from "sonner";

const HERO_GRADIENT = "linear-gradient(135deg, hsl(224 76% 28%) 0%, hsl(176 69% 22%) 50%, hsl(142 64% 32%) 100%)";

interface EventRow {
  id: string;
  title: string;
  category: string;
  image_url: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  short_desc: string;
  full_desc: string;
  speakers: string;
  price: string;
  max_attendees: number | null;
  registration_deadline: string | null;
  status: string;
}

interface Registration {
  id: string;
  event_id: string;
  full_name: string;
  email: string;
  phone: string;
  guests: number;
  additional_info: string;
  created_at: string;
}

const emptyForm: Omit<EventRow, "id"> = {
  title: "",
  category: "",
  image_url: "",
  date: "",
  start_time: "",
  end_time: "",
  location: "",
  short_desc: "",
  full_desc: "",
  speakers: "",
  price: "",
  max_attendees: null,
  registration_deadline: "",
  status: "draft",
};

const AdminEvents = () => {
  const [authed, setAuthed] = useState(sessionStorage.getItem("admin_authed") === "true");
  const [passwordInput, setPasswordInput] = useState("");

  const [events, setEvents] = useState<EventRow[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    const [{ data: eventsData }, { data: regsData }] = await Promise.all([
      supabase.from("events").select("*").order("date", { ascending: false }),
      supabase.from("registrations").select("*").order("created_at", { ascending: false }),
    ]);
    setEvents(eventsData ?? []);
    setRegistrations(regsData ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (authed) fetchAll();
  }, [authed]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === import.meta.env.VITE_ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_authed", "true");
      setAuthed(true);
    } else {
      toast.error("Incorrect password.");
    }
  };

  const openNewForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (event: EventRow) => {
    const { id, ...rest } = event;
    setForm(rest);
    setEditingId(id);
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      max_attendees: form.max_attendees || null,
      registration_deadline: form.registration_deadline || null,
    };

    if (editingId) {
      const { error } = await supabase.from("events").update(payload).eq("id", editingId);
      if (error) {
        toast.error("Failed to update event.");
        return;
      }
      toast.success("Event updated.");
    } else {
      const { error } = await supabase.from("events").insert(payload);
      if (error) {
        toast.error("Failed to create event.");
        return;
      }
      toast.success("Event created.");
    }

    setShowForm(false);
    fetchAll();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event? This cannot be undone.")) return;
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete event.");
      return;
    }
    toast.success("Event deleted.");
    fetchAll();
  };

  const regsForEvent = (eventId: string) =>
    registrations.filter((r) => r.event_id === eventId);

  if (!authed) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center"
        >
          <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-teal-500" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-6">Admin Access</h1>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Enter admin password"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary mb-4"
            autoFocus
          />
          <button
            type="submit"
            className="w-full py-3 text-white rounded-xl font-semibold hover:opacity-90 transition-all"
            style={{ background: HERO_GRADIENT }}
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Manage Events</h1>
          <button
            onClick={openNewForm}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all"
            style={{ background: HERO_GRADIENT }}
          >
            <Plus className="w-4 h-4" /> New Event
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400">No events yet. Create your first one.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">{event.title}</h3>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          event.status === "published"
                            ? "bg-teal-100 text-teal-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {event.date} · {event.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() =>
                        setExpandedEventId(expandedEventId === event.id ? null : event.id)
                      }
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <Users className="w-3.5 h-3.5" />
                      {regsForEvent(event.id).length}
                    </button>
                    <button
                      onClick={() => openEditForm(event)}
                      className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <Edit className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="p-2 rounded-lg border border-gray-200 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>

                {expandedEventId === event.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    {regsForEvent(event.id).length === 0 ? (
                      <p className="text-sm text-gray-400">No registrations yet.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-left text-gray-400 text-xs uppercase">
                              <th className="pb-2 pr-4">Name</th>
                              <th className="pb-2 pr-4">Email</th>
                              <th className="pb-2 pr-4">Phone</th>
                              <th className="pb-2 pr-4">Guests</th>
                              <th className="pb-2">Registered</th>
                            </tr>
                          </thead>
                          <tbody>
                            {regsForEvent(event.id).map((r) => (
                              <tr key={r.id} className="border-t border-gray-50">
                                <td className="py-2 pr-4">{r.full_name}</td>
                                <td className="py-2 pr-4">{r.email}</td>
                                <td className="py-2 pr-4">{r.phone}</td>
                                <td className="py-2 pr-4">{r.guests}</td>
                                <td className="py-2 text-gray-400">
                                  {new Date(r.created_at).toLocaleDateString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                {editingId ? "Edit Event" : "New Event"}
              </h2>
              <button onClick={() => setShowForm(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Title *</label>
                  <input required value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Category</label>
                  <input value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Date *</label>
                  <input required type="date" value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
                  <select value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Start Time</label>
                  <input value={form.start_time}
                    onChange={(e) => setForm({ ...form, start_time: e.target.value })}
                    placeholder="8:00 PM"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">End Time</label>
                  <input value={form.end_time}
                    onChange={(e) => setForm({ ...form, end_time: e.target.value })}
                    placeholder="9:30 PM"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Location</label>
                  <input value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Price</label>
                  <input value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="Free or $50"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Max Attendees</label>
                  <input type="number" value={form.max_attendees ?? ""}
                    onChange={(e) => setForm({ ...form, max_attendees: e.target.value ? parseInt(e.target.value) : null })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Image URL</label>
                  <input value={form.image_url}
                    onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Short Description</label>
                  <textarea rows={2} value={form.short_desc}
                    onChange={(e) => setForm({ ...form, short_desc: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm resize-none" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Full Description</label>
                  <textarea rows={4} value={form.full_desc}
                    onChange={(e) => setForm({ ...form, full_desc: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm resize-none" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Speakers</label>
                  <textarea rows={2} value={form.speakers}
                    onChange={(e) => setForm({ ...form, speakers: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Registration Deadline</label>
                  <input type="date" value={form.registration_deadline ?? ""}
                    onChange={(e) => setForm({ ...form, registration_deadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit"
                  className="flex-1 py-3 text-white rounded-xl font-semibold hover:opacity-90 transition-all"
                  style={{ background: HERO_GRADIENT }}>
                  {editingId ? "Save Changes" : "Create Event"}
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
