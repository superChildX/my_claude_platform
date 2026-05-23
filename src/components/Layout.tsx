import { FileText, Headphones, Home, MessageCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "套餐", icon: Home },
  { to: "/guide", label: "购买须知", icon: FileText },
  { to: "/support", label: "质保售后", icon: Headphones },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen text-ink">
      <div className="noise-layer" />
      <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <NavLink to="/" className="group flex min-w-0 items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] bg-ink text-paper shadow-crisp">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-lg font-semibold leading-5">
                Claude 订阅服务
              </span>
              <span className="block truncate text-xs text-ink-soft">
                非官方服务 · 咨询下单
              </span>
            </span>
          </NavLink>

          <nav className="flex max-w-[56vw] gap-1 overflow-x-auto rounded-[8px] border border-line bg-white/75 p-1 sm:max-w-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    [
                      "flex h-9 shrink-0 items-center gap-2 rounded-[6px] px-3 text-sm font-medium transition",
                      isActive
                        ? "bg-ink text-white shadow-sm"
                        : "text-ink-soft hover:bg-mist hover:text-ink",
                    ].join(" ")
                  }
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </header>
      {children}
      <footer className="section-rule bg-paper">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-ink-soft sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>Claude 订阅服务为非官方咨询售卖站点，购买前请阅读风险与质保说明。</p>
          <div className="flex flex-wrap gap-3">
            <NavLink className="hover:text-ink" to="/guide">
              购买须知
            </NavLink>
            <NavLink className="hover:text-ink" to="/support">
              质保售后
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
