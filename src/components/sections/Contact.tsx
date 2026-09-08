import { siteContent } from "@/lib/content";

export default function Contact() {
  const { contact, links } = siteContent;

  const contactLinks = [
    { label: "LinkedIn", href: links.linkedin },
    { label: "Mail", href: `mailto:${links.email}` },
  ];

  return (
    <section className="contact-section" id="contacto" aria-labelledby="contacto-title">
      <p>{contact.text}</p>
      <h2 id="contacto-title">{contact.title}</h2>
      <div className="contact-actions">
        {contactLinks.map((link) => (
          <a className="button button-light" href={link.href} key={link.label}>
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
