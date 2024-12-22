import React from 'react';
import '../Styling/Pp.css';

const Pp = () => {
    return (
        <div className="privacy-policy-container">
            <h1 className="title">Privacy Policy for DocMed</h1>
            <p className="effective-date">Effective Date: 23/12/2024</p>

            <section className="section">
                <h2 className="section-title">1. Information We Collect</h2>
                <p className="text">
                    We collect various types of information to provide and improve our services, including:
                </p>
                <ul className="list">
                    <li><strong>Personal Information</strong>: When you register or use our platform, we may collect personal details such as your name, contact information, age, gender, and location (for finding nearby doctors).</li>
                    <li><strong>Health Information</strong>: When you interact with Caregenie, our AI bot, you may provide health-related information (such as symptoms, medical history, and treatment preferences) to receive recommendations. This information is used only for improving your healthcare experience and providing accurate advice.</li>
                    <li><strong>Usage Data</strong>: We collect information about how you interact with our platform, including device information, IP address, browser type, and usage patterns.</li>
                </ul>
            </section>

            <section className="section">
                <h2 className="section-title">2. How We Use Your Information</h2>
                <p className="text">We use your information for the following purposes:</p>
                <ul className="list">
                    <li>To connect you with doctors within your specified range.</li>
                    <li>To provide medical advice and guidance through Caregenie.</li>
                    <li>To facilitate video calls and consultations with doctors.</li>
                    <li>To improve our platform, services, and user experience.</li>
                    <li>To communicate with you about updates, promotions, and other relevant information.</li>
                </ul>
            </section>

            <section className="section">
                <h2 className="section-title">3. Data Sharing and Disclosure</h2>
                <p className="text">We may share your personal information in the following circumstances:</p>
                <ul className="list">
                    <li><strong>With Healthcare Providers</strong>: If you choose to consult with a doctor, we may share your information with the doctor or medical professional assisting you.</li>
                    <li><strong>With Third-Party Service Providers</strong>: We may use third-party services to process payments, manage video calls, or improve platform functionality.</li>
                    <li><strong>Legal Compliance</strong>: We may disclose your information if required by law or in response to valid legal requests (e.g., a subpoena or court order).</li>
                </ul>
            </section>

            <section className="section">
                <h2 className="section-title">4. Data Security</h2>
                <p className="text">
                    We take appropriate technical and organizational measures to safeguard your personal information from unauthorized access, disclosure, alteration, and destruction.
                </p>
            </section>

            <section className="section">
                <h2 className="section-title">5. Your Rights and Choices</h2>
                <p className="text">You have the following rights regarding your personal information:</p>
                <ul className="list">
                    <li><strong>Access and Correction</strong>: You can request to view, update, or correct your personal information by contacting us.</li>
                    <li><strong>Data Deletion</strong>: You can request to delete your personal data, subject to certain legal and contractual obligations.</li>
                    <li><strong>Opt-out</strong>: You can opt-out of marketing communications by following the unsubscribe instructions in any promotional emails or contacting us directly.</li>
                </ul>
            </section>

            <section className="section">
                <h2 className="section-title">6. Cookies and Tracking Technologies</h2>
                <p className="text">
                    We use cookies and similar technologies to enhance your experience, analyze trends, and administer our services. You can manage your cookie preferences through your browser settings.
                </p>
            </section>

            <section className="section">
                <h2 className="section-title">7. Children's Privacy</h2>
                <p className="text">
                    Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we learn that we have collected information from a child under 18, we will take steps to delete that information.
                </p>
            </section>

            <section className="section">
                <h2 className="section-title">8. Changes to This Privacy Policy</h2>
                <p className="text">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the updated policy on our platform and updating the effective date.
                </p>
            </section>

            <section className="section">
                <h2 className="section-title">9. Contact Us</h2>
                <p className="text">If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
                <p className="text">[Insert Contact Information]</p>
            </section>
        </div>
    );
};

export default Pp;