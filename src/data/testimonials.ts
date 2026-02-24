export interface Testimonial {
  quote: string;
  name: string;
  image: string;
}

const testimonialsEn: Testimonial[] = [
  // === CHRONIC CONDITIONS ===
  { quote: "When my HRV went down, xHeal warned me early that an inflammation flare-up was coming. A few days later my labs confirmed it. xHeal saw it before I felt it.", name: "Trifon G., 33", image: "/images/testimonials/trifon.jpg" },
  { quote: "I've cut my insulin resistance related flare-ups in half by finally knowing what sets them off. xHeal turned trial and error into prevention.", name: "James P., 45", image: "/images/testimonials/james.jpeg" },
  { quote: "Living with Crohn's used to mean constant guessing. Now I know exactly which foods and stress patterns trigger my symptoms before they spiral.", name: "Maya R., 29", image: "/images/testimonials/t-015.png" },
  { quote: "My rheumatologist was genuinely impressed when I showed her my xHeal report. She said it was the most complete patient history she'd ever seen.", name: "Linda C., 52", image: "/images/testimonials/t-016.png" },
  { quote: "Managing Type 2 diabetes with xHeal changed everything. I can see how my sleep, meals, and stress all connect to my glucose trends.", name: "Robert K., 58", image: "/images/testimonials/t-017.png" },
  { quote: "After years with fibromyalgia, I finally have proof of patterns my doctors couldn't see. xHeal found the link between barometric pressure and my worst days.", name: "Sarah M., 38", image: "/images/testimonials/t-159.png" },
  { quote: "My thyroid levels kept fluctuating and nobody could explain why. xHeal tracked everything and revealed that my supplement timing was off.", name: "Nicole W., 41", image: "/images/testimonials/t-018.png" },
  { quote: "PCOS management became so much simpler once I could see my hormone patterns alongside my sleep, stress, and nutrition data all in one place.", name: "Priya S., 27", image: "/images/testimonials/t-019.png" },
  { quote: "I have MS and the flare-up prediction alone is worth it. xHeal caught a pattern between my sleep quality and symptom severity that I missed for years.", name: "David L., 44", image: "/images/testimonials/t-020.png" },
  { quote: "Lupus makes every day unpredictable. xHeal helps me see what's coming by connecting my lab work, sleep, and stress into one clear picture.", name: "Angela T., 36", image: "/images/testimonials/t-021.png" },
  { quote: "My endocrinologist started asking what app I use because my lab tracking was so thorough. That felt like a win.", name: "Marcus J., 49", image: "/images/testimonials/t-022.png" },
  { quote: "Hashimoto's and anxiety together are brutal. xHeal showed me that my worst anxiety days correlate with specific thyroid fluctuations.", name: "Emma B., 34", image: "/images/testimonials/t-023.png" },

  // === SLEEP OPTIMIZATION ===
  { quote: "I thought I was sleeping fine until xHeal showed me my deep sleep was almost nonexistent. Changed my evening routine and gained an extra hour of quality rest.", name: "Kevin H., 31", image: "/images/testimonials/t-024.png" },
  { quote: "xHeal connected my poor sleep nights to my afternoon coffee habit. Sounds obvious, but seeing the data made it real.", name: "Olivia N., 28", image: "/images/testimonials/t-025.png" },
  { quote: "My sleep score improved by 30 points once xHeal identified that late-night screen time was my biggest disruptor. I needed the data to believe it.", name: "Chris D., 35", image: "/images/testimonials/t-026.png" },
  { quote: "As a shift worker, sleep is everything. xHeal tracks my rotating patterns and gives me actionable advice for each schedule change.", name: "Maria G., 42", image: "/images/testimonials/t-027.png" },
  { quote: "I used to wake up exhausted. xHeal found that my HRV drops dramatically on nights I eat past 9pm. Simple fix, massive difference.", name: "Jason F., 37", image: "/images/testimonials/t-028.png" },
  { quote: "My partner snores and I never realized how much it tanked my recovery until xHeal showed the correlation. Got earplugs and my numbers transformed.", name: "Rachel A., 30", image: "/images/testimonials/t-029.png" },
  { quote: "xHeal showed me that my weekend sleep-ins were actually making Monday mornings worse. Consistent schedule changed everything.", name: "Tom W., 26", image: "/images/testimonials/t-030.png" },
  { quote: "Tracking sleep alongside my medication schedule revealed that my evening dose was causing restlessness. My doctor adjusted timing and I sleep better now.", name: "Patricia E., 55", image: "/images/testimonials/t-031.png" },
  { quote: "I have sleep apnea and xHeal tracks how my CPAP usage correlates with my overall health scores. My compliance went from 60% to 95%.", name: "Greg S., 48", image: "/images/testimonials/t-032.png" },
  { quote: "xHeal connected my insomnia to specific stress patterns at work. Once I saw the weekly cycle, I could actually plan around it.", name: "Diana M., 33", image: "/images/testimonials/t-033.png" },

  // === STRESS & MENTAL HEALTH ===
  { quote: "I finally stopped juggling four different wellbeing apps. Everything I need, sleep, nutrition, energy, mood, is now in one place and actually connected.", name: "Kristiyan N., 34", image: "/images/testimonials/kristiyan.png" },
  { quote: "Simple, visual, and motivating. xHeal turns scattered medical records and data into clear insights I can act on.", name: "Jessica M., 28", image: "/images/testimonials/jessica.jpeg" },
  { quote: "Tracking symptoms was a chore until xHeal. It spots patterns I would miss and warns me before things get worse.", name: "Samantha R., 38", image: "/images/testimonials/t-034.png" },
  { quote: "My therapist and I use my xHeal mood data together in sessions. It gives us concrete patterns instead of just how I remember feeling.", name: "Alex K., 29", image: "/images/testimonials/t-035.png" },
  { quote: "xHeal showed me that my anxiety spikes happen 2 days before my period, not during it. That timing insight was everything.", name: "Hannah L., 25", image: "/images/testimonials/t-036.png" },
  { quote: "I was skeptical about mood tracking, but seeing how my stress levels connect to my HRV and sleep made it click. It's all data.", name: "Ryan T., 32", image: "/images/testimonials/t-037.png" },
  { quote: "After burnout, xHeal helped me build a recovery baseline. I can see when I'm pushing too hard before I crash again.", name: "Sophie W., 36", image: "/images/testimonials/t-038.png" },
  { quote: "Meditation wasn't working until xHeal showed me that my morning sessions lower my stress markers significantly more than evening ones.", name: "Daniel P., 40", image: "/images/testimonials/t-039.png" },
  { quote: "I track my PTSD triggers in xHeal and the pattern recognition has helped my treatment plan enormously. My psychiatrist was amazed.", name: "Michael B., 35", image: "/images/testimonials/t-040.png" },
  { quote: "Seeing the connection between my gut health and my mood was the breakthrough I needed. xHeal made the invisible visible.", name: "Laura J., 31", image: "/images/testimonials/t-041.png" },

  // === NUTRITION & DIET ===
  { quote: "xHeal showed me that my energy crashes weren't random. They mapped perfectly to meals with high glycemic index. Changed my lunch, changed my afternoons.", name: "Ben C., 34", image: "/images/testimonials/t-042.png" },
  { quote: "I've been trying elimination diets for years. xHeal finally showed me which specific foods correlate with my inflammation markers.", name: "Caroline F., 39", image: "/images/testimonials/t-043.png" },
  { quote: "My nutritionist was blown away by the report xHeal generated. She said it gave her more useful data than a month of food diaries.", name: "Steve R., 43", image: "/images/testimonials/t-044.png" },
  { quote: "Tracking supplements alongside my bloodwork is a game changer. I can actually see which ones make a measurable difference.", name: "Amy H., 30", image: "/images/testimonials/t-045.png" },
  { quote: "I'm vegan and was worried about deficiencies. xHeal connects my diet logs to my lab results so I can spot gaps early.", name: "Zoe L., 26", image: "/images/testimonials/t-046.png" },
  { quote: "xHeal helped me find the sweet spot for intermittent fasting. My 16:8 window wasn't ideal but 14:10 works perfectly for my body.", name: "Paul D., 38", image: "/images/testimonials/t-047.png" },
  { quote: "I never knew dairy was affecting my skin until xHeal correlated my food logs with my symptom tracking. Three weeks dairy-free and my skin cleared up.", name: "Mia K., 24", image: "/images/testimonials/t-048.png" },
  { quote: "As a Type 1 diabetic, seeing how different meals affect my glucose in context with sleep and stress has been revolutionary.", name: "Nathan G., 29", image: "/images/testimonials/t-049.png" },
  { quote: "xHeal caught that my iron supplements were competing with my thyroid medication absorption. Adjusted timing and both started working better.", name: "Rebecca S., 46", image: "/images/testimonials/t-050.png" },
  { quote: "Meal prep used to be guesswork. Now I plan around what xHeal shows actually works for my recovery and energy levels.", name: "Tyler M., 27", image: "/images/testimonials/t-051.png" },

  // === FITNESS & RECOVERY ===
  { quote: "I was overtraining and didn't know it. xHeal flagged that my recovery scores were declining week over week before I got injured.", name: "Jake A., 28", image: "/images/testimonials/t-052.png" },
  { quote: "As a marathon runner, xHeal gives me a complete picture: strain, recovery, sleep, nutrition. I PR'd by 12 minutes this season.", name: "Emily W., 32", image: "/images/testimonials/t-053.png" },
  { quote: "My trainer and I review my xHeal reports weekly. The data on recovery and strain has transformed how we program my workouts.", name: "Derek N., 35", image: "/images/testimonials/t-054.png" },
  { quote: "xHeal told me my body needed rest when I felt fine. I listened, and avoided the injury cycle I usually fall into every spring.", name: "Kate B., 30", image: "/images/testimonials/t-055.png" },
  { quote: "CrossFit was destroying my recovery. xHeal showed me the optimal training frequency for my body is 4 days, not 6.", name: "Brandon T., 33", image: "/images/testimonials/t-056.png" },
  { quote: "After ACL surgery, xHeal tracked my rehab progress alongside my overall health. My PT said I recovered faster than average.", name: "Jordan R., 25", image: "/images/testimonials/t-057.png" },
  { quote: "I'm 60 and started strength training. xHeal helps me train smart by monitoring my recovery between sessions. Never felt better.", name: "Carol P., 60", image: "/images/testimonials/t-058.png" },
  { quote: "The strain vs recovery balance is everything. xHeal catches when I'm doing too much before my body does.", name: "Austin F., 31", image: "/images/testimonials/t-059.png" },
  { quote: "Swimming 5x a week was too much. xHeal's recovery data convinced me to add two rest days, and my times actually improved.", name: "Lisa H., 29", image: "/images/testimonials/t-060.png" },
  { quote: "I cycle competitively and the integration with Apple Watch plus my lab work gives me an edge nobody else on my team has.", name: "Mark V., 37", image: "/images/testimonials/t-061.png" },

  // === HRV & HEART RATE ===
  { quote: "My resting heart rate trend over 6 months told a story my annual checkup never could. xHeal made the invisible visible.", name: "Andrew J., 41", image: "/images/testimonials/t-062.png" },
  { quote: "HRV was just a number until xHeal connected it to my sleep, stress, and diet. Now I understand what actually moves the needle.", name: "Stephanie L., 33", image: "/images/testimonials/t-063.png" },
  { quote: "xHeal caught an irregular heart rhythm pattern in my data and suggested I talk to my doctor. Turned out I had early-stage AFib.", name: "Richard E., 56", image: "/images/testimonials/t-064.png" },
  { quote: "Tracking HRV alongside my meditation practice showed me concrete proof that breathwork actually changes my nervous system.", name: "Yuki T., 28", image: "/images/testimonials/t-065.png" },
  { quote: "My cardiologist now asks me to bring my xHeal data to every appointment. She says it fills gaps between her tests.", name: "Frank M., 62", image: "/images/testimonials/t-066.png" },
  { quote: "I had no idea my blood pressure spikes correlated with specific work deadlines. xHeal showed the pattern across months of data.", name: "Janet W., 50", image: "/images/testimonials/t-067.png" },
  { quote: "After my heart attack, tracking recovery through xHeal gave me confidence. I could see the numbers improving week by week.", name: "George H., 59", image: "/images/testimonials/t-068.png" },
  { quote: "My HRV drops 3 days before I get sick, every single time. xHeal caught this pattern and now I can prepare.", name: "Leah K., 34", image: "/images/testimonials/t-069.png" },

  // === LAB RESULTS & BLOODWORK ===
  { quote: "Uploading lab PDFs and seeing them analyzed alongside my daily data was the moment xHeal clicked for me. Everything connected.", name: "Victor C., 39", image: "/images/testimonials/t-070.png" },
  { quote: "My doctor said my cholesterol was 'fine.' xHeal showed me the 3-year trend was heading in the wrong direction. Caught it early.", name: "Sandra B., 47", image: "/images/testimonials/t-071.png" },
  { quote: "I get labs done quarterly and xHeal tracks every marker over time. I can see exactly which interventions are working.", name: "Philip R., 44", image: "/images/testimonials/t-072.png" },
  { quote: "My Vitamin D was tanking every winter. xHeal correlated it with my mood and energy drops. Now I supplement strategically.", name: "Michelle T., 36", image: "/images/testimonials/t-073.png" },
  { quote: "xHeal flagged that my B12 levels were declining despite supplementation. My doctor discovered an absorption issue I never knew about.", name: "Diane S., 53", image: "/images/testimonials/t-074.png" },
  { quote: "Seeing my testosterone levels alongside my sleep, exercise, and stress data revealed what was actually driving the decline.", name: "Carlos A., 42", image: "/images/testimonials/t-075.png" },
  { quote: "I've done 10 blood panels in 2 years and xHeal tracks every single marker. The longitudinal view is something no doctor has time to build.", name: "Keith W., 51", image: "/images/testimonials/t-076.png" },
  { quote: "My iron was low-normal for years. xHeal connected it to my fatigue patterns and my doctor agreed it was worth treating. Life-changing.", name: "Tanya F., 32", image: "/images/testimonials/t-077.png" },

  // === MEDICAL RECORDS ===
  { quote: "I moved states and had records at 4 different hospitals. xHeal organized everything into one timeline. It took me 10 minutes.", name: "Brian D., 43", image: "/images/testimonials/t-078.png" },
  { quote: "Finding my daughter's vaccination records used to mean calling three offices. Now it's a 5-second search in xHeal.", name: "Katherine M., 38", image: "/images/testimonials/t-079.png" },
  { quote: "After 20 years of medical history, having everything organized chronologically and searchable is incredible. I wish I had this decades ago.", name: "Harold N., 67", image: "/images/testimonials/t-080.png" },
  { quote: "My primary care doctor retired and transferring records was a nightmare. xHeal already had everything. Seamless transition to my new doctor.", name: "Wendy J., 49", image: "/images/testimonials/t-081.png" },
  { quote: "Emergency room visits are less stressful now. I pull up my full medical history, allergies, and medications in seconds.", name: "Troy L., 35", image: "/images/testimonials/t-082.png" },
  { quote: "I imported records from MyChart and added my old paper records by taking photos. Everything lives in one searchable timeline now.", name: "Pamela R., 54", image: "/images/testimonials/t-083.png" },
  { quote: "Coordinating between my oncologist, GP, and cardiologist was chaos until xHeal gave all of them the same complete picture.", name: "Eugene T., 61", image: "/images/testimonials/t-084.png" },
  { quote: "I photograph every lab slip, prescription, and doctor's note. xHeal organizes it all automatically. No more filing cabinets.", name: "Dorothy A., 70", image: "/images/testimonials/t-085.png" },

  // === DOCTOR VISITS & REPORTS ===
  { quote: "Walked into my gastro appointment with a 6-month report from xHeal. He spent less time asking questions and more time actually helping.", name: "Allen S., 40", image: "/images/testimonials/t-086.png" },
  { quote: "My new doctor said my xHeal report was the best new patient summary she'd ever received. Cut our first appointment time in half.", name: "Cheryl B., 45", image: "/images/testimonials/t-087.png" },
  { quote: "Getting my trainer and nutritionist on the same page was impossible. Now I generate reports tailored to each of them.", name: "Justin H., 30", image: "/images/testimonials/t-088.png" },
  { quote: "My pediatrician loves the reports I bring for my kids. She says most parents can barely remember the last fever, let alone track patterns.", name: "Monica L., 36", image: "/images/testimonials/t-089.png" },
  { quote: "Before xHeal, I forgot half of what I wanted to tell my doctor. Now the data speaks for me and nothing gets missed.", name: "Roger P., 57", image: "/images/testimonials/t-090.png" },
  { quote: "My functional medicine doctor said my xHeal report saved us two months of intake assessments. We jumped straight to treatment.", name: "Claire V., 41", image: "/images/testimonials/t-091.png" },
  { quote: "I have 4 specialists. Each one only sees their slice. xHeal gives me and them the full picture for the first time.", name: "Arthur G., 55", image: "/images/testimonials/t-092.png" },
  { quote: "The specialist report format is perfect. Clinical enough for doctors to take seriously, clear enough for me to understand.", name: "Nina D., 33", image: "/images/testimonials/t-093.png" },

  // === WEARABLE INTEGRATION ===
  { quote: "My Apple Watch data was useless until xHeal gave it context. Steps and heart rate mean nothing without the bigger picture.", name: "Ian C., 31", image: "/images/testimonials/t-094.png" },
  { quote: "Syncing Apple Health took 30 seconds and suddenly 2 years of data became useful. xHeal turned noise into signal.", name: "Brittany S., 27", image: "/images/testimonials/t-095.png" },
  { quote: "I was drowning in health data from my watch, scale, and ring. xHeal is the only thing that connects all of it into something actionable.", name: "Peter M., 36", image: "/images/testimonials/t-096.png" },
  { quote: "The blood oxygen data from my Apple Watch finally makes sense. xHeal correlates it with my sleep stages and altitude changes.", name: "Heather F., 34", image: "/images/testimonials/t-097.png" },
  { quote: "I switched from WHOOP to Apple Watch because xHeal gives me everything WHOOP did plus my medical records and labs.", name: "Evan T., 29", image: "/images/testimonials/t-098.png" },
  { quote: "My watch tracks movement but xHeal tracks meaning. There's a difference between counting steps and understanding health.", name: "Gina W., 40", image: "/images/testimonials/t-099.png" },
  { quote: "Body composition data from my smart scale plus Apple Watch plus labs. xHeal connects all three and the trends are fascinating.", name: "Matt R., 35", image: "/images/testimonials/t-100.png" },
  { quote: "xHeal makes my Apple Watch investment worth it. Before, I'd check my heart rate and shrug. Now every data point means something.", name: "Anna P., 32", image: "/images/testimonials/t-101.png" },

  // === FLARE-UP DETECTION ===
  { quote: "xHeal predicted my last three IBS flares 48 hours in advance. I adjusted my diet each time and two of the three never fully hit.", name: "Larry K., 38", image: "/images/testimonials/t-102.png" },
  { quote: "My eczema flares up in patterns I could never see. xHeal found the connection to humidity and specific food combinations.", name: "Christina H., 27", image: "/images/testimonials/t-103.png" },
  { quote: "Migraine prediction is the killer feature for me. xHeal catches the HRV and sleep pattern that precedes my migraines by 36 hours.", name: "Deborah W., 44", image: "/images/testimonials/t-104.png" },
  { quote: "My asthma attacks correlate with air quality and my stress levels. xHeal showed me both triggers matter, not just one.", name: "Oscar L., 33", image: "/images/testimonials/t-105.png" },
  { quote: "Gout attacks used to blindside me. xHeal connected them to dehydration and specific protein intake patterns. Prevention beats treatment.", name: "Howard J., 52", image: "/images/testimonials/t-106.png" },
  { quote: "My psoriasis flares when I'm stressed AND sleeping poorly. Not one or the other, both. xHeal found the combination trigger.", name: "Valerie C., 35", image: "/images/testimonials/t-107.png" },
  { quote: "Endometriosis pain follows a pattern that goes beyond my cycle. xHeal found correlations with inflammation markers and exercise intensity.", name: "Isabel R., 30", image: "/images/testimonials/t-108.png" },
  { quote: "My allergies aren't just seasonal. xHeal showed they spike with specific weather pressure changes combined with poor sleep. Now I prepare.", name: "Dennis M., 41", image: "/images/testimonials/t-109.png" },

  // === MEDICATION & SUPPLEMENT TRACKING ===
  { quote: "Tracking 7 daily medications used to be a spreadsheet nightmare. xHeal logs everything and shows me how each one affects my markers.", name: "Gloria E., 58", image: "/images/testimonials/t-110.png" },
  { quote: "I started a new antidepressant and xHeal tracked my sleep, mood, and energy through the transition. Showed my doctor exactly how I responded.", name: "Wesley F., 34", image: "/images/testimonials/t-111.png" },
  { quote: "My supplement stack was expensive and I had no idea what was working. xHeal helped me cut 4 supplements and keep the 3 that actually moved my labs.", name: "Dana K., 37", image: "/images/testimonials/t-112.png" },
  { quote: "Medication interactions were a worry. xHeal tracks timing and gives me context on how everything plays together with my health data.", name: "Ruth M., 63", image: "/images/testimonials/t-113.png" },
  { quote: "Switching blood pressure medications was scary. xHeal tracked every vital during the transition so I felt in control.", name: "Stanley W., 54", image: "/images/testimonials/t-114.png" },
  { quote: "I take biologics for my RA and xHeal tracks my inflammation markers between infusions. I can see exactly when the medication starts wearing off.", name: "Theresa B., 47", image: "/images/testimonials/t-115.png" },
  { quote: "My probiotic experiment finally has data. xHeal showed which strains correlated with better digestion scores over 3 months.", name: "Craig A., 31", image: "/images/testimonials/t-116.png" },
  { quote: "Magnesium timing matters. xHeal proved that taking it at night vs morning makes a measurable difference in my sleep quality.", name: "Kelly N., 29", image: "/images/testimonials/t-117.png" },

  // === HEALTH AWARENESS SCORE ===
  { quote: "My health awareness score dropped from 78 to 62 and I had no idea why. xHeal pinpointed it to my sleep quality declining over two weeks.", name: "Adrian V., 36", image: "/images/testimonials/t-118.png" },
  { quote: "Going from a 55 to an 82 health score in 4 months felt incredible. Having a single number to track kept me motivated every day.", name: "Tamara S., 30", image: "/images/testimonials/t-119.png" },
  { quote: "I compete with myself every week. Seeing my health awareness score trend upward is more motivating than any fitness challenge.", name: "Douglas R., 42", image: "/images/testimonials/t-120.png" },
  { quote: "The 0-100 score cuts through the noise. I don't need to understand every metric, I just need to know if I'm getting better or worse.", name: "Eileen T., 48", image: "/images/testimonials/t-121.png" },
  { quote: "My score revealed that I was strong in fitness but terrible in stress management. That targeted insight was worth more than a gym membership.", name: "Vincent P., 33", image: "/images/testimonials/t-122.png" },
  { quote: "I showed my wife her health awareness score of 45 and she finally took her sleep issues seriously. Sometimes you need a number to motivate action.", name: "Jerome D., 39", image: "/images/testimonials/t-123.png" },
  { quote: "xHeal's score breaks down into domains so I know exactly where to focus. Nutrition was my weak link and I never would have guessed.", name: "Sharon F., 44", image: "/images/testimonials/t-124.png" },
  { quote: "Watching my score climb after each lifestyle change gives me proof that small habits add up. Data-driven motivation works.", name: "Noah B., 25", image: "/images/testimonials/t-125.png" },

  // === DIGITAL TWIN & AI CHAT ===
  { quote: "I asked my Digital Twin why I felt tired after 8 hours of sleep. It connected my HRV data to my late dinner timing. Mind blown.", name: "Chloe L., 27", image: "/images/testimonials/t-126.png" },
  { quote: "Asking xHeal 'why do I feel worse on Mondays' and getting a data-backed answer was the most sci-fi health experience I've ever had.", name: "Blake R., 32", image: "/images/testimonials/t-127.png" },
  { quote: "My Digital Twin knows me better than any single doctor because it has all my data in one place. That's not an exaggeration.", name: "Fiona C., 35", image: "/images/testimonials/t-128.png" },
  { quote: "I asked about my vitamin D trend and got an answer that referenced my last 3 lab panels and my sun exposure data. Incredible.", name: "Gavin M., 40", image: "/images/testimonials/t-129.png" },
  { quote: "The AI chat doesn't just answer, it explains the reasoning. WHO guidelines, my personal data, everything cited. It's like having a medical advisor.", name: "Irene J., 46", image: "/images/testimonials/t-130.png" },
  { quote: "I asked xHeal what to focus on before my annual physical. It generated a list of questions for my doctor based on my actual trends.", name: "Derek H., 38", image: "/images/testimonials/t-131.png" },
  { quote: "My kids ask me health questions I can't answer. Now I ask my Digital Twin and get answers grounded in real medical standards.", name: "Natalie S., 41", image: "/images/testimonials/t-132.png" },
  { quote: "The fact that xHeal uses WHO and ADA guidelines makes me trust the answers. It's not random internet advice, it's clinical reasoning on my data.", name: "Oscar W., 50", image: "/images/testimonials/t-133.png" },

  // === FAMILY HEALTH ===
  { quote: "Managing my family of five in xHeal means I never miss a vaccination date, a medication refill, or a concerning trend.", name: "Melissa A., 37", image: "/images/testimonials/t-134.png" },
  { quote: "My aging parents live in another state. xHeal helps me track their health data and flag when something looks off.", name: "Scott K., 44", image: "/images/testimonials/t-135.png" },
  { quote: "My teenager's mood swings turned out to correlate with poor sleep and skipping breakfast. xHeal gave us the data to have a real conversation.", name: "Brenda N., 42", image: "/images/testimonials/t-136.png" },
  { quote: "My husband never tracked anything until I showed him his health score. Now he checks it every morning. Competitive people need numbers.", name: "Yolanda R., 35", image: "/images/testimonials/t-137.png" },
  { quote: "As a caregiver for my mom with Alzheimer's, tracking her medications, appointments, and health trends in one place is a lifesaver.", name: "Henry C., 52", image: "/images/testimonials/t-138.png" },
  { quote: "My family has a history of heart disease. xHeal tracks my cardiac markers alongside my lifestyle data so I can break the pattern.", name: "Louise W., 38", image: "/images/testimonials/t-139.png" },
  { quote: "I manage my own health and my elderly father's through xHeal. Generating reports for his doctors saves us hours every month.", name: "Raymond G., 45", image: "/images/testimonials/t-140.png" },
  { quote: "My wife and I both use xHeal and compare notes. She sleeps better, I eat better, and we're both healthier for it.", name: "Charles F., 40", image: "/images/testimonials/t-141.png" },

  // === GENERAL WELLNESS & BIOHACKING ===
  { quote: "I'm not sick, just curious. xHeal satisfies my data obsession and has actually improved my baseline health in ways I didn't expect.", name: "Liam O., 26", image: "/images/testimonials/t-142.png" },
  { quote: "As a biohacker, xHeal replaced 6 different tracking apps. One platform that connects everything is infinitely better than siloed data.", name: "Trevor Y., 30", image: "/images/testimonials/t-143.png" },
  { quote: "I wanted to optimize my productivity and it turns out health is the foundation. xHeal showed me the connection between HRV and my best work days.", name: "Grace H., 28", image: "/images/testimonials/t-144.png" },
  { quote: "Cold plunge, sauna, breathwork. I track them all in xHeal and can finally see which protocols actually move my health markers.", name: "Max B., 33", image: "/images/testimonials/t-145.png" },
  { quote: "I'm a nurse and I use xHeal for my own health. The clinical reasoning is legitimate and I recommend it to patients constantly.", name: "Pamela T., 35", image: "/images/testimonials/t-146.png" },
  { quote: "At 72, I'm in better shape than at 62 because xHeal gives me actionable data every single day. Age is just a number when you have good data.", name: "William E., 72", image: "/images/testimonials/t-147.png" },
  { quote: "Pregnancy tracking with xHeal was phenomenal. Every symptom, every lab, every vital, all in context with my full health history.", name: "Amanda K., 31", image: "/images/testimonials/t-148.png" },
  { quote: "Post-COVID recovery was a mystery until xHeal tracked my HRV, sleep, and energy patterns. I could see the slow climb back to baseline.", name: "Jeffrey L., 39", image: "/images/testimonials/t-149.png" },
  { quote: "I used to Google symptoms and panic. Now I ask my Digital Twin and get answers based on MY data, not worst-case internet scenarios.", name: "Vanessa D., 29", image: "/images/testimonials/t-150.png" },
  { quote: "xHeal is the first health app that treats me like a whole person, not just a step counter or a calorie tracker. Everything is connected.", name: "Russell M., 43", image: "/images/testimonials/t-151.png" },
  { quote: "I travel constantly for work and my health used to suffer. xHeal tracks the impact of time zones, jet lag, and irregular meals on my recovery.", name: "Simon J., 37", image: "/images/testimonials/t-152.png" },
  { quote: "My genetics report said I was at risk for heart disease. xHeal connects that genetic data with my daily habits so I can actually act on it.", name: "Audrey P., 34", image: "/images/testimonials/t-153.png" },
  { quote: "As a yoga instructor, I thought I was healthy. xHeal showed me my nutrition was lacking and my sleep quality was worse than my students'.", name: "Jasmine W., 30", image: "/images/testimonials/t-154.png" },
  { quote: "Tracking my cortisol alongside my daily stress logs revealed a pattern my doctor missed for years. xHeal connected what no one else could.", name: "Patrick H., 46", image: "/images/testimonials/t-155.png" },
  { quote: "I run a startup and my health was the last priority. xHeal's daily actions take 5 minutes and have improved every metric I track.", name: "Naomi F., 32", image: "/images/testimonials/t-156.png" },
  { quote: "Post-menopause, my body changed completely. xHeal tracks how my new normal differs from before and helps me adapt instead of guess.", name: "Barbara L., 56", image: "/images/testimonials/t-157.png" },
  { quote: "I donated a kidney last year. Tracking my remaining kidney function alongside my overall health gives me peace of mind nothing else can.", name: "Kenneth D., 48", image: "/images/testimonials/t-158.png" },
];

