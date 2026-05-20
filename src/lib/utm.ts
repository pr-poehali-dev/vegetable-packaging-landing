// UTM-метки: захватываем из URL и храним в cookie 30 дней
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
export type UtmKey = typeof UTM_KEYS[number];
export type UtmMap = Partial<Record<UtmKey, string>>;

const COOKIE_NAME = "tsib_utm";
const DAYS = 30;

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 86400_000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  const m = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/[.$?*|{}()[\]\\+^]/g, "\\$&") + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : null;
}

export function captureUtm(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const fresh: UtmMap = {};
  let hasAny = false;
  UTM_KEYS.forEach(k => {
    const v = params.get(k);
    if (v) { fresh[k] = v; hasAny = true; }
  });
  if (hasAny) {
    setCookie(COOKIE_NAME, JSON.stringify(fresh), DAYS);
  }
}

export function readUtm(): UtmMap {
  if (typeof window === "undefined") return {};
  const raw = getCookie(COOKIE_NAME);
  if (!raw) return {};
  try {
    const obj = JSON.parse(raw);
    return obj && typeof obj === "object" ? obj : {};
  } catch {
    return {};
  }
}