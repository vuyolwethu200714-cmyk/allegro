import { FormEvent, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Clock3,
  Loader2,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
  ZoomIn,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Product = {
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  alt: string;
};

type GalleryImage = Product & { label: string };

const phoneNumber = '+27827833821';
const phoneDisplay = '+27 82 783 3821';
const whatsappMessage = 'Hi Allegro, I found your website and would like to enquire about precast walling or concrete products. Could you please assist me with a quotation?';
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

const products: Product[] = [
  {
    title: 'Precast concrete walling',
    eyebrow: '01 / Core range',
    description: 'Strong, practical boundary solutions designed around your property, privacy and project requirements.',
    image: 'https://images.pexels.com/photos/9806762/pexels-photo-9806762.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Concrete boundary wall beside a residential property',
  },
  {
    title: 'Boundary walls & fencing',
    eyebrow: '02 / Complete boundaries',
    description: 'Define and secure residential, commercial or industrial sites with a considered walling and fencing solution.',
    image: 'https://images.pexels.com/photos/15836030/pexels-photo-15836030.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Long concrete wall with grass in front',
  },
  {
    title: 'Concrete products',
    eyebrow: '03 / Building essentials',
    description: 'Concrete products for projects that call for dependable materials, careful planning and a clean finish.',
    image: 'https://images.pexels.com/photos/38439592/pexels-photo-38439592.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Concrete architectural structure with geometric metal fencing',
  },
  {
    title: 'Steelwork & fencing',
    eyebrow: '04 / Related solutions',
    description: 'Discuss complementary steelwork and fencing options to complete your site boundary with confidence.',
    image: 'https://images.pexels.com/photos/33903903/pexels-photo-33903903.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Black metal security fence alongside brickwork',
  },
];

const gallery: GalleryImage[] = [
  { ...products[0], label: 'Precast boundary wall' },
  { ...products[1], label: 'Concrete walling detail' },
  { ...products[2], label: 'Concrete structure' },
  { ...products[3], label: 'Steel fencing solution' },
  {
    title: 'Residential boundary',
    eyebrow: 'Gallery / 05',
    label: 'Residential property boundary',
    description: '',
    image: 'https://images.pexels.com/photos/27683986/pexels-photo-27683986.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Modern South African suburban home with landscaped garden',
  },
  {
    title: 'Site security',
    eyebrow: 'Gallery / 06',
    label: 'Commercial site security',
    description: '',
    image: 'https://images.pexels.com/photos/18510415/pexels-photo-18510415.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Industrial building behind a security fence',
  },
];

const benefits = [
  ['01', 'Privacy with purpose', 'Create clear boundaries and more private outdoor spaces for homes, estates and commercial properties.'],
  ['02', 'Built for the brief', 'Talk through your site, style and practical requirements to find an approach that fits the project.'],
  ['03', 'A considered finish', 'Bring a cleaner, more complete look to a new build, renovation or property improvement project.'],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState('');
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const openQuote = (service = '') => {
    setQuoteProduct(service);
    scrollTo('quote');
  };

  const submitQuote = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus('submitting');
    const formData = new FormData(event.currentTarget);
    const payload = {
      full_name: String(formData.get('fullName') ?? '').trim(),
      phone: String(formData.get('phone') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim() || null,
      location: String(formData.get('location') ?? '').trim(),
      service: String(formData.get('service') ?? '').trim(),
      project_size: String(formData.get('projectSize') ?? '').trim() || null,
      installation: String(formData.get('installation') ?? '').trim(),
      details: String(formData.get('details') ?? '').trim() || null,
    };

    const { error } = await supabase.from('quote_enquiries').insert(payload);
    setFormStatus(error ? 'error' : 'success');
    if (!error) event.currentTarget.reset();
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container nav-inner">
          <button className="brand" onClick={() => scrollTo('home')} aria-label="Allegro home">
            <img src="/Allegro_Infinity_Logo.png" alt="Allegro Precast Walling & Concrete Products logo" />
          </button>
          <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
            <button onClick={() => scrollTo('home')}>Home</button>
            <button onClick={() => scrollTo('about')}>About us</button>
            <button onClick={() => scrollTo('products')}>Products & services</button>
            <button onClick={() => scrollTo('gallery')}>Gallery</button>
            <button onClick={() => scrollTo('contact')}>Contact</button>
            <button className="nav-quote" onClick={() => openQuote()}>Request a quote <ArrowRight size={16} /></button>
          </nav>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-image" />
          <div className="hero-overlay" />
          <div className="container hero-content">
            <p className="eyebrow light"><span /> Precast walling & concrete products</p>
            <h1>Strong foundations.<br /><em>Secure boundaries.</em></h1>
            <p className="hero-copy">Quality precast walling and concrete products for residential, commercial and construction projects across the South Coast.</p>
            <div className="hero-actions">
              <button className="button button-red" onClick={() => openQuote()}>Request a quote <ArrowRight size={18} /></button>
              <button className="button button-ghost" onClick={() => scrollTo('products')}>Explore products <ArrowRight size={18} /></button>
            </div>
            <div className="hero-note"><span className="hero-rule" /> <span>Port Shepstone · KZN South Coast</span></div>
          </div>
          <div className="hero-stamp"><span>AP</span><strong>Built around<br />your project</strong></div>
        </section>

        <section id="about" className="intro section-pad">
          <div className="container intro-grid">
            <div>
              <p className="eyebrow"><span /> About Allegro</p>
              <h2>Practical products.<br /><em>Solid direction.</em></h2>
            </div>
            <div className="intro-copy">
              <p className="lead">Allegro Precast Walling & Concrete Products is a Port Shepstone business helping homeowners, builders and property professionals find dependable walling, fencing and concrete solutions.</p>
              <p>We keep the process straightforward: understand the site, talk through what matters and help you choose a suitable way forward. From a residential boundary to a larger commercial requirement, every enquiry starts with a proper conversation.</p>
              <button className="text-link" onClick={() => openQuote()}>Talk to us about your project <ArrowRight size={17} /></button>
            </div>
          </div>
          <div className="container intro-line"><span>01</span><div /><span>Built for South Coast conditions and projects</span></div>
        </section>

        <section id="products" className="products-section section-pad dark-section">
          <div className="container">
            <div className="section-heading light-heading">
              <div><p className="eyebrow light"><span /> What we offer</p><h2>Solutions that<br /><em>stand their ground.</em></h2></div>
              <p>From walling and boundary definition to related fencing and concrete products, we can help you shape the right scope for your site.</p>
            </div>
            <div className="product-grid">
              {products.map((product, index) => (
                <article className="product-card" key={product.title}>
                  <div className="card-image"><img src={product.image} alt={product.alt} loading={index > 1 ? 'lazy' : 'eager'} /><span>{product.eyebrow}</span></div>
                  <div className="product-card-body"><h3>{product.title}</h3><p>{product.description}</p><button className="card-link" onClick={() => openQuote(product.title)}>Request a quote <ArrowRight size={16} /></button></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="benefits section-pad">
          <div className="container benefits-grid">
            <div className="benefits-image"><img src="https://images.pexels.com/photos/9806762/pexels-photo-9806762.jpeg?auto=compress&cs=tinysrgb&w=1400" alt="Concrete boundary wall at a residential property" loading="lazy" /><div className="image-caption"><span>02</span><span>Boundaries with purpose</span></div></div>
            <div className="benefits-content"><p className="eyebrow"><span /> Why precast walling</p><h2>Make the boundary<br /><em>part of the plan.</em></h2><p className="benefit-intro">A boundary does more than mark an edge. It shapes privacy, defines the property and sets the tone for everything inside it.</p><div className="benefit-list">{benefits.map(([number, title, copy]) => <div className="benefit-item" key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div></div>
          </div>
        </section>

        <section id="gallery" className="gallery-section section-pad grey-section">
          <div className="container"><div className="section-heading"><div><p className="eyebrow"><span /> Project gallery</p><h2>See the material<br /><em>in context.</em></h2></div><p>Reference imagery for walling, fencing and property boundaries. Actual finishes and available options can be discussed with Allegro.</p></div><div className="gallery-grid">{gallery.map((image, index) => <button className={`gallery-item gallery-${index + 1}`} key={image.label} onClick={() => setLightbox(image)}><img src={image.image} alt={image.alt} loading="lazy" /><span className="gallery-label">{image.label} <ZoomIn size={15} /></span></button>)}</div></div>
        </section>

        <section id="quote" className="quote-section section-pad">
          <div className="container quote-layout"><div className="quote-intro"><p className="eyebrow light"><span /> Start a conversation</p><h2>Let’s talk about<br /><em>your project.</em></h2><p>Share a few details and the Allegro team can get a clearer picture of what you need. For a quicker response, you can also message us directly on WhatsApp.</p><a className="whatsapp-link" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={20} /> Message us on WhatsApp <ArrowRight size={17} /></a><div className="quote-contact"><span>Prefer to call?</span><a href={`tel:${phoneNumber}`}>{phoneDisplay}</a></div></div>
            <form className="quote-form" onSubmit={submitQuote}><div className="form-header"><span>Quote enquiry</span><span>All fields marked * are required</span></div><div className="form-row"><label>Full name *<input name="fullName" required minLength={2} placeholder="Your name" /></label><label>Phone number *<input name="phone" required minLength={7} placeholder="+27 ..." /></label></div><div className="form-row"><label>Email address <span>(optional)</span><input type="email" name="email" placeholder="you@example.com" /></label><label>Project location / suburb *<input name="location" required placeholder="e.g. Port Shepstone" /></label></div><div className="form-row"><label>Product or service *<select name="service" required value={quoteProduct} onChange={(event) => setQuoteProduct(event.target.value)}><option value="">Select an option</option>{products.map((product) => <option key={product.title}>{product.title}</option>)}<option>Not sure — I need guidance</option></select></label><label>Approx. wall length or project size <span>(optional)</span><input name="projectSize" placeholder="e.g. 30m boundary" /></label></div><label>What do you need? *<select name="installation" required defaultValue=""><option value="" disabled>Select an option</option><option>Supply and installation</option><option>Supply only</option><option>Not sure yet</option></select></label><label>Additional project details <span>(optional)</span><textarea name="details" rows={4} placeholder="Tell us a little about the site, timing or finish you have in mind..." /></label><button className="button button-red form-submit" disabled={formStatus === 'submitting'}>{formStatus === 'submitting' ? <><Loader2 className="spin" size={18} /> Sending enquiry</> : <>Send enquiry <ArrowRight size={18} /></>}</button>{formStatus === 'success' && <div className="form-message success"><Check size={18} /> Thank you. Your enquiry has been sent to Allegro.</div>}{formStatus === 'error' && <div className="form-message error">We couldn’t send your enquiry just now. Please try WhatsApp or call {phoneDisplay}.</div>}<p className="form-footnote">Your details are used only to respond to this enquiry.</p></form>
          </div>
        </section>

        <section id="contact" className="contact-section section-pad">
          <div className="container contact-grid"><div><p className="eyebrow"><span /> Find Allegro</p><h2>Good work starts<br /><em>with a clear brief.</em></h2><p className="contact-lead">Visit, call or send through your requirements. We’re here to help you work out the next step.</p><div className="contact-details"><a href={`tel:${phoneNumber}`}><Phone size={20} /><span><small>Telephone</small>{phoneDisplay}</span></a><div><MapPin size={20} /><span><small>Address</small>Lot 140 Princess Elizabeth Drive,<br />Port Shepstone, 4240, South Africa</span></div><div><Clock3 size={20} /><span><small>Business hours</small>Mon–Fri: 07:00–17:00<br />Saturday: 07:00–14:00</span></div></div><a className="button button-black" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp Allegro</a></div><div className="map-card"><iframe title="Map showing Allegro in Port Shepstone" src="https://www.google.com/maps?q=Lot%20140%20Princess%20Elizabeth%20Drive%2C%20Port%20Shepstone%2C%204240%2C%20South%20Africa&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><a href="https://www.google.com/maps/search/?api=1&query=Lot+140+Princess+Elizabeth+Drive%2C+Port+Shepstone%2C+4240%2C+South+Africa" target="_blank" rel="noreferrer" className="map-link">Open in Google Maps <ArrowRight size={16} /></a></div></div>
        </section>

        <section className="faq-section"><div className="container faq-grid"><div><p className="eyebrow"><span /> Helpful to know</p><h2>Before you<br /><em>get started.</em></h2></div><div className="faq-list">{[['What areas do you serve?', 'Allegro is based in Port Shepstone and serves projects across the KwaZulu-Natal South Coast. Share your project location with us and we can discuss your requirements.'], ['Can I request supply only?', 'Yes. Tell us whether you need supply and installation, supply only, or guidance on the best approach for your project.'], ['What should I include in my enquiry?', 'The location, approximate size, the type of boundary or product you are considering, and any timing or site details you already know are a helpful starting point.']].map(([question, answer], index) => <div className="faq-item" key={question}><button onClick={() => setFaqOpen(faqOpen === index ? null : index)} aria-expanded={faqOpen === index}><span>{question}</span>{faqOpen === index ? <ChevronUp size={19} /> : <ChevronDown size={19} />}</button>{faqOpen === index && <p>{answer}</p>}</div>)}</div></div></section>
      </main>

      <footer className="footer"><div className="container footer-top"><div className="footer-brand"><img className="footer-logo" src="/Allegro_Infinity_Logo.png" alt="Allegro Precast Walling & Concrete Products logo" /><p>Quality walling and concrete products for practical projects across the South Coast.</p></div><div className="footer-nav"><span>Explore</span><button onClick={() => scrollTo('about')}>About us</button><button onClick={() => scrollTo('products')}>Products & services</button><button onClick={() => scrollTo('gallery')}>Gallery</button></div><div className="footer-nav"><span>Start here</span><button onClick={() => openQuote()}>Request a quote</button><a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp us</a><a href={`tel:${phoneNumber}`}>Call {phoneDisplay}</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Allegro Precast Walling & Concrete Products</span><span>Port Shepstone · KwaZulu-Natal</span></div></footer>

      <a className="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chat with Allegro on WhatsApp"><MessageCircle size={25} /><span>Chat on WhatsApp</span></a>
      {lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label={lightbox.label} onClick={() => setLightbox(null)}><button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close image"><X /></button><img src={lightbox.image} alt={lightbox.alt} onClick={(event) => event.stopPropagation()} /><div className="lightbox-caption">{lightbox.label}<small>Reference imagery</small></div></div>}
    </div>
  );
}

export default App;
