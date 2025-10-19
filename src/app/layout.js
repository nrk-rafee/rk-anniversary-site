import "./globals.css";

export const metadata = {
  title: "Happy Anniversary!",
  description: "A special surprise website filled with love, memories, and heartfelt moments just for you Karnu💕",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
