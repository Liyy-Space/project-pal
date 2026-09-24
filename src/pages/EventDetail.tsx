import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Calendar, Clock, MapPin, ArrowLeft, Users, BarChart3 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import SEO from "@/components/SEO";

const HERO_GRADIENT = "linear-gradient(135deg, hsl(224 76% 28%) 0%, hsl(176 69% 22%) 50%, hsl(142 64% 32%) 100%)";
const GOOGLE_FORM = "https://docs.google.com/forms/d/e/1FAIpQLSdMV8oprpeixxbDHSQMF4I3Jr94zs-s0v-eZeL7dF4gGQkoRA/viewform?usp=dialog";

interface Event {
  id: string;
  title: string;
  title_vi?: string;
  category: string;
  category_vi?: string;
  image_url: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  location_vi?: string;
  short_desc: string;
  short_desc_vi?: string;
  full_desc: string;
  full_desc_vi?: string;
  speakers: string;
  speakers_vi?: string;
  price: string;
  max_attendees: number;
}

function localized(event: any, field: string, lang: string): string {
  const viValue = event[`${field}_vi`];
  return lang === "vi" && viValue ? viValue : event[field];
}

const EventDetail = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const dateLocale = i18n.language === "vi" ? "vi-VN" : "en-US";

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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("eventDetail.notFound")}</h2>
        <Link to="/events" className="text-primary hover:underline">{t("eventDetail.backToEvents")}</Link>
      </div>
    </div>
  );

  const isClinicREvent = event.title === "Clinical Data Analysis in R";

  return (
    <div className="pt-16">
      <SEO
        title={event.title}
        description={event.short_desc || `Join us for ${event.title}, hosted by Neudata.`}
        path={`/events/${event.id}`}
      />
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        {event.image_url ? (
          <img src={event.image_url} alt={localized(event, "title", i18n.language)} className="w-full h-full object-cover" />
        ) : (
          <div className="relative w-full h-full" style={{ background: HERO_GRADIENT }}>
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <BarChart3 className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 w-40 h-40 md:w-56 md:h-56 text-white/10" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-6 left-0 right-0 px-6 md:px-12">
          <Link to="/events" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-3 transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t("eventDetail.backToEvents")}
          </Link>
          {event.category && (
            <div className="mb-2">
              <span className="bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full">{localized(event, "category", i18n.language)}</span>
            </div>
          )}
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">{localized(event, "title", i18n.language)}</h1>
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
                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">{t("eventDetail.dateLabel")}</p>
                    <p className="text-gray-900 font-semibold">
                      {new Date(event.date).toLocaleDateString(dateLocale, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-teal-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">{t("eventDetail.timeLabel")}</p>
                    <p className="text-gray-900 font-semibold">{event.start_time}{event.end_time ? ` – ${event.end_time}` : ""}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-teal-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">{t("eventDetail.locationLabel")}</p>
                    <p className="text-gray-900 font-semibold">{localized(event, "location", i18n.language)}</p>
                  </div>
                </div>
                {event.max_attendees && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5 text-teal-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">{t("eventDetail.capacityLabel")}</p>
                      <p className="text-gray-900 font-semibold">{event.max_attendees} {t("eventDetail.attendees")}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {event.full_desc && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{t("eventDetail.aboutEvent")}</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{localized(event, "full_desc", i18n.language)}</p>
              </div>
            )}

            {event.speakers && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{t("eventDetail.speakersGuests")}</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{localized(event, "speakers", i18n.language)}</p>
              </div>
            )}
          </div>

          {/* Right — Register */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center space-y-3">
                {event.price && (
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {event.price.toLowerCase() === "free" ? t("events.free") : event.price}
                    </span>
                  </div>
                )}

                {isClinicREvent ? (

                  <a href={GOOGLE_FORM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3.5 text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg"
                    style={{ background: HERO_GRADIENT }}
                  >
                    {t("eventDetail.registerButton")}
                  </a>
                ) : (
                  <p className="text-gray-400 text-sm">{t("eventDetail.registrationComingSoon")}</p>
                )}

                {isClinicREvent && (

                  <a href="/posters/Poster.png"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-primary text-sm hover:underline"
                  >
                    {t("eventDetail.viewPoster")}
                  </a>
                )}

                <p className="text-gray-400 text-xs">{t("eventDetail.noPaymentRequired")}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventDetail;
