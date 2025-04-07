import { useGetContactsQuery } from "../../../api/endpoints/contacts";
import "./Form.scss";
import { useState } from "react";

export default function Form() {
  const { data } = useGetContactsQuery();
  const contactInfo = data?.[0]?.acf?.contact_info;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section className="contact-form">
      <div className="wrapper">
        <div className="contact-form__content">
          <div className="contact-form__info">
            <h2>Ota meihin yhteyttä</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in
              pharetra sem. Ut hendrerit varius odio aliquet ullamcorper. Nullam
              lacinia leo risus, quis consectetur sapien accumsan id.
            </p>
            <ul>
              <li>
                <span className="icon">📞</span>{" "}
                <a href={`tel:${contactInfo?.phone_number}`}>
                  {contactInfo?.phone_number}
                </a>
              </li>
              <li>
                <span className="icon">✉️</span>{" "}
                <a href={`mailto:${contactInfo?.email}`}>
                  {contactInfo?.email}
                </a>
              </li>
              <li>
                <span className="icon">📍</span> {contactInfo?.address}
              </li>
            </ul>
          </div>
          <div className="contact-form__form">
            <h3>Lähetä viesti lomakkeella</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nimi"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Sähköposti"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Viesti"
                  rows={4}
                  required
                />
              </div>
              <button type="submit">
                Lähetä <span className="arrow">➔</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
