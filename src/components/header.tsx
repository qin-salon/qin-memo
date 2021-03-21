import Link from "next/link";
import { useTheme } from "next-themes";

const items = [
  { href: "/", label: "Home" },
  { href: "/async", label: "非同期" },
  { href: "/button", label: "ボタン" },
];

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const handleClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <header>
      <div className="bg-white dark:bg-gray-800">
        <h1 className="text-gray-900 dark:text-white">Title</h1>
        <button className="text-white dark:text-gray-900 bg-gray-800 dark:bg-white" onClick={handleClick}>
          Change Theme
        </button>
        <nav>
          {items.map(({ href, label }) => {
            return (
              <Link key={href} href={href}>
                <a style={{ display: "inline-block", padding: 12 }} className="text-gray-800 dark:text-gray-100">
                  {label}
                </a>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
