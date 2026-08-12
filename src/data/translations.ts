export const translations = {
  pl: {
    navigation: { studio: "pracownia", projects: "projekty", awards: "nagrody", news: "aktualności" },
    home: {
      architecture: "architecture / opole",
      featuredProject: "wybrany projekt",
      viewProject: "poznaj projekt",
      statement: "projektujemy architekturę wynikającą z miejsca, kontekstu i potrzeb.",
    },
    studio: {
      title: "pracownia", introLabel: "o nas",
      intro: "db2 architekci to pracownia architektury założona w 2003 roku przez Iwonę Wilczek i Mariusza Tenczyńskiego. Koncentrujemy się na poszukiwaniu logicznych rozwiązań wynikających zawsze z indywidualnego podejścia do każdego powierzonego zadania projektowego.",
      contact: "kontakt", team: "zespół", writeToUs: "napisz do nas",
      name: "imię i nazwisko", email: "e-mail", message: "wiadomość",
      namePlaceholder: "twoje imię i nazwisko", emailPlaceholder: "twój adres e-mail", messagePlaceholder: "napisz wiadomość",
      validation: { nameRequired: "podaj imię i nazwisko", emailRequired: "podaj adres e-mail", emailInvalid: "podaj poprawny adres e-mail", messageRequired: "napisz wiadomość" },
      send: "wyślij wiadomość", country: "Polska",
    },
    projects: { title: "projekty", selectedWorks: "wybrane realizacje" },
    project: { label: "projekt", information: "informacje", floorplans: "rzuty", photographs: "fotografie", floorplan: "rzut" },
    demo: { title: "wersja demonstracyjna", text1: "Ta strona internetowa jest wersją demonstracyjną przygotowaną w celach prezentacyjnych. Treści, funkcjonalności oraz informacje prawne mogą nie odpowiadać finalnej wersji serwisu.", text2: "Polityka prywatności oraz regulamin zostaną udostępnione w pełnej wersji strony." },
    footer: { description: "projektujemy architekturę wynikającą z miejsca, kontekstu i potrzeb.", privacy: "polityka prywatności", terms: "regulamin" },
    mobile: { menu: "menu", close: "zamknij" },
  },
  en: {
    navigation: { studio: "office", projects: "projects", awards: "awards", news: "news" },
    home: { architecture: "architecture / opole", featuredProject: "featured project", viewProject: "view project", statement: "we design architecture rooted in place, context and needs." },
    studio: { title: "office", introLabel: "about us", intro: "db2 architekci is an architecture practice founded in 2003 by Iwona Wilczek and Mariusz Tenczyński. We focus on searching for logical solutions that always result from an individual approach to each entrusted design task.", contact: "contact", team: "team", writeToUs: "get in touch", name: "name", email: "email", message: "message", namePlaceholder: "your name", emailPlaceholder: "your email address", messagePlaceholder: "write your message", validation: { nameRequired: "please enter your name", emailRequired: "please enter your email address", emailInvalid: "please enter a valid email address", messageRequired: "please enter a message" }, send: "send message", country: "Poland" },
    projects: { title: "projects", selectedWorks: "selected works" },
    project: { label: "project", information: "information", floorplans: "floor plans", photographs: "photographs", floorplan: "floor plan" },
    demo: { title: "demonstration version", text1: "This website is a demonstration version prepared for presentation purposes. The content, functionality and legal information may differ from the final version of the website.", text2: "The privacy policy and terms and conditions will be made available in the full version of the website." },
    footer: { description: "we design architecture rooted in place, context and needs.", privacy: "privacy policy", terms: "terms and conditions" },
    mobile: { menu: "menu", close: "close" },
  },
} as const;

export type Language = keyof typeof translations;