const testimonialsBg: Testimonial[] = [
  // === ХРОНИЧНИ ЗАБОЛЯВАНИЯ ===
  { quote: "Когато HRV ми спадна, xHeal ме предупреди рано, че идва възпалително обостряне. Няколко дни по-късно лабораторните ми резултати го потвърдиха. xHeal го видя преди да го усетя.", name: "Trifon G., 33", image: "/images/testimonials/trifon.jpg" },
  { quote: "Намалих наполовина обострянията, свързани с инсулинова резистентност, като най-накрая разбрах какво ги предизвиква. xHeal превърна опитите и грешките в превенция.", name: "James P., 45", image: "/images/testimonials/james.jpeg" },
  { quote: "Животът с болестта на Крон означаваше постоянно гадаене. Сега знам точно кои храни и стресови модели предизвикват симптомите ми, преди да ескалират.", name: "Maya R., 29", image: "/images/testimonials/t-015.png" },
  { quote: "Ревматологът ми беше истински впечатлена, когато \u0438 показах доклада от xHeal. Каза, че е най-пълната пациентска история, която някога е виждала.", name: "Linda C., 52", image: "/images/testimonials/t-016.png" },
  { quote: "Управлението на диабет тип 2 с xHeal промени всичко. Мога да видя как сънят, храненията и стресът се свързват с тенденциите на глюкозата ми.", name: "Robert K., 58", image: "/images/testimonials/t-017.png" },
  { quote: "След години с фибромиалгия, най-накрая имам доказателство за модели, които лекарите ми не можеха да видят. xHeal откри връзката между атмосферното налягане и най-лошите ми дни.", name: "Sarah M., 38", image: "/images/testimonials/t-159.png" },
  { quote: "Нивата на щитовидната ми жлеза непрекъснато колебаеха и никой не можеше да обясни защо. xHeal проследи всичко и разкри, че времето за приемане на добавките ми беше грешно.", name: "Nicole W., 41", image: "/images/testimonials/t-018.png" },
  { quote: "Управлението на PCOS стана много по-просто, когато можех да виждам хормоналните си модели заедно с данните за сън, стрес и хранене на едно място.", name: "Priya S., 27", image: "/images/testimonials/t-019.png" },
  { quote: "Имам МС и само предсказването на обостряния си заслужава. xHeal улови модел между качеството на съня и тежестта на симптомите, който пропусках с години.", name: "David L., 44", image: "/images/testimonials/t-020.png" },
  { quote: "Лупусът прави всеки ден непредсказуем. xHeal ми помага да видя какво идва, като свързва лабораторните резултати, съня и стреса в една ясна картина.", name: "Angela T., 36", image: "/images/testimonials/t-021.png" },
  { quote: "Ендокринологът ми започна да пита какво приложение използвам, защото проследяването на лабораторните ми резултати беше толкова задълбочено. Това беше победа.", name: "Marcus J., 49", image: "/images/testimonials/t-022.png" },
  { quote: "Хашимото и тревожността заедно са жестоки. xHeal ми показа, че най-лошите ми дни с тревожност корелират с конкретни колебания на щитовидната жлеза.", name: "Emma B., 34", image: "/images/testimonials/t-023.png" },

  // === ОПТИМИЗАЦИЯ НА СЪНЯ ===
  { quote: "Мислех, че спя добре, докато xHeal не ми показа, че дълбокият ми сън е почти нулев. Промених вечерната си рутина и спечелих допълнителен час качествена почивка.", name: "Kevin H., 31", image: "/images/testimonials/t-024.png" },
  { quote: "xHeal свърза лошите ми нощи на сън с навика ми за следобедно кафе. Звучи очевидно, но виждането на данните го направи реално.", name: "Olivia N., 28", image: "/images/testimonials/t-025.png" },
  { quote: "Резултатът ми за сън се подобри с 30 точки, след като xHeal идентифицира, че нощното време пред екран е най-големият ми нарушител.", name: "Chris D., 35", image: "/images/testimonials/t-026.png" },
  { quote: "Като работещ на смени, сънят е всичко. xHeal проследява ротационните ми модели и ми дава приложими съвети за всяка промяна в графика.", name: "Maria G., 42", image: "/images/testimonials/t-027.png" },
  { quote: "Събуждах се изтощен. xHeal откри, че HRV ми спада драматично в нощите, когато ям след 21ч. Просто решение, огромна разлика.", name: "Jason F., 37", image: "/images/testimonials/t-028.png" },
  { quote: "Партньорът ми хърка и никога не осъзнавах колко се отразява на възстановяването ми, докато xHeal не показа корелацията.", name: "Rachel A., 30", image: "/images/testimonials/t-029.png" },
  { quote: "xHeal ми показа, че съботно-неделните ми дълги сънища всъщност правят понеделник сутрин по-лоши. Постоянният график промени всичко.", name: "Tom W., 26", image: "/images/testimonials/t-030.png" },
  { quote: "Проследяването на съня заедно с графика на медикаментите разкри, че вечерната ми доза причинява неспокойствие. Лекарят ми коригира времето.", name: "Patricia E., 55", image: "/images/testimonials/t-031.png" },
  { quote: "Имам сънна апнея и xHeal проследява как използването на CPAP корелира с общите ми здравни показатели. Спазването ми скочи от 60% на 95%.", name: "Greg S., 48", image: "/images/testimonials/t-032.png" },
  { quote: "xHeal свърза безсънието ми с конкретни стресови модели на работа. Щом видях седмичния цикъл, можех наистина да планирам около него.", name: "Diana M., 33", image: "/images/testimonials/t-033.png" },

  // === СТРЕС И ПСИХИЧНО ЗДРАВЕ ===
  { quote: "Най-накрая спрях да жонглирам с четири различни уелнес приложения. Всичко, от което се нуждая \u2013 сън, хранене, енергия, настроение \u2013 е на едно място и наистина свързано.", name: "Kristiyan N., 34", image: "/images/testimonials/kristiyan.png" },
  { quote: "Просто, визуално и мотивиращо. xHeal превръща разпръснати медицински записи и данни в ясни прозрения, по които мога да действам.", name: "Jessica M., 28", image: "/images/testimonials/jessica.jpeg" },
  { quote: "Проследяването на симптоми беше досадно до xHeal. Той забелязва модели, които бих пропуснала, и ме предупреждава преди нещата да се влошат.", name: "Samantha R., 38", image: "/images/testimonials/t-034.png" },
  { quote: "Терапевтът ми и аз използваме данните за настроението от xHeal заедно в сесиите. Дава ни конкретни модели вместо само как си спомням, че съм се чувствал.", name: "Alex K., 29", image: "/images/testimonials/t-035.png" },
  { quote: "xHeal ми показа, че тревожността ми скача 2 дни преди менструацията, а не по време на нея. Това прозрение за времето беше всичко.", name: "Hannah L., 25", image: "/images/testimonials/t-036.png" },
  { quote: "Бях скептичен относно проследяването на настроението, но виждането как нивата на стрес се свързват с HRV и съня го направи ясно. Всичко е данни.", name: "Ryan T., 32", image: "/images/testimonials/t-037.png" },
  { quote: "След бърнаут, xHeal ми помогна да изградя базова линия за възстановяване. Мога да видя кога натискам прекалено, преди отново да се сринa.", name: "Sophie W., 36", image: "/images/testimonials/t-038.png" },
  { quote: "Медитацията не работеше, докато xHeal не ми показа, че сутрешните ми сесии намаляват стресовите маркери значително повече от вечерните.", name: "Daniel P., 40", image: "/images/testimonials/t-039.png" },
  { quote: "Проследявам тригерите за ПТСС в xHeal и разпознаването на модели помогна изключително много на плана ми за лечение. Психиатърът ми беше поразен.", name: "Michael B., 35", image: "/images/testimonials/t-040.png" },
  { quote: "Виждането на връзката между чревното ми здраве и настроението беше пробивът, от който се нуждаех. xHeal направи невидимото видимо.", name: "Laura J., 31", image: "/images/testimonials/t-041.png" },

  // === ХРАНЕНЕ И ДИЕТА ===
  { quote: "xHeal ми показа, че енергийните ми сривове не бяха случайни. Картографираха се перфектно с храни с висок гликемичен индекс. Промених обяда си, промених следобедите си.", name: "Ben C., 34", image: "/images/testimonials/t-042.png" },
  { quote: "Опитвам елиминационни диети от години. xHeal най-накрая ми показа кои конкретни храни корелират с маркерите ми за възпаление.", name: "Caroline F., 39", image: "/images/testimonials/t-043.png" },
  { quote: "Нутриционистката ми беше поразена от доклада, генериран от xHeal. Каза, че \u0438 е дал повече полезни данни от месец хранителни дневници.", name: "Steve R., 43", image: "/images/testimonials/t-044.png" },
  { quote: "Проследяването на добавки заедно с кръвните изследвания е революционно. Мога реално да видя кои правят измерима разлика.", name: "Amy H., 30", image: "/images/testimonials/t-045.png" },
  { quote: "Веган съм и се притеснявах от дефицити. xHeal свързва хранителните ми дневници с лабораторните резултати, за да мога да забележа пропуски рано.", name: "Zoe L., 26", image: "/images/testimonials/t-046.png" },
  { quote: "xHeal ми помогна да намеря идеалния прозорец за интермитентно гладуване. 16:8 не беше идеален, но 14:10 работи перфектно за тялото ми.", name: "Paul D., 38", image: "/images/testimonials/t-047.png" },
  { quote: "Не знаех, че млечните продукти влияят на кожата ми, докато xHeal не корелира хранителните ми дневници с проследяването на симптомите. Три седмици без млечно и кожата ми се изчисти.", name: "Mia K., 24", image: "/images/testimonials/t-048.png" },
  { quote: "Като диабетик тип 1, виждането как различните хранения влияят на глюкозата в контекста на сън и стрес беше революционно.", name: "Nathan G., 29", image: "/images/testimonials/t-049.png" },
  { quote: "xHeal улови, че добавките ми с желязо се конкурираха с абсорбцията на лекарството за щитовидната жлеза. Коригирах времето и двете започнаха да работят по-добре.", name: "Rebecca S., 46", image: "/images/testimonials/t-050.png" },
  { quote: "Подготовката на хранения беше гадаене. Сега планирам около това, което xHeal показва, че наистина работи за възстановяването и енергията ми.", name: "Tyler M., 27", image: "/images/testimonials/t-051.png" },

  // === ФИТНЕС И ВЪЗСТАНОВЯВАНЕ ===
  { quote: "Претренирвах и не знаех. xHeal сигнализира, че резултатите ми за възстановяване спадат седмица след седмица, преди да се контузя.", name: "Jake A., 28", image: "/images/testimonials/t-052.png" },
  { quote: "Като маратонски бегач, xHeal ми дава пълната картина: натоварване, възстановяване, сън, хранене. Подобрих личния си рекорд с 12 минути този сезон.", name: "Emily W., 32", image: "/images/testimonials/t-053.png" },
  { quote: "Треньорът ми и аз преглеждаме докладите от xHeal всяка седмица. Данните за възстановяване и натоварване трансформираха начина, по който програмираме тренировките ми.", name: "Derek N., 35", image: "/images/testimonials/t-054.png" },
  { quote: "xHeal ми каза, че тялото ми се нуждае от почивка, когато се чувствах добре. Послушах и избегнах цикъла на контузии, в който обикновено попадам всяка пролет.", name: "Kate B., 30", image: "/images/testimonials/t-055.png" },
  { quote: "CrossFit унищожаваше възстановяването ми. xHeal ми показа, че оптималната честота на тренировки за тялото ми е 4 дни, а не 6.", name: "Brandon T., 33", image: "/images/testimonials/t-056.png" },
  { quote: "След операция на кръстната връзка, xHeal проследяваше рехабилитацията ми заедно с цялостното ми здраве. Физиотерапевтът ми каза, че съм се възстановил по-бързо от средното.", name: "Jordan R., 25", image: "/images/testimonials/t-057.png" },
  { quote: "На 60 съм и започнах силови тренировки. xHeal ми помага да тренирам интелигентно, като следи възстановяването между сесиите. Никога не съм се чувствала по-добре.", name: "Carol P., 60", image: "/images/testimonials/t-058.png" },
  { quote: "Балансът натоварване срещу възстановяване е всичко. xHeal улавя кога правя прекалено много, преди тялото ми да го направи.", name: "Austin F., 31", image: "/images/testimonials/t-059.png" },
  { quote: "Плуване 5 пъти седмично беше прекалено. Данните за възстановяване от xHeal ме убедиха да добавя два почивни дни и времената ми реално се подобриха.", name: "Lisa H., 29", image: "/images/testimonials/t-060.png" },
  { quote: "Карам колело състезателно и интеграцията с Apple Watch плюс лабораторните ми изследвания ми дава предимство, което никой друг в отбора ми няма.", name: "Mark V., 37", image: "/images/testimonials/t-061.png" },

  // === HRV И СЪРДЕЧНА ЧЕСТОТА ===
  { quote: "Тенденцията на сърдечната ми честота в покой за 6 месеца разказа история, която годишният ми преглед никога не можеше. xHeal направи невидимото видимо.", name: "Andrew J., 41", image: "/images/testimonials/t-062.png" },
  { quote: "HRV беше просто число, докато xHeal не го свърза със съня, стреса и диетата ми. Сега разбирам какво наистина движи нещата.", name: "Stephanie L., 33", image: "/images/testimonials/t-063.png" },
  { quote: "xHeal улови нередовен модел на сърдечния ритъм в данните ми и предложи да говоря с лекаря си. Оказа се, че имам начален стадий на предсърдно мъждене.", name: "Richard E., 56", image: "/images/testimonials/t-064.png" },
  { quote: "Проследяването на HRV заедно с практиката ми по медитация ми показа конкретно доказателство, че дихателните упражнения наистина променят нервната ми система.", name: "Yuki T., 28", image: "/images/testimonials/t-065.png" },
  { quote: "Кардиологът ми сега ме моли да нося данните от xHeal на всеки преглед. Казва, че запълват пропуските между нейните тестове.", name: "Frank M., 62", image: "/images/testimonials/t-066.png" },
  { quote: "Нямах представа, че скоковете на кръвното ми налягане корелират с конкретни работни крайни срокове. xHeal показа модела за месеци данни.", name: "Janet W., 50", image: "/images/testimonials/t-067.png" },
  { quote: "След инфаркта, проследяването на възстановяването чрез xHeal ми даде увереност. Можех да видя числата да се подобряват седмица след седмица.", name: "George H., 59", image: "/images/testimonials/t-068.png" },
  { quote: "HRV ми спада 3 дни преди да се разболея, всеки път. xHeal улови този модел и сега мога да се подготвя.", name: "Leah K., 34", image: "/images/testimonials/t-069.png" },

  // === ЛАБОРАТОРНИ РЕЗУЛТАТИ ===
  { quote: "Качването на PDF с лабораторни резултати и виждането им анализирани заедно с ежедневните ми данни беше моментът, в който xHeal наистина проработи за мен.", name: "Victor C., 39", image: "/images/testimonials/t-070.png" },
  { quote: "Лекарят ми каза, че холестеролът ми е \u201Eдобре\u201C. xHeal ми показа, че 3-годишната тенденция вървеше в грешна посока. Уловихме го рано.", name: "Sandra B., 47", image: "/images/testimonials/t-071.png" },
  { quote: "Правя лабораторни изследвания на тримесечие и xHeal проследява всеки маркер с течение на времето. Мога да видя точно кои интервенции работят.", name: "Philip R., 44", image: "/images/testimonials/t-072.png" },
  { quote: "Витамин D ми спадаше всяка зима. xHeal го корелира с настроението и спада на енергията ми. Сега приемам добавки стратегически.", name: "Michelle T., 36", image: "/images/testimonials/t-073.png" },
  { quote: "xHeal сигнализира, че нивата на B12 спадат въпреки приема на добавки. Лекарят ми откри проблем с абсорбцията, за който не знаех.", name: "Diane S., 53", image: "/images/testimonials/t-074.png" },
  { quote: "Виждането на нивата на тестостерона заедно с данните за сън, упражнения и стрес разкри какво наистина стои зад спада.", name: "Carlos A., 42", image: "/images/testimonials/t-075.png" },
  { quote: "Направих 10 кръвни панела за 2 години и xHeal проследява всеки маркер. Дългосрочният поглед е нещо, за което нито един лекар няма време.", name: "Keith W., 51", image: "/images/testimonials/t-076.png" },
  { quote: "Желязото ми беше ниско-нормално с години. xHeal го свърза с моделите на умората ми и лекарят ми се съгласи, че си заслужава да се лекува. Промени живота ми.", name: "Tanya F., 32", image: "/images/testimonials/t-077.png" },

  // === МЕДИЦИНСКИ ЗАПИСИ ===
  { quote: "Преместих се в друг щат и имах записи в 4 различни болници. xHeal организира всичко в една хронология. Отне ми 10 минути.", name: "Brian D., 43", image: "/images/testimonials/t-078.png" },
  { quote: "Намирането на ваксинационните записи на дъщеря ми означаваше обаждане до три кабинета. Сега е 5-секундно търсене в xHeal.", name: "Katherine M., 38", image: "/images/testimonials/t-079.png" },
  { quote: "След 20 години медицинска история, да имаш всичко организирано хронологично и с търсене е невероятно. Жалко, че нямах това преди десетилетия.", name: "Harold N., 67", image: "/images/testimonials/t-080.png" },
  { quote: "Личният ми лекар се пенсионира и прехвърлянето на записи беше кошмар. xHeal вече имаше всичко. Безпроблемен преход към новия ми лекар.", name: "Wendy J., 49", image: "/images/testimonials/t-081.png" },
  { quote: "Посещенията в спешното са по-малко стресиращи сега. Извличам пълната си медицинска история, алергии и медикаменти за секунди.", name: "Troy L., 35", image: "/images/testimonials/t-082.png" },
  { quote: "Импортирах записи от MyChart и добавих старите си хартиени записи, като ги снимах. Всичко живее в една хронология с търсене сега.", name: "Pamela R., 54", image: "/images/testimonials/t-083.png" },
  { quote: "Координацията между онколога, личния лекар и кардиолога беше хаос, докато xHeal не даде на всички тях една и съща пълна картина.", name: "Eugene T., 61", image: "/images/testimonials/t-084.png" },
  { quote: "Снимам всеки лабораторен бон, рецепта и бележка от лекар. xHeal организира всичко автоматично. Без повече картотеки.", name: "Dorothy A., 70", image: "/images/testimonials/t-085.png" },

  // === ПРЕГЛЕДИ И ДОКЛАДИ ===
  { quote: "Влязох на прегледа при гастроентеролога с 6-месечен доклад от xHeal. Той прекара по-малко време в задаване на въпроси и повече в реална помощ.", name: "Allen S., 40", image: "/images/testimonials/t-086.png" },
  { quote: "Новата ми лекарка каза, че докладът ми от xHeal е най-доброто резюме на нов пациент, което някога е получавала.", name: "Cheryl B., 45", image: "/images/testimonials/t-087.png" },
  { quote: "Синхронизирането на треньора и нутриционистката беше невъзможно. Сега генерирам доклади, съобразени с всеки от тях.", name: "Justin H., 30", image: "/images/testimonials/t-088.png" },
  { quote: "Педиатърката обожава докладите, които нося за децата. Казва, че повечето родители едва помнят последната температура, камо ли да проследяват модели.", name: "Monica L., 36", image: "/images/testimonials/t-089.png" },
  { quote: "Преди xHeal забравях половината неща, които исках да кажа на лекаря. Сега данните говорят вместо мен и нищо не се пропуска.", name: "Roger P., 57", image: "/images/testimonials/t-090.png" },
  { quote: "Лекарят ми по функционална медицина каза, че докладът от xHeal ни спести два месеца начални оценки. Преминахме директно към лечение.", name: "Claire V., 41", image: "/images/testimonials/t-091.png" },
  { quote: "Имам 4 специалисти. Всеки вижда само своята част. xHeal дава на мен и на тях пълната картина за първи път.", name: "Arthur G., 55", image: "/images/testimonials/t-092.png" },
  { quote: "Форматът на доклада за специалисти е перфектен. Достатъчно клиничен, за да бъде взет насериозно от лекарите, и достатъчно ясен, за да го разбера аз.", name: "Nina D., 33", image: "/images/testimonials/t-093.png" },

  // === ИНТЕГРАЦИЯ С НОСИМИ УСТРОЙСТВА ===
  { quote: "Данните от Apple Watch бяха безполезни, докато xHeal не им даде контекст. Стъпките и сърдечната честота не означават нищо без по-голямата картина.", name: "Ian C., 31", image: "/images/testimonials/t-094.png" },
  { quote: "Синхронизирането с Apple Health отне 30 секунди и изведнъж 2 години данни станаха полезни. xHeal превърна шума в сигнал.", name: "Brittany S., 27", image: "/images/testimonials/t-095.png" },
  { quote: "Давех се в здравни данни от часовника, кантара и пръстена. xHeal е единственото нещо, което свързва всичко в нещо приложимо.", name: "Peter M., 36", image: "/images/testimonials/t-096.png" },
  { quote: "Данните за кръвен кислород от Apple Watch най-накрая имат смисъл. xHeal ги корелира с фазите на съня и промените в надморската височина.", name: "Heather F., 34", image: "/images/testimonials/t-097.png" },
  { quote: "Преминах от WHOOP към Apple Watch, защото xHeal ми дава всичко, което WHOOP даваше, плюс медицинските ми записи и лабораторни резултати.", name: "Evan T., 29", image: "/images/testimonials/t-098.png" },
  { quote: "Часовникът ми проследява движение, но xHeal проследява значение. Има разлика между броене на стъпки и разбиране на здравето.", name: "Gina W., 40", image: "/images/testimonials/t-099.png" },
  { quote: "Данни за телесен състав от интелигентния кантар плюс Apple Watch плюс лабораторни изследвания. xHeal свързва и трите и тенденциите са завладяващи.", name: "Matt R., 35", image: "/images/testimonials/t-100.png" },
  { quote: "xHeal прави инвестицията в Apple Watch да си заслужава. Преди проверявах сърдечната честота и свивах рамене. Сега всяка точка данни означава нещо.", name: "Anna P., 32", image: "/images/testimonials/t-101.png" },

  // === РАЗПОЗНАВАНЕ НА ОБОСТРЯНИЯ ===
  { quote: "xHeal предсказа последните ми три IBS обостряния 48 часа предварително. Коригирах диетата всеки път и две от трите никога не се проявиха напълно.", name: "Larry K., 38", image: "/images/testimonials/t-102.png" },
  { quote: "Екземата ми се обостря в модели, които никога не можех да видя. xHeal откри връзката с влажността и конкретни хранителни комбинации.", name: "Christina H., 27", image: "/images/testimonials/t-103.png" },
  { quote: "Предсказването на мигрени е убийствената функция за мен. xHeal улавя модела на HRV и сън, който предшества мигрените ми с 36 часа.", name: "Deborah W., 44", image: "/images/testimonials/t-104.png" },
  { quote: "Астматичните ми пристъпи корелират с качеството на въздуха и нивата на стрес. xHeal ми показа, че и двата тригера имат значение, не само единият.", name: "Oscar L., 33", image: "/images/testimonials/t-105.png" },
  { quote: "Подагрозните пристъпи ме изненадваха. xHeal ги свърза с дехидратация и конкретни модели на прием на протеини. Превенцията побеждава лечението.", name: "Howard J., 52", image: "/images/testimonials/t-106.png" },
  { quote: "Псориазисът ми се обостря когато съм стресиран И спя лошо. Не едното или другото, а двете. xHeal откри комбинирания тригер.", name: "Valerie C., 35", image: "/images/testimonials/t-107.png" },
  { quote: "Болката от ендометриоза следва модел, който надхвърля цикъла ми. xHeal откри корелации с маркери за възпаление и интензивност на упражненията.", name: "Isabel R., 30", image: "/images/testimonials/t-108.png" },
  { quote: "Алергиите ми не са само сезонни. xHeal показа, че скачат при конкретни промени в атмосферното налягане, комбинирани с лош сън. Сега се подготвям.", name: "Dennis M., 41", image: "/images/testimonials/t-109.png" },

  // === ПРОСЛЕДЯВАНЕ НА МЕДИКАМЕНТИ И ДОБАВКИ ===
  { quote: "Проследяването на 7 ежедневни медикамента беше кошмар с таблица. xHeal записва всичко и ми показва как всеки влияе на маркерите ми.", name: "Gloria E., 58", image: "/images/testimonials/t-110.png" },
  { quote: "Започнах нов антидепресант и xHeal проследи съня, настроението и енергията ми през прехода. Показа на лекаря ми точно как реагирах.", name: "Wesley F., 34", image: "/images/testimonials/t-111.png" },
  { quote: "Купчината ми добавки беше скъпа и нямах представа кое работи. xHeal ми помогна да спра 4 добавки и да запазя 3-те, които реално повлияха лабораторните ми.", name: "Dana K., 37", image: "/images/testimonials/t-112.png" },
  { quote: "Взаимодействията на медикаментите бяха притеснение. xHeal проследява времето и ми дава контекст как всичко работи заедно със здравните ми данни.", name: "Ruth M., 63", image: "/images/testimonials/t-113.png" },
  { quote: "Смяната на лекарства за кръвно налягане беше страшна. xHeal проследи всеки жизнен показател по време на прехода, така че се чувствах контролиращ.", name: "Stanley W., 54", image: "/images/testimonials/t-114.png" },
  { quote: "Приемам биологични лекарства за РА и xHeal проследява маркерите ми за възпаление между инфузиите. Мога да видя точно кога лекарството започва да отслабва.", name: "Theresa B., 47", image: "/images/testimonials/t-115.png" },
  { quote: "Моят пробиотичен експеримент най-накрая има данни. xHeal показа кои щамове корелират с по-добри резултати за храносмилането за 3 месеца.", name: "Craig A., 31", image: "/images/testimonials/t-116.png" },
  { quote: "Времето за приемане на магнезий има значение. xHeal доказа, че приемането вечер срещу сутрин прави измерима разлика в качеството на съня ми.", name: "Kelly N., 29", image: "/images/testimonials/t-117.png" },

  // === РЕЗУЛТАТ ЗА ЗДРАВНА ОСВЕДОМЕНОСТ ===
  { quote: "Резултатът ми за здравна осведоменост падна от 78 на 62 и нямах идея защо. xHeal определи, че причината е влошеното качество на съня ми за две седмици.", name: "Adrian V., 36", image: "/images/testimonials/t-118.png" },
  { quote: "Да стигна от 55 до 82 здравен резултат за 4 месеца беше невероятно. Единственото число за проследяване ме мотивираше всеки ден.", name: "Tamara S., 30", image: "/images/testimonials/t-119.png" },
  { quote: "Състезавам се със себе си всяка седмица. Виждането на възходящия тренд на здравния ми резултат е по-мотивиращо от всяко фитнес предизвикателство.", name: "Douglas R., 42", image: "/images/testimonials/t-120.png" },
  { quote: "Резултатът от 0 до 100 пробива шума. Не е нужно да разбирам всеки показател, просто трябва да знам дали ставам по-добре или по-зле.", name: "Eileen T., 48", image: "/images/testimonials/t-121.png" },
  { quote: "Резултатът ми разкри, че съм силен във фитнеса, но ужасен в управлението на стреса. Това целенасочено прозрение струваше повече от членство във фитнес.", name: "Vincent P., 33", image: "/images/testimonials/t-122.png" },
  { quote: "Показах на жена ми здравния \u0438 резултат от 45 и тя най-накрая взе проблемите със съня насериозно. Понякога ти трябва число, за да мотивираш действие.", name: "Jerome D., 39", image: "/images/testimonials/t-123.png" },
  { quote: "Резултатът на xHeal се разбива на области, за да знам точно къде да фокусирам. Храненето беше слабото ми място и никога не бих се досетил.", name: "Sharon F., 44", image: "/images/testimonials/t-124.png" },
  { quote: "Наблюдаването как резултатът ми се покачва след всяка промяна в начина на живот ми дава доказателство, че малките навици се натрупват.", name: "Noah B., 25", image: "/images/testimonials/t-125.png" },

  // === DIGITAL TWIN И AI ЧАТ ===
  { quote: "Попитах Digital Twin защо се чувствам уморена след 8 часа сън. Той свърза данните за HRV с късната ми вечеря. Невероятно.", name: "Chloe L., 27", image: "/images/testimonials/t-126.png" },
  { quote: "Да попитам xHeal \u201Eзащо се чувствам по-зле в понеделник\u201C и да получа отговор, базиран на данни, беше най-научно-фантастичното здравно изживяване, което някога съм имал.", name: "Blake R., 32", image: "/images/testimonials/t-127.png" },
  { quote: "Моят Digital Twin ме познава по-добре от всеки отделен лекар, защото има всичките ми данни на едно място. Това не е преувеличение.", name: "Fiona C., 35", image: "/images/testimonials/t-128.png" },
  { quote: "Попитах за тенденцията на витамин D и получих отговор, който цитираше последните 3 лабораторни панела и данните за излагане на слънце. Невероятно.", name: "Gavin M., 40", image: "/images/testimonials/t-129.png" },
  { quote: "AI чатът не просто отговаря, а обяснява разсъжденията. Насоки на WHO, личните ми данни, всичко цитирано. Като да имаш медицински съветник.", name: "Irene J., 46", image: "/images/testimonials/t-130.png" },
  { quote: "Попитах xHeal върху какво да се фокусирам преди годишния си преглед. Генерира списък с въпроси за лекаря ми, базирани на реалните ми тенденции.", name: "Derek H., 38", image: "/images/testimonials/t-131.png" },
  { quote: "Децата ми ме питат здравни въпроси, на които не мога да отговоря. Сега питам Digital Twin и получавам отговори, базирани на реални медицински стандарти.", name: "Natalie S., 41", image: "/images/testimonials/t-132.png" },
  { quote: "Фактът, че xHeal използва насоки на WHO и ADA, ме кара да вярвам на отговорите. Не са случайни интернет съвети, а клинично разсъждение върху моите данни.", name: "Oscar W., 50", image: "/images/testimonials/t-133.png" },

  // === СЕМЕЙНО ЗДРАВЕ ===
  { quote: "Управлението на семейството ми от петима в xHeal означава, че никога не пропускам дата за ваксинация, презареждане на лекарства или тревожна тенденция.", name: "Melissa A., 37", image: "/images/testimonials/t-134.png" },
  { quote: "Възрастните ми родители живеят в друг щат. xHeal ми помага да проследявам здравните им данни и да сигнализирам, когато нещо изглежда нередно.", name: "Scott K., 44", image: "/images/testimonials/t-135.png" },
  { quote: "Промените в настроението на тийнейджъра ми се оказаха свързани с лош сън и пропускане на закуската. xHeal ни даде данните за истински разговор.", name: "Brenda N., 42", image: "/images/testimonials/t-136.png" },
  { quote: "Мъжът ми никога не проследяваше нищо, докато не му показах здравния му резултат. Сега го проверява всяка сутрин. Състезателните хора имат нужда от числа.", name: "Yolanda R., 35", image: "/images/testimonials/t-137.png" },
  { quote: "Като полагащ грижи за майка ми с Алцхаймер, проследяването на лекарствата, прегледите и здравните тенденции на едно място е спасителен пояс.", name: "Henry C., 52", image: "/images/testimonials/t-138.png" },
  { quote: "Семейството ми има история със сърдечни заболявания. xHeal проследява сърдечните ми маркери заедно с данните за начина на живот, за да мога да прекъсна модела.", name: "Louise W., 38", image: "/images/testimonials/t-139.png" },
  { quote: "Управлявам собственото си здраве и това на възрастния ми баща чрез xHeal. Генерирането на доклади за неговите лекари ни спестява часове всеки месец.", name: "Raymond G., 45", image: "/images/testimonials/t-140.png" },
  { quote: "Жена ми и аз двамата използваме xHeal и сравняваме бележки. Тя спи по-добре, аз се храня по-добре, и двамата сме по-здрави благодарение на това.", name: "Charles F., 40", image: "/images/testimonials/t-141.png" },

  // === ОБЩО БЛАГОСЪСТОЯНИЕ И БИОХАКИНГ ===
  { quote: "Не съм болен, просто любопитен. xHeal задоволява обсесията ми с данни и реално подобри базовото ми здраве по начини, които не очаквах.", name: "Liam O., 26", image: "/images/testimonials/t-142.png" },
  { quote: "Като биохакър, xHeal замени 6 различни приложения за проследяване. Една платформа, която свързва всичко, е безкрайно по-добра от изолирани данни.", name: "Trevor Y., 30", image: "/images/testimonials/t-143.png" },
  { quote: "Исках да оптимизирам продуктивността си и се оказа, че здравето е основата. xHeal ми показа връзката между HRV и най-добрите ми работни дни.", name: "Grace H., 28", image: "/images/testimonials/t-144.png" },
  { quote: "Студено потапяне, сауна, дихателни упражнения. Проследявам всичко в xHeal и най-накрая мога да видя кои протоколи реално движат здравните ми маркери.", name: "Max B., 33", image: "/images/testimonials/t-145.png" },
  { quote: "Медицинска сестра съм и използвам xHeal за собственото си здраве. Клиничните разсъждения са легитимни и постоянно го препоръчвам на пациенти.", name: "Pamela T., 35", image: "/images/testimonials/t-146.png" },
  { quote: "На 72 съм в по-добра форма от 62, защото xHeal ми дава приложими данни всеки ден. Възрастта е просто число, когато имаш добри данни.", name: "William E., 72", image: "/images/testimonials/t-147.png" },
  { quote: "Проследяването на бременността с xHeal беше феноменално. Всеки симптом, всяко изследване, всеки показател, всичко в контекста на пълната ми здравна история.", name: "Amanda K., 31", image: "/images/testimonials/t-148.png" },
  { quote: "Възстановяването след COVID беше мистерия, докато xHeal не проследи HRV, съня и моделите на енергия. Можех да видя бавното изкачване обратно до нормалното.", name: "Jeffrey L., 39", image: "/images/testimonials/t-149.png" },
  { quote: "Търсех симптоми в Google и изпадах в паника. Сега питам Digital Twin и получавам отговори, базирани на МОИТЕ данни, а не на интернет сценарии за най-лошия случай.", name: "Vanessa D., 29", image: "/images/testimonials/t-150.png" },
  { quote: "xHeal е първото здравно приложение, което ме третира като цялостна личност, а не само като крачкомер или калориен брояч. Всичко е свързано.", name: "Russell M., 43", image: "/images/testimonials/t-151.png" },
  { quote: "Пътувам постоянно за работа и здравето ми страдаше. xHeal проследява въздействието на часовите зони, джетлага и нередовните хранения върху възстановяването ми.", name: "Simon J., 37", image: "/images/testimonials/t-152.png" },
  { quote: "Генетичният ми доклад каза, че съм в риск от сърдечно заболяване. xHeal свързва тези генетични данни с ежедневните ми навици, за да мога реално да действам.", name: "Audrey P., 34", image: "/images/testimonials/t-153.png" },
  { quote: "Като инструктор по йога мислех, че съм здрава. xHeal ми показа, че храненето ми куца и качеството на съня е по-лошо от това на учениците ми.", name: "Jasmine W., 30", image: "/images/testimonials/t-154.png" },
  { quote: "Проследяването на кортизола заедно с ежедневните дневници на стреса разкри модел, който лекарят ми пропускаше с години. xHeal свърза нещо, което никой друг не можеше.", name: "Patrick H., 46", image: "/images/testimonials/t-155.png" },
  { quote: "Ръководя стартъп и здравето ми беше последният приоритет. Ежедневните действия на xHeal отнемат 5 минути и подобриха всеки показател, който проследявам.", name: "Naomi F., 32", image: "/images/testimonials/t-156.png" },
  { quote: "След менопаузата, тялото ми се промени напълно. xHeal проследява как новото ми нормално се различава от преди и ми помага да се адаптирам вместо да гадая.", name: "Barbara L., 56", image: "/images/testimonials/t-157.png" },
  { quote: "Дарих бъбрек миналата година. Проследяването на функцията на оставащия бъбрек заедно с цялостното ми здраве ми дава спокойствие, което нищо друго не може.", name: "Kenneth D., 48", image: "/images/testimonials/t-158.png" },
];

/**
 * Get testimonials for a given locale.
 */
export function getTestimonials(locale: string = "en"): Testimonial[] {
  return locale === "bg" ? testimonialsBg : testimonialsEn;
}

/** @deprecated Use getTestimonials(locale) instead */
export const testimonials = testimonialsEn;
