import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Calendar, Clock, MapPin, Search } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

const HERO_GRADIENT =
  "linear-gradient(135deg, hsl(224 76% 28%) 0%, hsl(176 69% 22%) 50%, hsl(142 64% 32%) 100%)";

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
  price: string;
  status: string;
}

function localized(event: any, field: string, lang: string): string {
  const viValue = event[`${field}_vi`];
  return lang === "vi" && viValue ? viValue : event[field];
}

function EventCard({
  event,
  past = false,
}: {
  event: Event;
  past?: boolean;
}) {
  const { t, i18n } = useTranslation();
  const dateLocale = i18n.language === "vi" ? "vi-VN" : "en-US";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group ${past ? "opacity-70" : ""
        }`}
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {event.image_url ? (
          <img
            loading="lazy"
            src={event.image_url}
            alt={localized(event, "title", i18n.language)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: HERO_GRADIENT }}
          >
            <Calendar className="w-12 h-12 text-white/50" />
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold px-3 py-1 rounded-full">
            {localized(event, "category", i18n.language) || t("events.defaultCategory")}
          </span>
        </div>

        {/* Ongoing badge */}
        {event.status === "ongoing" && (
          <div className="absolute top-3 right-3">
            <span className="bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full animate-pulse">
              {t("events.ongoingBadge")}
            </span>
          </div>
        )}

        {/* Past badge */}
        {past && event.status !== "ongoing" && (
          <div className="absolute top-3 right-3">
            <span className="bg-gray-800/80 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {t("events.pastBadge")}
            </span>
          </div>
        )}

        {/* Price badge */}
        {event.price && (
          <div className="absolute bottom-3 right-3">
            <span className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {event.price.toLowerCase() === "free" ? t("events.free") : event.price}
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-lg mb-3 leading-snug group-hover:text-primary transition-colors">
          {localized(event, "title", i18n.language)}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Calendar className="w-4 h-4 text-primary shrink-0" />
            <span>
              {new Date(event.date).toLocaleDateString(dateLocale, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Clock className="w-4 h-4 text-primary shrink-0" />
            <span>
              {event.start_time}
              {event.end_time ? ` – ${event.end_time}` : ""}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span>{localized(event, "location", i18n.language)}</span>
          </div>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {localized(event, "short_desc", i18n.language)}
        </p>

        {!past && (
          <Link
            to={`/events/${event.id}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all"
            style={{ background: HERO_GRADIENT }}
          >
            {t("events.viewRegister")}
          </Link>
        )}
      </div>
    </motion.div>
  );
}

const Events = () => {
  const { t } = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (!error && data) {
        setEvents(data);
      }

      setLoading(false);
    };

    fetchEvents();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const filtered = events.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.category?.toLowerCase().includes(search.toLowerCase()) ||
      e.location?.toLowerCase().includes(search.toLowerCase())
  );

  const ongoing = filtered.filter((e) => e.status === "ongoing");

  const upcoming = filtered.filter(
    (e) => e.status !== "ongoing" && e.date >= today
  );

  const past = filtered.filter(
    (e) => e.date < today && e.status !== "ongoing"
  );

  return (
    <div className="pt-16">
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Events"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div
          className="absolute inset-0"
          style={{ background: HERO_GRADIENT, opacity: 0.85 }}
        />

        <div className="absolute inset-0 grid-pattern opacity-20" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4">
            <Calendar className="w-3 h-3 text-teal-300" />
            <span className="text-teal-300 text-xs font-semibold uppercase tracking-widest">
              {t("events.badge")}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">
            {t("events.title1")} <span className="text-teal-300">{t("events.titleHighlight")}</span>
          </h1>

          <p className="text-white/70 max-w-lg text-sm md:text-base">
            {t("events.subtitle")}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="container max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("events.searchPlaceholder")}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <section className="py-16 bg-gray-50">
        <div className="container">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">{t("events.loading")}</p>
            </div>
          ) : (
            <>
              {/* Ongoing Events */}
              {ongoing.length > 0 && (
                <div className="mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse" />

                    <h2 className="text-2xl font-bold text-gray-900">
                      {t("events.ongoingHeading")}
                    </h2>

                    <span className="text-sm text-muted-foreground bg-gray-100 px-2 py-0.5 rounded-full">
                      {ongoing.length}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ongoing.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </div>
              )}

              {/* Upcoming Events */}
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />

                  <h2 className="text-2xl font-bold text-gray-900">
                    {t("events.upcomingHeading")}
                  </h2>

                  <span className="text-sm text-muted-foreground bg-gray-100 px-2 py-0.5 rounded-full">
                    {upcoming.length}
                  </span>
                </div>

                {upcoming.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />

                    <h3 className="text-lg font-semibold text-gray-500 mb-2">
                      {t("events.noUpcoming")}
                    </h3>

                    <p className="text-gray-400 text-sm">
                      {t("events.checkBackSoon")}
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcoming.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                )}
              </div>

              {/* Past Events */}
              {past.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-3 h-3 rounded-full bg-gray-400" />

                    <h2 className="text-2xl font-bold text-gray-900">
                      {t("events.pastHeading")}
                    </h2>

                    <span className="text-sm text-muted-foreground bg-gray-100 px-2 py-0.5 rounded-full">
                      {past.length}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {past.map((event) => (
                      <EventCard key={event.id} event={event} past />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;
