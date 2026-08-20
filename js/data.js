/* ============================================================
   LEARNING PORT — Subject & Topic Data
   Add new subjects by pushing another object into SUBJECTS.
   ============================================================ */

const SUBJECTS = [
  {
    id: "economics",
    name: "Economics",
    code: "BAFF0023",
    tagline: "Economics and Society",
    color: "#e6484f",
    icon: "econ",
    topics: [

      /* ---------------- TOPIC 1 ---------------- */
      {
        id: "t1",
        num: "01",
        title: "Basic Concepts of Economics",
        summary: "Scarcity, choice, opportunity cost and the PPF.",
        sections: [
          {
            heading: "Scarcity & Choice",
            points: [
              "All economic problems arise because human wants exceed available resources.",
              { t: "Scarcity = a condition where wants exceed the ability of resources to satisfy them.", important: true },
              "Because of scarcity, we must make choices among alternatives — and those choices depend on the incentives we face."
            ]
          },
          {
            heading: "Definition of Economics",
            points: [
              { t: "Economics is the social science that studies the choices made by individuals, businesses, governments and societies as they cope with scarcity, the incentives that influence those choices, and the arrangements that coordinate them.", important: true },
              { t: "Microeconomics — the choices made by individuals and businesses, and how those choices interact (influenced by government).", important: true },
              { t: "Macroeconomics — the aggregate, or total, effects on the national and global economy of the choices made by individuals, businesses and governments.", important: true }
            ]
          },
          {
            heading: "What, How, For Whom",
            points: [
              "Goods and services are the objects (goods) and actions (services) that people value and produce to satisfy their wants.",
              "What goods/services get produced, and in what quantities?",
              "How are they produced?",
              "For whom are they produced?"
            ]
          },
          {
            heading: "The Economic Way of Thinking (6 ideas)",
            points: [
              "Choice is a tradeoff.",
              { t: "Cost = what you must give up to get something.", important: true },
              "Benefit = what you gain from something.",
              "People make rational choices by comparing benefit and cost.",
              "Most choices are \u201chow much\u201d choices, made at the margin.",
              "Choices respond to incentives."
            ]
          },
          {
            heading: "Key Definitions",
            points: [
              "Tradeoff — an exchange: giving up one thing to get something else.",
              { t: "Opportunity cost — the best (highest-valued) alternative forgone to get something.", important: true },
              "Benefit — the gain or pleasure something brings, measured by what you're willing to give up for it.",
              "Rational choice — a choice that uses available resources to best achieve the chooser's objective, made by comparing costs and benefits.",
              { t: "Choice at the margin — comparing alternatives systematically and incrementally, one more or one less unit.", important: true },
              { t: "Marginal cost — the opportunity cost of a one-unit increase in an activity.", important: true },
              { t: "Marginal benefit — what you gain from one more unit.", important: true },
              { t: "Rule for rational choice: take the action if Marginal Benefit (MB) \u2265 Marginal Cost (MC).", important: true }
            ]
          },
          {
            heading: "Production Possibilities Frontier (PPF)",
            points: [
              { t: "The PPF is the boundary between combinations of goods and services that can be produced and those that cannot, given the available factors of production and technology.", important: true },
              "It's a tool used to illustrate the effects and consequences of scarcity.",
              { t: "Attainable vs unattainable — points on or inside the curve are attainable; points outside are unattainable.", important: true },
              "Efficient vs inefficient — points on the curve are efficient (using all resources); points inside are inefficient.",
              "Tradeoffs and free lunches — moving along the curve is a tradeoff; moving the whole curve outward is a \u201cfree lunch\u201d (growth)."
            ]
          },
          {
            heading: "Opportunity Cost on a PPF",
            points: [
              { t: "Opportunity cost (using the PPF) = decrease in y \u00f7 increase in x.", important: true },
              "Cell phones vs DVDs example: moving from point A\u2192B costs 1 million DVDs for 1 million phones (opportunity cost = 1); by E\u2192F it costs 5 million DVDs for 1 million phones (opportunity cost = 5)."
            ],
            table: {
              caption: "Cell phones vs DVDs — increasing opportunity cost",
              headers: ["Movement", "Decrease in DVDs", "Increase in phones", "Opp. cost (DVDs per phone)"],
              rows: [
                ["A → B", "1 million", "1 million", "1"],
                ["B → C", "2 million", "1 million", "2"],
                ["C → D", "3 million", "1 million", "3"],
                ["D → E", "4 million", "1 million", "4"],
                ["E → F", "5 million", "1 million", "5"]
              ]
            }
          },
          {
            heading: "Increasing Opportunity Cost",
            points: [
              { t: "Opportunity cost of a good increases as more of it is produced — this is why the PPF bows outward (is concave), not a straight line.", important: true },
              "Reason: resources aren't equally good at producing every good. As you produce more of one good, you're forced to use resources less suited to it, sacrificing more and more of the other good each time."
            ]
          }
        ],
        quiz: [
          {
            q: "What condition causes all economic problems, according to the notes?",
            options: ["Inflation", "Scarcity — wants exceeding resources", "Unemployment", "Government intervention"],
            answer: 1,
            explain: "Scarcity is the condition where wants exceed the ability of resources to satisfy them — the root of every economic problem."
          },
          {
            q: "Which branch of economics studies aggregate, national-level effects of choices?",
            options: ["Microeconomics", "Behavioral economics", "Macroeconomics", "Econometrics"],
            answer: 2,
            explain: "Macroeconomics looks at the aggregate/total effects on the national and global economy."
          },
          {
            q: "The rule for rational choice is to take an action when...",
            options: ["MC ≥ MB", "MB ≥ MC", "MB = 0", "Cost is minimized regardless of benefit"],
            answer: 1,
            explain: "Take the action if Marginal Benefit (MB) is greater than or equal to Marginal Cost (MC)."
          },
          {
            q: "On a PPF, a point inside the curve represents...",
            options: ["An unattainable combination", "An efficient combination", "An inefficient combination (not using all resources)", "The point of maximum growth"],
            answer: 2,
            explain: "Points inside the curve are attainable but inefficient — resources aren't fully used."
          },
          {
            q: "Why is a PPF typically bowed outward (concave) rather than a straight line?",
            options: [
              "Because opportunity cost decreases as output increases",
              "Because resources are equally suited to producing every good",
              "Because opportunity cost increases as more of a good is produced, since resources aren't equally suited to every good",
              "Because of inflation"
            ],
            answer: 2,
            explain: "As more of one good is produced, resources less suited to it must be used, so more of the other good is sacrificed each time — increasing opportunity cost."
          },
          {
            q: "If the marginal benefit (MB) of an activity exceeds its marginal cost (MC), a rational chooser will...",
            options: ["Avoid the activity entirely", "Do more of the activity", "Do less of the activity", "Stop making choices at the margin"],
            answer: 1,
            explain: "The rational-choice rule is to take the action when MB ≥ MC, so doing more of the activity is the correct choice."
          },
          {
            q: "Which of the following is NOT one of the three economic questions (What, How, For Whom)?",
            options: ["What goods and services get produced, and in what quantities?", "How are goods and services produced?", "When should goods and services be consumed?", "For whom are goods and services produced?"],
            answer: 2,
            explain: "The three central questions are What, How, and For Whom — 'when' something is consumed is not one of them."
          },
          {
            q: "Points outside the PPF represent...",
            options: ["Attainable and efficient combinations", "Unattainable combinations given current resources and technology", "Attainable but inefficient combinations", "The best possible tradeoffs"],
            answer: 1,
            explain: "Points outside the curve cannot be produced with the available factors of production and technology — they are unattainable."
          },
          {
            q: "On a PPF, opportunity cost is calculated as...",
            options: ["Increase in x ÷ decrease in y", "Decrease in y ÷ increase in x", "Decrease in x × increase in y", "Increase in y ÷ decrease in x"],
            answer: 1,
            explain: "Opportunity cost on the PPF = decrease in y ÷ increase in x — what you give up per extra unit produced."
          },
          {
            q: "The six ideas of the economic way of thinking include all of the following EXCEPT...",
            options: ["Choice is a tradeoff", "Choices respond to incentives", "Cost is what you must give up to get something", "People make choices without comparing costs and benefits"],
            answer: 3,
            explain: "One of the six ideas is that people make rational choices by comparing benefit and cost — not that they ignore costs and benefits."
          }
        ],
        takeaways: [
          "Scarcity — wants exceeding resources — is the root of every economic problem and forces us to choose.",
          "Take an action when marginal benefit (MB) is greater than or equal to marginal cost (MC).",
          "Opportunity cost is the best alternative forgone; on a PPF it equals decrease in y ÷ increase in x.",
          "A bowed-out PPF means increasing opportunity cost: resources aren't equally good at everything.",
          "On the PPF line = efficient; inside = inefficient; outside = unattainable."
        ]
      },

      /* ---------------- TOPIC 6 ---------------- */
      {
        id: "t6",
        num: "06",
        title: "National Income (GDP, Income & Expenditure)",
        summary: "GDP, the circular flow, the three measurement approaches, and real vs nominal GDP.",
        sections: [
          {
            heading: "GDP Definition",
            points: [
              { t: "Gross Domestic Product (GDP) = the market value of all final goods and services produced within a country in a given time period.", important: true },
              "Value produced — use market prices to value production.",
              "What is produced — only final goods/services, not intermediate ones.",
              "Final good/service = produced for the final user, not as a component of another good.",
              "Intermediate good/service = produced by one firm, bought by another, used as a component of a final good.",
              "GDP includes only items traded in markets.",
              "Where produced — within a country (domestic). When produced — during a given time period."
            ]
          },
          {
            heading: "Circular Flow of Income & Expenditure",
            points: [
              "Consumption expenditure (C) — household spending on consumption goods/services.",
              "Investment (I) — purchase of new capital goods (tools, machines, buildings) plus additions to inventories.",
              "Government expenditure on goods and services (G) — spending by all levels of government.",
              { t: "Net exports (NX) = Exports − Imports.", important: true },
              "Exports = items produced domestically and sold to the rest of the world.",
              "Imports = items bought by households, firms or government from the rest of the world."
            ]
          },
          {
            heading: "Income = Expenditure",
            points: [
              "Factor incomes: Labor → wages, Capital → interest, Land → rent, Entrepreneurship → profit.",
              { t: "Since firms pay out everything they receive as income to factors of production (Y): Value of production = Income = Expenditure.", important: true },
              "Households' income (Y) splits into Consumption + Savings + Net Taxes.",
              "US 2013 example ($bn): C = 11,430; I = 2,626; G = 3,118; NX = −506; Y = 16,668."
            ]
          },
          {
            heading: "Measuring GDP — Expenditure Approach",
            points: [
              "GDP measured using data on C, I, G, NX.",
              { t: "Expenditures NOT counted in GDP: used goods (already counted when new) and financial assets like bonds/stocks (these are loans, not purchases of goods/services).", important: true }
            ],
            table: {
              caption: "2013 Q2 Expenditure Approach ($bn)",
              headers: ["Item", "Symbol", "Amount", "% of GDP"],
              rows: [
                ["Consumption", "C", "11,430", "68.6"],
                ["Investment", "I", "2,626", "15.8"],
                ["Govt expenditure", "G", "3,118", "18.7"],
                ["Net exports", "NX", "−506", "−3.0"],
                ["GDP", "Y", "16,668", "100.0"]
              ]
            }
          },
          {
            heading: "Measuring GDP — Income Approach",
            points: [
              "Sums incomes firms pay households for factors of production: wage income (compensation of employees) and interest, rent & profit income (net operating surplus).",
              { t: "Net domestic product at factor cost = Wages + Interest + Rent + Profit — this is NOT GDP; it needs two adjustments.", important: true },
              { t: "Adjustment 1 — Factor cost → Market price: add indirect taxes, subtract subsidies.", important: true },
              { t: "Adjustment 2 — Net product → Gross product: add back depreciation (capital consumption).", important: true },
              "The income approach naturally gives a net measure; the expenditure approach gives a gross measure."
            ],
            table: {
              caption: "2013 Q2 Income Approach ($bn)",
              headers: ["Item", "Amount", "% GDP"],
              rows: [
                ["Wages", "8,820", "52.9"],
                ["Interest, rent, profit", "4,290", "25.7"],
                ["Net domestic product at factor cost", "13,110", "78.7"],
                ["+ Indirect taxes less subsidies", "1,080", "6.5"],
                ["+ Depreciation", "2,632", "15.8"],
                ["GDP (income approach)", "16,822", "100.9"],
                ["− Statistical discrepancy", "−154", "−0.9"],
                ["GDP (expenditure approach)", "16,668", "100.0"]
              ]
            }
          },
          {
            heading: "GDP vs GNP",
            points: [
              { t: "GNP (Gross National Product) = market value of all final goods/services produced anywhere in the world by factors of production supplied by residents of the country.", important: true },
              "Chain: GDP → (+ net factor income from abroad) → GNP → (− depreciation) → Net national product → (− statistical discrepancy) → National income → (+ transfer payments − retained profits) → Personal income → (− personal income taxes) → Disposable personal income.",
              "Disposable personal income = income received by households minus personal income taxes paid — a major influence on consumption expenditure."
            ]
          },
          {
            heading: "Real GDP vs Nominal GDP",
            points: [
              "Nominal GDP = value of final goods/services produced in a given year, expressed in that same year's prices.",
              { t: "Real GDP = value of final goods/services produced in a given year, expressed in base-year prices.", important: true },
              "Goal: Real GDP removes the influence of price changes, isolating the actual change in quantity produced."
            ],
            table: {
              caption: "Worked example (base year 2009)",
              headers: ["Version", "T-shirts", "Chips", "Security", "Total"],
              rows: [
                ["Nominal/Real GDP 2009 (2009 qty × 2009 price)", "50", "30", "20", "100"],
                ["Nominal GDP 2013 (2013 qty × 2013 price)", "20", "40", "240", "300"],
                ["Real GDP 2013 (2013 qty × 2009 price)", "20", "20", "120", "160"]
              ]
            }
          },
          {
            heading: "Uses & Limitations of Real GDP",
            points: [
              "Three main uses: (1) compare standard of living over time, (2) track the business cycle, (3) compare standard of living among countries.",
              "Real GDP per person example: 2013 US real GDP $15,680bn ÷ population 315.9m = $49,636; in 1960 it was $17,212 — 2013 living standard was 2.9× that of 1960.",
              { t: "Potential GDP = value of real GDP when all factors of production are fully employed. If factors are unemployed, real GDP < potential GDP; if over-employed, real GDP > potential GDP.", important: true },
              "Business cycle = periodic but irregular up-and-down movement of total production and economic activity, with 4 stages: Expansion → Peak → Recession → Trough.",
              "Recession = a period where the real GDP growth rate is negative for at least 6 months.",
              "To compare living standards across countries, Real GDP must be converted into a common currency/price basis using Purchasing Power Parity (PPP)."
            ]
          },
          {
            heading: "What's Omitted From GDP",
            points: [
              { t: "Household production (e.g. unpaid housework) — underestimates the value of production, mostly by women.", important: true },
              "Underground production — hidden from government to avoid tax/regulation, or illegal.",
              "Leisure time — working time is counted, leisure time is not.",
              "Environmental quality — pollution and deterioration are not subtracted from GDP.",
              "Other influences on standard of living not captured by GDP: health & life expectancy, political freedom and social justice."
            ]
          }
        ],
        quiz: [
          {
            q: "GDP measures the market value of...",
            options: ["All goods and services, including intermediate ones", "Only final goods and services produced within a country in a given period", "Only exported goods", "Household savings"],
            answer: 1,
            explain: "GDP counts only final goods/services produced domestically in a given time period — intermediate goods are excluded."
          },
          {
            q: "Which is NOT one of the four expenditure components (C, I, G, NX)?",
            options: ["Consumption", "Investment", "Depreciation", "Government expenditure"],
            answer: 2,
            explain: "The expenditure components are C, I, G, and NX (net exports). Depreciation belongs to the income-approach adjustments."
          },
          {
            q: "In the income approach, what must be added to Net domestic product at factor cost to reach GDP?",
            options: ["Only depreciation", "Only indirect taxes", "Indirect taxes less subsidies, then depreciation", "Nothing — it already equals GDP"],
            answer: 2,
            explain: "Two adjustments are needed: factor cost → market price (add indirect taxes, subtract subsidies), then net → gross product (add depreciation)."
          },
          {
            q: "Real GDP differs from Nominal GDP because Real GDP...",
            options: ["Uses current-year prices", "Uses base-year prices, removing the effect of price changes", "Excludes government spending", "Only counts exports"],
            answer: 1,
            explain: "Real GDP values output at base-year prices so it isolates actual quantity growth from price inflation."
          },
          {
            q: "Which of these is typically omitted from GDP calculations?",
            options: ["Government salaries", "Corporate profits", "Unpaid household production", "Wages"],
            answer: 2,
            explain: "Household production such as unpaid housework is not traded in a market, so it's excluded from GDP — underestimating true production value."
          },
          {
            q: "Which of the following is a FINAL good?",
            options: ["Wheat sold to a mill", "Steel sold to a car factory", "A smartphone sold to a consumer", "Paper sold to a publisher"],
            answer: 2,
            explain: "A final good is produced for the final user, not as a component of another good — the smartphone bought by a consumer is final; the others are intermediate goods."
          },
          {
            q: "Net exports (NX) is calculated as...",
            options: ["Exports + Imports", "Exports − Imports", "Imports − Exports", "Savings + Taxes"],
            answer: 1,
            explain: "Net exports = Exports − Imports. In the US 2013 example, NX was −506 ($bn) because imports exceeded exports."
          },
          {
            q: "Which purchase is NOT counted in GDP?",
            options: ["A firm buying new machinery", "Government spending on defense", "A used car bought from a neighbor", "A firm adding to its inventories"],
            answer: 2,
            explain: "Used goods are not counted in GDP — they were already counted when first produced and sold as new."
          },
          {
            q: "GNP differs from GDP because GNP measures production...",
            options: ["Within a country's borders, regardless of ownership", "By a country's residents anywhere in the world", "Only in the base year", "Only of services, not goods"],
            answer: 1,
            explain: "GNP counts output produced anywhere in the world by factors of production supplied by residents of the country."
          },
          {
            q: "A major use of real GDP is to...",
            options: ["Compare standards of living over time", "Measure unpaid household production", "Count underground economic activity", "Replace the CPI"],
            answer: 0,
            explain: "Real GDP's three main uses: comparing living standards over time, tracking the business cycle, and comparing living standards across countries."
          }
        ],
        takeaways: [
          "GDP = market value of all final goods and services produced within a country in a given period.",
          "GDP can be measured three ways — expenditure, income, and production — all giving the same total.",
          "Expenditure approach: Y = C + I + G + NX, where NX = exports − imports.",
          "Income approach: from net domestic product at factor cost, add indirect taxes less subsidies, then add depreciation.",
          "Real GDP uses base-year prices to isolate quantity change; GNP counts residents' output anywhere in the world."
        ]
      },

      /* ---------------- TOPIC 7 ---------------- */
      {
        id: "t7",
        num: "07",
        title: "Economic Growth and Living Standards",
        summary: "Drivers, benefits, costs and sustainability of economic growth.",
        sections: [
          {
            heading: "Definition",
            points: [
              { t: "Economic growth = a sustained increase in a country's production of goods/services over time, usually measured by growth of real GDP or real GNP.", important: true },
              "GDP = total value of goods/services produced within a country's borders, regardless of who owns the resources.",
              "GNP = total value of goods/services produced by a country's citizens/businesses, regardless of location.",
              "Growth reflects the ability to generate higher income, employment, and productive capacity.",
              "Malaysia 2025 example: GDP grew 5.2% (same as 2024); GDP value = RM1,737.0 billion; GNI = RM1,958.1bn; GNI per capita = RM57,200; population = 34.23 million."
            ]
          },
          {
            heading: "Characteristics of Economic Growth",
            points: [
              "Real income increase — higher purchasing power/living standards after adjusting for inflation.",
              { t: "Sustained over time — continuous/long-term, not seasonal or temporary.", important: true },
              "Increasing productive capacity — via technology, infrastructure, capital investment, human capital.",
              "Improved living standards — jobs, income, access to education, healthcare, housing."
            ]
          },
          {
            heading: "Drivers of Economic Growth",
            points: [
              "Increase in factor inputs — more land, labour, capital.",
              { t: "Improvement in productivity — technology, education, skills, human capital.", important: true },
              "Supportive economic environment — effective government policy, infrastructure, political stability, foreign investment."
            ]
          },
          {
            heading: "Measurement & Growth vs Development",
            points: [
              "Measured via the growth rate of real GDP/GNP, which excludes inflation for an accurate measure of actual growth.",
              "Helps governments assess performance, compare across countries, and support policy/development planning.",
              { t: "Economic Development is broader — measured by the Human Development Index (HDI): life expectancy at birth, knowledge and education, and standard of living.", important: true }
            ],
            table: {
              caption: "Economic Growth vs Economic Development",
              headers: ["Economic Growth", "Economic Development"],
              rows: [
                ["Focuses on increasing output, income, production", "Focuses on improving quality of life & well-being"],
                ["Measured by GDP, GNP, income per capita", "Measured by HDI, literacy rates, poverty levels, health outcomes"],
                ["Emphasizes economic expansion & higher income", "Emphasizes social progress, equity, human welfare"],
                ["Benefits may not be distributed equally", "Aims for inclusive, widely shared benefits"]
              ]
            }
          },
          {
            heading: "Growth and Living Standards",
            points: [
              { t: "GDP per capita = the common indicator of living standard (average income/output per person). Higher generally means a better standard of living.", important: true },
              "Growth → higher incomes → better housing, healthcare, education, goods/services.",
              "Growth → more government revenue → more infrastructure/public service investment.",
              "Inclusive growth matters — unequal income distribution limits overall well-being improvement."
            ]
          },
          {
            heading: "Factors Contributing to Growth — Quantity",
            points: [
              "Land & natural resources — new land, minerals, oil, gas discovered/utilized → more production capacity.",
              "Labour force — population growth, immigration, higher labour participation → more workers → more output.",
              "Capital accumulation — investment in machinery, factories, technology, infrastructure → higher productivity.",
              { t: "Higher savings and investment — savings fund investment → expands productive capacity → higher output/growth.", important: true }
            ]
          },
          {
            heading: "Factors Contributing to Growth — Quality",
            points: [
              { t: "Technological progress — new production methods, lower cost, higher speed (e.g. automation, AI, advanced manufacturing).", important: true },
              "Innovation — new products/services/processes → more output from the same resources → accelerates growth.",
              { t: "Human capital development — education, training, skill development → a more productive, adaptable workforce.", important: true },
              "Long-term growth requires investment in both human capital and technology for sustainable, continuous productivity improvement."
            ]
          },
          {
            heading: "Benefits of Economic Growth",
            points: [
              { t: "Improved living standards — higher income/purchasing power → better housing, healthcare, education, nutrition.", important: true },
              "More employment opportunities — business expansion → job creation → reduced unemployment.",
              "Higher government revenue — more tax collection → more public service spending.",
              "Increased business profits and investment — higher demand → higher profits → more investment/innovation."
            ]
          },
          {
            heading: "Costs & Obstacles to Growth",
            points: [
              { t: "Costs: environmental degradation, technological unemployment, inflationary pressure, income inequality.", important: true },
              "Obstacles to sustainability: income inequality/poverty, corruption and poor governance, inadequate infrastructure, environmental degradation."
            ]
          },
          {
            heading: "Solutions for Sustainable Growth",
            points: [
              { t: "Promote inclusive growth — job creation, social protection, equal access to education/healthcare/finance.", important: true },
              "Strengthen governance — anti-corruption measures, transparency, effective institutions.",
              "Invest in infrastructure — transport, energy, digital infrastructure to lower business costs and attract investment.",
              "Support environmental sustainability — renewable energy, sustainable resource management, enforced environmental regulations."
            ]
          }
        ],
        quiz: [
          {
            q: "Economic growth is usually measured by...",
            options: ["Growth of real GDP or real GNP", "The Human Development Index only", "The unemployment rate", "The CPI"],
            answer: 0,
            explain: "Economic growth is a sustained increase in production, usually tracked via real GDP or real GNP growth."
          },
          {
            q: "Which of these is a 'quality' (not quantity) factor of production driving growth?",
            options: ["More land discovered", "Population growth", "Technological progress and innovation", "More capital accumulated"],
            answer: 2,
            explain: "Technological progress and innovation improve the quality/productivity of existing resources, unlike quantity factors like more land or labour."
          },
          {
            q: "What does the Human Development Index (HDI) primarily measure that GDP does not?",
            options: ["Total government spending", "Broader well-being: life expectancy, education, and standard of living", "Export volume", "Interest rates"],
            answer: 1,
            explain: "HDI captures economic development more broadly than GDP, including life expectancy, knowledge/education, and standard of living."
          },
          {
            q: "Which is a listed COST of economic growth?",
            options: ["Higher government revenue", "Environmental degradation", "More employment opportunities", "Increased business profits"],
            answer: 1,
            explain: "Environmental degradation, technological unemployment, inflationary pressure, and income inequality are all costs of growth."
          },
          {
            q: "Why is 'inclusive growth' emphasized as important?",
            options: [
              "Because unequal distribution of growth's benefits limits overall improvement in well-being",
              "Because it guarantees zero inflation",
              "Because it removes the need for government revenue",
              "Because it eliminates the business cycle"
            ],
            answer: 0,
            explain: "If growth's benefits aren't shared, overall well-being improvement is limited even as GDP rises."
          },
          {
            q: "A characteristic of economic growth is that it is...",
            options: ["Seasonal and temporary", "Sustained over time", "Measured only in nominal terms", "Unrelated to productive capacity"],
            answer: 1,
            explain: "Economic growth is a sustained, long-term increase in production — not a temporary or seasonal rise."
          },
          {
            q: "Which is a 'quantity' factor contributing to growth?",
            options: ["Technological progress", "Innovation and R&D", "More labour, land, or capital", "Better education and training"],
            answer: 2,
            explain: "Quantity factors add more inputs (land, labour, capital); technology, innovation, and human capital are quality factors."
          },
          {
            q: "GDP per capita is commonly used as...",
            options: ["A measure of unpaid household production", "An indicator of the standard of living", "The official inflation rate", "A measure of inequality only"],
            answer: 1,
            explain: "GDP per capita (output or income per person) is the common indicator of the standard of living."
          },
          {
            q: "Which is listed as a BENEFIT of economic growth?",
            options: ["Environmental degradation", "Inflationary pressure", "Improved living standards", "Technological unemployment"],
            answer: 2,
            explain: "Growth benefits include better living standards, more employment, higher government revenue, and more business profits — the others are costs."
          },
          {
            q: "Which is a proposed solution for sustainable growth?",
            options: ["Strengthening governance and anti-corruption", "Cutting infrastructure investment", "Deepening income inequality", "Relaxing all environmental regulations"],
            answer: 0,
            explain: "Sustainable growth solutions include inclusive growth, stronger governance, infrastructure investment, and environmental sustainability."
          }
        ],
        takeaways: [
          "Economic growth is a sustained rise in real GDP/GNP that raises living standards.",
          "Quantity factors (more land, labour, capital) plus quality factors (technology, innovation, human capital) drive growth.",
          "GDP per capita is the common living-standard measure; the HDI captures broader development.",
          "Growth also brings costs: environmental degradation, inequality, inflation, and technological unemployment.",
          "Sustainable growth needs inclusive policy, good governance, infrastructure, and environmental care."
        ]
      },

      /* ---------------- TOPIC 8 ---------------- */
      {
        id: "t8",
        num: "08",
        title: "Government's Role in Economics",
        summary: "Government roles, revenue, expenditure, and fiscal policy.",
        sections: [
          {
            heading: "Roles of Government",
            points: [
              "Resource Allocation — provides public goods (healthcare, education, infrastructure) and corrects market failures (monopoly, externalities).",
              "Income Redistribution — progressive taxation, welfare programs, financial aid for low-income groups.",
              "Economic Stabilization — uses fiscal policy to control inflation, reduce unemployment, keep growth stable.",
              "Market Regulation — enforces laws for fair competition, consumer protection, ethical business conduct.",
              "Economic Growth — invests in infrastructure, education, technology and R&D."
            ]
          },
          {
            heading: "Government Revenue (3 sources)",
            points: [
              { t: "Taxation — the largest revenue source, from individuals, businesses and activities.", important: true },
              "Government Borrowing — issuing bonds (domestic/international), repaid with interest.",
              "Revenue from State-Owned Enterprises — e.g. income from oil, gas, mining.",
              "Funds are used for healthcare, defense, infrastructure, education and social welfare."
            ]
          },
          {
            heading: "Types of Tax",
            points: []
            ,
            table: {
              caption: "Types of Tax",
              headers: ["Tax", "Definition", "Nature", "Example"],
              rows: [
                ["Income Tax", "Levied on individual/business income or profits", "Progressive (rate ↑ as income ↑)", "Personal income tax, corporate tax"],
                ["Consumption Tax", "Tax on goods/services purchased (indirect tax)", "Regressive (hits lower income harder)", "SST, VAT, excise duties"],
                ["Wealth Tax", "Tax on asset ownership", "—", "Property tax, inheritance tax, capital gains tax"]
              ]
            }
          },
          {
            heading: "Government Expenditure",
            points: [
              "Operating (Current) Expenditure — daily running costs that keep public services functioning, e.g. civil servant salaries, healthcare, education, welfare payments, interest on government debt.",
              { t: "Development Expenditure — long-term investment for growth, e.g. roads, bridges, schools, hospitals, public transport, R&D.", important: true }
            ],
            table: {
              caption: "Malaysia Budget 2025 (RM421 billion)",
              headers: ["Category", "Breakdown"],
              rows: [
                ["Revenue", "Income tax 41.8% · Borrowings/assets 19.2% · Non-tax revenue 19.2% · Indirect tax 16.7% · Other direct tax 3.1%"],
                ["Operating", "Emoluments 25.2% · Debt/service charges 13% · Subsidies/social assistance 12.5% · Supplies/services 9.7% · Retirement charges 9.6% · Others 7.4% · Grants to states 2.2%"],
                ["Development", "Economy 9.5% · Social 7.1% · Security 2.9% · General admin 0.9%"]
              ]
            }
          },
          {
            heading: "Importance of Government Expenditure",
            points: [
              "Provides essential public services (healthcare, education, safety, transport).",
              "Creates employment, directly in the public sector and indirectly via private-industry projects.",
              "Promotes economic growth via infrastructure, tech, and R&D → productivity and investment.",
              "Improves standard of living (healthcare, education, housing, facilities).",
              "Reduces income inequality (welfare, subsidies, financial assistance)."
            ]
          },
          {
            heading: "Fiscal Policy",
            points: [
              { t: "Definition: the government's use of spending and taxation to influence economic performance, achieving stability, growth and living standards.", important: true }
            ]
          },
          {
            heading: "A. Automatic Fiscal Policy (Automatic Stabilizers)",
            points: [
              { t: "Operates automatically — no new government decision needed.", important: true },
              "Unemployment Benefits: as unemployment rises, more people automatically qualify, maintaining income/spending (e.g. a worker loses their job but still buys food and pays bills using benefits).",
              "Progressive Taxation: in a boom, higher incomes mean more tax paid, curbing excess spending/inflation; in a recession, lower incomes mean less tax, leaving more disposable income to spend."
            ]
          },
          {
            heading: "B. Discretionary Fiscal Policy",
            points: [
              { t: "Requires deliberate government decisions — two types: expansionary and contractionary.", important: true }
            ]
          },
          {
            heading: "(i) Expansionary Fiscal Policy — used during recession/high unemployment",
            points: [
              { t: "Effects: increases consumer spending, business investment, employment opportunities, and economic growth (GDP); decreases unemployment.", important: true },
              "Negative consequences: may increase inflation if demand grows too quickly; can cause a budget deficit; may increase government debt; can cause shortages of goods/services; may overheat the economy if continued too long."
            ]
          },
          {
            heading: "(ii) Contractionary Fiscal Policy — used to reduce inflation when the economy grows too fast",
            points: [
              { t: "Effects: decreases consumer spending (AD curve shifts left) and business investment; slows economic activity, preventing overheating; controls inflation; reduces the budget deficit and government debt over time.", important: true },
              "Negative consequences: reduces consumer spending and business profits/investment; may increase unemployment as businesses cut production/hiring; slows economic growth; may lead to recession if overdone."
            ]
          },
          {
            heading: "Topic 8 Summary",
            points: [
              "Government promotes stability, growth, and public welfare.",
              "Revenue comes from taxation, borrowing, and state-owned enterprises.",
              "Expenditure splits into operating vs development spending.",
              { t: "Fiscal policy = spending + taxation used to influence the economy.", important: true },
              { t: "Expansionary policy stimulates growth and lowers unemployment; contractionary policy controls inflation and prevents overheating.", important: true },
              "Every fiscal policy has trade-offs — government chooses based on current economic conditions."
            ]
          }
        ],
        quiz: [
          {
            q: "Which is one of the three main sources of government revenue?",
            options: ["Consumer spending", "Taxation", "GDP growth", "Currency printing"],
            answer: 1,
            explain: "The three sources are taxation (largest), government borrowing, and revenue from state-owned enterprises."
          },
          {
            q: "Development expenditure is best described as...",
            options: ["Daily running costs like salaries", "Long-term investment for growth, e.g. roads, schools, hospitals", "Interest paid on government debt", "Welfare payments"],
            answer: 1,
            explain: "Development expenditure is long-term investment (infrastructure, R&D), unlike operating expenditure which covers daily running costs."
          },
          {
            q: "An income tax that takes a higher rate as income rises is described as...",
            options: ["Regressive", "Progressive", "Flat", "Indirect"],
            answer: 1,
            explain: "Income tax is progressive — the rate increases as income increases."
          },
          {
            q: "Automatic stabilizers like unemployment benefits are notable because they...",
            options: ["Require a new law each time they're used", "Operate automatically without a new government decision", "Only apply during economic booms", "Always cause inflation"],
            answer: 1,
            explain: "Automatic fiscal policy operates automatically as economic conditions change, without needing a fresh government decision."
          },
          {
            q: "Contractionary fiscal policy is used to...",
            options: ["Stimulate growth during a recession", "Reduce inflation when the economy is growing too fast", "Increase government debt intentionally", "Eliminate all taxation"],
            answer: 1,
            explain: "Contractionary policy reduces spending/increases taxes to slow the economy and control inflation when it's overheating."
          },
          {
            q: "Which is one of the government's main economic roles?",
            options: ["Providing public goods and correcting market failures", "Maximizing profits for private firms", "Setting wages for every industry", "Printing money to fund all spending"],
            answer: 0,
            explain: "Resource allocation includes providing public goods and correcting market failures like monopoly and externalities."
          },
          {
            q: "Property tax and inheritance tax are examples of...",
            options: ["Income tax", "Wealth tax", "Consumption tax", "Indirect tax"],
            answer: 1,
            explain: "Wealth tax is levied on asset ownership — examples include property, inheritance, and capital gains taxes."
          },
          {
            q: "Which of the following is DEVELOPMENT expenditure?",
            options: ["Civil servant salaries", "Welfare payments", "Building roads and schools", "Interest on government debt"],
            answer: 2,
            explain: "Development expenditure is long-term investment for growth — roads, bridges, schools, hospitals, transport, and R&D."
          },
          {
            q: "The effects of expansionary fiscal policy include...",
            options: ["Increased unemployment", "Increased consumer spending and economic growth", "A guaranteed budget surplus", "Lower government debt"],
            answer: 1,
            explain: "Expansionary policy increases consumer spending, business investment, employment, and GDP growth — but may raise inflation and deficits."
          },
          {
            q: "A negative consequence of contractionary fiscal policy is...",
            options: ["Higher inflation", "Reduced business profits and rising unemployment", "A larger budget deficit", "Faster economic growth"],
            answer: 1,
            explain: "Slowing the economy to fight inflation reduces consumer spending and profits, and may raise unemployment or even cause a recession if overdone."
          }
        ],
        takeaways: [
          "Government roles: allocate resources, redistribute income, stabilize the economy, regulate markets, and drive growth.",
          "Revenue comes from taxation, borrowing, and state-owned enterprises.",
          "Income tax is progressive; consumption tax is regressive; wealth tax targets assets.",
          "Spending splits into operating (daily running) and development (long-term investment).",
          "Expansionary fiscal policy fights recession; contractionary policy controls inflation — both carry trade-offs."
        ]
      },

      /* ---------------- TOPIC 9 ---------------- */
      {
        id: "t9",
        num: "09",
        title: "Unemployment and Inflation",
        summary: "Labor market indicators, types of unemployment, CPI and inflation formulas.",
        sections: [
          {
            heading: "Labor Market Indicators",
            points: [
              "Working-age population: people aged 16+ not in jail, hospital, another institution, or the armed forces.",
              { t: "Labor force = number employed + number unemployed.", important: true },
              "Working-age population = Labor force + Not in labor force.",
              "Example (May 2013, USA): population 316.1m → working-age civilian 245.6m → labor force 155.7m (employed 143.9m + unemployed 11.8m)."
            ]
          },
          {
            heading: "Key Formulas",
            points: [
              { t: "Unemployment Rate = (Number unemployed ÷ Labor force) × 100. Example: May 2013 → 7.6%.", important: true },
              { t: "Labor Force Participation Rate (LFPR) = (Labor force ÷ Working-age population) × 100. Example: May 2013 → 63.4%.", important: true }
            ]
          },
          {
            heading: "Alternative / Broader Measures",
            points: [
              "Marginally attached worker — has no job, is available and willing to work, hasn't searched in the last 4 weeks, but searched recently before that.",
              { t: "Discouraged worker — a marginally attached worker who stopped searching because previous attempts were discouraging.", important: true },
              "Example (May 2013): 753,000 discouraged workers + 1,372,000 other marginally attached → adjusted unemployment rate = 8.8%.",
              "Full-time workers usually work 35+ hrs/week; part-time workers usually work under 35 hrs/week.",
              "Part-time for economic reasons (involuntary): work 1–34 hrs/week but want full-time work — adding these (7.9m) plus marginally attached pushes the unemployment rate to 13.8%.",
              "Part-time jobs are attractive to employers because no benefits are paid and there's less government regulation."
            ]
          },
          {
            heading: "Types of Unemployment",
            points: [
              { t: "Frictional unemployment — arises from normal labor turnover (entering/leaving the labor force, job creation/destruction). Example: a graduate interviewing for their first job.", important: true },
              { t: "Structural unemployment — arises when technological change or international competition changes the skills needed or job locations. Example: ATMs in the 1970s destroyed many bank-teller jobs.", important: true },
              { t: "Cyclical unemployment — fluctuates with the business cycle, rising in recession and falling in expansion. Example: 2008–2009 recession layoffs.", important: true }
            ]
          },
          {
            heading: "Full Employment & Natural Unemployment",
            points: [
              "\u201cNatural\u201d unemployment = unemployment from frictions + structural change, when cyclical unemployment = 0.",
              "Natural unemployment rate = natural unemployment as a % of the labor force.",
              { t: "Full employment = when the unemployment rate equals the natural unemployment rate (no cyclical unemployment).", important: true },
              "Influences on natural unemployment: age distribution of the population, pace of structural change, real wage rate, unemployment benefits."
            ]
          },
          {
            heading: "Unemployment & Real GDP / Output Gap",
            points: [
              "Potential GDP = value of real GDP at full employment.",
              "Unemployment rate > natural rate → real GDP < potential GDP (negative output gap).",
              "Unemployment rate < natural rate → real GDP > potential GDP (positive output gap).",
              { t: "Output Gap = [(Real GDP − Potential GDP) ÷ Potential GDP] × 100%.", important: true },
              "At full employment, the output gap = 0."
            ]
          },
          {
            heading: "Consumer Price Index (CPI)",
            points: [
              { t: "CPI measures average prices paid by urban consumers for a fixed basket of consumer goods/services, calculated monthly.", important: true },
              "Reference base period: the period where CPI = 100 (currently 1982–1984 in the US example).",
              "Example: CPI May 2013 = 232.9 → prices 132.9% higher than the 1982–1984 average.",
              "Constructing the CPI (3 stages): selecting the CPI basket, conducting the monthly price survey, calculating the CPI.",
              "The CPI basket is NOT updated every month."
            ]
          },
          {
            heading: "CPI & Inflation Formulas",
            points: [
              { t: "CPI = (Cost of basket at current prices ÷ Cost of basket at base-period prices) × 100.", important: true },
              "Worked example (base year 2010): CPI(2010) = ($50÷$50)×100 = 100; CPI(2014) = ($70÷$50)×100 = 140.",
              { t: "Inflation Rate = [(CPI current year − CPI previous year) ÷ CPI previous year] × 100.", important: true },
              "Example: CPI goes 120 → 140 → inflation rate = (140−120)/120 × 100 = 16.7%.",
              "Deflation example: CPI July 2009 = 215.4, CPI July 2008 = 220.0 → inflation rate = (215.4−220.0)/220.0×100 = −2.1%.",
              { t: "Deflation = a situation where the inflation rate is negative.", important: true }
            ]
          },
          {
            heading: "CPI vs Cost of Living, and Sources of Bias",
            points: [
              "Cost of living index measures changes in the money needed to achieve a given standard of living.",
              { t: "CPI does NOT accurately measure the cost of living — it's a possibly biased measure.", important: true },
              "New Goods Bias — new goods perform better but cost more, creating an upward (inflationary) bias.",
              "Quality Change Bias — better products cost more than the versions they replace; a price rise for quality improvement isn't true inflation but may be measured as inflation.",
              "Commodity Substitution Bias — if beef rises faster than chicken, people substitute to chicken, but the CPI basket doesn't adjust for this.",
              "Outlet Substitution Bias — if prices rise, people shop more at discount stores, but the CPI basket doesn't account for outlet substitution."
            ]
          }
        ],
        quiz: [
          {
            q: "The Unemployment Rate formula is...",
            options: [
              "(Number unemployed ÷ Working-age population) × 100",
              "(Number unemployed ÷ Labor force) × 100",
              "(Labor force ÷ Number unemployed) × 100",
              "(Number employed ÷ Labor force) × 100"
            ],
            answer: 1,
            explain: "Unemployment Rate = (Number unemployed ÷ Labor force) × 100."
          },
          {
            q: "A worker who lost their job because ATMs replaced bank tellers is an example of...",
            options: ["Frictional unemployment", "Cyclical unemployment", "Structural unemployment", "Seasonal unemployment"],
            answer: 2,
            explain: "Structural unemployment arises when technological change alters the skills or locations needed for jobs — the ATM example is textbook structural unemployment."
          },
          {
            q: "Full employment occurs when...",
            options: [
              "The unemployment rate is 0%",
              "The unemployment rate equals the natural unemployment rate",
              "Cyclical unemployment is at its highest",
              "The output gap is negative"
            ],
            answer: 1,
            explain: "Full employment means unemployment rate = natural rate, i.e. cyclical unemployment is zero — not that unemployment is literally zero."
          },
          {
            q: "If CPI rises from 200 (previous year) to 220 (current year), the inflation rate is...",
            options: ["20%", "10%", "2%", "0.1%"],
            answer: 1,
            explain: "Inflation Rate = [(220−200)/200]×100 = 10%."
          },
          {
            q: "Which CPI bias occurs when people shift toward chicken as beef prices rise, but the basket doesn't adjust?",
            options: ["New Goods Bias", "Quality Change Bias", "Commodity Substitution Bias", "Outlet Substitution Bias"],
            answer: 2,
            explain: "Commodity Substitution Bias occurs because the fixed CPI basket doesn't capture consumers substituting between similar goods."
          },
          {
            q: "The working-age population equals...",
            options: ["Labor force + not in the labor force", "Employed − unemployed", "Total population − unemployed", "Only those currently with jobs"],
            answer: 0,
            explain: "Working-age population = labor force (employed + unemployed) + those not in the labor force."
          },
          {
            q: "Layoffs during the 2008–2009 recession are an example of...",
            options: ["Frictional unemployment", "Structural unemployment", "Cyclical unemployment", "Seasonal unemployment"],
            answer: 2,
            explain: "Cyclical unemployment fluctuates with the business cycle, rising in recession and falling in expansion."
          },
          {
            q: "At full employment, the output gap equals...",
            options: ["A positive value", "A negative value", "Zero", "The inflation rate"],
            answer: 2,
            explain: "At full employment real GDP = potential GDP, so the output gap = [(Real − Potential) ÷ Potential] × 100 = 0."
          },
          {
            q: "In the example, CPI May 2013 = 232.9 means...",
            options: ["Prices were 132.9% higher than the 1982–1984 base average", "Prices exactly doubled since the base period", "Prices fell since the base period", "The CPI is measured in dollars"],
            answer: 0,
            explain: "A CPI of 232.9 means the basket costs 232.9% of its base-period cost — i.e. 132.9% more than the 1982–1984 average."
          },
          {
            q: "The New Goods Bias in the CPI arises because...",
            options: ["New goods perform better but cost more, creating an upward inflationary bias", "Consumers switch to cheaper outlets", "Quality improvements are always subtracted", "The basket is updated every month"],
            answer: 0,
            explain: "New goods perform better but cost more than the goods they replace, which can overstate inflation (upward bias)."
          }
        ],
        takeaways: [
          "Unemployment rate = (unemployed ÷ labor force) × 100; LFPR = (labor force ÷ working-age population) × 100.",
          "Unemployment types: frictional (turnover), structural (skills/technology change), cyclical (business cycle).",
          "Full employment = unemployment at the natural rate, so cyclical unemployment is zero.",
          "CPI prices a fixed basket; the inflation rate is the % change in CPI; deflation is a negative rate.",
          "CPI biases to remember: new goods, quality change, commodity substitution, outlet substitution."
        ]
      },

      /* ---------------- TOPIC 10 ---------------- */
      {
        id: "t10",
        num: "10",
        title: "International Dimension of Economics",
        summary: "Trade theory, comparative advantage, and protectionism.",
        sections: [
          {
            heading: "Definitions",
            points: [
              { t: "International trade — exchange of goods/services between people of two or more countries, occurring because a country cannot efficiently produce everything on its own.", important: true },
              "Internal (domestic) trade — exchange of goods/services within the political boundaries of one country.",
              "Import trade — inflow of goods into a country. Export trade — outflow of goods from a country."
            ]
          },
          {
            heading: "Absolute Advantage Theory",
            points: [
              { t: "Definition: the ability of a country to produce more efficiently than another — using the same resources to produce more output, or the same output with fewer resources.", important: true },
              "Key assumptions: only two countries exist; only two goods are produced; free trade exists between them; no transportation costs; production follows the law of constant costs (same opportunity cost each unit); identical production functions between trading countries."
            ]
          },
          {
            heading: "Comparative Advantage Theory",
            points: [
              { t: "Definition: the fundamental force generating trade between nations — the ability of a country to produce a good at a lower opportunity cost than another country (basis = specialization).", important: true },
              "The basis for trade is divergent (different) opportunity costs between countries.",
              { t: "National comparative advantage = the ability of a nation to perform an activity/produce a good at a lower opportunity cost than any other nation.", important: true },
              "Importance: producing more efficiently means using resources more efficiently, increasing production, and enjoying a greater variety of goods/services.",
              "Worked example: China has a lower opportunity cost producing T-shirts (comparative advantage in T-shirts); the USA has a lower opportunity cost producing airplanes (comparative advantage in airplanes). Both specialize and trade → both gain."
            ]
          },
          {
            heading: "Advantages & Disadvantages of Trade",
            points: [
              "Advantages: increased world output, variety of goods/services, better relationships with trading partners, higher income and economic growth, shared knowledge and technology.",
              "Disadvantages: depletion of a country's reserves, economic and political dependence on trading partners, transportation costs."
            ]
          },
          {
            heading: "Protectionism",
            points: [
              { t: "Definition: even though international trade increases world output, most countries restrict trade to protect local products from foreign competition.", important: true },
              "National security — protect industries producing essential goods (food, defense equipment).",
              "Infant industry — protect new/young domestic industries until they can compete.",
              "Anti-dumping — prevent foreign countries from \u201cdumping\u201d goods at artificially cheap prices.",
              "Domestic employment — protect local jobs from foreign competition.",
              "Low foreign wage — protect domestic industries from countries with cheaper labor costs."
            ]
          },
          {
            heading: "Tools of Protectionism",
            points: [],
            table: {
              caption: "Tools / Instruments of Protectionism",
              headers: ["Tool", "Definition"],
              rows: [
                ["Tariffs", "Tax/duty paid on a particular class of imports or exports"],
                ["Quotas", "Government-imposed restriction limiting quantity/value of goods a country can import/export in a given period"],
                ["Embargos", "Official ban on trade/commercial activity with a particular country"],
                ["Import license", "Document issued by national government authorizing importation of certain goods"],
                ["Exchange control", "Government-imposed controls/restrictions on private foreign-currency transactions"],
                ["Industry subsidies", "Benefit given (usually by government) to support a domestic industry"]
              ]
            }
          },
          {
            heading: "Why Countries Engage in International Trade",
            points: [
              "Differences in resources between countries.",
              "Comparative advantage (gains from specialization).",
              "To expand market size.",
              "To acquire advanced technology."
            ]
          }
        ],
        quiz: [
          {
            q: "Comparative advantage is based on...",
            options: [
              "Producing more output than any other country in absolute terms",
              "Producing a good at a lower opportunity cost than another country",
              "Having more natural resources than other countries",
              "Refusing to trade with other countries"
            ],
            answer: 1,
            explain: "Comparative advantage is about relative (opportunity cost) efficiency, not absolute output."
          },
          {
            q: "In the worked example, which country has comparative advantage in T-shirts?",
            options: ["USA", "China", "Both equally", "Neither"],
            answer: 1,
            explain: "China has the lower opportunity cost for T-shirts, giving it comparative advantage in T-shirt production."
          },
          {
            q: "A government banning all trade with a specific country is an example of a...",
            options: ["Tariff", "Quota", "Embargo", "Subsidy"],
            answer: 2,
            explain: "An embargo is an official ban on trade/commercial activity with a particular country."
          },
          {
            q: "'Protecting a new domestic industry until it can compete' is the ___ argument for protectionism.",
            options: ["National security", "Infant industry", "Anti-dumping", "Low foreign wage"],
            answer: 1,
            explain: "The infant industry argument justifies protecting young domestic industries until they mature enough to compete."
          },
          {
            q: "Which is listed as a disadvantage of international trade?",
            options: ["Shared knowledge and technology", "Increased world output", "Economic and political dependence on trading partners", "Greater variety of goods"],
            answer: 2,
            explain: "Dependence on trading partners, depletion of reserves, and transportation costs are the listed disadvantages."
          },
          {
            q: "Absolute advantage is the ability to...",
            options: ["Produce a good at a lower opportunity cost than another country", "Produce more efficiently than another country using the same resources", "Set the world price of a good", "Export more than any other country"],
            answer: 1,
            explain: "Absolute advantage means producing more efficiently — more output with the same resources, or the same output with fewer resources."
          },
          {
            q: "Which is an advantage of international trade?",
            options: ["Depletion of a country's reserves", "Economic and political dependence", "Increased world output", "Higher transportation costs"],
            answer: 2,
            explain: "Trade advantages include increased world output, variety, better relations, higher income, and shared technology."
          },
          {
            q: "A tariff is...",
            options: ["A ban on trade with a particular country", "A tax paid on a class of imports or exports", "A quantity limit on imports", "A restriction on foreign currency transactions"],
            answer: 1,
            explain: "A tariff is a tax/duty on a particular class of imports or exports — a key tool of protectionism."
          },
          {
            q: "Which is a reason countries engage in international trade?",
            options: ["Differences in resources between countries", "To reduce the variety of available goods", "To lower their income", "To block advanced technology"],
            answer: 0,
            explain: "Trade happens because of resource differences, comparative advantage, larger markets, and access to advanced technology."
          },
          {
            q: "An import license is...",
            options: ["A tax on exports", "A government-issued document authorizing the importation of certain goods", "An official ban on imports", "A subsidy paid to domestic producers"],
            answer: 1,
            explain: "An import license is a document issued by the national government authorizing importation of certain goods."
          }
        ],
        takeaways: [
          "Comparative advantage — producing at a lower opportunity cost — is the real basis for gainful trade.",
          "Countries trade due to resource differences, bigger markets, and access to advanced technology.",
          "Trade boosts world output but can create dependence and drain a country's reserves.",
          "Protectionist tools: tariffs, quotas, embargoes, import licenses, exchange control, and subsidies.",
          "Protection is argued on national security, infant industries, anti-dumping, jobs, and wage grounds."
        ]
      },
    ],

    formulaSheet: [
      "Opportunity Cost (PPF) = Decrease in y ÷ Increase in x",
      "Total Expenditure = C + I + G + NX",
      "Y (Income) = C + I + G + NX",
      "Y = C + S + NT",
      "Net exports (NX) = Exports − Imports",
      "Net domestic product at factor cost = Wages + Interest + Rent + Profit",
      "GDP (income approach) = Net domestic product at factor cost + Indirect taxes − Subsidies + Depreciation",
      "Statistical discrepancy = GDP (expenditure) − GDP (income)",
      "U.S. GNP = U.S. GDP + Net factor income from abroad",
      "Disposable personal income = Household income − Personal income taxes",
      "Real GDP per person = Real GDP ÷ Population",
      "Unemployment Rate = (Number unemployed ÷ Labor force) × 100",
      "Labor Force Participation Rate = (Labor force ÷ Working-age population) × 100",
      "CPI = (Cost of basket at current prices ÷ Cost of basket at base prices) × 100",
      "Inflation Rate = [(CPI current − CPI previous) ÷ CPI previous] × 100",
      "Output Gap = [(Real GDP − Potential GDP) ÷ Potential GDP] × 100%"
    ]
  },

  {
    id: "thinking",
    name: "Thinking Skills",
    code: "TS 0001",
    tagline: "Critical & Creative Thinking",
    color: "#9b59b6",
    icon: "thinking",
    topics: [

      /* ---------------- THINKING TOPIC 1 ---------------- */
      {
        id: "ts1",
        num: "01",
        title: "Neuroplasticity, Emotion & Rationality",
        summary: "The brain's logical and emotional systems, and how neuroplasticity strengthens thinking.",
        sections: [
          {
            heading: "Prefrontal Cortex (Logical Thinking)",
            points: [
              "The prefrontal cortex is the brain's logical and rational thinking area.",
              "It helps with planning, problem-solving, decision-making, self-control, and critical thinking."
            ]
          },
          {
            heading: "Limbic System (Emotion & Learning)",
            points: [
              "The limbic system is responsible for emotions, motivation, memory, and learning.",
              "It influences how we react emotionally and helps create memories, especially emotional ones."
            ]
          },
          {
            heading: "Neuroplasticity",
            points: [
              "Neuroplasticity is the brain's ability to adapt, reorganize, and form new neural pathways throughout life.",
              "Learning new skills and repeating behaviours strengthen these neural pathways, making tasks easier over time."
            ]
          },
          {
            heading: "Why Is Neuroplasticity Important",
            points: [
              "Neuroplasticity is important because it allows the brain to adapt, learn, and change throughout life.",
              "It helps us develop new skills, recover from challenges, and improve how we think and behave.",
              "Key reasons:",
              "Supports learning.",
              "Strengthens memory.",
              "Helps the brain recover.",
              "Builds good habits.",
              "Supports adaptation."
            ]
          },
          {
            heading: "Neural Pathways",
            points: [
              "Neural pathways are connections between neurons that carry information.",
              "The more they are used, the stronger and more efficient they become (\"practice makes permanent\").",
              "Why neural pathways are important:",
              "Enable learning and memory.",
              "Help develop new skills and habits.",
              "Improve problem-solving and decision-making.",
              "Support emotional regulation.",
              "Allow the brain to recover and adapt after injury by forming new connections."
            ]
          },
          {
            heading: "Emotion vs Rationality",
            table: {
              caption: "Emotion vs Rationality",
              headers: ["Emotion (Limbic System)", "Rationality (Prefrontal Cortex)"],
              rows: [
                ["Based on feelings", "Based on logic and reasoning"],
                ["Fast, automatic responses", "Careful, planned decisions"],
                ["Motivates behaviour", "Evaluates consequences"]
              ]
            }
          },
          {
            heading: "Why Are They Equally Important?",
            points: [
              "Emotion gives us motivation, empathy, and helps us learn from experiences.",
              "Rationality helps us think clearly, control impulses, and make good decisions.",
              "The brain works best when the limbic system and prefrontal cortex work together.",
              "Through neuroplasticity, we can strengthen neural pathways that improve both emotional regulation and logical thinking."
            ]
          },
          {
            heading: "Example: A Student Gets a Low Exam Score",
            points: [
              "Limbic system: Feels disappointed and frustrated.",
              "Prefrontal cortex: Analyses mistakes, creates a study plan, and works to improve.",
              "Neuroplasticity: Regular practice strengthens the neural pathways for learning, leading to better future performance."
            ]
          },
          {
            heading: "Exam Keyword",
            points: [
              "Neuroplasticity = new neural pathways → learning and adaptation.",
              "Emotion + Rationality = balanced thinking and better decision-making."
            ]
          }
        ],
        quiz: []
      },

      /* ---------------- THINKING TOPIC 2 ---------------- */
      {
        id: "ts2",
        num: "02",
        title: "Logical Fallacies: Hasty Generalisation & Sunk Cost",
        summary: "Mistakes in reasoning, why reliability matters, and comparing the two fallacies.",
        sections: [
          {
            heading: "What is a Fallacy?",
            points: [
              "A fallacy is a mistake in reasoning or thinking that leads to an incorrect or weak conclusion.",
              "Fallacies may sound convincing, but they are based on faulty logic or insufficient evidence."
            ]
          },
          {
            heading: "Hasty Generalisation",
            points: [
              "Definition: A hasty generalisation is a fallacy where someone makes a broad conclusion based on too little or limited evidence.",
              "Description: Instead of collecting enough facts or examples, a person jumps to a conclusion after seeing only one or a few cases.",
              "Example: \"I met two rude shop assistants, so all shop assistants are rude.\""
            ]
          },
          {
            heading: "Sunk Cost Fallacy",
            points: [
              "Definition: The sunk cost fallacy is the tendency to continue investing time, money, or effort into something because you have already invested a lot, even when it is no longer beneficial.",
              "Description: People focus on what they have already lost instead of making the best decision for the future.",
              "Example: A person keeps watching a boring movie because they already paid for the ticket."
            ]
          },
          {
            heading: "Reliability",
            points: [
              "Definition: Reliability refers to the consistency or repeatability of evidence or research results.",
              "Description: If the same study or test is repeated under the same conditions and produces similar results, it is considered reliable.",
              "Example: If a science experiment gives the same results every time it is repeated, it has high reliability."
            ]
          },
          {
            heading: "Exam Tip",
            points: [
              "Fallacy = error in reasoning.",
              "Hasty Generalisation = general conclusion from too little evidence.",
              "Sunk Cost Fallacy = continuing because of past investment.",
              "Reliability = results can be repeated consistently."
            ]
          },
          {
            heading: "Why Is Reliability Important?",
            points: [
              "Reliability is important because it ensures that evidence or research results are consistent and trustworthy.",
              "If the same test or study produces similar results every time it is repeated, we can have greater confidence that the findings are accurate and dependable.",
              "Reliable evidence helps people make better decisions and supports stronger conclusions."
            ]
          },
          {
            heading: "Similarity between Hasty Generalisation and Sunk Cost Fallacy",
            points: [
              "Both are logical fallacies (errors in thinking or reasoning).",
              "Both can lead to poor decisions.",
              "Both rely on faulty reasoning instead of careful, logical thinking."
            ]
          },
          {
            heading: "Difference between Hasty Generalisation and Sunk Cost Fallacy",
            table: {
              caption: "Hasty Generalisation vs Sunk Cost Fallacy",
              headers: ["Hasty Generalisation", "Sunk Cost Fallacy"],
              rows: [
                ["Makes a broad conclusion based on too little evidence.", "Continues a decision because of past time, money, or effort invested."],
                ["Problem is insufficient evidence.", "Problem is focusing on past investment instead of future benefits."],
                ["Example: \"Two students cheated, so all students cheat.\"", "Example: Continuing a failing business because you have already spent a lot of money on it."]
              ]
            }
          },
          {
            heading: "Easy Exam Answer",
            points: [
              "Reliability is important because it makes evidence consistent, trustworthy, and repeatable.",
              "Similarity: Both are logical fallacies that can lead to poor decisions.",
              "Difference: Hasty generalisation is about jumping to conclusions with too little evidence, while sunk cost is about continuing something because of past investment, even when it no longer makes sense."
            ]
          }
        ],
        quiz: []
      },

      /* ---------------- THINKING TOPIC 3 ---------------- */
      {
        id: "ts3",
        num: "03",
        title: "Evidence Evaluation",
        summary: "Evaluating evidence using the four criteria: Reliable, Valid, Current, Authoritative.",
        sections: [
          {
            heading: "Overview",
            points: [
              "The exam tests whether you can evaluate evidence using four criteria and explain your reasoning."
            ]
          },
          {
            heading: "1. Reliable",
            points: [
              "Definition: Evidence that gives consistent and repeatable results if checked again or by someone else.",
              "Example: A thermometer gives the same temperature reading every time under the same conditions.",
              "Why important? Results can be trusted. Others can repeat the test and get similar findings."
            ]
          },
          {
            heading: "2. Valid",
            points: [
              "Definition: Evidence that actually measures or proves what it is supposed to measure.",
              "Example: An IQ test should measure intelligence, not a person's eyesight."
            ]
          },
          {
            heading: "3. Current",
            points: [
              "Definition: Evidence that is up to date and still accurate today.",
              "Example: Using the latest medical guidelines instead of research from 20 years ago."
            ]
          },
          {
            heading: "4. Authoritative",
            points: [
              "Definition: Evidence that comes from a credible, qualified, and trustworthy source.",
              "Example: Information from the Ministry of Health, the World Health Organization (WHO), or a peer-reviewed scientific journal."
            ]
          },
          {
            heading: "Easy Way to Remember",
            points: [
              "Reliable = can it be repeated with the same results?",
              "Valid = does it measure what it claims?",
              "Current = is it up to date?",
              "Authoritative = is it from a trusted expert or source?",
              "Summary: Reliable → can be repeated; Valid → measures the right thing; Current → latest, not outdated; Authoritative → trusted expert/source."
            ]
          },
          {
            heading: "Possible Exam Question",
            points: [
              "\"Evaluate this evidence using the four criteria.\"",
              "Your answer should look like this:",
              "Reliable: Yes, because the results can be repeated consistently.",
              "Valid: Yes, because it directly measures what it claims.",
              "Current: Yes, because the information is recent and up to date.",
              "Authoritative: Yes, because it comes from a qualified and credible source."
            ]
          },
          {
            heading: "Why Do We Need Evidence to Be Reliable?",
            points: [
              "Evidence needs to be reliable because it should produce consistent and repeatable results.",
              "If the same evidence is tested or checked again by the same or different people, it should give similar results.",
              "This makes the evidence trustworthy and increases confidence in the conclusion.",
              "Short exam answer: Reliability is important because it ensures evidence is consistent, repeatable, and trustworthy."
            ]
          },
          {
            heading: "Don't Mix \u201cReliable\u201d and \u201cValid\u201d with \u201cCurrent\u201d",
            points: [
              "Reliable — Definition: Evidence gives consistent and repeatable results. Question: Would this evidence give the same results if checked again?",
              "Valid — Definition: Evidence actually measures or proves what it is intended to measure or support. Question: Does this evidence support the claim it is being used for?",
              "Current — Definition: Evidence is up to date and reflects the most recent information. Why is it important? To prevent using outdated information that may have changed or been replaced by newer evidence. Question: Is this evidence still accurate today?",
              "Authoritative — Definition: Evidence comes from a credible, qualified, and trustworthy source. Question: Was it produced by someone with the expertise or authority to know..."
            ]
          }
        ],
        quiz: []
      },

      /* ---------------- THINKING TOPIC 4 ---------------- */
      {
        id: "ts4",
        num: "04",
        title: "Six Thinking Hats",
        summary: "Edward de Bono's framework — applying Black & Yellow Hats, and understanding all six.",
        sections: [
          {
            heading: "What the Exam Is Testing",
            points: [
              "The exam wants to see whether you can apply Edward de Bono's Six Thinking Hats framework to a real situation.",
              "You need to show that:",
              "You understand the purpose of each hat.",
              "You can generate specific points based on the scenario.",
              "You do not simply describe Black Hat as \"negative\" and Yellow Hat as \"positive\".",
              "You understand that these hats are structured thinking methods, not personal opinions."
            ]
          },
          {
            heading: "Example Scenario",
            points: [
              "A university proposes using AI tools to help students with learning."
            ]
          },
          {
            heading: "Black Hat: Caution / Risk-Focused Thinking",
            points: [
              "Purpose: To identify possible problems, risks, limitations, and weaknesses before making a decision.",
              "How to apply: Ask questions such as: What could go wrong? What are the limitations? What risks should we consider?",
              "Example points:",
              "Students may become too dependent on AI and reduce their own critical thinking skills.",
              "AI-generated information may contain mistakes or unreliable sources.",
              "Not all students may have equal access to technology or internet connection.",
              "Privacy issues may occur if students share personal information with AI systems.",
              "Students may misuse AI for cheating instead of learning.",
              "Important: Black Hat thinking does not mean rejecting the idea. It helps identify problems and prepare solutions."
            ]
          },
          {
            heading: "Yellow Hat: Optimistic / Benefit-Focused Thinking",
            points: [
              "Purpose: To identify possible advantages, opportunities, and positive outcomes.",
              "How to apply: Ask questions such as: What benefits can this idea provide? How can this improve the situation? What opportunities may happen?",
              "Example points:",
              "AI can provide quick explanations and support students outside classroom hours.",
              "Students can use AI to improve writing, research, and problem-solving skills.",
              "Lecturers can use AI tools to create better learning materials.",
              "Students can receive personalised feedback based on their learning needs.",
              "AI can make education more accessible and flexible.",
              "Important: Yellow Hat thinking is not blindly positive. It focuses on realistic benefits."
            ]
          },
          {
            heading: "Connection to Neural Pathways and Repeated Behaviour",
            points: [
              "Neural pathways are connections between neurons in the brain that allow information and behaviours to become easier and faster over time.",
              "How repeated behaviour strengthens neural pathways:",
              "1. A person repeats a behaviour or way of thinking. (Example: A student regularly practices analysing ideas using Black Hat and Yellow Hat thinking.)",
              "2. Neurons communicate repeatedly. (The brain strengthens the connections between neurons involved in that activity.)",
              "3. The pathway becomes stronger and more efficient. (The thinking process becomes easier and requires less effort.)",
              "4. The behaviour becomes a habit. (The student naturally starts considering both risks and benefits before making decisions.)",
              "Example: If a student repeatedly practices Black Hat (identifying risks before acting) and Yellow Hat (finding opportunities and solutions), the brain develops stronger pathways for critical thinking and balanced decision-making."
            ]
          },
          {
            heading: "Exam Answer Structure (Easy to Remember)",
            points: [
              "1. Name the hat + purpose → Black Hat focuses on risks and limitations. Yellow Hat focuses on benefits and opportunities.",
              "2. Apply to scenario with specific examples → Give 2–3 realistic points for each hat.",
              "3. Link to neural pathways → Repeated use strengthens neural connections, making the thinking skill become faster, easier, and automatic."
            ]
          },
          {
            heading: "White Hat – Facts and Information",
            points: [
              "Purpose: Focuses on objective information, data, and evidence.",
              "Key points: Looks for facts, statistics, and available information; identifies what is known and what information is missing; avoids opinions and emotions.",
              "Elaboration: The White Hat helps people make decisions based on reliable evidence rather than assumptions. It asks questions such as: \"What facts do we know?\" \"What information do we need before deciding?\"",
              "Example: Before introducing online learning, gather data about student internet access, learning outcomes, and technology availability."
            ]
          },
          {
            heading: "Red Hat – Emotions and Feelings",
            points: [
              "Purpose: Focuses on feelings, intuition, and personal reactions.",
              "Key points: Allows people to express emotions without needing to justify them; considers how people may feel about an idea; recognises that emotions can influence decisions.",
              "Elaboration: The Red Hat acknowledges that feelings are part of human decision-making. It helps identify concerns, excitement, fears, or preferences that may affect acceptance of an idea.",
              "Example: Students may feel excited about flexible online learning but may also feel worried about losing face-to-face interaction."
            ]
          },
          {
            heading: "Black Hat – Caution and Risk",
            points: [
              "Purpose: Focuses on risks, weaknesses, limitations, and possible problems.",
              "Key points: Identifies what could go wrong; evaluates dangers and disadvantages; helps prevent poor decisions.",
              "Elaboration: The Black Hat is a critical thinking approach that helps people recognise potential challenges before taking action. It is not simply being negative; it helps improve ideas by finding solutions to problems.",
              "Example: Using AI in education may create risks such as incorrect information, student dependency, or misuse for cheating."
            ]
          },
          {
            heading: "Yellow Hat – Benefits and Positivity",
            points: [
              "Purpose: Focuses on advantages, opportunities, and positive outcomes.",
              "Key points: Identifies the value of an idea; looks for opportunities and improvements; encourages constructive optimism.",
              "Elaboration: The Yellow Hat helps people understand why an idea may work and what benefits it can bring. It focuses on realistic positive outcomes rather than unrealistic optimism.",
              "Example: AI tools can help students receive faster feedback, improve learning, and access information more easily."
            ]
          },
          {
            heading: "Green Hat – Creativity and New Ideas",
            points: [
              "Purpose: Focuses on creativity, alternatives, and innovation.",
              "Key points: Generates new solutions and possibilities; encourages creative thinking; explores different approaches.",
              "Elaboration: The Green Hat allows people to think beyond traditional methods and develop unique solutions. It encourages brainstorming without immediate judgement.",
              "Example: Instead of only using traditional lectures, a university could create interactive AI-based learning activities or virtual classrooms."
            ]
          },
          {
            heading: "Blue Hat – Managing the Thinking Process",
            points: [
              "Purpose: Focuses on organising, controlling, and guiding the thinking process.",
              "Key points: Sets goals and manages discussions; decides which thinking approach should be used; summarises ideas and makes conclusions.",
              "Elaboration: The Blue Hat acts as the \"leader\" of the thinking process. It ensures that all perspectives are considered before making a final decision.",
              "Example: A team leader guides a discussion by using White Hat for facts, Black Hat for risks, Yellow Hat for benefits, and Green Hat for solutions before deciding."
            ]
          },
          {
            heading: "Easy Memory Trick",
            points: [
              "White = Information (What do we know?)",
              "Red = Feelings (How do we feel?)",
              "Black = Risks (What can go wrong?)",
              "Yellow = Benefits (What can go right?)",
              "Green = Creativity (What new ideas can we create?)",
              "Blue = Control (How do we manage thinking?)"
            ]
          }
        ],
        quiz: []
      },

      /* ---------------- THINKING TOPIC 5 ---------------- */
      {
        id: "ts5",
        num: "05",
        title: "SCAMPER, Decision-Making, Illumination & Verification",
        summary: "Idea generation with SCAMPER, the decision-making steps, and the creative problem-solving stages.",
        sections: [
          {
            heading: "SCAMPER: Idea Generating Tool",
            points: [
              "SCAMPER is a creative thinking technique that helps generate new ideas by viewing an existing idea, product, or problem from 7 different perspectives/angles."
            ]
          },
          {
            heading: "SCAMPER Stands For",
            table: {
              caption: "The 7 SCAMPER perspectives",
              headers: ["Letter", "Meaning", "Purpose", "Example", "Potential problem"],
              rows: [
                ["S — Substitute", "Replace something with another option.", "To find improvements by changing existing elements.", "Replace printed textbooks with digital e-books to make learning more accessible.", "Some students may not have access to devices or internet."],
                ["C — Combine", "Mix two or more ideas, products, or processes together.", "To create a new solution by combining strengths.", "Combine online learning platforms with face-to-face classes (blended learning).", "Requires good planning and technology support."],
                ["A — Adapt", "Modify an existing idea to fit a new situation.", "To improve usefulness by adjusting an idea.", "Adapt a fitness app to include mental health tracking.", "The adapted feature may not meet users' needs."],
                ["M — Modify / Magnify / Minify", "Change the size, appearance, features, or design.", "To improve performance or user experience.", "Modify a learning app by adding interactive quizzes.", "Too many features may make the app complicated."],
                ["P — Put to Another Use", "Find a different purpose for an existing idea.", "To discover new opportunities.", "Use old school computers as digital training tools for communities.", "Equipment may not meet modern requirements."],
                ["E — Eliminate", "Remove unnecessary parts.", "To simplify and improve efficiency.", "Remove unnecessary steps from an online registration process.", "Removing features may reduce usefulness."],
                ["R — Reverse / Rearrange", "Change the order or approach.", "To discover alternative methods.", "Reverse traditional learning by allowing students to watch lectures before class (flipped classroom).", "Students may not prepare before lessons."]
              ]
            }
          },
          {
            heading: "Decision-Making Process Using SCAMPER",
            points: [
              "Step 1: Identify the problem or idea — Understand what needs improvement. Example: Students struggle with traditional learning methods.",
              "Step 2: Generate ideas using SCAMPER — Explore the idea from seven different perspectives. Create possible improvements or alternatives.",
              "Step 3: Evaluate ideas — Consider: benefits, risks, cost, resources needed, feasibility.",
              "Step 4: Select the best solution — Choose the idea that provides the most value and is realistic to implement.",
              "Step 5: Implement and review — Put the idea into action. Collect feedback. Make improvements if needed."
            ]
          },
          {
            heading: "Potential Problems When Using SCAMPER",
            points: [
              "Too many ideas: It may become difficult to choose the best option.",
              "Limited resources: Good ideas may require money, time, or technology.",
              "Resistance to change: People may reject new methods.",
              "Unrealistic ideas: Some creative ideas may not be practical.",
              "Lack of information: Decisions may be made without enough evidence."
            ]
          },
          {
            heading: "Illumination and Verification Process",
            points: [
              "These are stages in the Creative Problem-Solving Process.",
              "Illumination: Meaning — The stage where a new idea or solution suddenly appears after exploring and thinking about a problem.",
              "What happens during illumination: The brain connects different pieces of information; new possibilities are discovered; creative solutions are generated.",
              "Example: After using SCAMPER, a student realises that combining online learning with classroom activities can solve learning difficulties.",
              "Verification (Testing the Idea): Meaning — The stage where the idea is tested to determine whether it works.",
              "What happens during verification: Check if the idea is practical; gather evidence and feedback; identify weaknesses; improve the solution.",
              "Example: A university tests blended learning with a small group of students and evaluates their feedback before applying it widely."
            ]
          },
          {
            heading: "Linking SCAMPER with Neural Pathways",
            points: [
              "When a person repeatedly practices creative thinking techniques like SCAMPER:",
              "1. The brain repeatedly activates creativity and problem-solving pathways.",
              "2. Neural connections become stronger through repetition.",
              "3. Thinking creatively becomes faster and more automatic.",
              "4. The person develops better decision-making skills.",
              "Example: A student who regularly uses SCAMPER will naturally begin looking at problems from multiple perspectives instead of relying on one solution."
            ]
          },
          {
            heading: "Exam Answer Structure",
            points: [
              "1. Define SCAMPER → a tool that generates ideas using 7 perspectives.",
              "2. Explain each letter with examples.",
              "3. Describe decision-making steps.",
              "4. Explain illumination (idea generation) and verification (testing).",
              "5. Link repeated practice to stronger neural pathways."
            ]
          }
        ],
        quiz: []
      }
    ],

    formulaSheet: [
      "Neuroplasticity = new neural pathways → learning and adaptation",
      "Emotion + Rationality = balanced thinking and better decision-making",
      "Fallacy = error in reasoning",
      "Hasty Generalisation = general conclusion from too little evidence",
      "Sunk Cost Fallacy = continuing because of past investment",
      "Reliability = results can be repeated consistently",
      "Valid = measures the right thing",
      "Current = latest, not outdated",
      "Authoritative = trusted expert/source",
      "Reliable = can it be repeated with the same results?",
      "SCAMPER = Substitute · Combine · Adapt · Modify/Magnify/Minify · Put to another use · Eliminate · Reverse/Rearrange"
    ]
  },

/* ============================================================
/* ============================================================
    MULTIMEDIA AND WEB PUBLISHING SUBJECT
    ============================================================ */
  {
    id: "mw",
    name: "Fundamentals of Multimedia and Web Publishing",
    code: "ITMF0024",
    tagline: "Elements, Internet, HTML, Networks, E-Commerce & Web Design",
    color: "#10b981",
    icon: "multimedia",
    chaptersLabel: "ITMF0024 · Ch 1-9",
    dockDefault: "detailed",
    topics: [

      /* ================= TOPIC 1: MULTIMEDIA FUNDAMENTALS (CH 1) ================= */
      {
        id: "w1",
        num: "01",
        title: "Multimedia Fundamentals",
        summary: "What multimedia is, its five elements, system & product characteristics, types of applications, the development process and design considerations.",
        sections: [
          {
            heading: "What is Multimedia",
            points: [
              "Multimedia is any combination of text, graphics, sound, animation and video used to communicate ideas to users effectively.",
              "Tay Vaughan: 'Multimedia is any combination of text, graphic art, sound, animation and video delivered to you by computer or other electronic means.'",
              "Stephen Mc Gloughin: 'Multimedia is the presentation of a computer application, incorporating media elements such as text, graphics, video, animation and sound on computer.'",
              "A multimedia system encompasses the computer and software systems used in multimedia environments — it has interactive control, and distributed multimedia systems operate over a network infrastructure."
            ]
          },
          {
            heading: "The Five Multimedia Elements",
            points: [
              "Text — the most common element; delivers a message in the most straightforward way as characters; used as labels, prompts and simple directions; should grab attention through size and colour.",
              "Audio — gives the impact of hearing: music (enhances emotion — sadness, happiness, patriotism, love), and sound effects (used for a specific point, not just background noise, e.g. an explosion to show anger).",
              "Graphics — pictures, photos, slides, illustrations, drawings and still images; show meaning quicker than text (showing a photo of an apple is faster than describing its shape, colour and size).",
              "Animation — shows movement; objects appear to move because a series of slightly different pictures are displayed rapidly in sequence (like flipping a book).",
              "Video — the most complicated element and the one with the most impact; includes full motion, still graphics, audio and animation; conveys a great deal of information in the least time.",
              "Note: video is used for realistic events (e.g. a birthday party); animation is used for unrealistic events that are hard to film (e.g. blood flow in the human body)."
            ]
          },
          {
            heading: "Multimedia System Characteristics (4)",
            points: [
              "Computer-controlled — a computer produces, stores, transmits and presents the information to the end user.",
              "Integration — all components (text, graphics, audio, video, animation) are controlled by software/computer so you can read, hear and see them at the same time.",
              "Use of digitized data — text, sound, pictures, video and numbers must be converted into digital data the computer can recognise.",
              "Interactivity — users navigate a presentation using a mouse, keyboard or touch screen; interactivity can be feedback or navigation control."
            ]
          },
          {
            heading: "Multimedia Product Characteristics (4)",
            points: [
              "Information present on a computer.",
              "Links.",
              "Navigation tools (e.g. icons, buttons).",
              "Interactive presentation."
            ]
          },
          {
            heading: "Types of Multimedia Applications",
            points: [
              "Linear multimedia — plays from a start position to an end position with little or no intervention; the user has very little control (e.g. a movie).",
              "Interactive multimedia — allows the viewer to jump around the material; the user controls what and when; useful for information archives, education, training and entertainment."
            ]
          },
          {
            heading: "Multimedia Development Process",
            points: [
              "The stages are: Content Definition → Storyboard Design → Building Blocks → Authoring → Testing and Revision → Delivery."
            ]
          },
          {
            heading: "Design Considerations",
            points: [
              "Target Audience — know age, educational level, learning styles, culture, needs, expertise, preferred colours, equipment and psychological profile.",
              "Goals & Objectives — the purpose of the application, what you are trying to accomplish, and the expected result.",
              "Program Content — the specific message/data provided by a Content Specialist; the Multimedia Architect presents and displays it to the audience.",
              "MM Building Blocks — elements are produced with various software and imported into an authoring application, considering budget, time, expertise and distribution.",
              "Interactivity Level — how much control the user has (important in education, training and direct-sales).",
              "Internet Applications — developing for the Web is now the norm; developers need multimedia authoring, animation, compression and browser-playback knowledge."
            ]
          }
        ],
        quiz: [
          { q: "Which element is described as the most complicated and having the most impact on the audience?", options: ["Text", "Graphics", "Video", "Animation"], answer: 2, explain: "Video is the most complicated multimedia element and gives the most impact, combining full motion, graphics, audio and animation." },
          { q: "Which characteristic means all components are controlled so you see and hear them at the same time?", options: ["Computer-controlled", "Integration", "Digitized data", "Interactivity"], answer: 1, explain: "Integration means all multimedia components are controlled by software so text, audio, video, graphics and animation play together." },
          { q: "A movie is an example of which type of multimedia?", options: ["Interactive", "Linear", "Hypermedia", "Distributed"], answer: 1, explain: "Linear multimedia plays start to end with little user control; a movie is the classic example." },
          { q: "Who is responsible for presenting and displaying the content to the audience?", options: ["Content Specialist", "Multimedia Architect", "End user", "ISP"], answer: 1, explain: "The Multimedia Architect presents and displays the content; the Content Specialist provides the research/content." }
        ],
        takeaways: [
          "Multimedia = text + graphics + sound + animation + video to communicate ideas.",
          "Four system characteristics: computer-controlled, integration, digitized data, interactivity.",
          "Linear = little control (movie); Interactive = user controls what & when.",
          "Development process: Content Definition → Storyboard → Building Blocks → Authoring → Testing → Delivery."
        ]
      },

      /* ================= TOPIC 2: INTERNET & WWW (CH 1) ================= */
      {
        id: "w2",
        num: "02",
        title: "Internet & WWW",
        summary: "What the Internet and cyberspace are, how to access it via ISPs, internet addresses, TLDs, URLs and the World Wide Web.",
        sections: [
          {
            heading: "What is the Internet?",
            points: [
              "A large collection of computers all over the world connected to one another in various ways; also called 'the Net' — a worldwide system of computer networks.",
              "It enables you to acquire a file or document from anywhere in the world.",
              "Cyberspace — an environment where people communicate among themselves using computers.",
              "Information Highway — the largest computer network; the borderless marketplace; an information distribution system; the largest human communication system; a technology platform."
            ]
          },
          {
            heading: "Internet Uses",
            points: [
              "Information resources — news, weather, economics, sports.",
              "E-mail; software downloads; discussions (forums, chat).",
              "Entertainment; business & advertisement (electronic commerce).",
              "Education — courseware, lecture notes, quizzes, exercises.",
              "Miscellaneous — politics, gossip and negative elements."
            ]
          },
          {
            heading: "The Birth of the Internet",
            points: [
              "1960 — Advanced Research Projects Agency (ARPA) was formed and initiated network research in universities and labs.",
              "January 1, 1983 — the Internet was born, with 562 connected computers.",
              "1992 — the Web was used to publish research materials.",
              "1997 — the Web was used to create dynamic, interactive sites."
            ]
          },
          {
            heading: "How to Access the Internet (ISP)",
            points: [
              "Internet access is provided by ISPs (Internet Service Providers) — a business with a permanent Internet connection that offers temporary connection to individuals and companies, free or for a fee.",
              "Types of ISP: Regional ISP, National ISP, Wireless Service Provider (WSP).",
              "National ISP serves a country; Regional ISP serves a region/part of a continent; both provide domain-name registration, web-site building and hosting.",
              "Malaysian local ISPs: TmNet, Jaring, P1. International: America Online, MindSpring, GTE-Net.",
              "Wireless Service Provider — provides wireless Internet to users with wireless modems or web-enabled handheld devices; examples: Maxis, Digi, Celcom, P1."
            ]
          },
          {
            heading: "Internet Address",
            points: [
              "IP (Internet Protocol) address — the number that uniquely identifies each computer on the Internet.",
              "Domain Name Server (DNS) — a host computer that coordinates the IP addresses and domain names for the computers it is responsible for.",
              "Domain name — a unique name associated with an IP address; easier to use than an IP address (e.g. IP 172.17.19.124 vs domain www.unirazak.edu.my).",
              "Format: hostname.subdomain.top-level-domain. The first part identifies the network; the last part identifies the specific computer."
            ]
          },
          {
            heading: "Top-Level Domain (TLD)",
            points: [
              "An abbreviation that identifies the type of organisation associated with the domain.",
              "'country-code' TLDs (ccTLDs) — two-letter codes for more than 240 countries.",
              "Generic TLDs — three or more letters: .edu, .gov, .biz, .com, .info, .name, .net, .org, .pro; others include .asia, .aero, .coop, .jobs, .mobi, .museum, .travel.",
              "Example http://fit.unirazak.edu.my — 'fit' is the subdomain, 'edu' is the generic TLD, 'my' is the country-code TLD, and the computer name is fit.unirazak."
            ]
          },
          {
            heading: "Uniform Resource Locator (URL)",
            points: [
              "An addressing scheme that tells the web browser: the transfer protocol to use, the domain name of the computer, the pathname where the file resides, and the file name.",
              "Example: http://fit.unirazak.edu.my/program/bit.htm — protocol = http, domain name = fit.unirazak.edu.my, pathname = /program, filename = bit.htm."
            ]
          },
          {
            heading: "World Wide Web (WWW)",
            points: [
              "WWW = World Wide Web; a software application that makes it easy for nearly anyone to publish and browse hypertext documents on the Internet.",
              "Hypertext — web pages that have hyperlinks to other pages.",
              "Hyperlinks — a string of clickable text or a clickable graphic that points to another web page or document.",
              "Web page — a file that can be read over the WWW.",
              "Web browser — software to view web pages, read email and read newsgroups; also called a Web client (e.g. Mozilla Firefox, Google Chrome).",
              "Web site — a set of pages of information on the Internet about a particular subject (e.g. www.icann.org).",
              "Web server — a computer that satisfies user requests for web pages.",
              "Home page — the web page loaded when a browser is first activated; the first page in a set of related pages.",
              "HTML — HyperText Markup Language; the programming language most web pages are written in."
            ]
          },
          {
            heading: "Types of Web Pages",
            points: [
              "Portal — provides access to other web sites and services.",
              "Advocacy — describes a cause, opinion or idea (usually a particular group's view).",
              "News; Informational; Business/Marketing; Personal."
            ]
          }
        ],
        quiz: [
          { q: "Which of these is a Malaysian local ISP?", options: ["America Online", "TmNet", "MindSpring", "GTE-Net"], answer: 1, explain: "TmNet, Jaring and P1 are Malaysian local ISPs; AOL, MindSpring and GTE-Net are international." },
          { q: "A two-letter TLD such as .my is called a...", options: ["Generic TLD", "Country-code TLD (ccTLD)", "Subdomain", "Protocol"], answer: 1, explain: ".my is a country-code TLD; generic TLDs like .com/.org use three or more letters." },
          { q: "What does DNS coordinate?", options: ["IP addresses and domain names", "Web page colours", "Browser plugins", "Video quality"], answer: 0, explain: "The Domain Name Server coordinates IP addresses and domain names for the computers it manages." },
          { q: "In http://fit.unirazak.edu.my, what is 'edu'?", options: ["Subdomain", "Computer name", "Generic TLD", "Country-code TLD"], answer: 2, explain: "'edu' is the generic TLD; 'my' is the ccTLD and 'fit' is the subdomain." },
          { q: "The software used to view web pages is called a...", options: ["Web server", "Web client / browser", "DNS", "Modem"], answer: 1, explain: "A web browser (web client) such as Firefox or Chrome is used to view web pages." }
        ],
        takeaways: [
          "Internet = worldwide network of computers; ISPs (TmNet, Jaring, P1) provide access.",
          "IP address uniquely identifies a computer; DNS maps IP ↔ domain name.",
          "TLD types: ccTLD (2-letter, e.g. .my) and generic (3+ letters, e.g. .com, .edu).",
          "URL = protocol + domain + pathname + filename. WWW uses hypertext/hyperlinks; HTML is the language."
        ]
      },

      /* ================= TOPIC 3: HTML (CH 9) ================= */
      {
        id: "w3",
        num: "03",
        title: "HTML",
        summary: "Basic HTML structure, text formatting, links, lists, images, sound/video, forms, frames and tables.",
        sections: [
          {
            heading: "Basic HTML Structure",
            points: [
              "An HTML file has 2 main sections: the Head (containing the title of the page) and the Body (the actual information displayed).",
              "<html>...</html> marks the beginning and end of an HTML file.",
              "<head>...</head> is placed between the <html> tags, preferably at the top.",
              "<title>...</title> specifies the page title and is placed between the <head> tags.",
              "<body>...</body> holds the actual content of the page; attributes: bgcolor (background colour), background (picture background), text (text colour), link (link colour), vlink (visited-link colour).",
              "<!--comment--> does not show up when the page loads.",
              "Minimal example: <html><body>The content of the body element is displayed in your browser.</body></html>"
            ]
          },
          {
            heading: "Text Formatting & Layout",
            points: [
              "<p>...</p> defines a paragraph (HTML adds a blank line before and after); <p align='right'> aligns it.",
              "<center>...</center> centres content; <br> is a line break; <hr> is a horizontal rule.",
              "<b>...</b> bold, <i>...</i> italic; <font size='+1' color='yellow' style='arial'> sets font size/colour/face.",
              "Headings: <h1> to <h6> (h1 largest, h6 smallest).",
              "Other formatting: <strong> (strong), <big> (big), <small> (small), <sub> (subscript), <sup> (superscript)."
            ]
          },
          {
            heading: "Links",
            points: [
              "<a href='http://www.netscape.com'>TRIPOD</a> creates a hyperlink to another or the same page.",
              "Link using an image: <a href='http://www.mdc.com.my'><img src='mdc.jpeg'></a>.",
              "Email link: <a href='mailto:abc@unitar.edu.my'>abc@unitar.edu.my</a> opens an email message to that address."
            ]
          },
          {
            heading: "Lists",
            points: [
              "Ordered (numbered) list: <ol> surrounds the whole list; <li> precedes each item.",
              "Unordered (bulleted) list: <ul> surrounds the list; <li> for each item."
            ]
          },
          {
            heading: "Images",
            points: [
              "<img> places an image on a page.",
              "Attributes: src (where to get the image), alt (description shown before load), width / height (in pixels), border (0 = no border), align (left, center, right; default left), hspace (horizontal space around image), vspace (vertical space).",
              "Example: <img src='welcomeimage.gif' alt='welcome to my pages' width='200' height='50' border='0' align='right' hspace='5' vspace='5'>"
            ]
          },
          {
            heading: "Sound & Video",
            points: [
              "Sound: <embed src='jazz1.mid' autostart='yes' width='145' height='60'> or <bgsound src='jazz1.mid' loop='infinite' delay='5'>.",
              "Video: <embed src='dragdrop.avi' autostart='false'> or <img dynsrc='dragdrop.avi' loop='infinite'>."
            ]
          },
          {
            heading: "Forms",
            points: [
              "<form>...</form> with attributes ACTION (CGI on the server collects/processes the data) and METHOD ('POST' or 'GET').",
              "<input> defines an input field (no end tag); attributes: NAME, TYPE, VALUE, CHECKED, SIZE, MAXLENGTH.",
              "Input types: Text field, Checkbox, Radio button, Password, Submit button, Reset button.",
              "Mailto form: <form action='mailto:halim@unitar.my' method='POST' enctype='text/plain'>. Tip: tables are useful for laying out forms."
            ]
          },
          {
            heading: "Frames",
            points: [
              "Frames let you display more than one HTML document in the same browser window; each frame is independent.",
              "<frameset> defines how to divide the window into rows or columns; <frame src='...'> puts a document into each frame.",
              "Disadvantages: the developer must track more HTML documents, and it is difficult to print the entire page.",
              "Add <noframes>...</noframes> for browsers that do not support frames.",
              "Example: <frameset cols='25%,75%'><frame src='frame_a.htm'><frame src='frame_b.htm'></frameset>"
            ]
          },
          {
            heading: "Tables",
            points: [
              "A table is enclosed in <table>...</table>; it may contain an optional <caption>.",
              "<tr> defines a table row (attributes: ALIGN, VALIGN, BGCOLOR).",
              "<th> is a table heading cell; <td> is a data cell (attributes: NOWRAP, ROWSPAN, COLSPAN, ALIGN, VALIGN, WIDTH, HEIGHT, BGCOLOR).",
              "<table> attributes: ALIGN (left/center/right), WIDTH (pixels or %), BORDER, CELLSPACING (space between cells), CELLPADDING (gap between border and cell content), BGCOLOR.",
              "Example: <table border='1'><tr><th>Heading</th><th>Another Heading</th></tr><tr><td>row 1 cell 1</td><td>row 1 cell 2</td></tr></table>"
            ]
          }
        ],
        quiz: [
          { q: "Which tag specifies the title of an HTML page?", options: ["<body>", "<title>", "<head>", "<meta>"], answer: 1, explain: "The <title> tag (inside <head>) sets the page title." },
          { q: "Which tag creates a numbered list?", options: ["<ul>", "<li>", "<ol>", "<dl>"], answer: 2, explain: "<ol> is an ordered (numbered) list; <ul> is unordered (bulleted)." },
          { q: "Which attribute of <img> gives a description shown before the image loads?", options: ["src", "alt", "href", "width"], answer: 1, explain: "alt provides a text description shown before/if the image does not load." },
          { q: "In a form, which attribute tells the server where to send the data?", options: ["METHOD", "ACTION", "INPUT", "VALUE"], answer: 1, explain: "ACTION specifies the CGI/script that collects and processes the form data." },
          { q: "Which table tag defines a single row?", options: ["<td>", "<th>", "<tr>", "<caption>"], answer: 2, explain: "<tr> is a table row; <th>/<td> are cells inside it." },
          { q: "What does <frameset cols='25%,75%'> do?", options: ["Splits the window into two columns", "Creates a bullet list", "Sets the page title", "Adds a border"], answer: 0, explain: "It divides the browser window into two columns (25% and 75%)." }
        ],
        takeaways: [
          "Structure: <html> → <head><title></title></head> → <body>…</body>.",
          "<ol> numbered, <ul> bulleted, <li> items; <a href> links; <img src alt> images.",
          "Forms: <form action method> + <input type>; frames: <frameset> <frame> <noframes>.",
          "Tables: <table><tr><th><td><caption>; formatting tags <b> <i> <font> <h1>-<h6>."
        ]
      },

      /* ================= TOPIC 4: COMMUNICATIONS & NETWORKS (CH 2) ================= */
      {
        id: "w4",
        num: "04",
        title: "Communications & Networks",
        summary: "How computers communicate, the hardware/software needed, transmission media, types of networks, internetworks, topology and internet connections.",
        sections: [
          {
            heading: "Computer Communications",
            points: [
              "Computer communications is the process in which a computer transfers data, instructions and information to other computer(s).",
              "For successful communications you need: a sending device, a communications device, a communications channel, a receiving device, and another communications device."
            ]
          },
          {
            heading: "Software Requirements",
            points: [
              "Operating System — essential software that manages computer hardware resources and provides common services for application software (e.g. Windows, Linux, Mac).",
              "Application Software — programs designed to perform specific tasks for users.",
              "Web browser — a special program to access files on the WWW (e.g. Internet Explorer, Firefox, Chrome); its three functions: send/receive e-mail, read newsgroup messages, and browse the WWW.",
              "Other Internet-support software: e-mail software, FTP clients, anti-virus, multimedia players (Real Player, Windows Media Player), Adobe Reader."
            ]
          },
          {
            heading: "Communication Devices & Signals",
            points: [
              "Modem — lets your computer communicate with other computers over a standard telephone line; it converts data between analog and digital form.",
              "Analog signal — a continuous electrical wave.",
              "Digital signal — individual electrical pulses that represent bits grouped as bytes."
            ]
          },
          {
            heading: "Communication Channel & Transmission Media",
            points: [
              "A channel is the communications path between two devices; bandwidth is the amount of data that can travel through it.",
              "Physical media: Twisted Pair Cable (two insulated copper wires twisted; up to 1 Gbps Cat5e / 10 Gbps Cat6; low cost; up to 100 m; susceptible to EMI; used in LAN/phone lines).",
              "Coaxial Cable (central conductor with insulation/shielding; up to 1 Gbps; medium cost; up to 500 m; cable TV, legacy Ethernet).",
              "Fiber Optic Cable (data as light through glass/plastic; very high speed up to Tbps; high cost; several km; immune to EMI; backbone/long-distance).",
              "Shielded Twisted Pair (STP) — like UTP with shielding to reduce EMI; industrial networks.",
              "Unshielded Twisted Pair (UTP) — most common, no shielding; 10 Mbps–10 Gbps; up to 100 m; common in LANs.",
              "Wireless media: cellular radio, communications satellite (receives, amplifies and rebroadcasts microwave signals), microwave (high-speed, line-of-sight, no obstructions), infrared (IR; line-of-sight; IrDA port)."
            ]
          },
          {
            heading: "Networks",
            points: [
              "A network is a collection of computers and devices connected by communication channels that allows users to share resources (data, software, hardware).",
              "Connected using network cables, hubs, communication channels and special software.",
              "Types of network: LAN (Local Area Network), MAN (Metropolitan), WAN (Wide Area), PAN (Personal Area Network)."
            ]
          },
          {
            heading: "Internetworks",
            points: [
              "Intranet — makes company information accessible to employees and facilitates group work (e.g. directories, calendars, manuals, job postings).",
              "Extranet — extends to authorised users outside the company (customers/suppliers); a firewall restricts access.",
              "Internet — the largest WAN."
            ]
          },
          {
            heading: "Network Topology",
            points: [
              "Topology is the physical arrangement of devices in a network; networks usually combine three basic types.",
              "Bus — a single central cable (backbone) to which all computers connect; inexpensive and easy to install.",
              "Ring — cable forms a closed loop; data travels around the ring in one direction.",
              "Star — all devices connect to a central hub; all data passes through the hub.",
              "Hybrid — a combination of star/ring/bus (e.g. star+bus, star+ring)."
            ]
          },
          {
            heading: "Internet Connection",
            points: [
              "Dial-up — Internet over a standard phone line.",
              "Wireless — Internet from mobile computers (e.g. WiFi hotspots, wireless LANs).",
              "Leased Line — a fixed/dedicated connection (e.g. in offices)."
            ]
          }
        ],
        quiz: [
          { q: "Which cable transmits data as light and is immune to EMI?", options: ["Twisted Pair", "Coaxial", "Fiber Optic", "UTP"], answer: 2, explain: "Fiber optic uses light through glass/plastic and is immune to electromagnetic interference." },
          { q: "A network covering a single building or home is a...", options: ["WAN", "MAN", "LAN", "PAN"], answer: 2, explain: "LAN = Local Area Network (local area such as a building)." },
          { q: "Which topology connects all devices to a central hub?", options: ["Bus", "Ring", "Star", "Hybrid"], answer: 2, explain: "Star topology connects every device to a central hub." },
          { q: "What converts between analog and digital signals?", options: ["Modem", "Hub", "Router", "Browser"], answer: 0, explain: "A modem converts data between analog and digital form for transmission." },
          { q: "An extranet is restricted by a...", options: ["Modem", "Firewall", "Browser", "Satellite"], answer: 1, explain: "A firewall restricts access to data on an extranet." }
        ],
        takeaways: [
          "Communications need: sender → comms device → channel → comms device → receiver.",
          "Media: UTP/STP, coaxial, fiber optic (physical); cellular, satellite, microwave, IR (wireless).",
          "Networks: LAN / MAN / WAN / PAN. Internetworks: intranet, extranet (firewall), Internet.",
          "Topologies: bus, ring, star, hybrid."
        ]
      },

      /* ================= TOPIC 5: COMMUNICATION & INFORMATION SERVICES (CH 3) ================= */
      {
        id: "w5",
        num: "05",
        title: "Communication & Information Services",
        summary: "E-mail and its protocols, newsgroups, chat/IM, conferencing, blogs, social networks, RSS, browsers, FTP and web search.",
        sections: [
          {
            heading: "E-Mail",
            points: [
              "E-mail is the exchange of text messages and computer files transmitted via a communications network; it is fast, inexpensive, sent/received anytime, and can attach files (text, graphics, images, audio).",
              "E-mail server — the host computer that handles and saves e-mails until the recipient requests them.",
              "E-mail client software — lets a user read e-mails (e.g. Microsoft Outlook, Mozilla Thunderbird).",
              "E-mail address: user name + '@' + host name (e.g. KJC01234567@mail.pintar.edu.my).",
              "Spam = unwanted messages posted to newsgroups or sent to a list of users through e-mail."
            ]
          },
          {
            heading: "How E-mail Works & Protocols",
            points: [
              "Flow: user creates/sends → software contacts ISP mail server → SMTP server decides the best route → message transferred to POP3 server → when user checks mail, it transfers to the recipient's computer.",
              "SMTP (Simple Mail Transfer Protocol) — decides the route an e-mail takes.",
              "POP (Post Office Protocol) — handles incoming e-mails; they are downloaded to the client's computer.",
              "IMAP (Internet Message Access Protocol) — organises e-mails on the server; they stay on the server.",
              "MIME (Multipurpose Internet Mail Extensions) — specifies how non-text data (graphics, sound) is formatted to travel."
            ]
          },
          {
            heading: "E-mail Features",
            points: [
              "To, Cc, Bcc, Subject, Attach, Message body, Signature, Message header."
            ]
          },
          {
            heading: "Mailing Lists, Newsgroups & Forums",
            points: [
              "Mailing List — a list of names/addresses for a group with a common interest; a way to share information. Roles: list moderator (checks postings), list administrator (approves members), unmoderated list (no moderator), closed list (invitation only), message digest (one e-mail collecting many posts). Provider: Yahoo.",
              "Newsgroups — an online area for written discussions about a subject; decentralised (messages replicated across many servers); read with a newsreader (e.g. Easynews). A thread is a post plus its replies. Hierarchies show category from general to specific (e.g. comp.lang.java.programmer).",
              "Usenet — the entire collection of Internet newsgroups; original categories: comp, humanities, misc, news, rec, sci, soc, talk, plus alt.",
              "Forums / Discussion Boards — like newsgroups but kept on a single server and need no newsreader (e.g. cari.com.my, forum.lowyat.net).",
              "Listserv — a type of broadcast e-mail to a list; not interactive."
            ]
          },
          {
            heading: "Real-Time Communication",
            points: [
              "Chat — a conversation in a chat room; public or private; lurking = watching without replying; emoticons show emotion; netiquette = Internet etiquette; IRC (Internet Relay Chat) is a multiuser, client-server chat program.",
              "Instant Messaging — real-time service that notifies you when people are online and lets you exchange messages/files or join a private chat.",
              "Collaboration/Conferencing — working with connected users; share an electronic whiteboard; includes text, audio and video (e.g. Microsoft NetMeeting).",
              "Video Conferencing — needs a webcam, microphone and a fast connection.",
              "IP Telephony — uses the Internet like a telephone (e.g. Net2Phone).",
              "Telnet — a text-oriented program providing login to a remote computer (legacy systems)."
            ]
          },
          {
            heading: "Blogs, Social Networks & RSS",
            points: [
              "Blog — short for 'Web log'; a log written by individuals, often personal; readers can comment (e.g. blogger.com).",
              "Social Network — a structure of individuals/organisations linked by friendship, interest, etc. Examples: Facebook/Twitter (general), LinkedIn (professional), Flickr (photo), Foursquare (location).",
              "RSS (Rich Site Summary) — a web service that syndicates site content in a standard format (blog entries, news, audio, video); read with an RSS Reader (e.g. Google Reader, FeedDemon)."
            ]
          },
          {
            heading: "Netiquette",
            points: [
              "Internet etiquette — use professional business language in work messages, remember messages may be printed/forwarded, proofread before sending, and always include an appropriate subject line."
            ]
          },
          {
            heading: "Information Retrieval: Browsers & FTP",
            points: [
              "Web browser (web client) — software that locates and displays web pages; a web server satisfies requests. Plug-ins run inside the browser; helper applications are independent programs activated when needed.",
              "FTP (File Transfer Protocol) — transfers a copy of a file across the Internet in binary or ASCII format.",
              "Upload = send a file to an FTP site; download = receive a file from it; an FTP server handles the requests.",
              "FTP access types: command-line (legacy/Telnet), web-browser FTP, and FTP client software (e.g. FileZilla, SmartFTP)."
            ]
          },
          {
            heading: "Information Search",
            points: [
              "Web Search Engine — a site that finds pages matching a query; a page hit is an indexed page containing the text; web robots/spiders update the engine's database (e.g. Google, Bing).",
              "Meta-search engine — combines results from multiple engines (e.g. MetaCrawler, DogPile).",
              "Web directories — listings of hyperlinks organised into categories (e.g. Google Directory).",
              "Earlier tools: Archie (first search engine; locates files obtained via FTP), Veronica (finds Gopher titles), WAIS (keyword search of documents), Gopher (earliest menu-driven browsing service).",
              "Search strategy: formulate the query → select the tool → evaluate results → repeat.",
              "Query operators: Boolean, Wildcard, Proximity, Phrases."
            ]
          },
          {
            heading: "Online/Cloud Storage & Wikipedia",
            points: [
              "Online/Cloud Storage — web storage for any computer user; many are free (revenue from ads). Examples: IDrive/XDrive (backup), Picasa/Flickr (photos), Google Docs (documents). Advantages: access from any device, remote backup.",
              "Wikipedia — a free, collaboratively written encyclopedia; almost all content can be edited by anyone; available in many languages."
            ]
          }
        ],
        quiz: [
          { q: "Which protocol decides the route an e-mail takes?", options: ["POP", "IMAP", "SMTP", "MIME"], answer: 2, explain: "SMTP (Simple Mail Transfer Protocol) decides the route an e-mail will take." },
          { q: "Which protocol keeps e-mails on the server rather than downloading them?", options: ["POP", "IMAP", "SMTP", "FTP"], answer: 1, explain: "IMAP organises e-mails on the server so they stay there." },
          { q: "Archie was the first...", options: ["Web browser", "Search engine", "Chat program", "FTP client"], answer: 1, explain: "Archie was the first Internet search engine; it located files you later get via FTP." },
          { q: "A 'thread' in a newsgroup is...", options: ["A single server", "A post plus its replies", "A type of virus", "An email list"], answer: 1, explain: "A thread (or threaded discussion) is a post and the series of messages replying to it." },
          { q: "Which is a professional social network?", options: ["Flickr", "LinkedIn", "Foursquare", "Twitter"], answer: 1, explain: "LinkedIn is the business/professional social network." }
        ],
        takeaways: [
          "E-mail protocols: SMTP (route), POP (download), IMAP (stays on server), MIME (non-text format).",
          "Real-time: chat/IRC, IM, conferencing, video conferencing, IP telephony, Telnet.",
          "Search: web engines (Google/Bing), meta-search, directories, Archie/Veronica/WAIS/Gopher.",
          "FTP transfers files (upload/download); cloud storage & Wikipedia are web information services."
        ]
      },

      /* ================= TOPIC 6: E-COMMERCE (CH 4) ================= */
      {
        id: "w6",
        num: "06",
        title: "E-Commerce",
        summary: "What e-commerce is, its models, mechanisms, payment models, advantages/disadvantages, sectors, building an online store and e-government.",
        sections: [
          {
            heading: "Definitions & Roles",
            points: [
              "E-Commerce — the process of buying, selling, transferring or exchanging products, information or services via computer networks.",
              "Roles in commerce: Buyers; Sellers/retailers/wholesalers/distributors; Producers.",
              "Examples: electronic fund transfers among banks; electronic data interchange between businesses."
            ]
          },
          {
            heading: "E-Commerce Models",
            points: [
              "B2C (business-to-consumer) — sale of products/services from a business to the public (e.g. books, software).",
              "C2C (consumer-to-consumer) — individuals using the Internet to sell to other individuals (e.g. online auctions like eBay).",
              "B2B (business-to-business) — sale/exchange between businesses; many engage in both B2B and B2C; the supply chain creates and distributes products.",
              "B2E (business-to-employee) — uses intranet technology for activities within a business (collaboration, file exchange); increases profit by reducing internal expenses (intrabusiness)."
            ]
          },
          {
            heading: "Mechanism & Payment Models",
            points: [
              "Mechanisms: electronic catalogs, electronic auctions, e-storefronts, e-malls, e-marketplaces.",
              "Payment models: Cash, Cheque, Credit cards, E-wallet, BNPL (Buy Now Pay Later)."
            ]
          },
          {
            heading: "Advantages & Disadvantages",
            points: [
              "Advantages: lower transaction cost (no middleman), reduced distribution cost, larger purchases per transaction, 24/7 global market, easy price comparison, larger catalogues, paperless environment, improved customer interaction, FAQ support.",
              "Disadvantages: exposure of personal information, products not as expected or different from the catalogue, products missing during shipping."
            ]
          },
          {
            heading: "E-Commerce Sectors",
            points: [
              "Banking, Health, Travel, Retailing, Trading, Learning, Entertainment, Auctions, Recruiting, Government, Advertising, Market research."
            ]
          },
          {
            heading: "Creating an Online Store",
            points: [
              "A company/individual must: build a storefront, manage payment, manage product delivery, design a website that attracts/retains customers, manage the website, and promote it (sometimes integrating order tracking).",
              "Elements needed: a product; a website to sell it; a way to get people to the site; a way to accept orders (online form); a way to accept money (merchant account + secure page + bank link); a fulfillment facility to ship; a way to accept returns; warranty handling; customer service (email, forms, FAQs)."
            ]
          },
          {
            heading: "Store Implementation & What Retains Customers",
            points: [
              "Three implementation ways: Enterprise computing (buy hardware/software, hire staff; e.g. Amazon, Dell); Virtual hosting (vendor sells/maintains, company creates the site); Simplified e-commerce (vendor generates all pages from online forms; e.g. Yahoo! Merchant Solutions).",
              "What attracts/retains customers: price, selection, website appearance, ease of use/navigation, availability of information, ease of ordering, posted privacy policies, quality of product representation, shipping, on-time delivery, quality of customer support."
            ]
          },
          {
            heading: "Promotion, E-retail Process & E-Government",
            points: [
              "Promoting: good domain name, search engines, press, customer newsletter, newsgroups/expertise, classified ads, informative articles, more links, word-of-mouth.",
              "E-retail process: display storefront → collect items in shopping cart → enter payment on a secure site (e-retailer sends info to bank) → bank security check returns authorisation → confirmation sent, order processed to fulfillment → packaged, shipped, records updated, shipping info posted → delivered.",
              "E-Government — using IT to provide government information and services to citizens, business partners and civil servants (e.g. myGovernment at www.malaysia.gov.my for jobs and payments)."
            ]
          }
        ],
        quiz: [
          { q: "eBay is an example of which e-commerce model?", options: ["B2B", "B2C", "C2C", "B2E"], answer: 2, explain: "eBay is consumer-to-consumer (C2C) — individuals selling to other individuals." },
          { q: "Which model uses intranet technology within a business?", options: ["B2B", "B2C", "C2C", "B2E"], answer: 3, explain: "B2E (business-to-employee) uses intranet for internal collaboration (intrabusiness)." },
          { q: "Which is a disadvantage of e-commerce?", options: ["24/7 global market", "Lower transaction cost", "Exposure of personal information", "Easy price comparison"], answer: 2, explain: "Exposure of personal information is a listed disadvantage; the others are advantages." },
          { q: "Amazon is an example of which implementation approach?", options: ["Simplified e-commerce", "Virtual hosting", "Enterprise computing", "Mail order"], answer: 2, explain: "Amazon/Dell use enterprise computing — they buy hardware/software and hire staff to build the site." }
        ],
        takeaways: [
          "E-commerce = buy/sell/exchange via networks. Models: B2C, C2C, B2B, B2E.",
          "Payments: cash, cheque, credit card, e-wallet, BNPL.",
          "Pros: lower cost, 24/7 global, easy comparison. Cons: privacy, wrong/missing items.",
          "Build store: storefront + payment + delivery + site + promotion. E-gov = myGovernment."
        ]
      },

      /* ================= TOPIC 7: SECURITY, PRIVACY & ETHICAL ISSUES (CH 6) ================= */
      {
        id: "w7",
        num: "07",
        title: "Security, Privacy & Ethical Issues",
        summary: "Security types, intellectual property/copyright, threats, malicious code, viruses, encryption, firewalls and unauthorized access.",
        sections: [
          {
            heading: "Security",
            points: [
              "Security refers to the protection of assets from unauthorized access, use, alteration or destruction.",
              "Two types: Physical security (protection of people, property and physical assets — attackers may steal/damage servers, steal via USB, or upload malware) and Logical security (controls put in place to manage access to computer systems and physical spaces).",
              "An information security policy is a set of rules developed to protect an organisation's assets."
            ]
          },
          {
            heading: "Copyright & Intellectual Property",
            points: [
              "Intellectual property is the ownership of ideas and control over their tangible or virtual representation (art, writings, processes, company/product names and logos).",
              "Copyright protects expression (someone's intellectual property) and typically covers: literary and musical works; pantomimes and choreographic works; pictorial, graphic and sculptural works; motion pictures and other audio-visual works; sound recordings; and architectural works."
            ]
          },
          {
            heading: "Computer Threats & Malicious Code",
            points: [
              "A threat is an object, person or entity that represents a constant danger to an asset; the 3 points of threat are: End-user site, Communication channel/Internet, and Server site.",
              "Malicious code is the general name for unanticipated/undesired effects in programs caused by an agent intent on damage.",
              "Types of malicious code: Virus, Logic bomb, Worm, Trojan horse, Rabbit, Trapdoor/backdoor."
            ]
          },
          {
            heading: "Computer Virus",
            points: [
              "A virus is a code segment that replicates by attaching copies to existing executables.",
              "Types: Boot sector, File, Macro.",
              "Characteristics: Replication; requires a host program as a carrier; activated by external action; replication limited to the (virtual) system.",
              "Signs of infection: unusual message/image on screen, random music/sound, less available memory than expected, corrupted files.",
              "Prevention: do not start the computer with removable media in the drives; never open e-mail attachments from unknown sources; install and frequently update an antivirus program.",
              "Detection/removal: upon detection, try to clean the infected media immediately."
            ]
          },
          {
            heading: "Encryption",
            points: [
              "Encryption converts readable data (plaintext) into unreadable characters (ciphertext) to prevent unauthorized access; decryption is the reverse process.",
              "Asymmetric (public-key) encryption uses two keys — a public key known to everyone and a private key known only to the recipient. Jane encrypts with John's public key; John decrypts with his private key.",
              "Symmetric (private-key) encryption uses one key copied on both the sender's and receiver's site; the same key encrypts and decrypts."
            ]
          },
          {
            heading: "Firewall & Unauthorized Access",
            points: [
              "A firewall is a program/hardware that filters information coming through the Internet connection into a private network or computer system.",
              "Unauthorized access = use of a computer/network without permission; unauthorized use = use for unapproved or possibly illegal activities.",
              "Access control defines who can access a computer, when, and what actions they can take.",
              "A two-phase process: Identification (verifies an individual is a valid user) and Authentication (verifies the individual is who they claim to be).",
              "Three methods of identification/authentication: user names and passwords, possessed objects, and biometric devices."
            ]
          }
        ],
        quiz: [
          { q: "Which encryption uses a public key and a private key?", options: ["Symmetric", "Asymmetric", "Plaintext", "Logical"], answer: 1, explain: "Asymmetric (public-key) encryption uses a public key for everyone and a private key for the recipient." },
          { q: "A virus is a code segment that replicates by attaching to...", options: ["Other viruses", "Existing executables", "The firewall", "The DNS"], answer: 1, explain: "A virus replicates by attaching copies to existing executable files." },
          { q: "Which is NOT one of the three threat points?", options: ["End-user site", "Communication channel", "Server site", "Power supply"], answer: 3, explain: "The three points are end-user site, communication channel/Internet, and server site." },
          { q: "Authentication verifies that the individual...", options: ["Is a valid user", "Is who they claim to be", "Has a password", "Owns the server"], answer: 1, explain: "Identification verifies a valid user; authentication verifies they are who they claim to be." }
        ],
        takeaways: [
          "Security = protect assets. Physical + Logical. Info security policy = rules.",
          "Malicious code: virus, logic bomb, worm, Trojan, rabbit, trapdoor.",
          "Encryption: asymmetric (public/private key) vs symmetric (one shared key).",
          "Firewall filters incoming traffic; access control = identification + authentication."
        ]
      },

      /* ================= TOPIC 8: MULTIMEDIA ON THE WEB (CH 5) ================= */
      {
        id: "w8",
        num: "08",
        title: "Multimedia on the Web",
        summary: "Graphics, animation, web audio/video applications, virtual reality and augmented reality on the web.",
        sections: [
          {
            heading: "Graphics, Animation & Web Media",
            points: [
              "Multimedia elements used on the Web include graphics (often shown as small preview thumbnails), animation, audio and video.",
              "Various technologies are used to create animation for the Web."
            ]
          },
          {
            heading: "Web Audio & Video Applications",
            points: [
              "Types of web audio/video applications: Download-and-Play; Streaming; Progressive Download; MP3 and Audio-Only; Podcast Platforms; WebRTC-Based Audio/Video (Web Real-Time Communication)."
            ]
          },
          {
            heading: "Virtual Reality (VR)",
            points: [
              "VR provides a fully immersive digital environment; the simplest form can be a basic simulated space.",
              "Types of VR and the technologies used vary; VRML (Virtual Reality Modeling Language) is a language for describing 3D virtual worlds on the Web."
            ]
          },
          {
            heading: "Augmented Reality (AR)",
            points: [
              "Augmented Reality enhances the real world by overlaying digital information — images, sounds or 3D objects — through devices such as smartphones, tablets or AR glasses.",
              "AR vs VR: Environment — AR adds digital elements to the real world, VR is a fully immersive digital environment. Device — AR uses smartphone/tablet/AR glasses, VR uses a headset (e.g. Oculus, HTC Vive). Interaction — AR interacts with both real and virtual elements, VR only within a virtual space. Mobility — AR typically allows free movement in real space, VR often requires stationary use or boundaries.",
              "How AR works, its applications, benefits, challenges and future are active areas of development (e.g. medical training, navigation, retail previews)."
            ]
          }
        ],
        quiz: [
          { q: "Augmented Reality enhances the real world by overlaying...", options: ["A fully virtual world", "Digital information (images, sound, 3D)", "Only text", "A firewall"], answer: 1, explain: "AR overlays digital information such as images, sounds or 3D objects onto the real world." },
          { q: "Which device is typical for Virtual Reality rather than AR?", options: ["Smartphone", "AR glasses", "VR headset (Oculus)", "Tablet"], answer: 2, explain: "VR uses a headset such as Oculus or HTC Vive; AR uses phones/tablets/AR glasses." },
          { q: "VRML stands for...", options: ["Virtual Reality Markup Language", "Virtual Reality Modeling Language", "Video Rendering ML", "Visible Reality ML"], answer: 1, explain: "VRML = Virtual Reality Modeling Language, used to describe 3D virtual worlds on the Web." },
          { q: "Streaming is a type of...", options: ["Web audio/video application", "Network topology", "Encryption method", "Malicious code"], answer: 0, explain: "Streaming is one of the web audio/video application types (alongside download-and-play, progressive download, etc.)." }
        ],
        takeaways: [
          "Web media: graphics (thumbnails), animation, audio, video.",
          "Audio/video apps: download-and-play, streaming, progressive download, MP3, podcasts, WebRTC.",
          "VR = fully immersive digital environment (VRML for 3D web worlds).",
          "AR = overlays digital info on the real world via phone/tablet/AR glasses."
        ]
      },

      /* ================= TOPIC 9: WEB AUTHORING & PUBLISHING (CH 8) ================= */
      {
        id: "w9",
        num: "09",
        title: "Web Authoring & Publishing",
        summary: "Linear vs hypermedia, HTML markup terms, screen resolution/colour depth, download-time factors and web development tools.",
        sections: [
          {
            heading: "Linear Media vs Hypermedia",
            points: [
              "Linear media has a defined beginning and a linear progression to the end (e.g. film, audio, videotape, books).",
              "Hypermedia lets users choose (e.g. audio CD); applied to text this becomes hypertext — clicking a link or hotspot takes you to a new location (same or new page).",
              "The World Wide Web contains hypertext and is built using HTML (Hypertext Markup Language)."
            ]
          },
          {
            heading: "HTML Markup Terms",
            points: [
              "HTML markup is a set of logical codes in angle brackets that describe the appearance of a web document and the information it contains; tags are enclosed in '<' and '>'.",
              "Opening and closing tags: opening e.g. <strong>, closing needs a '/' before the element e.g. </strong>.",
              "An element specifies a document structure — it is the first word/character inside '< >' (e.g. 'table').",
              "Attributes describe the element, e.g. <table width='50%'> — 'table' is the element, 'width' is the attribute, '50%' is the attribute value."
            ]
          },
          {
            heading: "Screen Resolution & Colour Depth",
            points: [
              "Screen resolution = how many pixels make up your view on the monitor (e.g. 640×480, 800×600, 1024×768, 1280×1024).",
              "Colour Depth = how many colours the computer supports (e.g. 16 colours, 256 colours, 216 colours)."
            ]
          },
          {
            heading: "Download Time & Development Tools",
            points: [
              "Factors affecting download time: the speed of the user's connection to the Internet, and the document size (HTML + graphics + audio + applets + ActiveX objects).",
              "Tools for developing web pages: HTML, Scripts, Applets, Servlets, ActiveX Controls, CGI, JavaScript, and others."
            ]
          }
        ],
        quiz: [
          { q: "A film is an example of...", options: ["Hypermedia", "Linear media", "Hypertext", "A network"], answer: 1, explain: "Film has a defined beginning and linear progression to the end — it is linear media." },
          { q: "In <table width='50%'>, what is 'width'?", options: ["Element", "Attribute", "Value", "Tag"], answer: 1, explain: "'table' is the element, 'width' is the attribute, '50%' is the value." },
          { q: "Which is NOT a factor in download time?", options: ["Connection speed", "Document size", "Colour depth", "Graphics/audio/applets"], answer: 2, explain: "Download time depends on connection speed and total document size, not colour depth." },
          { q: "The World Wide Web is built using...", options: ["FTP", "HTML", "DNS", "SMTP"], answer: 1, explain: "The WWW contains hypertext and is built using HTML." }
        ],
        takeaways: [
          "Linear = fixed start→end (film); hypermedia/hypertext = user chooses (WWW uses HTML).",
          "Element = first word in < >; attributes describe it (e.g. width='50%').",
          "Resolution = pixels; colour depth = number of colours.",
          "Download time = connection speed × document size (HTML+graphics+audio+applets)."
        ]
      },

      /* ================= TOPIC 10: WEBSITE DEVELOPMENT PROCESS (CH 7) ================= */
      {
        id: "w10",
        num: "10",
        title: "Website Development Process",
        summary: "The three stages (pre-production, production, post-production) and the 12 detailed steps used to build a website.",
        sections: [
          {
            heading: "The Three Stages",
            points: [
              "Pre-production — gives focus to the website and streamlines production; determines text content, website structure, visual style/layout and technical specifications.",
              "Production — produces the actual web pages that make up the website.",
              "Post-production — Site Updates and Additions."
            ]
          },
          {
            heading: "Stage 1: Pre-production (steps 1.1-1.7)",
            points: [
              "1.1 Profile of Target Audience — determine the objective (sales/marketing, communication, revenue); define the audience; set technical specs (browser version/type, frames?, JavaScript?, forms?, HTML4/DHTML, non-standard media, search-engine registration) and create a technical document.",
              "1.2 Content Map and Navigation — develop text content; categorize it (e.g. a common 'Contact Us'); use a flowchart for categories/subcategories.",
              "1.3 Visual Elements — static graphics, animated gifs/Flash, buttons, font (type/size/colour), background (image/colour).",
              "1.4 Alpha Text Version — text-only home page + basic navigation with dummy pages; tested by a small group; adjust from critiques.",
              "1.5 Beta Text Version — the adjusted Alpha after critique; tested with a larger audience.",
              "1.6 Alpha Visual Version — build a standard visual design (button style, type, layout); present to a small group; adjust.",
              "1.7 Beta Visual Version — adjusted Alpha Visual after critique; test with a larger audience; update/develop the style."
            ]
          },
          {
            heading: "Stage 2: Production (steps 2.1-2.4)",
            points: [
              "2.1 Content Creation — text, images and other media are created; the website is built.",
              "2.2 Content Approval — content is previewed locally (staging the website); an approval team checks for errors and deadlines.",
              "2.3 Page Editing — check content is within technical specs and all links function properly.",
              "2.4 Staging and Publishing — the Staging Server holds the site during production (no public access; used to test links/content/functionality); the Public Server holds the approved site (audience can access); register with search engines and use tracking services to collect viewing data."
            ]
          },
          {
            heading: "Stage 3: Post-production",
            points: [
              "Site updates — depending on the nature of the business/practice.",
              "Measuring — based on tracking services, measure traffic, which pages are viewed most, and search-engine performance; then make minor revisions or reconsider the entire structure/design."
            ]
          }
        ],
        quiz: [
          { q: "During which stage is the site tested on a Staging Server with no public access?", options: ["Pre-production", "Production (Staging & Publishing)", "Post-production", "Design"], answer: 1, explain: "Step 2.4 (Production) places the site on a Staging Server for testing before the Public Server release." },
          { q: "The Beta Text Version is tested with...", options: ["A small group", "A larger audience", "Only developers", "The public server"], answer: 1, explain: "The Beta Text Version (after Alpha critique) is tested with a larger audience." },
          { q: "Which pre-production step defines the audience and technical specs?", options: ["1.2 Content Map", "1.1 Profile of Target Audience", "1.3 Visual Elements", "2.1 Content Creation"], answer: 1, explain: "Step 1.1 Profile of Target Audience sets the objective, audience and technical specifications." },
          { q: "Post-production involves...", options: ["Only building pages", "Site updates and measuring traffic", "Writing HTML", "Setting up DNS"], answer: 1, explain: "Post-production covers site updates and measuring (traffic, popular pages, search performance)." }
        ],
        takeaways: [
          "3 stages: Pre-production → Production → Post-production.",
          "Pre-production = 1.1 audience profile … 1.7 beta visual (alpha then beta, small then large groups).",
          "Production = 2.1 content, 2.2 approval, 2.3 page editing, 2.4 staging→public + search engines.",
          "Post-production = updates + measuring/tracking, then revise."
        ]
      },

      /* ================= TOPIC 11: HTML & CSS (WEEK 8) ================= */
      {
        id: "w11",
        num: "11",
        title: "HTML & CSS (Week 8)",
        summary: "Introduction to HTML layout with CSS, the three types of CSS, CSS borders, links (target attribute) and absolute vs relative URLs.",
        sections: [
          {
            heading: "Introduction to HTML Layout & CSS",
            points: [
              "Week 8 explores HTML codes together with CSS to design and develop a basic HTML application.",
              "Table of content: Introduction to HTML Layout and CSS; Type of CSS; Create Links using Image, Button, Colour, Email; Tutorial & Exercise."
            ]
          },
          {
            heading: "Types of CSS",
            points: [
              "Inline CSS — styles applied directly to a single element.",
              "Internal CSS — styles defined within a <style> block in the page's <head>.",
              "External CSS — styles kept in a separate .css file linked to the page."
            ]
          },
          {
            heading: "CSS Border & With/Without CSS",
            points: [
              "CSS can add borders (style, width, colour) to elements.",
              "A website with CSS looks styled and consistent; a website without CSS shows only plain default browser formatting."
            ]
          },
          {
            heading: "HTML Links — Target Attribute & URLs",
            points: [
              "The target attribute of a link controls where the linked page opens (e.g. a new tab/window vs the same frame).",
              "Absolute URLs give the full address including the domain (e.g. http://www.example.com/page.html).",
              "Relative URLs give the path relative to the current page (e.g. page.html or /folder/page.html) and are used to link within the same site."
            ]
          }
        ],
        quiz: [
          { q: "Which CSS type is kept in a separate .css file?", options: ["Inline", "Internal", "External", "Embedded"], answer: 2, explain: "External CSS lives in a separate stylesheet file linked to the page." },
          { q: "A link written as 'http://www.example.com/page.html' is a...", options: ["Relative URL", "Absolute URL", "Anchor", "Protocol"], answer: 1, explain: "An absolute URL includes the full domain; relative URLs are paths within the same site." },
          { q: "The target attribute of a link controls...", options: ["Its colour", "Where the page opens", "Its font size", "Its width"], answer: 1, explain: "The target attribute controls where the linked page opens (e.g. new tab vs same frame)." },
          { q: "Inline CSS is applied...", options: ["To the whole site", "Directly to a single element", "In a separate file", "By the server only"], answer: 1, explain: "Inline CSS is applied directly to one element via its style attribute." }
        ],
        takeaways: [
          "CSS + HTML builds styled pages. Three types: inline, internal, external.",
          "CSS borders style elements; without CSS the page is plain/default.",
          "target attribute = where a link opens.",
          "Absolute URL = full address; Relative URL = path within the site."
        ]
      }
    ]
  },
  {
    id: "hci",
    name: "HCI",
    code: "ITHF0014",
    tagline: "Human-Computer Interaction",
    color: "#4f8fe6",
    icon: "hci",
    dockDefault: "detailed",
    detailedLabel: "ITHF0014",
    topics: [
      /* ---------------- HCI TOPIC 1 (Chapter 1) ---------------- */
      {
        id: "h1",
        num: "01",
        title: "HCI & Usability Foundations",
        summary: "What HCI is, the ISO definition of usability, usability goals (users' needs, reliability, standardization, integration, consistency, portability), the 5 usability measures, usability motivation across 5 system types, and universal usability for diverse user groups.",
        sections: [
          {
            heading: "HCI and Usability — Definitions",
            points: [
              { t: "HCI (Baecker & Buxton, 1987) = the processes, dialogues and actions through which a human user employs and interacts with a computer.", important: true },
              { t: "HCI (ACM SIGCHI, 1992) = a discipline for designing, evaluating and implementing interactive computing systems for human use, and the study of the phenomena around them.", important: true },
              { t: "Usability (ISO) = \"the effectiveness, efficiency and satisfaction with which specified users achieve specified goals in particular environments\".", important: true },
              "In practice, usability = how elegant and clear the interaction with a program or website is designed."
            ]
          },
          {
            heading: "Usability Goals / Requirements",
            points: [
              "Explicit goals are needed for usability: first understand the diverse communities of users and the tasks they must accomplish.",
              { t: "Ascertain users' needs — identify tasks/subtasks via task analysis (also uncovers infrequent & exceptional tasks); hide rarely-used functions but keep them reachable for advanced users (e.g., a calculator with basic and scientific views).", important: true },
              { t: "Ensure proper reliability — actions give appropriate results and presented info is accurate; users lose trust without it. Consider privacy, security, data integrity and malicious tampering.", important: true },
              { t: "Promote standardization — common UI features across applications. Benefits: less learning time, fewer errors, lower development time/costs.", important: true },
              "Promote integration — applications work together (e.g., MS Office easy info exchange); the UI designer should spot and communicate this potential.",
              { t: "Promote consistency — common action sequences, terms (\"cancel\" vs \"abort\"), colours, font sizes, button sizes, data formats. 3 scopes: within one app, within related apps/packages, and across versions of one app.", important: true },
              "Promote portability — convert data and share an interface across platforms; challenges: display sizes, resolutions, devices, browser features, data formats (PDF vs WORD-doc).",
              "Complete projects on schedule and within budget — delays/cost overruns may push clients to competitors."
            ]
          },
          {
            heading: "Usability Measures",
            points: [
              "To check if goals are met, use well-defined measures. Steps: (1) pick your user communities + tasks to benchmark; (2) set precise objectives per task and community.",
              { t: "1. Time to learn — how long a typical user takes to learn the UI for the defined tasks.", important: true },
              { t: "2. Speed of performance — how long the benchmark tasks take to carry out.", important: true },
              { t: "3. Rate of errors by users — how many and what kinds of errors users make; focus on error handling.", important: true },
              "4. Retention over time — how well users keep their UI knowledge; linked to time to learn and frequency of use.",
              "5. Subjective satisfaction — how much users liked the UI; from interviews and surveys with satisfaction scales and free-form comments."
            ]
          },
          {
            heading: "Usability Motivation — 5 System Types",
            points: [
              "Many UIs are poorly designed, yet well-designed UIs bring great benefits. Five system groups each have specific usability motivations.",
              { t: "1. Life-critical systems (air-traffic control, medical instruments, nuclear reactors): high costs accepted; reliability a must; high time-to-learn common; high speed + low errors crucial; satisfaction less important (well-motivated pros); retention via frequent use & practice.", important: true },
              "2. Industrial & commercial (banking, inventory, SAP, PeopleSoft): costs very important; reliability/efficiency important but less critical; low time-to-learn; high speed; low errors; satisfaction of less concern; retention via very frequent use.",
              "3. Office, home & entertainment (email, word processing, games, apps): easy to learn, low errors, low costs (high competition); satisfaction important; retention via easy procedures + online help; risks: quick frustration, diverse users, choosing the right functionality.",
              "4. Exploratory, creative & collaborative (WWW, search engines, music composition, Google Docs): users know the task domain; high motivation; occasional-to-frequent use; benchmark tests are hard to define — difficult to design and evaluate.",
              { t: "5. Socio-technical systems (voting, ID verification): complex, many people, long periods; trust, privacy and responsibility vital; reduce malicious tampering/wrong info; give feedback; users may be very diverse; ease of learning crucial.", important: true }
            ]
          },
          {
            heading: "Universal Usability — 8 Diverse User Groups",
            points: [
              "Universal usability handles diversity of users (physical, cultural, personal) and of hardware/software — a variety of challenges.",
              { t: "1. Physical abilities / workplaces — users differ (arm length, finger size, vision); compromise or offer versions/adjustments (e.g., bigger fonts via \"+\"); diverse workplaces also shape interaction-device design.", important: true },
              "2. Cognitive and perceptual abilities — know short-term/working memory, long-term/semantic memory, problem solving, reasoning, decision making; fear, anxiety, mood, emotions and background experience affect performance and learning.",
              "3. Personal differences — different preferences (e.g., direct manipulation vs command language); personality is hard to classify — try MBTI, the Big-Five-Test (MBTI's successor) and user-behaviour studies.",
              "4. Cultural and international diversity — race, language, ethnic background (e.g., black vs white = death in some cultures). Adapt: characters, right-to-left vs top-bottom reading, date/time (dd.mm.yyyy vs mm/dd/yyyy), address formats, numeric/currency delimiters, names/titles, sorting, icons/buttons/colours, grammar/spelling, tone/formality.",
              { t: "5. Users with disabilities — vision impaired (font size, colour, text-to-speech, voice-over); hearing impaired (text alternatives); mobility impaired (virtual keyboard, other devices). Early recognition = cheaper to fix.", important: true },
              "6. Senior citizens — aging slows reactions, weakens memory and perceptual flexibility, complicates mental skill learning; important as populations age.",
              "7. Children — goals: educational acceleration, socialization, positive self-image; balance challenge with safety (no penalties, be encouraging, parental control); mind children's limited physical/language abilities.",
              "8. Differences in software and hardware — technology changes fast; look ahead (connection speed, display sizes, maintenance, multi-language conversion)."
            ]
          }
        ],
        takeaways: [
          "HCI is the study of how humans use and interact with computers (design, evaluation, implementation of interactive systems).",
          "ISO usability = effectiveness, efficiency and satisfaction with which specified users achieve specified goals in particular environments.",
          "Usability goals: ascertain users' needs, ensure reliability, promote standardization, integration, consistency, portability, and finish on schedule/budget.",
          "5 usability measures: time to learn, speed of performance, rate of errors, retention over time, subjective satisfaction.",
          "Usability motivation differs across 5 system types: life-critical, industrial/commercial, office/home/entertainment, exploratory/creative/collaborative, socio-technical.",
          "Universal usability: physical, cognitive, personal, cultural, disability, senior, children and hardware/software diversity."
        ],
        quiz: [
          {
            q: "Which is the ISO definition of usability?",
            options: ["The speed and power of the hardware", "Effectiveness, efficiency and satisfaction with which specified users can achieve specified goals in particular environments", "The number of features an interface offers", "The size of the display"],
            answer: 1,
            explain: "ISO defines usability as 'the effectiveness, efficiency and satisfaction with which specified users can achieve specified goals in particular environments'."
          },
          {
            q: "Which usability goal involves discovering infrequent and exceptional tasks?",
            options: ["Standardization", "Proper reliability", "Ascertaining users' needs", "Portability"],
            answer: 2,
            explain: "Ascertaining users' needs involves performing a task analysis, which helps discover even infrequent and exceptional tasks users must carry out."
          },
          {
            q: "Reduced learning time, reduced errors and reduced development costs are benefits of...",
            options: ["Standardization", "Portability", "Integration", "Subjective satisfaction"],
            answer: 0,
            explain: "Standardization (common UI features across applications) reduces learning time, error probability and development time/costs."
          },
          {
            q: "Which usability measure asks 'how well do users maintain their knowledge of how to use the UI over time'?",
            options: ["Time to learn", "Speed of performance", "Rate of errors", "Retention over time"],
            answer: 3,
            explain: "Retention over time measures how well users maintain knowledge of the UI; it is linked to time to learn and frequency of use."
          },
          {
            q: "In which system type are high costs expected and accepted, and high reliability a must?",
            options: ["Office, home & entertainment", "Life-critical systems (air-traffic control)", "Socio-technical systems", "Exploratory and collaborative applications"],
            answer: 1,
            explain: "Life-critical systems (air-traffic control, medical instruments) must be highly reliable; high costs are accepted, and speed + low error rates are crucial."
          },
          {
            q: "Which system type is hardest to design and evaluate because benchmark tests are hard to define?",
            options: ["Life-critical systems", "Industrial applications", "Exploratory, creative and collaborative applications", "Banking software"],
            answer: 2,
            explain: "Exploratory applications (WWW, search engines, music composition) are exploratory in nature, so describing/defining benchmark tests is difficult — making them hard to design and evaluate."
          },
          {
            q: "Which is NOT one of the 8 user groups/issues of universal usability?",
            options: ["Physical abilities/workplaces", "Cultural and international diversity", "Differences in software and hardware", "Screen resolution settings"],
            answer: 3,
            explain: "The 8 groups: physical abilities, cognitive/perceptual abilities, personal differences, cultural/international diversity, users with disabilities, senior citizens, children, and differences in software and hardware."
          },
          {
            q: "MBTI and the Big-Five-Test are used by UI designers to understand...",
            options: ["Personal differences (personality types)", "Colour preferences", "Connection speeds", "Date formats"],
            answer: 0,
            explain: "Personality is hard to classify; designers use MBTI, the Big-Five-Test (its successor) and studies of user behaviour to understand personal differences."
          },
          {
            q: "For hearing-impaired users, a UI designer should provide...",
            options: ["Text-to-speech conversion", "Alternatives such as text", "Virtual keyboards only", "Larger resolution screens"],
            answer: 1,
            explain: "Hearing-impaired users need alternatives (e.g., text) to audio; vision-impaired users get text-to-speech and larger fonts; mobility-impaired users get alternative devices like virtual keyboards."
          },
          {
            q: "Date formats 'dd.mm.yyyy' vs. 'mm/dd/yyyy' is an example of issue under...",
            options: ["Physical abilities", "Cultural and international diversity", "Cognitive abilities", "Subjective satisfaction"],
            answer: 1,
            explain: "Date and time formats are an example of the cultural and international diversity issues that must be adapted for different locales."
          }
        ]
      },

/* ---------------- HCI TOPIC 2 (Chapter 2) ---------------- */
      {
        id: "h2",
        num: "02",
        title: "Guidelines, Principles & Design Process",
        summary: "Three forms of guidance (guidelines, principles, theories), example guidelines (navigation, display, attention, data entry, accessibility), the principles of UI design (skill levels, identify tasks, interaction styles, 8 golden rules, error prevention), and managing design processes (four pillars, development methodologies, ethnographic observation, participatory design, scenario development, legal issues).",
        sections: [
          {
            heading: "Guidance: Guidelines, Principles & Theories",
            points: [
              "Intuitive judgment often causes cluttered displays, complex procedures, inconsistent terminology, weak feedback and slow response — frustrating users.",
              { t: "Guidelines — very specific and practical: prescribe cures for design problems, caution against dangers, and give helpful reminders from common knowledge/experience.", important: true },
              { t: "Principles — more abstract and widely applicable: help structure the design process.", important: true },
              { t: "Theories — very abstract: describe objects and actions in consistent terminology, help analyse/compare design alternatives, and predict reading, typing or pointing times.", important: true },
              "Written guidelines build a 'shared language' — consistency in terminology, appearance, action sequences, I/O formats and graphic styles."
            ]
          },
          {
            heading: "Example A: Ease of Interface Navigation",
            points: [
              { t: "Navigation rules: standardize task sequences; descriptive embedded links; unique descriptive headings; checkboxes for binary choices; thumbnails to preview larger images.", important: true },
              { t: "Accessibility goals (so screen readers/special tech work): text alternatives (large print, Braille, speech, symbols, simpler language); captions/auditory descriptions for time-based media; distinguishable content (easy to see/hear, foreground vs background); predictable pages.", important: true }
            ]
          },
          {
            heading: "Example B: Display Organization",
            points: [
              { t: "5 goals of display organization: consistency of data display; efficient information assimilation; minimal memory load; data display compatible with data entry; flexibility in display (user controlled).", important: true }
            ]
          },
          {
            heading: "Example C: Draw User's Attention",
            points: [
              { t: "7 cues to draw attention: intensity (high, 2 levels); marking (underline, arrows, borders, asterisks, bullets, dashes, +, X); font size (large, 4 sizes); font style (exceptional, 3 fonts); blinking/animation; colour (exceptional, 4 standard); audio (harsh for exceptions, soft tunes for positive feedback).", important: true }
            ]
          },
          {
            heading: "Example D: Facilitate Data Entry",
            points: [
              { t: "6 data-entry objectives: consistency of data entry transactions; minimal input (button vs typed command → fewer errors); no redundant entry; minimal memory load (forms vs command line); entry compatible with display; flexible entry (user controlled).", important: true }
            ]
          },
          {
            heading: "Principles — Target Audience & Skill Levels",
            points: [
              { t: "Start by understanding the intended user; specifying the user is important but hard — one app often serves several diverse user groups at once.", important: true },
              "Two skill-level dimensions: (A) skill in using interfaces generally, and (B) skill in the particular application/task domain.",
              { t: "3 user groups: (1) novice/first-time, (2) knowledgeable intermittent, (3) expert frequent users.", important: true },
              "Novice/first-time: know neither the interface nor the task domain. Give instructions, dialog boxes, online help; restrict vocabulary; few actions; informative feedback; specific, constructive errors; manuals, video demos, task-oriented tutorials.",
              "Knowledgeable intermittent: stable task concepts, broad interface knowledge, but struggle to retain menu structure/feature locations. Reduce memory burden; structure menus; consistent terminology/sequences; meaningful messages; guides; context-dependent help; searchable manuals.",
              "Expert frequent: know domain + interface; want speed. Rapid response, brief non-distracting feedback, shortcuts, string commands + abbreviations.",
              "Multi-group design: 'multi-layer' design; give control over feedback density, display elements, pace; personalizable menus; vary interaction pace."
            ]
          },
          {
            heading: "Principles — Identify the Tasks",
            points: [
              { t: "Ask \"what tasks does the user carry out?\" before designing — structurally and formally, often by interviewing and observing users to learn task frequencies and sequences.", important: true },
              "Watch the functionality extent (too little vs cluttered); start from high-level tasks, decompose into steps, then atomic actions; pick the right granularity (e.g., by task frequency).",
              "A matrix of users and tasks helps sort out task assignments."
            ]
          },
          {
            heading: "Principles — Interaction Styles",
            points: [
              { t: "Direct manipulation — visual 'world of action'; selecting, dragging, pointing replaces keyboard (desktop metaphor). Pros: familiar objects, less time-to-learn, fewer errors, high retention, encourages exploration, high satisfaction. Cons: not for every scenario, can be complicated/slow, hard to realize, needs pointing devices.", important: true },
              { t: "Menus — select from a list. Pros: little learning, no memorization, structured decisions, fewer keystrokes, good error support (dialog boxes). Cons: clutter risk; may slow frequent users. Best for novice + intermittent.", important: true },
              { t: "Forms — type into fields. Pros: easier than menus, little training, convenient help. Cons: must understand labels/formats, more errors, uses screen space. Best for knowledgeable intermittent + expert.", important: true },
              { t: "Command languages — type commands. Pros: flexible, user initiative/control, macros, rapid when memorized. Cons: high errors, poor error handling, needs training. Best for experts.", important: true },
              "Natural language — Pros: no syntax to learn; works in limited scope. Cons: needs clarification dialogs, hard to determine context, unpredictable, less efficient at scope. Best for intermittent users who can't learn syntax."
            ]
          },
          {
            heading: "The 8 Golden Rules of UI Design",
            points: [
              "1. Strive for consistency — consistent action sequences, terminology in prompts/menus/help, colour, layout, capitalization, fonts.",
              "2. Cater for universal usability — novice–expert differences, age, disabilities, tech diversity; design for plasticity (content transformation).",
              "3. Offer informative feedback — every action gets feedback; visual objects of interest show changes explicitly.",
              "4. Design dialogs to yield closure — group action sequences; feedback at completion gives a sense of accomplishment.",
              { t: "5. Prevent errors — design so serious errors can't happen; keep system state unchanged or restore it; detect errors and give simple, constructive, specific recovery instructions.", important: true },
              "6. Permit easy reversal of actions — reversibility relieves anxiety, encourages exploring unfamiliar options.",
              "7. Support internal locus of control — experienced operators want to be in charge; make users the initiators, not responders.",
              "8. Reduce short-term memory load — keep displays simple; online access to command syntax, abbreviations, codes.",
              { t: "Error prevention generally: functionally organized screens/menus; distinctive menu choices/commands; make irreversible actions hard; feedback on UI state; consistency of actions; universal usability; error messages specific, positive, constructive (tell what to do).", important: true }
            ]
          },
          {
            heading: "Human Control while Increasing Automation",
            points: [
              { t: "Even with more automation, interfaces can stay predictable and controlled; a human supervisory role is still needed in complex, unexpected situations.", important: true },
              "Autonomous/adaptive/anthropomorphic agents often fail — users prefer avatars.",
              "Goal: give operators enough status info and advice to intervene correctly, even under partial failures.",
              "Suggestions: user models guide adaptive interfaces; recommender systems/collaborative filtering (Amazon); comprehensible, predictable systems; keep user control at the interface, automate internals; extend the control-panel model."
            ]
          },
          {
            heading: "Managing Design Processes — Four Pillars",
            points: [
              { t: "Design should rest on: careful observation of current users; analysis of task frequencies/sequences; validation through early usability and acceptance tests.", important: true },
              { t: "The Four Pillars of Design: (1) User Interface Requirements, (2) Guidelines Documents & Processes, (3) User Interface Software Tools, (4) Expert Reviews & Usability Testing.", important: true },
              "UI requirements: clearly specify the user community and tasks; users and implementers must share precise understanding; don't impose human-operator requirements on UI requirements; use ethnography to monitor real users.",
              "Guidelines documents cover words/icons/graphics (terminology, fonts, capitals, colours), screen layout (menus, forms, dialogs, prompts, margins, formats), I/O devices (keyboard, display, pointing, response times), action sequences (clicking/dragging, command syntax, function keys, error handling) and training (online help, tutorials, references).",
              "Guidelines should be created through an organizational social process to gain visibility and support."
            ]
          },
          {
            heading: "Development Methodologies — User-Centered Design",
            points: [
              "Many projects fail from bad communication between business/user and IT/developer; early user-centered design aligns business needs with functionality — fewer problems, lower maintenance, less learning time, faster performance.",
              { t: "LUCID (Logical User-Centered Interactive Design) — project scheduling framework with 6 stages: Envision, Discovery, Design Foundation, Design Detail, Build, Release.", important: true },
              { t: "Rapid Contextual Design — 8 steps: (1) Contextual inquiry, (2) Interpretation sessions & work modeling, (3) Model consolidation & affinity diagrams, (4) Personas, (5) Visioning, (6) Storyboarding, (7) User environment design, (8) Paper prototypes & mock-up interviews.", important: true },
              "Contextual inquiry: plan, prepare, conduct field interviews to observe/understand work tasks; review business practices.",
              "Personas: fictitious characters for different user types in a demographic (e.g., a 22-year-old gamer, or a 70-year-old using email/photo apps).",
              "Storyboarding: pictures + graphs describe the initial UI concept, business rules and automation assumptions — the 'to be built' assumptions.",
              "Final step: test with real users — paper prototypes first, then higher fidelity."
            ]
          },
          {
            heading: "Ethnographic Observation & Participatory Design",
            points: [
              { t: "Ethnographic observation — a form of user observation: (like an ethnographer) observe people at home/work, listen, ask, participate — info that shapes the UI design.", important: true },
              "Problems: misinterpretation, disruption, overlooking issues. Fix: follow an ethnographic procedure (preparation, execution, analysis, presentation) and respect user-community differences.",
              { t: "Participatory design — strong user involvement in design. Pros: accurate task info; users influence decisions. Cons: costly, may lengthen development; designers may compromise with incompetent users.", important: true },
              "Challenges: pick the right users (skills, motivation; homogenous vs diverse; size) and consider social/organizational impact (threat of change, novelty)."
            ]
          },
          {
            heading: "Scenario Development & Legal Issues",
            points: [
              { t: "Scenario development: for redesigns or automated manual procedures, real data exists (interview, logging) — build user-task/dependency tables, flow charts, transition diagrams. For novel products with no data, write usage scenarios (common, exceptional, emergency). Scenarios are higher-level than tasks.", important: true },
              { t: "Legal issues: privacy; safety and reliability; software copyright/patents; copyright of online info/images/music; freedom of speech online. Also: differing laws across countries, universal access.", important: true }
            ]
          }
        ],
        takeaways: [
          "Guidance comes in 3 forms: guidelines (specific & practical), principles (abstract & widely applicable) and theories (very abstract).",
          "Example guidelines: navigation (standardize task sequences), display organization (consistency, efficiency, minimal memory load), drawing attention (7 cues) and data entry.",
          "Classify users into novice/first-time, knowledgeable intermittent and expert frequent users — each needs different support.",
          "Interaction styles: direct manipulation, menus, forms, command languages and natural languages — each with pros/cons and target users.",
          "The 8 golden rules: consistency, universal usability, informative feedback, closure, error prevention, reversibility, locus of control, reduced memory load.",
          "Manage design with the Four Pillars, user-centered methodologies (LUCID, Rapid Contextual Design), ethnography and participatory design."
        ],
        quiz: [
          {
            q: "Which form of guidance is most specific and practical, prescribing cures for design problems?",
            options: ["Theories", "Guidelines", "Principles", "Models"],
            answer: 1,
            explain: "Guidelines are very specific and practical — they prescribe cures for design problems and caution against dangers; principles are more abstract; theories are highly abstract."
          },
          {
            q: "Which rule improves ease of interface navigation?",
            options: ["Use all uppercase headings", "Standardize task sequences", "Hide all links", "Use command lines for everything"],
            answer: 1,
            explain: "Navigation rules include standardizing task sequences, descriptive links and headings, checkboxes for binary choices, and thumbnails to preview larger images."
          },
          {
            q: "'Ensure consistency of data display' and 'require minimal memory load on the user' are goals of...",
            options: ["Interface navigation", "Display organization", "Data entry facilitation", "Drawing the user's attention"],
            answer: 1,
            explain: "These two belong to the 5 high-level goals of display organization; minimal memory load and consistency apply to data display."
          },
          {
            q: "Which of the following is used to draw the user's attention?",
            options: ["Intensity, marking, font size and style", "Blinking/animation and colour", "Audio cues", "All of the above"],
            answer: 3,
            explain: "Attention cues: intensity (2 levels), marking, font size (4 sizes), font style (3 fonts), blinking/animation, colour (4 standard) and audio (harsh for exceptions, soft for positive feedback)."
          },
          {
            q: "A user who has stable task knowledge but has difficulty retaining the structure of menus is a...",
            options: ["Novice user", "Knowledgeable intermittent user", "Expert frequent user", "First-time user"],
            answer: 1,
            explain: "Knowledgeable intermittent users hold stable task concepts but may struggle to retain menu structures and feature locations over time — so reduce memory burden and keep terminology consistent."
          },
          {
            q: "Which interaction style has high error rates, poor error handling and requires substantial training?",
            options: ["Direct manipulation", "Menus", "Command languages", "Forms"],
            answer: 2,
            explain: "Command languages are flexible and rapid once syntax is memorized, but have high error rates, poor error handling and require substantial training."
          },
          {
            q: "Which of the 8 Golden Rules tells us to 'make users the initiators of actions rather than the responders'?",
            options: ["Offer informative feedback", "Support internal locus of control", "Design dialogs to yield closure", "Reduce short-term memory load"],
            answer: 1,
            explain: "Rule 7 — support internal locus of control: experienced operators prefer to feel in charge; make the user the initiator of actions."
          },
          {
            q: "Which golden rule is served by keeping displays simple and providing online access to command-syntax forms?",
            options: ["Prevent errors", "Cater for universal usability", "Reduce short-term memory load", "Strive for consistency"],
            answer: 2,
            explain: "Rule 8 — reduce short-term memory load: keep displays simple and provide online access to codes, abbreviations and syntax forms."
          },
          {
            q: "The Four Pillars of Design include all EXCEPT...",
            options: ["User Interface Requirements", "Guidelines Documents & Processes", "User Interface Software Tools", "Marketing and Branding"],
            answer: 3,
            explain: "The Four Pillars: User Interface Requirements, Guidelines Documents & Processes, User Interface Software Tools, and Expert Reviews & Usability Testing."
          },
          {
            q: "Creating fictitious characters to represent different user types is the Rapid Contextual Design step of...",
            options: ["Contextual inquiry", "Storyboarding", "Personas", "Visioning"],
            answer: 2,
            explain: "Personas are fictitious characters representing different user types within a targeted demographic (e.g., a 22-year-old gamer or a 70-year-old email user)."
          }
        ]
      },

      /* ---------------- HCI TOPIC 3 (Chapter 3) ---------------- */
      {
        id: "h3",
        num: "03",
        title: "Evaluating Interface Designs",
        summary: "Why and how to evaluate: expert reviews (heuristic evaluation, guidelines review, consistency inspection, cognitive walkthrough), usability testing & laboratories (eye tracking, think aloud), survey instruments, acceptance tests, evaluation during active use, and controlled experiments — plus choosing an evaluation method.",
        sections: [
          {
            heading: "Overview — Determinants of Evaluation",
            points: [
              "Which strategy to use depends on: design stage (early/middle/late); project novelty; number of expected users; interface criticality; product cost & budget; available time; experience of the team.",
              { t: "Motivation: usability interest grew fast, competition is higher, and failures/non-compliance with contracts can have monetary or legal consequences.", important: true },
              { t: "Challenges: testing uncertainty (never assume the UI is error-free — plan continuous improvement and expect change requests); deadlines (release even with known errors); unpredictable situations (test beyond 'normal usage', consider critical conditions).", important: true },
              { t: "The 6 strategies: 1. Expert Reviews; 2. Usability Testing & Laboratories; 3. Survey Instruments; 4. Acceptance Test; 5. Evaluation During Active Use; 6. Controlled Psychologically Oriented Experiments.", important: true }
            ]
          },
          {
            heading: "Expert Reviews — Overview",
            points: [
              { t: "Key feature: no users involved — experts (in the application/task domain and/or UI domain), usually consultants or staff, review the UI.", important: true },
              "When: early or late, typically at several points. Duration: hours to weeks. Outcome: a formal report of problems + recommendations, and/or a presentation/discussion with the design team.",
              { t: "Types: A. Heuristic evaluation, B. Guidelines review, C. Consistency inspection, D. Cognitive walkthrough — plus Metaphors of Human Thinking and Formal Usability Inspection.", important: true }
            ]
          },
          {
            heading: "A. Heuristic Evaluation (Nielsen)",
            points: [
              { t: "Experts review the UI against a short list of design heuristics (e.g., the '8 golden rules'); fast and cheap.", important: true },
              { t: "Rate severity and suggest fixes: small (cosmetic — fix only if time); serious (can prevent task completion); catastrophic (data loss or users abandoning the product).", important: true },
              "Nielsen's 10 heuristics: 1 visibility of system status; 2 match with the real world; 3 user control & freedom; 4 consistency & standards; 5 error prevention; 6 recognition rather than recall; 7 flexibility & efficiency; 8 aesthetic & minimalist design; 9 help users recognize/diagnose/recover from errors; 10 help & documentation.",
              "Playability heuristics (gaming): game usability, mobility, gameplay (hardest to evaluate) — consistent responses, customizable video/audio/difficulty/speed, predictable AI units, unobstructed views, skip non-playable content, intuitive inputs, game-status info."
            ]
          },
          {
            heading: "B. Guidelines Review",
            points: [
              { t: "Requires a list of guidelines and experience in applying them; the evaluator checks the interface against the list; in many cases a novice can apply the guidelines.", important: true }
            ]
          },
          {
            heading: "C. Consistency Inspection",
            points: [
              { t: "Consistency inspection — checks the interface for consistency within itself, across products and across versions; focuses on: payment methods, terminology, and GUI structure.", important: true }
            ]
          },
          {
            heading: "D. Cognitive Walkthrough",
            points: [
              { t: "Evaluators step through the interface as if they were target users; for each step they ask 4 questions.", important: true },
              { t: "1. Will the user try to achieve the correct effect / move toward the correct goal? 2. Will the user notice the correct action is available? 3. Will the user associate the correct action with the effect they want? 4. If performed, will the user see progress toward the goal?", important: true }
            ]
          },
          {
            heading: "Metaphors of Human Thinking & Formal Usability Inspection",
            points: [
              "Metaphors of Human Thinking: awareness/associations (focal + peripheral info); relation between utterances and thought (make interpretation clear); knowing (mental model). Outperforms cognitive walkthrough and heuristic evaluation in experiments.",
              { t: "Formal usability inspection: experts meet with a moderator who presents the interface and asks specific questions; courtroom-style, adversarial, with a judge/moderator; extensive and expensive; good for novice designers and managers.", important: true },
              "Reporting techniques: ranked recommendation (priorities); bird's-eye view (study printed screens from a distance); software tools (speed the review).",
              "Challenge: experts may lack task-domain/user-community knowledge or be biased — choose knowledgeable experts familiar with the project and organization."
            ]
          },
          {
            heading: "Usability Testing and Laboratories",
            points: [
              { t: "Users (not experts) are observed doing a specific task set; observers sit in a separate adjacent room behind a one-way mirror; users can be watched live or via video.", important: true },
              "A usability laboratory = two 10×10 ft areas separated by a half-silvered mirror — one for the participant, one for observation; staffed by one or more UI experts.",
              { t: "2 general strategies: controlled experiment (traditional) — test a hypothesis, look for statistically significant differences in 2+ issues, many participants, outcome = validate/reject hypothesis; usability tests (UI-focused) — refine interfaces, few participants, outcome = report of recommended changes.", important: true },
              "Test types: low-cost benchmark test (fixed task set; performance recorded automatically/by observers); paper mockups; discount usability testing; competitive testing; universal usability testing; field tests & portable labs; remote testing; 'can you break this' test.",
              "Benefits: supports progress/decisions, speeds development, lowers costs."
            ]
          },
          {
            heading: "Eye-Tracking Methods",
            points: [
              { t: "Purpose: find process bottlenecks & improvement opportunities; improve web layout to highlight calls to action; measure visual appeal; prioritize changes by revenue-generation and cost-saving potential.", important: true },
              { t: "Heat map — shows attention intensity across a page (grouped); reveals what catches attention first and whether users scroll to the bottom.", important: true },
              { t: "Gaze plot — one user's exploration path: what they see first, where they pause (and how long), where they look next; shows if the page feels orderly or confusing; replayable via Retrospective Think Aloud.", important: true },
              "Zone analysis — breaks a page into zones/modules; data on how zones were seen (or not), how often users returned, and fixation time."
            ]
          },
          {
            heading: "Usability Test Procedures",
            points: [
              { t: "Pre-test: write a test plan (tasks, satisfaction/debriefing questions, participant numbers/types/sources) with the design team (mind deadlines/budget); run a pilot test weeks before with very few participants to validate the procedure, tasks and questions.", important: true },
              "Pick participants by criteria: background, task experience, motivation, education, language ability, physical abilities; also consider time, date, noise.",
              { t: "During the test: ask users to think aloud (or two participants talking to each other); videotape for later review/demo and log activity; afterwards, ask for general comments; results improve the UI and feed the next test.", important: true },
              { t: "Think-aloud: users describe what they do, why, and what they think is happening. Pros: simple (little expertise), useful insight, shows real usage. Cons: subjective and selective.", important: true },
              "Videotaping: watch users undisturbed; make sure they are comfortable and know their goals.",
              "Treat participants with respect: it's the UI being tested, not them; say what's expected and how long it takes; have them sign a consent form (right to withdraw, voluntary)."
            ]
          },
          {
            heading: "Survey Instruments",
            points: [
              { t: "Surveys complement expert reviews and usability tests; benefits: less bias, more significant results with large samples, inexpensive; questions and data analysis need careful design.", important: true },
              "Pre-test questionnaires with a few participants before the big survey; prepare analysis/presentation before distribution; verify the target group (age, gender, experience, motivation).",
              "Question kinds: (1) general (e.g., Likert-scale: 'The UI enables me to do X efficiently') — identify problems, find improvements, show progress over time; (2) detailed (purpose of commands, helpfulness of error messages) — more precise for specific actions.",
              { t: "Reference questionnaires: QUIS (readability, terminology, icon purpose); IBM PSSUQ (system usefulness, information/interface quality); SUMI (affect, efficiency, control); WAMMI (web usability).", important: true }
            ]
          },
          {
            heading: "Acceptance Tests",
            points: [
              { t: "Confirms a predefined set of measurable criteria/objectives/goals (e.g., contract compliance); the goal is NOT to find flaws but to verify adherence to requirements.", important: true },
              "Write explicit requirements in the requirements document or contract; criteria can come from the client (e.g., chapter 1's usability measures).",
              "Precise criteria matter — vague 'user-friendliness' isn't enough; often done by outside organizations to guarantee neutral results."
            ]
          },
          {
            heading: "Evaluation During Active Use",
            points: [
              { t: "After release, keep improving; showing users their feedback counts builds goodwill. 5 strategies:", important: true },
              "1. Interviews & focus groups — productive, target concerns, uncover hidden problems; but costly, time-consuming, cover few users.",
              "2. Continuous performance logging — automated logs of usage patterns, speed, error rates, help-request frequency; guides new hardware/procedures/training; respect privacy (avoid logging usernames).",
              "3. Online/telephone consultants — personal help and a great source of problem/improvement info; builds loyalty.",
              "4. Online suggestion box / e-mail trouble reports — encourages productive comments; easier than a letter or call.",
              "5. Discussion groups, wikis, newsgroups — useful without individual support; usually moderated. Plus automated evaluation tools (Tullis Display Analysis, W3C markup validation, NIST Web Metrics Testbed)."
            ]
          },
          {
            heading: "Controlled Psychologically Oriented Experiments",
            points: [
              { t: "Scientific method in HCI: address a practical problem within a theoretical framework; state a clear, testable hypothesis; identify a few independent variables to manipulate; choose dependent variables to measure; select/randomly assign participants; control biasing factors; apply statistics; resolve the problem, refine theory, advise future researchers.", important: true }
            ]
          },
          {
            heading: "Styles of Evaluation & Choosing a Method",
            points: [
              { t: "Laboratory evaluation — under lab conditions with full equipment; usually no users; system isn't tested in its real environment and users don't handle it realistically; suits dangerous/remote single-user systems.", important: true },
              { t: "Field evaluation — in the work environment; evaluators observe the system where users work. Advantage: real-environment evaluation. Disadvantage: interruptions (noise, phone calls, movement).", important: true },
              "Choosing a method — factors: when (design vs implementation); style (lab vs field); objectivity (subjective vs objective); measures (qualitative vs quantitative); information level (high vs low); interference (obtrusive vs unobtrusive); resources (time, subjects, equipment, expertise)."
            ]
          }
        ],
        takeaways: [
          "6 evaluation strategies: expert reviews, usability testing & laboratories, survey instruments, acceptance tests, evaluation during active use, controlled experiments.",
          "Expert reviews involve experts (no users): heuristic evaluation, guidelines review, consistency inspection, cognitive walkthrough (4 questions), metaphors of human thinking, formal usability inspection.",
          "Heuristic evaluation checks the UI against a short list of heuristics and rates severity: small (cosmetic), serious (blocks tasks), catastrophic (data loss/abandonment).",
          "Usability testing observes real users; labs use one-way mirrors; eye tracking gives heat maps, gaze plots and zone analysis; think-aloud is simple but subjective.",
          "Surveys (QUIS, IBM PSSUQ, SUMI, WAMMI) are less biased, cheap and statistically significant with large samples.",
          "Acceptance tests verify adherence to requirements (not find flaws); evaluation continues during active use via logging, consultants, focus groups and automated tools."
        ],
        quiz: [
          {
            q: "Which is the key characteristic of expert reviews?",
            options: ["Large numbers of participants", "The absence of users", "Automated eye tracking", "Field observation"],
            answer: 1,
            explain: "Expert reviews are performed by experts without users — the absence of users is their key characteristic."
          },
          {
            q: "A heuristic evaluation is best described as...",
            options: ["Testing with real users in a lab", "Experts reviewing the UI against a short list of design heuristics", "Asking users to fill out questionnaires", "Automated logging of user performance"],
            answer: 1,
            explain: "Heuristic evaluation reviews the UI for compliance with a short list of design heuristics (e.g., Nielsen's 10 or the 8 golden rules)."
          },
          {
            q: "A catastrophic problem in heuristic evaluation is one that...",
            options: ["Is cosmetic and fixed if time exists", "Can prevent task completion", "Results in data loss or users abandoning the product", "Needs no fixing"],
            answer: 2,
            explain: "Severity levels: small (cosmetic), serious (prevents task completion), catastrophic (data loss or product abandonment)."
          },
          {
            q: "In a cognitive walkthrough, evaluators...",
            options: ["Step through the interface as if they were members of the target audience, asking 4 questions per step", "Check the interface against a list of guidelines", "Review the interface with a moderator in a courtroom style", "Draw heat maps of attention"],
            answer: 0,
            explain: "Cognitive walkthrough: evaluators step through the interface as if they were target users and ask 4 questions at each step."
          },
          {
            q: "Which of the following is NOT one of the 4 cognitive-walkthrough questions?",
            options: ["Will the user try to achieve the correct goal?", "Will the user notice the correct action is available?", "Will the user associate the correct action with the effect?", "Will the user be satisfied with the colour scheme?"],
            answer: 3,
            explain: "The 4 questions concern the correct goal, noticing the correct action, associating the action with the effect, and seeing that progress is made."
          },
          {
            q: "The absence of users characterizes which evaluation method?",
            options: ["Usability testing", "Expert reviews", "Surveys", "Acceptance tests"],
            answer: 1,
            explain: "Expert reviews are carried out by experts; users are absent — this is their defining characteristic."
          },
          {
            q: "In a usability laboratory, observers typically sit...",
            options: ["In the same room as the participant", "In a separate adjacent room behind a one-way mirror", "Remotely via video only", "Next to the participant"],
            answer: 1,
            explain: "Observers are usually in a separate adjacent room separated by a one-way (half-silvered) mirror; users can be observed live or via video."
          },
          {
            q: "Which eye-tracking output shows the progression of one user's visual exploration of a page?",
            options: ["Heat map", "Gaze plot", "Zone analysis", "Click chart"],
            answer: 1,
            explain: "Gaze plots trace a single user's path — what they see first, where they pause and for how long; heat maps show group attention intensity."
          },
          {
            q: "A stated disadvantage of the think-aloud technique is that it is...",
            options: ["Very expensive", "Subjective and selective", "Requires advanced expertise", "Only works in the field"],
            answer: 1,
            explain: "Think-aloud is simple and needs little expertise, but its disadvantages are that it is subjective and selective."
          },
          {
            q: "The purpose of acceptance tests is to...",
            options: ["Identify flaws in the interface", "Verify adherence to predefined measurable requirements", "Measure eye movements", "Refine the interface iteratively"],
            answer: 1,
            explain: "Acceptance tests confirm that a predefined set of measurable criteria is met — verifying adherence to requirements, not identifying flaws."
          }
        ]
      },

/* ---------------- HCI TOPIC 4 (Chapter 4) ---------------- */
      {
        id: "h4",
        num: "04",
        title: "Task Analysis & Dialogue Design",
        summary: "Task analysis (definitions, approaches, HTA & its three stages, sources of information, uses), plus dialogue design (types of dialogue, standards, design process, notation and modeling techniques like state transition networks, flow charts, JSD and LDO).",
        sections: [
          {
            heading: "Task Analysis — Overview",
            points: [
              { t: "Task analysis — a systematic approach to studying and decomposing the tasks users carry out to reach a user goal; it answers: 'what do users do?'.", important: true },
              "To reach a goal, users perform a series of related actions; decomposition breaks complex tasks into smaller, manageable subtasks.",
              "It covers: things users need to do, need to know, and need to act on — analysing how people do their jobs.",
              "Overall process: task identification (observe users); task decomposition (structured breakdown); knowledge-based analysis (experts define needed skills). Interfaces must support the user's tasks."
            ]
          },
          {
            heading: "Definitions — Goal, Task, Action, Method, Object",
            points: [
              { t: "Goal — a state of the system that the human wishes to achieve.", important: true },
              { t: "Task — a structured set of activities in which actions are undertaken in some sequence.", important: true },
              { t: "Action — a task that involves no problem solving or control-structure component (the basic unit).", important: true },
              { t: "Method — a plan that consists of a number of tasks or actions linked into a sequence; tools or techniques to achieve a goal, consisting of iteration and selection.", important: true },
              "Object — the focus of actions; e.g., to bold text, the focus of the action is the text."
            ]
          },
          {
            heading: "Task Analysis Approaches",
            points: [
              { t: "Task decomposition — the task is split into subtasks.", important: true },
              "Knowledge-based techniques — based on organized knowledge of objects, actions, and how that knowledge is structured.",
              "Entity-relation-based analysis — focuses on identifying actors/objects and the relationships between them.",
              "Example — cleaning a room (get vacuum, fix attachment, clean rooms, empty dust bag when full, put away) — each step needs things we do, know, and act on."
            ]
          },
          {
            heading: "Hierarchical Task Analysis (HTA)",
            points: [
              { t: "HTA — a graphical representation of a high-level task decomposed into subtasks and operations/actions; an iterative process of identifying, categorizing and breaking down tasks.", important: true },
              "Aim: describe tasks as a hierarchy of operations and plans; specify when each subtask must run.",
              { t: "Stage 1 (starting): specify the main task/area of work; break it into 4–8 subtasks; specify them as objectives covering the whole area; draw layered plans, logically/technically correct with none missing.", important: true },
              "Stage 2 (progressing): choose the detail level and end point (fine keystrokes vs higher units like 'delete a block'); depth-first or breadth-first; use a numbering convention and pragmatic form.",
              "Stage 3 (finalizing): keep decompositions/numbering consistent; show an uninvolved but knowledgeable person to check consistency.",
              "Example — make a cup of tea: 0 make tea; 1 boil water (1.1 fill kettle, 1.2 put on stove, 1.3 wait, 1.4 turn off gas); 2 empty pot; 3 make pot; 4 wait 4–5 min; 5 pour. Plan 0: do 1; if pot full, do 2 then 3–4; after 4–5 min do 5. Plan 1: do 1.1–1.2–1.3; when boiling do 1.4."
            ]
          },
          {
            heading: "Sources of Information and Data Collection",
            points: [
              { t: "1. Documentation — existing manuals, instruction booklets, training materials, rule books, job descriptions.", important: true },
              { t: "2. Observation — formal or informal; at its simplest, watch people and chat to get the 'feel of the task'.", important: true },
              { t: "3. Interview — question domain experts (the person who knows the job and the one who does it) — direct and quick.", important: true },
              "4. Initial analysis — most methods start by listing elementary objects and actions.",
              "5. Sorting and classification — techniques produce hierarchies and sort entries by attributes."
            ]
          },
          {
            heading: "Uses of Task Analysis",
            points: [
              { t: "1. Manuals & tuition — HTA's hierarchy structures manuals/courses; 'how-to-do-it' manuals fit initial training, a more conceptual structure suits advanced training; task analysis helps users transfer between systems.", important: true },
              { t: "2. Requirements capture & system design — guides new-system design; for existing systems, decide which objects/tasks stay and use the formalized presentation to let the client clarify new features; automate whole roles/tasks or specific subtasks.", important: true },
              "3. Detailed interface design — task sequences from decomposition guide dialogue design; subtask order can mirror the job; make frequent tasks easy in the right order.",
              "Task analysis is never complete, so it shouldn't be the sole arbiter of interface style — but a good analysis yields interfaces that support how people want to work.",
              "Example — microwave: goal 'Cook food!'; how: prepare meal, put in oven, select programme, listen for the bell, remove. Programme: autosensor, defrost, or timer — with rules (plans) ordering tasks.",
              "Example — ticket machine: activity model (destination → journey type → fare quote → ticket + change); initial solution splits into a fare-quoting machine and a ticket-dispensing machine."
            ]
          },
          {
            heading: "Dialogue — Definition & Types",
            points: [
              { t: "A dialogue = communication between 2+ entities; the designer decides whether the user or the computer controls it.", important: true },
              { t: "Program-directed dialogues — the application controls the flow; the user is directed to enter commands/data; e.g., menus and form-filling ('Do you want to save changes?').", important: true },
              { t: "Operator-directed dialogues — the user directs the application in a user-chosen sequence; e.g., command language and direct manipulation.", important: true }
            ]
          },
          {
            heading: "Standards for Dialogue Design",
            points: [
              { t: "Feedback — the dialogue's feedback should help the user understand the system.", important: true },
              "Suitability — the user should be able to get information and do tasks.",
              { t: "User control — give the user as much control as possible; they should control the speed.", important: true },
              "Error handling — prevent errors where possible; if one occurs, inform the user (e.g., error messages).",
              "Learning — a well-designed dialogue supports learning; let users develop common problem-solving procedures."
            ]
          },
          {
            heading: "Dialogue Design Process",
            points: [
              { t: "Cater to the expected user; support and enhance the user's perceptual model of the system; give the user freedom.", important: true },
              "Elements to consider: clarity — the user knows what they're doing and what's happening (bad dialogues fail this); consistency — similar commands look/act the same; performance — actions shouldn't take long; respect — neutral tone, no tricks.",
              "For information collection, a program-directed form-filling dialogue works well because it limits possible errors.",
              "Bad dialogue design: the dialogue should explicitly say what error occurred and what caused it."
            ]
          },
          {
            heading: "Dialogue Design Notation & Modeling",
            points: [
              { t: "Notations: diagrammatic (easy to read at a glance) or textual (easier for formal analysis). Dialogue links to the system's semantics (what it does) and presentation (how it looks).", important: true },
              { t: "Formal descriptions can be analysed for: inconsistent actions, difficult-to-reverse actions, missing items, and potential mis-keying errors.", important: true },
              { t: "STN (State Transition Network) — a graphical dialogue notation: states with arcs labelled by the input tokens that trigger transitions; calls and output can also sit on arcs; best when the UI has many modes (each state = a mode).", important: true },
              "STNs describe low-level widgets (menus, scrollbars) and global app flow (which command opens which dialog).",
              "Other notations: flow charts (programming; e.g., the delete dialog); Jackson Structured Design (JSD) (e.g., student-record: login → add/edit/display/delete → logout).",
              "LDO (Logical Dialogue Outlines) — progression of screens for an event; linked LDOs form a higher-level grouping chart called Logical Dialogue Control (LDC) (e.g., class booking: login → password → main menu → booking/cancellation/status/help/errors)."
            ]
          }
        ],
        takeaways: [
          "Task analysis studies and decomposes what users do to accomplish a goal; process: identification → decomposition → knowledge-based analysis.",
          "Definitions: goal (desired system state), task (structured activities), action (no problem solving), method (tasks/actions linked with iteration & selection), object (focus of actions).",
          "Approaches: task decomposition, knowledge-based techniques, and entity-relation-based analysis.",
          "HTA shows tasks as a hierarchy of operations and plans; 3 stages (starting, progressing, finalizing); e.g., making a cup of tea.",
          "Sources of data: documentation, observation, interview, initial analysis, sorting/classification. Uses: manuals, requirements capture, detailed interface design.",
          "Dialogues are program-directed (menus, form filling) or operator-directed (command language, direct manipulation); standards: feedback, suitability, user control, error handling, learning.",
          "Modeling techniques: State Transition Networks, flow charts, JSD diagrams, and Logical Dialogue Outlines (LDO)/Logical Dialogue Control (LDC)."
        ],
        quiz: [
          {
            q: "Task analysis primarily answers the question...",
            options: ["How fast can the system run?", "What do users do?", "Which colours to use?", "How much memory is needed?"],
            answer: 1,
            explain: "Task analysis is a systematic approach to studying and decomposing the tasks users perform — it answers 'what do users do?'"
          },
          {
            q: "A goal in task analysis is best defined as...",
            options: ["A sequence of commands", "A state of the system that the human wishes to achieve", "A basic click action", "A tool used to complete tasks"],
            answer: 1,
            explain: "A goal is a state of the system the human wishes to achieve; tasks are the structured activities performed to reach it."
          },
          {
            q: "A task that involves no problem solving or control-structure component is called a(n)...",
            options: ["Goal", "Method", "Action", "Object"],
            answer: 2,
            explain: "An action is a task with no problem solving or control-structure component — the basic unit of activity."
          },
          {
            q: "A method consists of...",
            options: ["A single keystroke", "Tasks/actions linked into a sequence, with iteration and selection", "Only one action", "A list of objects"],
            answer: 1,
            explain: "A method is a plan of tasks or actions linked into a sequence; it can be a tool or technique to achieve a goal and includes iteration and selection."
          },
          {
            q: "Which task-analysis approach splits the task into subtasks?",
            options: ["Knowledge-based techniques", "Entity-relation-based analysis", "Task decomposition", "Scenario development"],
            answer: 2,
            explain: "Task decomposition splits a task into subtasks; knowledge-based techniques rely on organized knowledge of objects/actions; entity-relation analysis focuses on actors and their relationships."
          },
          {
            q: "In the first stage of HTA, the main task should be broken down into...",
            options: ["Two subtasks", "Between four and eight subtasks", "As many subtasks as possible", "A single subtask"],
            answer: 1,
            explain: "Stage 1 (starting the analysis) specifies the main task and breaks it down into between four and eight subtasks covering the whole area of interest."
          },
          {
            q: "Which is NOT a source of information for task analysis?",
            options: ["Documentation (manuals, instruction booklets)", "Observation", "Interview with domain experts", "Compiler warnings"],
            answer: 3,
            explain: "Sources: documentation, observation, interview, initial analysis, and sorting/classification. Compiler warnings are a programming concern, not a data source."
          },
          {
            q: "A dialogue whose flow is controlled by the application, e.g., a menu system or form filling, is a...",
            options: ["Operator-directed dialogue", "Program-directed dialogue", "Natural-language dialogue", "Direct-manipulation dialogue"],
            answer: 1,
            explain: "Program-directed dialogues have flow controlled by the application (menus, form filling); operator-directed dialogues are directed by the user (command language, direct manipulation)."
          },
          {
            q: "Which standard for dialogue design requires that users be informed about errors via error messages?",
            options: ["Feedback", "Suitability", "User control", "Error handling"],
            answer: 3,
            explain: "Error handling: the application should try to prevent errors, and if an error occurs the user should be informed (e.g., clear error messages)."
          },
          {
            q: "State Transition Networks are most useful when...",
            options: ["The interface has a large number of modes", "There are no states", "Only one screen exists", "Users type long commands"],
            answer: 0,
            explain: "STNs use states with arcs labeled by input tokens; each state is really a mode, so they suit UIs with many modes — useful for widgets and global flow."
          }
        ]
      },

      /* ---------------- HCI TOPIC 5 (Chapter 5) ---------------- */
      {
        id: "h5",
        num: "05",
        title: "Direct Manipulation & Virtual Environments",
        summary: "Metaphors, direct manipulation, icon & 3D guidelines, tele-operation, virtual and augmented reality.",
        sections: [
          {
            heading: "Metaphors in Interface Design",
            points: [
              "Metaphors represent items and concepts to the user through a screen; they help users learn an application by transferring existing knowledge.",
              { t: "Metaphor = a mapping of knowledge about a familiar domain (its elements and their relations) onto an unfamiliar domain (Preece, 142).", important: true },
              "Verbal metaphor: analogies based on familiar knowledge, used in instructions or real life, that help users begin to understand a new system.",
              "Verbal metaphors invite users to see the differences between old and new systems — not all features of the old domain map to the new one, so new understanding is sometimes needed.",
              "Virtual interface metaphors: interfaces built to resemble real-world ones, e.g. the desktop metaphor where office objects appear as icons and real actions (open, close, copy, trash) are emulated with the mouse.",
              "Composite metaphors: a combination of multiple partial models for flexibility, e.g. desktop + scroll bar + menus + windows, with cut & paste enabling desktop publishing (DTP)."
            ]
          },
          {
            heading: "Examples of Metaphors in Applications",
            points: [
              "Operating system → the desktop (office tasks, files, documents).",
              "Data storage → a filing system (files, folders, storing and retrieving).",
              "Spreadsheet → a ledger sheet (columnar tables, calculations).",
              "The Web → travel (going from place to place).",
              "Online shopping → a shopping cart (adding items, checking out).",
              "Graphics packages → a toolbox (paint, brushes, pencils, rubbers)."
            ]
          },
          {
            heading: "Direct Manipulation — Definition & Principles",
            points: [
              "Direct Manipulation is an interaction style that lets users point directly to an object or icon to manipulate it, giving a natural representation of task objects and actions (e.g. dragging a file to a trash can).",
              { t: "The 3 principles of DM: (1) visibility of the objects and actions of interest (continuous, meaningful metaphor); (2) rapid, reversible, incremental actions (effects visible immediately); (3) replacement of typed commands by pointing actions on the objects of interest.", important: true },
              { t: "Basic goals: provide comprehensible UIs; enable rapid learning; provide predictable and controllable actions; provide appropriate feedback to confirm progress.", important: true }
            ]
          },
          {
            heading: "Direct Manipulation — Examples, Benefits & Problems",
            points: [
              "Examples: desktop-based interfaces (word processors), computer games, web apps, CAD (floor planning, engineering), virtual reality (immersive), and augmented reality (a virtual layer over reality).",
              { t: "Benefits: helps novices learn quickly, experts work rapidly, and intermittent users retain the concept; shows actions furthering goals; lowers anxiety and gives a sense of control.", important: true },
              { t: "Problems: visual representation may be too large or need explanation; users must fully understand the icon's meaning; visuals may mislead; novices may struggle with the device; limited because not all actions have a DM analogy; difficult to implement.", important: true }
            ]
          },
          {
            heading: "Icon Design Guidelines",
            points: [
              "An icon is an image, picture or symbol representing a concept — a small representation of an object or action.",
              { t: "Icon design guidelines: (1) the representation must be familiar; (2) limit the number of different icons; (3) make the icon stand out from its background; (4) 3D icons are good but sometimes distracting; (5) a single icon must be visible among unselected icons; (6) design the icon's movement (animated); (7) minimize memorization; (8) consistency and uniformity.", important: true }
            ]
          },
          {
            heading: "3D Interfaces",
            points: [
              "'Pure' 3D interfaces have strong utility in some contexts (medical, product design); 'enhanced' interfaces, better than reality, reduce real-world limitations — e.g. avatars in multiplayer 3-D worlds such as ActiveWorlds.",
              { t: "Features for effective 3D: use shadows and 3D techniques carefully; minimize navigation steps; keep text readable; avoid clutter, distraction, contrast shifts and reflections; simplify user and object movement; prevent errors; organize items in aligned structures for rapid visual search.", important: true },
              { t: "Guidelines for enhanced 3D: provide overviews (big picture); allow teleportation; offer X-ray vision; provide history keeping; permit rich user actions on objects; enable remote collaboration.", important: true }
            ]
          },
          {
            heading: "Tele-operation",
            points: [
              "Tele-operation = human operators controlling physical processes from remote locations (e.g. remotely piloted aircraft).",
              { t: "Tele-operation issues: time delays and incomplete feedback.", important: true }
            ]
          },
          {
            heading: "Virtual & Augmented Reality",
            points: [
              "Virtual Reality (VR) is a technology that lets a user interact with a computer-simulated environment, real or imagined; mostly visual but may include sound and other sensations. It can resemble the real world (pilot/combat training) or differ greatly (VR games).",
              "Augmented Reality (AR) combines the real scene viewed by the user with a computer-generated virtual scene that augments it with additional information; virtual images are merged with the real view.",
              "AR examples: AR for the blind, AR contact lenses, medical AR apps, and IKEA's catalog preview that shows items in your own house.",
              { t: "Successful virtual environments depend on the smooth integration of visual display, head position sensing, hand-position sensing, sound input/output and other sensations, plus cooperative and competitive VR.", important: true }
            ]
          }
        ],
        takeaways: [
          "Metaphors map a familiar domain onto an unfamiliar one to help users learn; types include verbal, virtual interface (desktop) and composite.",
          "Direct Manipulation = pointing directly at objects; 3 principles: visible objects/actions, rapid reversible incremental actions, pointing replaces typed commands.",
          "DM benefits: fast learning for novices, speed for experts, less anxiety; problems: misleading visuals, limited analogies, hard to implement.",
          "Icon guidelines: familiar representation, limited count, stand out from background, consistency and uniformity, minimize memorization.",
          "3D interfaces need careful shadows, minimal navigation, readable text, overviews, teleportation, X-ray vision and remote collaboration.",
          "VR immerses users in a simulated world; AR augments the real view with virtual information; tele-operation controls real processes remotely."
        ],
        quiz: [
          {
            q: "In interface design, a metaphor is best described as...",
            options: ["A programming language", "A mapping of a familiar domain's elements and relations onto an unfamiliar domain", "A type of error message", "A database schema"],
            answer: 1,
            explain: "Preece: knowledge about a familiar domain (elements and relations) is mapped onto an unfamiliar domain to help users learn the new system."
          },
          {
            q: "Which is an example of a virtual interface metaphor?",
            options: ["The desktop metaphor (office objects as icons)", "A command-line prompt", "A compiler", "A firewall"],
            answer: 0,
            explain: "The desktop metaphor makes the interface like the real world — office objects as icons, with real actions emulated by pointing and dragging."
          },
          {
            q: "The three principles of Direct Manipulation include all EXCEPT...",
            options: ["Visibility of objects and actions of interest", "Rapid, reversible, incremental actions", "Replacement of typed commands by pointing", "Replacement of the mouse by typed commands"],
            answer: 3,
            explain: "DM replaces typed commands with pointing actions on the objects of interest — not the reverse."
          },
          {
            q: "Which is a benefit of direct manipulation?",
            options: ["It requires learning complex syntax", "It helps novices learn quickly and experts work rapidly", "It hides the user's actions", "It is always easy to implement"],
            answer: 1,
            explain: "DM helps novices learn quickly, experts work rapidly, and intermittent users retain concepts, with lower anxiety and a sense of control."
          },
          {
            q: "Which is a stated problem with direct manipulation?",
            options: ["It is too fast for experts", "Visual representation may be misleading and not all actions have a DM analogy", "It always requires a keyboard", "It cannot be animated"],
            answer: 1,
            explain: "Problems include misleading visuals, the need to fully understand icons, limited analogies, and difficulty implementing."
          },
          {
            q: "According to the icon guidelines, icons should...",
            options: ["Be as numerous as possible", "Have a familiar representation and stand out from the background", "Always avoid 3D", "Be inconsistent for variety"],
            answer: 1,
            explain: "Guidelines state the representation must be familiar, the count limited, and icons must stand out from the background with consistency."
          },
          {
            q: "A guideline for effective 3D interfaces is to...",
            options: ["Maximize visual clutter", "Minimize navigation steps and keep text readable", "Avoid overviews", "Disable user movement"],
            answer: 1,
            explain: "Effective 3D minimizes navigation steps, keeps text readable, avoids clutter, and organizes items for rapid visual search."
          },
          {
            q: "Tele-operation is characterized by...",
            options: ["Users working only at the local machine", "Human operators controlling physical processes from remote locations", "Pure simulation with no real-world link", "Never having time delays"],
            answer: 1,
            explain: "Tele-operation lets human operators control physical processes remotely; key issues are time delays and incomplete feedback."
          },
          {
            q: "Augmented Reality (AR) differs from Virtual Reality (VR) because AR...",
            options: ["Replaces the real world completely", "Combines the real scene with a computer-generated virtual layer that augments it", "Only exists in games", "Has no sound"],
            answer: 1,
            explain: "AR merges the real view with a virtual scene that adds information, whereas VR immerses the user in a simulated environment."
          },
          {
            q: "Successful virtual environments depend on the smooth integration of...",
            options: ["Only visual display", "Visual display, head/hand position sensing, sound I/O and other sensations", "Only keyboard input", "Only network latency"],
            answer: 1,
            explain: "They require visual display, head and hand position sensing, sound input/output and other sensations, plus cooperative/competitive VR."
          }
        ]
      }
    ],

    simple: [
      /* ---------------- HCI SIMPLE TOPIC 1 ---------------- */
      {
        id: "s1",
        num: "01",
        title: "HCI & Usability Foundations (Simple)",
        summary: "Quick overview of what HCI is, the ISO usability definition, the main usability goals, the 5 usability measures, and why usability matters across system types and user groups.",
        sections: [
          {
            heading: "What is HCI?",
            points: [
              { t: "HCI (Baecker & Buxton) = the processes, dialogues and actions through which a human user employs and interacts with a computer.", important: true },
              { t: "HCI (ACM SIGCHI) = a discipline for designing, evaluating and implementing interactive computing systems for human use.", important: true },
              { t: "Usability (ISO) = effectiveness, efficiency and satisfaction with which specified users achieve specified goals in particular environments.", important: true }
            ]
          },
          {
            heading: "Usability Goals & the 5 Measures",
            points: [
              "Usability goals: ascertain users' needs (via task analysis), ensure proper reliability, promote standardization, integration, consistency and portability — and finish on schedule and within budget.",
              { t: "The 5 usability measures: time to learn, speed of performance, rate of errors by users, retention over time, and subjective satisfaction.", important: true }
            ]
          },
          {
            heading: "Motivation & Universal Usability",
            points: [
              "5 system types with different usability priorities: life-critical, industrial/commercial, office/home/entertainment, exploratory/creative/collaborative, and socio-technical systems.",
              "Universal usability covers 8 diverse groups: physical abilities, cognitive/perceptual abilities, personal differences, cultural/international diversity, users with disabilities, seniors, children, and hardware/software differences."
            ]
          }
        ],
        takeaways: [
          "HCI studies how humans use and interact with computers; ISO usability = effectiveness + efficiency + satisfaction.",
          "Usability goals: users' needs, reliability, standardization, integration, consistency, portability.",
          "Use the 5 usability measures to check whether usability goals are being met.",
          "Usability priorities differ across 5 system types and across 8 diverse user groups."
        ],
        quiz: []
      },
      {
        id: "s2",
        num: "02",
        title: "Guidelines, Principles & Design Process (Simple)",
        summary: "Quick overview of the 3 forms of guidance, user skill levels, interaction styles, the 8 golden rules, and how to manage the design process (Four Pillars, user-centered methods, ethnography, participatory design).",
        sections: [
          {
            heading: "Guidance, Users & Interaction Styles",
            points: [
              { t: "3 forms of guidance: guidelines (specific & practical), principles (abstract & widely applicable) and theories (very abstract).", important: true },
              { t: "3 user groups: novice/first-time, knowledgeable intermittent, and expert frequent users — each needs different support.", important: true },
              { t: "5 interaction styles: direct manipulation, menus, forms, command languages and natural language — each with pros/cons and target users.", important: true }
            ]
          },
          {
            heading: "The 8 Golden Rules of UI Design",
            points: [
              { t: "The 8 golden rules: (1) strive for consistency; (2) cater for universal usability; (3) offer informative feedback; (4) design dialogs to yield closure; (5) prevent errors; (6) permit easy reversal of actions; (7) support internal locus of control; (8) reduce short-term memory load.", important: true }
            ]
          },
          {
            heading: "Managing the Design Process",
            points: [
              { t: "The Four Pillars of Design: User Interface Requirements, Guidelines Documents & Processes, User Interface Software Tools, and Expert Reviews & Usability Testing.", important: true },
              "User-centered methodologies: LUCID (Envision → Discovery → Design Foundation → Design Detail → Build → Release) and Rapid Contextual Design (8 steps, e.g. personas and storyboarding).",
              "Ethnographic observation studies real users in their environment; participatory design involves users strongly in the design.",
              "Scenario development builds usage scenarios for novel products; legal issues include privacy, safety, copyright and freedom of speech."
            ]
          }
        ],
        takeaways: [
          "Guidance comes in 3 forms: guidelines (specific), principles (abstract), theories (very abstract).",
          "Classify users as novice/intermittent/expert and pick interaction styles to match (DM, menus, forms, commands, natural language).",
          "The 8 golden rules cover consistency, usability, feedback, closure, error prevention, reversibility, locus of control and memory load.",
          "Manage design with the Four Pillars, user-centered methodologies (LUCID, Rapid Contextual Design), ethnography and participatory design."
        ],
        quiz: []
      },
      {
        id: "s3",
        num: "03",
        title: "Evaluating Interface Designs (Simple)",
        summary: "Quick overview of the 6 evaluation strategies — expert reviews, usability testing & labs, surveys, acceptance tests, evaluation during active use, and controlled experiments — plus choosing a method.",
        sections: [
          {
            heading: "The 6 Strategies & Expert Reviews",
            points: [
              { t: "The 6 strategies: 1. Expert Reviews; 2. Usability Testing & Laboratories; 3. Survey Instruments; 4. Acceptance Test; 5. Evaluation During Active Use; 6. Controlled Experiments.", important: true },
              { t: "Expert reviews involve no users: heuristic evaluation (Nielsen's 10 heuristics), guidelines review, consistency inspection, and cognitive walkthrough.", important: true },
              "Nielsen's heuristics: visibility of system status, match with the real world, user control & freedom, consistency & standards, error prevention, recognition over recall, flexibility & efficiency, aesthetic & minimalist design, error recovery, help & documentation."
            ]
          },
          {
            heading: "Usability Testing, Labs & Eye-Tracking",
            points: [
              { t: "Usability testing: users (not experts) are observed doing tasks, often behind a one-way mirror; 2 general strategies: controlled experiments (test a hypothesis) vs usability tests (refine the interface).", important: true },
              "During tests ask users to think aloud; videotape sessions; run a pilot test weeks before with very few participants.",
              "Eye-tracking methods: heat map (attention intensity), gaze plot (one user's exploration path) and zone analysis (page zones)."
            ]
          },
          {
            heading: "Surveys, Acceptance Tests, Active Use & Experiments",
            points: [
              { t: "Surveys (QUIS, PSSUQ, SUMI, WAMMI) complement expert reviews and tests; acceptance tests verify predefined measurable criteria rather than finding flaws.", important: true },
              "Evaluation during active use: interviews/focus groups, continuous performance logging, consultants, suggestion boxes and discussion groups.",
              "Controlled experiments apply the scientific method: hypothesis, variables, participants, statistics.",
              "Choosing a method: consider stage, lab vs field, objectivity, measures, information level, interference and resources."
            ]
          }
        ],
        takeaways: [
          "6 strategies: expert reviews, usability testing & labs, surveys, acceptance tests, active-use evaluation, controlled experiments.",
          "Expert review types: heuristic evaluation, guidelines review, consistency inspection, cognitive walkthrough.",
          "Usability tests observe real users (think aloud, videotape); eye-tracking adds heat maps, gaze plots and zone analysis.",
          "Acceptance tests verify requirements; controlled experiments test hypotheses scientifically."
        ],
        quiz: []
      },
      {
        id: "s4",
        num: "04",
        title: "Task Analysis & Dialogue Design (Simple)",
        summary: "Quick overview of task analysis (definitions, approaches, Hierarchical Task Analysis), its sources and uses, plus dialogue design (types, standards, design process and notations).",
        sections: [
          {
            heading: "Task Analysis & HTA",
            points: [
              { t: "Task analysis studies and decomposes the tasks users carry out to reach a goal — it answers 'what do users do?'.", important: true },
              { t: "Key definitions: goal (desired system state), task (structured set of activities), action (no problem solving), method (tasks/actions linked with iteration & selection), object (focus of actions).", important: true },
              { t: "HTA (Hierarchical Task Analysis) decomposes a high-level task into subtasks and operations in 3 stages: starting, progressing, finalizing.", important: true },
              "Sources of information: documentation, observation, interviews, initial analysis, and sorting/classification.",
              "Uses: structuring manuals/tuition, requirements capture & system design, and detailed interface design."
            ]
          },
          {
            heading: "Dialogue Design",
            points: [
              { t: "Dialogues are program-directed (menus, form-filling — the app controls flow) or operator-directed (command languages, direct manipulation — the user controls flow).", important: true },
              { t: "Dialogue standards: feedback, suitability, user control, error handling, and learning.", important: true },
              "A good design process: cater to the expected user, support their perceptual model, give freedom, keep it clear, consistent, fast and respectful.",
              "Notations: State Transition Networks (many modes), flow charts, Jackson Structured Design, and Logical Dialogue Outlines (LDO)/Logical Dialogue Control (LDC)."
            ]
          }
        ],
        takeaways: [
          "Task analysis answers 'what do users do?'; HTA breaks tasks into hierarchies (starting/progressing/finalizing).",
          "Goal, task, action, method, object are the key task-analysis definitions.",
          "Dialogues are program-directed or operator-directed; standards: feedback, suitability, control, error handling, learning.",
          "Model dialogues with STNs, flow charts, JSD or LDO/LDC."
        ],
        quiz: []
      },
      {
        id: "s5",
        num: "05",
        title: "Direct Manipulation & Virtual Environments (Simple)",
        summary: "Quick overview of metaphors, direct manipulation (3 principles, benefits & problems), icon design guidelines, 3D interfaces, tele-operation, and virtual vs augmented reality.",
        sections: [
          {
            heading: "Metaphors & Direct Manipulation",
            points: [
              { t: "A metaphor maps knowledge of a familiar domain onto an unfamiliar one to help users learn (e.g. the desktop metaphor).", important: true },
              { t: "The 3 principles of Direct Manipulation: (1) visibility of objects and actions; (2) rapid, reversible, incremental actions; (3) pointing replaces typed commands.", important: true },
              { t: "DM benefits: fast learning for novices, speed for experts, high retention, less anxiety. Problems: misleading visuals, limited analogies, hard to implement.", important: true }
            ]
          },
          {
            heading: "Icons & 3D Interfaces",
            points: [
              { t: "Icon guidelines: familiar representation, limited number, stand out from the background, visible when unselected, design movement, minimize memorization, consistency and uniformity.", important: true },
              "Effective 3D: careful shadows, minimal navigation steps, readable text, no clutter, aligned structures for rapid search.",
              "Enhanced 3D: provide overviews, teleportation, X-ray vision, history keeping, rich user actions and remote collaboration."
            ]
          },
          {
            heading: "Tele-operation, VR & AR",
            points: [
              { t: "Tele-operation = human operators controlling physical processes remotely; key issues are time delays and incomplete feedback.", important: true },
              "VR (Virtual Reality) immerses the user in a computer-simulated environment (real or imagined).",
              "AR (Augmented Reality) combines the real scene with a computer-generated virtual layer that augments it with extra information (e.g. IKEA preview)."
            ]
          }
        ],
        takeaways: [
          "Metaphors map a familiar domain onto an unfamiliar one to help users learn.",
          "Direct Manipulation: visible objects/actions, rapid reversible incremental actions, pointing replaces typing.",
          "Icons should be familiar, limited in number, consistent and stand out from the background.",
          "VR immerses users in a simulated world; AR augments the real view; tele-operation controls real processes remotely."
        ],
        quiz: []
      }
    ],

    formulaSheet: [
      "HCI (Baecker & Buxton) = processes, dialogues & actions of human-computer interaction",
      "HCI (ACM SIGCHI) = discipline of design, evaluation & implementation of interactive computing systems",
      "Usability (ISO) = effectiveness + efficiency + satisfaction for specified users/goals/environments",
      "5 usability measures = time to learn | speed of performance | rate of errors | retention over time | subjective satisfaction",
      "5 motivation groups = life-critical | industrial/commercial | office/home/entertainment | exploratory/creative/collaborative | sociotechnical",
      "8 universal usability groups = physical | cognitive | personal | cultural | disabilities | seniors | children | soft/hardware",
      "3 user skill levels = novice/first-time | knowledgeable intermittent | expert frequent",
      "5 interaction styles = direct manipulation | menu selection | form filling | command language | natural language",
      "6 expert review methods = heuristic evaluation | guidelines review | consistency inspection | cognitive walkthrough | MOT | formal usability inspection",
      "Nielsen's 10 heuristics = visibility | match real world | user control | consistency | error prevention | recognition over recall | flexibility | aesthetic/minimalist | error recovery | help/docs",
      "Usability lab = two 10×10 ft areas divided by a half-silvered mirror",
      "Eye-tracking = heat map | gaze plot | zone analysis",
      "Usability test 9 steps = objectives → participants → scenarios → method → conduct → collect → analyze → recommend → report",
      "Surveys = QUIS | IBM PSSUQ | SUMI | WAMMI",
      "Acceptance test = verify measurable criteria (not find flaws)",
      "Task analysis = how people perform their jobs; HTA decomposes tasks into hierarchies",
      "HTA 3 stages = starting (main task → 4-8 subtasks) | progressing (depth/breadth-first, detail level) | finalizing (consistency check)",
      "Dialogue = program-directed (menus/forms) or operator-directed (commands/direct manipulation)",
      "Dialogue standards = feedback | suitability | user control | error handling | learning",
      "Dialogue notations = STN | flow charts | JSD | LDO/LDC | dialog network diagrams",
      "Ch.5 = metaphors (verbal/virtual/composite) | direct manipulation (3 principles) | icon guidelines (8) | 3D interfaces | tele-operation | VR (immersive) vs AR (augments real)"
    ]
  }
];
