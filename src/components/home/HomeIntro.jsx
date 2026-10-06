// The ONE <h1> on the home page (visible, keyword-rich). Server component, no JS needed.
export default function HomeIntro() {
  return (
    <section aria-labelledby="home-title" className="bg-paper px-5 pb-6 pt-20 text-center sm:px-10 sm:pt-28">
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.45em] text-maroon">Saudabad Khokhrapar · Malir · Karachi</p>
        <h1 id="home-title" className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
          Al Kausar Bakery <span className="gold-text">– Fresh Cakes, Pastries &amp; Sweets</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-ink/70 sm:text-lg">
          Al Kausar Bakers Sweets &amp; Nimco bakes cakes and pastries fresh every day and makes traditional mithai, halwajaat and nimco in pure desi ghee.
          Order online on WhatsApp, request a custom cake, or place a bulk order for weddings and events across Karachi.
        </p>
      </div>
    </section>
  );
}
