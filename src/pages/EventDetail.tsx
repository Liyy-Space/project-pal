import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, MapPin, ArrowLeft, Users, Tag, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

const HERO_GRADIENT = "linear-gradient(135deg, hsl(224 76% 28%) 0%, hsl(176 69% 22%) 50%, hsl(142 64% 32%) 100%)";

interface Event {
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
  max_attendees: number;
}

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [sending, setSending] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    guests: 1,
    additional_info: "",
    agreed: false,
  });

  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();
      if (!error && data) setEvent(data);
      setLoading(false);
    };
    fetchEvent();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agreed) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }
    setSending(true);
    try {
      const { error } = await supabase.from("registrations").insert({
        event_id: id,
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        guests: form.guests,
        additional_info: form.additional_info,
      });
      if (error) throw error;

      await emailjs.send(
        "service_bkjb2ru",
        "template_en1j91w",
        {
          firstName: form.full_name,
          email: form.email,
          message: `New registration for: ${event?.title}\nDate: ${event?.date}\nPhone: ${form.phone}\nGuests: ${form.guests}\nAdditional info: ${form.additional_info}`,
        },
        { publicKey: "EXA1v79zfibZQipgZ" }
      );

      setRegistered(true);
    } catch (err) {
      console.error(err);
      toast.error("Registration failed. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (loading) return (
    <div className="pt-16 min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!event) return (
    <div className="pt-16 min-h-screen flex items-center justify-center text-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Event not found</h2>
        <Link to="/events" className="text-primary hover:underline">Back to Events</Link>
      </div>
    </div>
  );

  if (registered) return (
    <div className="pt-16 min-h-screen flex items-center justify-center text-center px-4">
      <div className="max-w-md">
        <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-teal-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Registration Successful! 🎉</h2>
        <p className="text-gray-500 mb-2">You're registered for <strong>{event.title}</strong>.</p>
        <p className="text-gray-400 text-sm mb-8">We've received your registration and sent a confirmation to your email.</p>
        <Link
          to="/events"
          className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-xl font-semibold hover:opacity-90 transition-all"
          style={{ background: HERO_GRADIENT }}
        >
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </Link>
      </div>
    </div>
  );

  return (
    <div className="pt-16">
      {/* Hero Image */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        {event.image_url ? (
          <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full" style={{ background: HERO_GRADIENT }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-6 left-0 right-0 px-6 md:px-12">
          <Link to="/events" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-3 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Events
          </Link>
          {event.category && (
            <div className="mb-2">
              <span className="bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full">{event.category}</span>
            </div>
          )}
           <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-tight">{event.title}</h1>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left — Details */}
          <div className="lg:col-span-2 space-y-8">

            {/* Event Info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-teal-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">Date</p>
                    <p className="text-gray-900 font-semibold">{new Date(event.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-teal-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">Time</p>
                    <p className="text-gray-900 font-semibold">{event.start_time}{event.end_time ? ` – ${event.end_time}` : ""}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-teal-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">Location</p>
                    <p className="text-gray-900 font-semibold">{event.location}</p>
                  </div>
                </div>
                {event.max_attendees && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5 text-teal-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">Capacity</p>
                      <p className="text-gray-900 font-semibold">{event.max_attendees} attendees</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* About */}
            {event.full_desc && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About the Event</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{event.full_desc}</p>
              </div>
            )}

            {/* Speakers */}
            {event.speakers && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Speakers & Guests</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{event.speakers}</p>
              </div>
            )}
          </div>

          {/* Right — Register */}
          <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
              {!showForm ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
                  {event.price && (
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-gray-900">{event.price}</span>
                    </div>
                  )}
                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full py-3.5 text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg mb-3"
                    style={{ background: HERO_GRADIENT }}
                  >
                    Register for This Event
                  </button>

                  {event.title === "Clinical Data Analysis in R" && (
                    
                      <a> href="https://docs.google.com/forms/d/e/1FAIpQLSdMV8oprpeixxbDHSQMF4I3Jr94zs-s0v-eZeL7dF4gGQkoRA/viewform"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-all mb-3"
                    
                      Or Register via Detailed Form
                    </a>
                  )}

                  
                   <a> href="/posters/clinical-data-r-poster.png"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-primary text-sm hover:underline mb-2"
                  
                    View Full Poster
                  </a>

                  <p className="text-gray-400 text-xs">No payment required at this stage</p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Register</h3>
                  <p className="text-gray-400 text-sm mb-5">for {event.title}</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Full Name *</label>
                      <input required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Email Address *</label>
                      <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Phone Number</label>
                      <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+254 700 000 000"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Number of Guests</label>
                      <input type="number" min={1} max={10} value={form.guests} onChange={(e) => setForm({ ...form, guests: parseInt(e.target.value) })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Additional Information</label>
                      <textarea rows={3} value={form.additional_info} onChange={(e) => setForm({ ...form, additional_info: e.target.value })}
                        placeholder="Any special requirements..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary resize-none" />
                    </div>
                    <div className="flex items-start gap-2">
                      <input type="checkbox" id="agreed" checked={form.agreed} onChange={(e) => setForm({ ...form, agreed: e.target.checked })}
                        className="mt-1 accent-primary" />
                      <label htmlFor="agreed" className="text-xs text-gray-500">
                        I agree to the event terms and conditions.
                      </label>
                    </div>
                    <button type="submit" disabled={sending}
                      className="w-full py-3.5 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50"
                      style={{ background: HERO_GRADIENT }}>
                      {sending ? "Submitting..." : "Complete Registration"}
                    </button>
                    <button type="button" onClick={() => setShowForm(false)}
                      className="w-full py-2 text-gray-400 text-sm hover:text-gray-600 transition-colors">
                      Cancel
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventDetail;