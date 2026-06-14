// Data-access layer. Reads from Supabase when configured, otherwise returns the
// seed/fallback content so the site always renders (and builds) cleanly.
import { isSupabaseConfigured, getPublicClient } from "./supabase";
import {
  seedClasses,
  seedInstructors,
  seedGallery,
  seedTestimonials,
  seedStats,
  seedSettings,
  type DanceClass,
  type Instructor,
  type GalleryItem,
  type Testimonial,
  type Stat,
  type SiteSettings,
} from "./seed";

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function sortClasses(list: DanceClass[]): DanceClass[] {
  return [...list].sort((a, b) => {
    const d = DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day);
    return d !== 0 ? d : a.order - b.order;
  });
}

export async function getClasses(): Promise<DanceClass[]> {
  if (!isSupabaseConfigured()) return sortClasses(seedClasses);
  try {
    const { data, error } = await getPublicClient().from("classes").select("*");
    if (error || !data) return sortClasses(seedClasses);
    const mapped: DanceClass[] = data.map((r) => ({
      id: r.id,
      title: r.title,
      danceForm: r.dance_form,
      level: r.level,
      day: r.day,
      time: r.time,
      duration: r.duration,
      instructor: r.instructor,
      room: r.room,
      instructorImage: r.instructor_image,
      order: r.sort_order,
      featured: r.featured,
      blurb: r.blurb,
      image: r.image,
    }));
    return sortClasses(mapped);
  } catch {
    return sortClasses(seedClasses);
  }
}

export async function getInstructors(): Promise<Instructor[]> {
  if (!isSupabaseConfigured()) return [...seedInstructors];
  try {
    const { data, error } = await getPublicClient()
      .from("instructors")
      .select("*")
      .order("sort_order");
    if (error || !data) return [...seedInstructors];
    return data.map((r) => ({ id: r.id, name: r.name, title: r.title, photo: r.photo, order: r.sort_order }));
  } catch {
    return [...seedInstructors];
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) return [...seedTestimonials];
  try {
    const { data, error } = await getPublicClient().from("testimonials").select("*").order("sort_order");
    if (error || !data) return [...seedTestimonials];
    return data.map((r) => ({ id: r.id, quote: r.quote, name: r.name, role: r.role, photo: r.photo, order: r.sort_order }));
  } catch {
    return [...seedTestimonials];
  }
}

export async function getStats(): Promise<Stat[]> {
  if (!isSupabaseConfigured()) return [...seedStats];
  try {
    const { data, error } = await getPublicClient().from("stats").select("*").order("sort_order");
    if (error || !data) return [...seedStats];
    return data.map((r) => ({ id: r.id, value: r.value, label: r.label, order: r.sort_order }));
  } catch {
    return [...seedStats];
  }
}

export async function getSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured()) return { ...seedSettings };
  try {
    const { data, error } = await getPublicClient().from("site_settings").select("*").eq("id", 1).single();
    if (error || !data) return { ...seedSettings };
    return { address: data.address, phone: data.phone, email: data.email, hours: data.hours };
  } catch {
    return { ...seedSettings };
  }
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (!isSupabaseConfigured()) return [...seedGallery];
  try {
    const { data, error } = await getPublicClient()
      .from("gallery_items")
      .select("*")
      .order("sort_order");
    if (error || !data) return [...seedGallery];
    return data.map((r) => ({
      id: r.id,
      title: r.title,
      category: r.category,
      caption: r.caption,
      image: r.image,
      aspect: r.aspect,
      order: r.sort_order,
    }));
  } catch {
    return [...seedGallery];
  }
}
