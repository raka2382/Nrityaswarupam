// Seed / fallback content. Used to render the site before Supabase is connected,
// and mirrored by supabase/seed.sql to populate the database.

export interface DanceClass {
  id?: string;
  title: string;
  danceForm: string;
  level: "beginner" | "intermediate" | "advanced" | "all";
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  time: string;
  duration: string;
  instructor: string;
  room: string;
  instructorImage?: string | null;
  order: number;
  featured: boolean;
  blurb?: string | null;
  image?: string | null;
}

export interface Instructor {
  id?: string;
  name: string;
  title: string;
  photo?: string | null;
  order: number;
}

export interface GalleryItem {
  id?: string;
  title: string;
  category: string;
  caption?: string | null;
  image: string;
  aspect: string;
  order: number;
}

export interface Testimonial {
  id?: string;
  quote: string;
  name: string;
  role: string;
  photo?: string | null;
  order: number;
}

export interface Stat {
  id?: string;
  value: string;
  label: string;
  order: number;
}

export const seedStats: Stat[] = [
  { value: "500", label: "Active Students", order: 1 },
  { value: "20", label: "Years of Excellence", order: 2 },
];

export interface SiteSettings {
  address: string;
  phone: string;
  email: string;
  hours: string;
}

export const seedTestimonials: Testimonial[] = [
  {
    quote:
      "Training here has been transformative. The meticulous attention to detail and the deep respect for the art form have fundamentally changed how I approach movement and discipline in my life.",
    name: "Ananya R.",
    role: "Advanced Batch",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAtKHzZdag8FC1UoGi1yI9ifqFi3_SM0iz03wYM0HINv4CbWPQRiozwr31osIVfQQlLoZkqiAMd87fO8msERWYDukvd5ALQzVF4jnPbDS-IFI6qFWtYqUt1ErrbQinUs3zGiWMiXp4hMNGnVE_Affz-oyV-YKppZH2O1r2ZuKF1TAD8H4QhLwt2S7A3tKBjRExduWfDRga7wktp_fI03rD8MxUtFUSPxlNrBGOmheYTcKjLr4ZRml7q1_aO559svPhQ1pK8eoQdFutJ",
    order: 1,
  },
  {
    quote:
      "The instructors don't just teach steps; they impart the soul of the dance. The environment is challenging yet incredibly supportive, a true sanctuary for artistic growth.",
    name: "Vikram S.",
    role: "Alumni",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCFQJuJagkM-KiuOM40ojCHPO6-ND3a8SlBNnsC2UpQi9KCgB0DZaAMw5DZVp-2xQNVS-82Z_1lLlhgvY_T5iJO-hdRN00VaLvTMjtaafsDiPQjssEWz3McUD_1EUmFEkwnlW8lxSuu49c6eysPtv8XPDqvLQ4DbnFXQwTj_CZG3dguFCBxQD0TyUhYX0zcq7aa-EhFlP5ovWI5Y5Mrx2xaBm7uu2qy5Ae1f71dIYy3a0arpTP3eIWbHXSMhsMFZdT07CJzP1HLE5Ib",
    order: 2,
  },
];

export const seedSettings: SiteSettings = {
  address: "123 Heritage Lane, Bengaluru, Karnataka 560001",
  phone: "+91 00000 00000",
  email: "hello@nrityaswarupam.com",
  hours: "Mon–Sat · 7:00 AM – 8:00 PM",
};

export const seedClasses: DanceClass[] = [
  {
    title: "Kathak Fundamentals",
    danceForm: "kathak",
    level: "beginner",
    day: "Monday",
    time: "08:00 AM",
    duration: "90 Mins",
    instructor: "Guru Anjali Sharma",
    room: "Studio A",
    instructorImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA-NIjHiJh9oGCSr1MOibUU7e5pPXIIu-XtFPamGasfJBR4iQWRYWBNFJpdWHwLXYWPvp3hRz9A98nJdQdl9QBUEd9dArld6N4PsYe4ZogEdHkNSuXrgIwZFcNrcxiCPjDbgDhUZB-TzANAJFXhX45OWHGnP52-sitkESmFgFpY9v3Sqq-C-cCtBinsyU4Sprql7BWDXXBrWJWx-UNjpGsWSaUkKvNw-KvjcDQn-zpd1LogKEUSI61kcUqegL2b6pdOh6rZKIjw78nX",
    order: 1,
    featured: false,
  },
  {
    title: "Bharatanatyam Nuances",
    danceForm: "bharatanatyam",
    level: "intermediate",
    day: "Monday",
    time: "10:30 AM",
    duration: "120 Mins",
    instructor: "Sri Ramesh Iyer",
    room: "Main Hall",
    instructorImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCWBdIWBDI5y9i4v84gLz9S8T8PV7yBD9GBfkql5ZCPPZwTsb8TwEbpIQO8B5ouBN98RBDMHlnU-09N8zVGDsJV1ss5R1QJBzmOau60FOcQmWJ80GSNbZ4qXGJVBAHAt6_rYdp5hgVg3E95FOOgTKx03u5kGPMvlyu-Zww18nzlWAvTjtAAgJqwO4pclMCk6gojBWewyhWbXC3iha9RhON0nH69GG0OTBpgbCc_zyDosSLYrSWXlbSfFwoJ-YVdLgVcQ7gmAMfuWunM",
    order: 2,
    featured: false,
  },
  {
    title: "Odissi Choreography",
    danceForm: "odissi",
    level: "advanced",
    day: "Tuesday",
    time: "05:00 PM",
    duration: "120 Mins",
    instructor: "Meera Das",
    room: "Studio B",
    order: 1,
    featured: false,
  },
  {
    title: "Rhythm & Abhinaya Workshop",
    danceForm: "all",
    level: "all",
    day: "Tuesday",
    time: "Weekend",
    duration: "Intensive",
    instructor: "Masterclass Series",
    room: "Main Hall",
    order: 2,
    featured: true,
    blurb:
      "A special intensive weekend workshop focusing on expressions and intricate rhythmic patterns. Open to intermediate and advanced students across all disciplines.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCaqAcjaW7gxVqnXJ82eTg5qjGarwmrWbxAB-nxV0TBXZ3-RCF-M-18WZUJvqZ5tUGajO3-u_A1EFb5Cgk-LFCT6bw4nncM-U2NEUZEeEn50VrWx8yCe3ELeZGxvQYszpQQzL4Oyz1iZhC0PDTK-mGEVmafggeQgLqseYXWJFqEBQGhb8ibO8KGnjEhFLhrOIPt32SwMIjQ2dVHZwKSqXQlESzOcRYQO4x3D7y_hsp7XuVLyidqonK6CfDSSbIBGxzBG5hg5cWh-7gv",
  },
];

export const seedInstructors: Instructor[] = [
  {
    name: "Dr. Anjali Desai",
    title: "Founder & Artistic Director",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBdwafMq-5XinvlZOwJ0KIpTaXVaKlg-KH0ZGuq9JnGQbFYrrVLbQQOVe0mbc2WmlV9P7-qPT3tC2NVahGDxPRnH6N5XYEdpYlNSBQ2-jwKpXCPKJ1DWn35oXTVBSSSa1vnrpFoV9QYFNaxkmLnp_Q-rmUuIxNO911QQmjmAwdyvBexfGpmixcrEVoUANaZL1wQOSlhv270W2L510gBVV-uwfsYxGapRzmbe1yIKTXjU6SFvhmmxcxZcITc9VLwotroB9NqCDRSqhiB",
    order: 1,
  },
  {
    name: "Karthik Iyer",
    title: "Master of Rhythm",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCdfShbWtE_EW_FOa6LD5VA1ypaqmjGyQ4uEFmlngoYa9qfOSBwCZcsSZtOypWLCkVEIjsgqYRputlFeGQ_E1sCFG122xwONNTl0pEOKI4dc6XGXtK_XmO_uHRF-p5pcknkfjRxeWPRaJYytsoMq4hz7h2HqXXHinx6rLoJtqrLeo3D2Xjih7UqHRBkGID_OLB2UHM3CCFq4etnXbPRk9--WMgRvRgdpj239BndCerHg51NrdnmEqSd9lHq67s-XjU94wGGja9DxX5T",
    order: 2,
  },
  {
    name: "Meera Krishnan",
    title: "Senior Faculty",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBm1tTfVnl5AxPopM4dQxVEWWmNxHOqlHmsqgvk2QPqmch25lv6ckcKTw2ei7xHj7n9RWEtZTq7BKPJHdwIiIM72TDYjbxLuzyjYUG75G_ifAcuW1TZOC7C9ux6xUcyiUliNwW_-XVMzJTOCrV-9f5zgoYkccFnm-3E12GnZvR---5ED6ClZ0Kh-bFJe3uQPFB7uxbF6Erkv1rcLqLQBFBXaG-lKgOA_b9u9M3kvRTuA38TrDnJugnL4y-FSDQA3YmIY9uNkKrgG_Qs",
    order: 3,
  },
];

export const seedGallery: GalleryItem[] = [
  {
    title: "Annual Arangetram 2023",
    category: "Performance",
    caption: "The culmination of years of rigorous training, captured in a single defining moment on stage.",
    aspect: "aspect-[3/4]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD61a-uqCnsD77y7cjVIbYaG6Akn72d4mkEKzdrhqUG5CASz5t7vBQMxfHZipe2yRtzTl5Cd1k-XTp9xmh_3YxiT62Cb5pzrZpY2a3aIip-gW6D8tQkBc-EgNuLp4-ybUVjRhSCu0cQRZMJVfaB5sIMCspIR1iE4gXC0rS-8A4Zqe-AlUMNJ6l_zp_ZpnSFB4d-NCWgL1elgqvrRxwW9pV-mlL4aExw8U9oLIu7hn5Bbdq6Hq59bjX4oq6ohb7ejAUjeVfLydFXuWh1",
    order: 1,
  },
  {
    title: "The Echoes of Shiva",
    category: "Stage Show",
    caption: "A profound exploration of cosmic dance, blending synchronized rhythm with spiritual narrative.",
    aspect: "aspect-square",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBE6tiU8tpUgLKzc54G0XXGd7Fz08gmhw2VSdXegZXV_u2p0CSrFwtOSIv_r35Bf8NCSE_k5fpL7WOCvLEgxLsvVbjRbDwJ1Tk1C7Z2LX50UAdy0XFJBB0NUZp2YF1VMPnKTXeYh2LJXMmMtUMuwR_WM1YW46UMDoxHYvONIHoRtyNIYUlFMYqvcQ--AMZnP4_nHA_BuFu1t-r1BSyOlW-lpUU-l3vp2_5Cau4zc3l9nld55sQCn9w-kexKKXB1TBqYcAPHCkH1JFQ5",
    order: 2,
  },
  {
    title: "Abhinaya Studies",
    category: "Detail",
    caption: "The delicate art of expression, where every glance tells a thousand ancient stories.",
    aspect: "aspect-[4/5]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBr2OpHlQ7mpxN0NhnFlUK_Ud3H_WgdqB8qDzW74EZlOYpkYcQINV9bI_LYJGaPEqDaK_dSHSIyS3zDSlEdTJpjBsovjy8BaRE17Njipb6OQGns86B9daM5bxoqhLc74IN_hxjCXNUPP0cHTY8lp8ZGUY2F7Ue4vMxFzVjJbQMEGbXo2NNiw-rjYXbgnsfOj9aSNux4nK3u01J7e2oGg8Xcc5lEjT3GLptIaEvV-43mipDjmXzN4hSD4U0h2iah5HVlZzk3SGr-snCU",
    order: 3,
  },
  {
    title: "Morning Riyaz",
    category: "Classroom",
    caption: "The foundation of grace built in the quiet hours of disciplined practice.",
    aspect: "aspect-[16/9]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCMcljiFANeG4HsOOvJ1r9ODvSTaXvDeYn-GZIalWbYX8RC14XCyljM-168IL8hfzBbEB4v9PwW6t6g2OJCXKdN2aunIXftTaltF_bTclcdMWP8vTnyPslvFURriEQgSvdIY3Nqy_MmZM16_NTCtuUcYn7l7NloywSiek___J66pECDrw-Ap0cP-dRT3gugyCOubSaeUmocKaL9we6K9LfoU119eLGO8c-7OC-AfRLmRxQyOjkrm9EaKtUFeijJObrDjwHQd2jAliqQ",
    order: 4,
  },
  {
    title: "Masterclass with Pandit Rao",
    category: "Workshop",
    caption: "Passing the torch of tradition through intensive, focused mentorship.",
    aspect: "aspect-[3/4]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAqMmmHQgr6Fo9mfj5TjAInPRzgAPzRsz0qULgD8rrcvgKDQmqRjUHe8ir9bChpnRSN5PNWfHowssYKvVF8I-mjSdH-xAnQ96rB2s7HJrgYVVU_5a0wMJ-kS38j-n28ZjmPl1XfcSazcFzP6GsR9aWm-gkR9AaB1p3eio0AY8oM79gVhlxCoVWLn2Oe1W8YDw_TzpdXK3r3wr-Rqge1FhhwnLkMx6yBQtiQfmFqx4ja_fqWYGmFezmnRuYEOWUlJbedqwB0gTmzPCBo",
    order: 5,
  },
];
