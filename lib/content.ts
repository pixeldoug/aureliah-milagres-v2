export const artist = {
  name: "Aureliah Milagres",
  tagline: "Forró litorâneo, reggae e MPB",
  email: "contato@aureliahmilagres.com.br",
  bookingEmail: "contato@aureliahmilagres.com.br",
  phones: [
    { label: "(11) 97950-1444", href: "tel:+5511979501444" },
  ],
  whatsapp: "5511979501444",
  socials: [
    {
      name: "Instagram",
      href: "https://www.instagram.com/aureliahmilagres/",
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/channel/UCWaZ8_uz2Tb7bXILDxwO2hA",
    },
    {
      name: "Spotify",
      href: "https://open.spotify.com/artist/07BH1WsxplcXWxhB1oQs7t",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/aureliahmilagresoficial",
    },
    {
      name: "X",
      href: "https://twitter.com/aureliahoficial",
    },
  ],
} as const;

export const bio = {
  lede: "Cantora e compositora, Aureliah Milagres traz na voz o forró litorâneo — a união do forró com o reggae, o xote e um flerte constante com a MPB.",
  paragraphs: [
    "Na trajetória desde 2001, criou e comandou a banda Forrueiros por oito anos, com grande repercussão no forró universitário de São Paulo. Canções como Como Todo Amor, Feitiço da Lua, Imaginação de Anjo e Cores seguem entre as mais pedidas — no palco e nas rádios.",
    "Hoje o show leva o seu nome. O repertório mistura autorais e clássicos, e muda conforme a noite: pé de serra, reggae, MPB. Os músicos que a acompanham já passaram por palcos de Osvaldinho do Acordeon, Dominguinhos e Elba Ramalho.",
  ],
  quote: {
    lines: [
      "Como a lua que namora o mar",
      "Sobre o brilho das estrelas",
    ],
    source: "Como Todo Amor",
  },
};

export type Release =
  | {
      title: string;
      year: string;
      kind: string;
      cover: string;
      spotify: string;
    }
  | {
      title: string;
      year: string;
      kind: string;
      cover: null;
      tint: "leaf" | "wine";
      highlights: string[];
    };

export const releases: Release[] = [
  {
    title: "Faz Tempo",
    year: "2014",
    kind: "Single",
    cover: "/images/faz-tempo.jpg",
    spotify: "https://open.spotify.com/track/5BQw8A8FRECaT8m8RAxhbM",
  },
  {
    title: "Mistérios de Você",
    year: "2010",
    kind: "Single",
    cover: "/images/misterios-de-voce.jpg",
    spotify: "https://open.spotify.com/track/2Plf2PeoZTOVrUzsT1yDXX",
  },
  {
    title: "Conquista",
    year: "2010",
    kind: "Álbum · 13 faixas",
    cover: null,
    tint: "leaf",
    highlights: ["Barquinho de Papel", "Me Olha", "Nossa Canção"],
  },
  {
    title: "Cores",
    year: "2005",
    kind: "Álbum · 9 faixas",
    cover: null,
    tint: "wine",
    highlights: ["Como Todo Amor", "Feitiço da Lua", "Imaginação de Anjo"],
  },
];

export const songs = [
  "Como Todo Amor",
  "Feitiço da Lua",
  "Imaginação de Anjo",
  "Me Olha",
  "Nossa Canção",
  "Cores",
  "Barquinho de Papel",
  "Ciranda de Estrelas",
  "Céu e Mar",
  "Mistérios de Você",
  "Faz Tempo",
  "Uma Rosa Pra Lembrar",
];

export const videos = [
  {
    id: "UkibdvmPen8",
    title: "Como Todo Amor — ao vivo",
    meta: "Baile Beijo, Me Liga · 2024",
    thumb: "/images/como-todo-amor-ao-vivo.jpg",
  },
  {
    id: "y8PUIuU3od8",
    title: "Como Todo Amor",
    meta: "Clipe · autoral",
    thumb: "/images/como-todo-amor.jpg",
  },
  {
    id: "w9qyAY0yhkY",
    title: "Me Olha",
    meta: "Clipe · álbum Conquista",
    thumb: "/images/me-olha.jpg",
  },
  {
    id: "BMLskvQdias",
    title: "Nossa Canção",
    meta: "Clipe · álbum Conquista",
    thumb: "/images/nossa-cancao.jpg",
  },
];

export const band = [
  { name: "Leonardo Milagres", role: "Baixo e backing vocal" },
  { name: "Rafael Pereira — Cabral", role: "Guitarra e backing vocal" },
  { name: "Gilvan Lima", role: "Pandeiro, triângulo, percussão" },
];

export const stages = [
  { place: "Belo Horizonte", when: "Agosto 2025" },
  { place: "Santo André, SP", when: "Novembro 2024" },
  { place: "Baile Beijo, Me Liga", when: "Setembro 2024" },
];
