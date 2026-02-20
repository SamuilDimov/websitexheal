import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | xHeal",
};

export default function TermsConditionsPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative"
        style={{
          backgroundImage:
            "linear-gradient(180deg, var(--dark-blue), #f8f8fa00)",
        }}
      >
        <div className="w-full max-w-[100em] mx-auto px-[5em] pt-[200px] pb-[5em] flex flex-col items-center gap-[40px] text-xwhite max-[991px]:px-[40px] max-[991px]:pt-[140px] max-[479px]:px-[20px]">
          <h1 className="text-[4.5rem] font-medium leading-[1] tracking-[-0.04em] text-center max-[991px]:text-[3.5rem] max-[479px]:text-[3rem]">
            Terms &amp; Conditions
          </h1>
        </div>
      </section>

      {/* Content */}
      <section>
        <div className="w-full max-w-[100em] mx-auto px-[5em] py-[5em] flex flex-col items-center gap-[40px] text-xblack max-[991px]:px-[40px] max-[479px]:px-[20px]">
          <div className="rich-text w-full max-w-[800px]">
            <p>
              <strong>Last Updated: December 15, 2025</strong>
            </p>

            <h2>1. Introduction</h2>
            <p>
              Welcome to xHeal. These Terms of Service (&quot;Terms&quot;) constitute a
              legally binding agreement between you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;)
              and xHeal Corp. (&quot;xHeal,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), a company
              incorporated in the State of Florida, United States, with its
              principal office located at 25 SE 2ND AVE, SUITE 550, MIAMI, FL
              33131, USA.
            </p>
            <p>
              These Terms govern your access to and use of the xHeal mobile
              application (the &quot;App&quot;), our website at{" "}
              <a href="https://xheal.ai">https://xheal.ai</a> (the &quot;Website&quot;),
              and all related services, features, content, and functionality
              (collectively, the &quot;Services&quot;).
            </p>
            <p>
              By downloading, installing, or using the App, accessing the
              Website, creating an account, or otherwise using our Services, you
              acknowledge that you have read, understood, and agree to be bound
              by these Terms, our{" "}
              <a href="/privacy-policy">Privacy Policy</a>, and our{" "}
              <a href="/cookie-policy">Cookie Policy</a>, which are incorporated
              herein by reference.
            </p>
            <p>
              If you do not agree to these Terms, you must not access or use our
              Services.
            </p>

            <h2>2. Registration and Account Security</h2>
            <p>
              To access certain features of the Services, you must create an
              account. When you register for an account, you agree to:
            </p>
            <ul>
              <li>
                Provide accurate, current, and complete information during the
                registration process.
              </li>
              <li>
                Maintain and promptly update your account information to keep it
                accurate, current, and complete.
              </li>
              <li>
                Maintain the security and confidentiality of your login
                credentials and not share your account with any third party.
              </li>
              <li>
                Notify us immediately at{" "}
                <a href="mailto:support@xheal.ai">support@xheal.ai</a> if you
                become aware of any unauthorized use of your account or any
                other breach of security.
              </li>
              <li>
                Accept responsibility for all activities that occur under your
                account.
              </li>
            </ul>
            <p>
              We reserve the right to suspend or terminate your account if any
              information provided during registration or thereafter proves to
              be inaccurate, false, outdated, or incomplete, or if we reasonably
              believe that your account has been compromised.
            </p>

            <h2>3. Eligibility</h2>
            <p>
              You must be at least 13 years of age to use the Services. If you
              are under 18 years of age (or the age of legal majority in your
              jurisdiction), you may only use the Services with the consent and
              supervision of a parent or legal guardian who agrees to be bound by
              these Terms.
            </p>
            <p>
              If you are located in the European Union, you must be at least 16
              years of age to use the Services. If you are located in the United
              States, you must be at least 18 years of age to subscribe to paid
              features.
            </p>
            <p>
              By using the Services, you represent and warrant that you meet the
              applicable age requirements and have the legal capacity to enter
              into these Terms.
            </p>

            <h2>4. Use of Services, Licenses, and Restrictions</h2>

            <h3>4.1 Content and AI Technology</h3>
            <p>
              The Services include health and wellness content, AI-generated
              insights, personalized recommendations, and other informational
              materials (collectively, &quot;Content&quot;). All Content is provided for
              general informational and educational purposes only. The AI
              technology powering our Services uses machine learning algorithms
              and artificial intelligence models to process health-related data
              and generate insights. You acknowledge that AI-generated content
              may contain inaccuracies and should not be relied upon as the sole
              basis for any health-related decisions.
            </p>

            <h3>4.2 App License</h3>
            <p>
              Subject to your compliance with these Terms, xHeal grants you a
              limited, non-exclusive, non-transferable, non-sublicensable,
              revocable license to download, install, and use the App on a
              personal device that you own or control, solely for your personal,
              non-commercial use.
            </p>

            <h3>4.3 Prohibited Uses</h3>
            <p>You agree not to:</p>
            <ul>
              <li>
                Use the Services for any unlawful, fraudulent, or malicious
                purpose.
              </li>
              <li>
                Reverse engineer, decompile, disassemble, or attempt to derive
                the source code of the App or any underlying technology.
              </li>
              <li>
                Copy, modify, distribute, sell, lease, sublicense, or create
                derivative works based on the Services or any part thereof.
              </li>
              <li>
                Use automated systems, bots, scrapers, or similar tools to
                access, extract data from, or interact with the Services.
              </li>
              <li>
                Interfere with, disrupt, or attempt to gain unauthorized access
                to the Services, servers, or networks connected to the Services.
              </li>
              <li>
                Impersonate any person or entity or misrepresent your affiliation
                with any person or entity.
              </li>
              <li>
                Upload, transmit, or distribute any viruses, malware, or other
                harmful code.
              </li>
              <li>
                Use the Services to provide medical advice or services to third
                parties.
              </li>
              <li>
                Use the Services in any manner that could damage, disable,
                overburden, or impair xHeal&apos;s infrastructure.
              </li>
            </ul>

            <h3>4.4 Intellectual Property Ownership</h3>
            <p>
              The Services, including the App, Website, all Content, software,
              algorithms, AI models, designs, text, graphics, logos, icons,
              images, audio, video, and all other materials are owned by or
              licensed to xHeal and are protected by United States and
              international copyright, trademark, patent, trade secret, and
              other intellectual property laws. Nothing in these Terms grants you
              any right, title, or interest in or to the Services or any Content
              except for the limited license expressly granted herein.
            </p>

            <h3>4.5 Personal Use Only</h3>
            <p>
              The Services are intended solely for your personal,
              non-commercial use. You may not use the Services or any Content
              for commercial purposes without our prior written consent. Any
              unauthorized use of the Services terminates the licenses granted
              herein and may subject you to civil and criminal penalties.
            </p>

            <h2>5. Subscriptions, Billing, and Renewals</h2>
            <p>
              xHeal offers subscription-based access to premium features of the
              Services (&quot;Subscription&quot;). By purchasing a Subscription, you agree
              to the following:
            </p>
            <ul>
              <li>
                <strong>Subscription Plans:</strong> We offer various
                subscription plans (e.g., monthly, annual) as described in the
                App or on the Website. Details regarding pricing, features, and
                billing frequency are provided at the time of purchase.
              </li>
              <li>
                <strong>Automatic Renewal:</strong> Unless you cancel your
                Subscription before the end of the current billing period, your
                Subscription will automatically renew for successive periods of
                the same duration at the then-current price. You authorize us to
                charge the applicable subscription fee to your designated
                payment method upon each renewal.
              </li>
              <li>
                <strong>Price Changes:</strong> We reserve the right to change
                subscription prices at any time. If we change the price of your
                Subscription, we will provide you with at least 30 days&apos; prior
                notice. Continued use of the Services after the price change
                takes effect constitutes your acceptance of the new price.
              </li>
            </ul>

            <h2>6. Cancellation and Termination</h2>
            <p>
              You may cancel your Subscription at any time through your account
              settings in the App or by contacting us at{" "}
              <a href="mailto:support@xheal.ai">support@xheal.ai</a>.
              Cancellation will take effect at the end of the current billing
              period. You will continue to have access to premium features until
              the end of the period for which you have already paid.
            </p>
            <p>
              We may suspend or terminate your account and access to the
              Services at any time, with or without cause, and with or without
              notice. Upon termination, all licenses and rights granted to you
              under these Terms will immediately cease.
            </p>
            <p>
              <strong>EU Right of Withdrawal:</strong> If you are a consumer
              located in the European Union, you have the right to withdraw from
              your Subscription within 14 days of purchase without giving any
              reason. To exercise this right, you must inform us of your
              decision by an unequivocal statement (e.g., email to{" "}
              <a href="mailto:support@xheal.ai">support@xheal.ai</a>). If you
              request to begin the performance of services during the withdrawal
              period, you will be liable to pay an amount proportionate to the
              services provided up to the time you communicate your withdrawal.
            </p>

            <h2>7. Free Trials</h2>
            <p>
              xHeal may offer a free trial period of 7 days for new users to
              experience premium features of the Services. At the end of the
              free trial, your Subscription will automatically convert to a paid
              Subscription unless you cancel before the trial period ends.
            </p>
            <p>
              We reserve the right to modify, suspend, or discontinue free trial
              offers at any time. Free trial eligibility is limited to one trial
              per user and may be determined based on your account information,
              device identifiers, or payment method.
            </p>

            <h2>8. Fees, Payments, and Taxes</h2>
            <p>
              All fees for paid Services are stated in U.S. Dollars (USD) or in
              the local currency displayed at the time of purchase, and are
              non-refundable except as expressly provided in these Terms or as
              required by applicable law.
            </p>
            <p>
              You are responsible for all applicable taxes, duties, and
              government charges associated with your use of the Services. If we
              are required to collect or remit taxes on your behalf, such taxes
              will be added to the fees charged to you.
            </p>
            <p>
              Payment processing is handled by third-party payment processors
              (e.g., Apple App Store, Google Play Store, Stripe). By providing
              payment information, you represent and warrant that you are
              authorized to use the payment method and that all payment
              information is accurate and complete.
            </p>

            <h2>9. No Medical Advice</h2>
            <p>
              <strong>
                THE SERVICES DO NOT PROVIDE MEDICAL ADVICE, DIAGNOSIS, OR
                TREATMENT.
              </strong>{" "}
              All Content, including AI-generated insights, health
              recommendations, scores, and reports, is provided for
              informational and educational purposes only and is not intended to
              be a substitute for professional medical advice, diagnosis, or
              treatment.
            </p>
            <p>
              Always seek the advice of your physician or other qualified health
              provider with any questions you may have regarding a medical
              condition. Never disregard professional medical advice or delay in
              seeking it because of information obtained through the Services.
            </p>
            <p>
              If you think you may have a medical emergency, call your doctor or
              emergency services immediately. xHeal does not recommend or
              endorse any specific tests, physicians, products, procedures,
              opinions, or other information that may be mentioned within the
              Services.
            </p>
            <p>
              Reliance on any information provided by the Services, including
              AI-generated content, is solely at your own risk.
            </p>

            <h2>10. AI Technology</h2>
            <p>
              The Services utilize artificial intelligence and machine learning
              technologies (&quot;AI Technology&quot;) to provide health insights,
              recommendations, and other features. You acknowledge and agree
              that:
            </p>
            <ul>
              <li>
                AI Technology has inherent limitations and may produce
                inaccurate, incomplete, or inappropriate responses.
              </li>
              <li>
                AI-generated content is based on patterns in data and does not
                reflect human clinical judgment or expertise.
              </li>
              <li>
                The accuracy and usefulness of AI Technology outputs depend on
                the quality and completeness of the data you provide.
              </li>
              <li>
                We continuously work to improve our AI Technology, but we cannot
                guarantee that outputs will be free from errors or biases.
              </li>
              <li>
                You should independently verify any AI-generated health
                information with qualified healthcare professionals before
                making health-related decisions.
              </li>
            </ul>

            <h2>11. Changes to Services</h2>
            <p>
              We reserve the right to modify, update, suspend, or discontinue
              any part of the Services at any time, with or without notice. We
              may also add or remove features, functionalities, or Content. We
              are not liable to you or any third party for any modification,
              suspension, or discontinuation of the Services.
            </p>

            <h2>12. User Content</h2>
            <p>
              You may submit, upload, or transmit content through the Services,
              including health data, messages, feedback, and other materials
              (&quot;User Content&quot;). You retain ownership of your User Content.
              However, by submitting User Content, you grant xHeal a worldwide,
              non-exclusive, royalty-free, sublicensable, and transferable
              license to use, reproduce, modify, adapt, publish, translate,
              distribute, and display your User Content solely for the purpose
              of providing, improving, and developing the Services.
            </p>
            <p>You represent and warrant that:</p>
            <ul>
              <li>
                You own or have the necessary rights to your User Content.
              </li>
              <li>
                Your User Content does not violate the privacy, publicity,
                intellectual property, or other rights of any third party.
              </li>
              <li>
                Your User Content does not contain any material that is
                unlawful, defamatory, obscene, or otherwise objectionable.
              </li>
            </ul>

            <h2>13. Disclaimers and Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE SERVICES
              ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY
              KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING
              WITHOUT LIMITATION WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
              PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ACCURACY.
            </p>
            <p>
              XHEAL DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED,
              SECURE, ERROR-FREE, OR FREE FROM VIRUSES OR OTHER HARMFUL
              COMPONENTS. XHEAL DOES NOT WARRANT THE ACCURACY, COMPLETENESS, OR
              RELIABILITY OF ANY CONTENT, INCLUDING AI-GENERATED CONTENT.
            </p>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT
              SHALL XHEAL, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS,
              AFFILIATES, SUCCESSORS, OR ASSIGNS BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY
              DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS,
              GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF
              OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE
              SERVICES.
            </p>
            <p>
              XHEAL&apos;S TOTAL AGGREGATE LIABILITY TO YOU FOR ALL CLAIMS ARISING
              OUT OF OR RELATING TO THESE TERMS OR THE SERVICES SHALL NOT EXCEED
              THE GREATER OF (A) THE AMOUNTS YOU HAVE PAID TO XHEAL IN THE
              TWELVE (12) MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED U.S.
              DOLLARS ($100.00).
            </p>
            <p>
              SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF
              CERTAIN WARRANTIES OR LIABILITY. IN SUCH JURISDICTIONS, OUR
              LIABILITY SHALL BE LIMITED TO THE MAXIMUM EXTENT PERMITTED BY LAW.
              FOR USERS IN THE EUROPEAN UNION, NOTHING IN THESE TERMS SHALL
              EXCLUDE OR LIMIT LIABILITY FOR DEATH OR PERSONAL INJURY CAUSED BY
              NEGLIGENCE, FRAUD, OR FRAUDULENT MISREPRESENTATION.
            </p>

            <h2>14. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless xHeal and its
              officers, directors, employees, agents, affiliates, successors,
              and assigns from and against any and all claims, damages, losses,
              liabilities, costs, and expenses (including reasonable attorneys&apos;
              fees) arising out of or relating to:
            </p>
            <ul>
              <li>Your use of or access to the Services.</li>
              <li>Your violation of these Terms.</li>
              <li>
                Your violation of any rights of any third party, including
                intellectual property, privacy, or publicity rights.
              </li>
              <li>
                Any User Content you submit, upload, or transmit through the
                Services.
              </li>
            </ul>
            <p>
              <strong>EU Exception:</strong> If you are a consumer resident in
              the European Union, this indemnification clause applies only to
              the extent that such indemnification is not prohibited by
              applicable EU consumer protection laws.
            </p>

            <h2>15. Dispute Resolution and Arbitration</h2>
            <p>
              <strong>Mandatory Arbitration:</strong> Any dispute, controversy,
              or claim arising out of or relating to these Terms or the
              Services, including the determination of the scope or
              applicability of this agreement to arbitrate, shall be determined
              by binding arbitration administered by the American Arbitration
              Association (&quot;AAA&quot;) under its Consumer Arbitration Rules. The
              arbitration shall be conducted by a single arbitrator and shall
              take place in Miami-Dade County, Florida, or at a location
              mutually agreed upon by the parties.
            </p>
            <p>
              <strong>Class Action Waiver:</strong> You and xHeal agree that
              each party may bring claims against the other only in your or its
              individual capacity and not as a plaintiff or class member in any
              purported class, consolidated, or representative proceeding.
            </p>
            <p>
              <strong>30-Day Opt-Out:</strong> You have the right to opt out of
              this arbitration agreement by sending written notice to{" "}
              <a href="mailto:legal@xheal.ai">legal@xheal.ai</a> within 30
              days of first accepting these Terms. Your notice must include your
              name, address, email address, and an unequivocal statement that
              you opt out of this arbitration agreement.
            </p>
            <p>
              <strong>Exceptions:</strong> Nothing in this section shall prevent
              either party from seeking injunctive or other equitable relief
              from a court of competent jurisdiction. For users located in the
              European Union, this arbitration clause shall not deprive you of
              the protection afforded by mandatory provisions of the law of the
              EU Member State in which you are habitually resident, including
              the right to bring proceedings before the courts of that Member
              State.
            </p>

            <h2>16. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of the State of Florida, United States, without regard to
              its conflict of law provisions. For users in the European Union,
              this choice of law does not deprive you of the protection
              afforded by mandatory consumer protection provisions in your
              country of residence.
            </p>

            <h2>17. Changes to These Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. If we make
              material changes, we will notify you by posting the updated Terms
              within the App, on the Website, or by sending you a notification.
              Your continued use of the Services after the changes take effect
              constitutes your acceptance of the revised Terms. If you do not
              agree to the revised Terms, you must stop using the Services and
              cancel your Subscription.
            </p>

            <h2>18. General Provisions</h2>
            <ul>
              <li>
                <strong>Entire Agreement:</strong> These Terms, together with
                the Privacy Policy and Cookie Policy, constitute the entire
                agreement between you and xHeal regarding the Services and
                supersede all prior or contemporaneous agreements,
                understandings, and communications.
              </li>
              <li>
                <strong>Severability:</strong> If any provision of these Terms
                is found to be invalid, illegal, or unenforceable, the remaining
                provisions shall continue in full force and effect.
              </li>
              <li>
                <strong>Waiver:</strong> Our failure to enforce any right or
                provision of these Terms shall not be deemed a waiver of such
                right or provision.
              </li>
              <li>
                <strong>Assignment:</strong> You may not assign or transfer
                these Terms or any rights or obligations hereunder without our
                prior written consent. We may assign our rights and obligations
                under these Terms without restriction.
              </li>
              <li>
                <strong>Force Majeure:</strong> xHeal shall not be liable for
                any failure or delay in performance resulting from causes beyond
                its reasonable control, including but not limited to acts of
                God, war, terrorism, pandemics, natural disasters, government
                actions, or failures of third-party services.
              </li>
            </ul>

            <h2>19. Upgrade Policy</h2>
            <p>
              If you upgrade your Subscription plan during an active billing
              period, the new plan will take effect immediately. You will be
              charged the prorated difference between your current plan and the
              upgraded plan for the remainder of the billing period. Subsequent
              billing cycles will reflect the full price of the upgraded plan.
            </p>

            <h2>20. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              <strong>xHeal Corp.</strong>
              <br />
              25 SE 2ND AVE, SUITE 550
              <br />
              MIAMI, FL 33131, USA
              <br />
              Email:{" "}
              <a href="mailto:legal@xheal.ai">legal@xheal.ai</a>
              <br />
              Support:{" "}
              <a href="mailto:support@xheal.ai">support@xheal.ai</a>
              <br />
              Phone: (833) 514-4187
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
