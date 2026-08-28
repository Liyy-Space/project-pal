import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, MapPin, ArrowLeft, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";

const HERO_GRADIENT = "linear-gradient(135deg, hsl(224 76% 28%) 0%, hsl(176 69% 22%) 50%, hsl(142 64% 32%) 100%)";
const GOOGLE_FORM = "https://docs.google.com/forms/d/e/1FAIpQLSdMV8oprpeixxbDHSQMF4I3Jr94zs-s0v-eZeL7dF4gGQkoRA/viewform?usp=dialog";

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

  const isClinicREvent = event.title === "Clinical Data Analysis in R";

  return (
    <div className="pt-16">
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        {event.image_url
          ? <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
          : <div className="w-full h-full" style={{ background: HERO_GRADIENT }} />
        }
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
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">{event.title}</h1>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-teal-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">Date</p>
                    <p className="text-gray-900 font-semibold">
                      {new Date(event.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                    </p>
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

            {event.full_desc && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About the Event</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{event.full_desc}</p>
              </div>
            )}

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
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center space-y-3">
                {event.price && (
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-gray-900">{event.price}</span>
                  </div>
                )}

                {isClinicREvent ? (
                  <a
                    href={GOOGLE_FORM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3.5 text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg"
                    style={{ background: HERO_GRADIENT }}
                  >
                    Register for This Event ↗
                  </a>
                ) : (
                  <p className="text-gray-400 text-sm">Registration link coming soon.</p>
                )}

                {isClinicREvent && (
                  <a
                    href="/posters/clinical-data-r-poster.png"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-primary text-sm hover:underline"
                  >
                    View Full Poster ↗
                  </a>
                )}

                <p className="text-gray-400 text-xs">No payment required at this stage</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventDetail;